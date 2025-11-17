import { NextRequest, NextResponse } from "next/server";

import { inngest } from "@/lib/inngest";
import { applyRatelimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * JSON / form-data 両対応で body をオブジェクト化
 */
async function parseBody(req: NextRequest): Promise<Record<string, any>> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return (await req.json()) as Record<string, any>;
    } catch {
      return {};
    }
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await req.formData();
    const obj: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (obj[key] === undefined) {
        obj[key] = value;
      } else if (Array.isArray(obj[key])) {
        (obj[key] as any[]).push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    }
    return obj;
  }

  // content-type 不明の場合は空で返す
  return {};
}

/**
 * 単一 or 配列 or カンマ区切り文字列を string[] に正規化
 */
function toStringArray(value: unknown): string[] | undefined {
  if (value == null) return undefined;
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "string" ? v.trim() : String(v)))
      .filter(Boolean);
  }
  if (typeof value === "string") {
    // "a,b,c" 形式ならカンマ区切りとして扱う（そうでなければ単一要素）
    if (value.includes(",")) {
      return value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    const trimmed = value.trim();
    return trimmed ? [trimmed] : undefined;
  }
  return [String(value)];
}

/**
 * クライアントIPの推定
 */
function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const ip = xff.split(",")[0]?.trim();
    if (ip) return ip;
  }
  // Next.js の req.ip は環境により undefined の場合あり
  // 型エラー回避のため any キャスト
  const reqAny = req as any;
  if (typeof reqAny.ip === "string" && reqAny.ip) {
    return reqAny.ip;
  }
  return "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // ---- レート制限 ----
  const rl = await applyRatelimit(ip, "/api/contact");
  if (!rl.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "TOO_MANY_REQUESTS",
        message: "短時間に複数回送信されています。少し時間をおいて再度お試しください。",
      },
      { status: 429 }
    );
  }

  const body = await parseBody(req);

  // ---- Turnstile 検証（本番でのみ必須）----
  // Cloudflare の標準フィールド名: "cf-turnstile-response"
  const turnstileToken =
    body["cf-turnstile-response"] ??
    body.turnstileToken ??
    body.token ??
    null;

  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken || typeof turnstileToken !== "string") {
      return NextResponse.json(
        {
          ok: false,
          error: "TURNSTILE_TOKEN_MISSING",
          message: "確認に失敗しました。お手数ですが、ページを再読み込みしてもう一度お試しください。",
        },
        { status: 400 }
      );
    }

    const isHuman = await verifyTurnstile(turnstileToken, ip);
    if (!isHuman) {
      return NextResponse.json(
        {
          ok: false,
          error: "TURNSTILE_FAILED",
          message: "確認に失敗しました。お手数ですが、ページを再読み込みしてもう一度お試しください。",
        },
        { status: 400 }
      );
    }
  } else {
    // 開発環境などでキー未設定の場合は Turnstile をスキップ（ログだけ残す）
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] TURNSTILE_SECRET_KEY is not set; skip verification");
    }
  }

  // ---- 必須項目の正規化 ----
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();

  const rawMessage = (body.message ?? body.detail ?? "").toString();
  const message = rawMessage.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "お名前・メールアドレス・ご相談内容は必須です。",
      },
      { status: 400 }
    );
  }

  // ---- 任意項目の正規化 ----
  const company =
    body.company != null ? String(body.company).trim() : undefined;
  const tel =
    body.tel != null
      ? String(body.tel).trim()
      : body.phone != null
      ? String(body.phone).trim()
      : undefined;

  // 相談種別・プランなど（値自体のバリデーションは send-emails 側でラベル化）
  const type = body.type != null ? String(body.type) : undefined;
  const plan = body.plan != null ? String(body.plan) : undefined;
  const timeline =
    body.timeline != null ? String(body.timeline) : undefined;
  const priority =
    body.priority != null ? String(body.priority) : undefined;

  const assets = toStringArray(body.assets);
  const decision =
    body.decision != null ? String(body.decision) : undefined;
  const features = toStringArray(body.features);

  // 参照元・ページ情報
  const headerReferer = req.headers.get("referer");
  const referer =
    body.referer ??
    body.referrer ??
    headerReferer ??
    null;
  const pathname =
    body.pathname ??
    req.nextUrl?.pathname ??
    null;

  // UTM（snake / camel 両対応で受け取れるようにする）
  const utm_source = body.utm_source ?? body.utmSource;
  const utm_medium = body.utm_medium ?? body.utmMedium;
  const utm_campaign = body.utm_campaign ?? body.utmCampaign;
  const utm_content = body.utm_content ?? body.utmContent;
  const utm_term = body.utm_term ?? body.utmTerm;

  // ---- Inngest イベント送信 ----
  await inngest.send({
    name: "application/received",
    data: {
      name,
      email,
      company,
      tel,
      // 互換性のため両方持たせておく
      phone: body.phone,
      message,
      detail: body.detail,

      referer,
      referrer: body.referrer ?? null,
      pathname,

      type,
      plan,
      timeline,
      priority,
      assets,
      decision,
      features,

      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,

      utmSource: utm_source,
      utmMedium: utm_medium,
      utmCampaign: utm_campaign,
      utmContent: utm_content,
      utmTerm: utm_term,
    },
  });

  return NextResponse.json({ ok: true });
}
