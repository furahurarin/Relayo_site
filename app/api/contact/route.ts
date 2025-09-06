// app/api/contact/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";
// API は常に動的実行（キャッシュ回避）
export const dynamic = "force-dynamic";

/* =========================
 * ENV
 * ========================= */
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = process.env.EMAIL_FROM!;  // 例: Relayo <noreply@relayo.jp>
const ADMIN = process.env.EMAIL_TO!;   // 例: contact.relayo@gmail.com

/* =========================
 * Utils
 * ========================= */
function esc(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type SendOpts = {
  replyTo?: string | string[];
  text?: string;
  /** Resendは {name,value}[] 形式。Record指定も許容し、内部で変換する */
  tags?: Record<string, string> | { name: string; value: string }[];
};

async function sendMail(
  to: string[],
  subject: string,
  html: string,
  opts: SendOpts = {}
) {
  const payload: Record<string, any> = {
    from: FROM,
    to,
    subject,
    html,
  };
  if (opts.replyTo) payload.reply_to = opts.replyTo;
  if (opts.text) payload.text = opts.text;

  // ✅ Resendの正しいtags形式に変換
  if (opts.tags) {
    const arr = Array.isArray(opts.tags)
      ? (opts.tags as { name: string; value: string }[]).map((t) => ({
          name: String(t.name),
          value: String(t.value),
        }))
      : Object.entries(opts.tags).map(([k, v]) => ({
          name: String(k),
          value: String(v),
        }));
    payload.tags = arr;
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Resend ${r.status}: ${JSON.stringify(data)}`);
  return data;
}

function emailValid(v: string) {
  // シンプルな構文チェック（RFC完全準拠にはしない）
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function normalizeTel(v: string | undefined) {
  if (!v) return undefined;
  const digits = v.replace(/[^\d+]/g, "");
  return digits.length ? digits : undefined;
}
function getClientIp(req: Request) {
  const h = Object.fromEntries(req.headers.entries());
  return (
    h["x-forwarded-for"]?.split(",")[0]?.trim() ||
    h["x-real-ip"] ||
    "unknown"
  );
}

/** 管理者向けにだけ載せる参照情報を抽出（ユーザー向けには絶対に使わない） */
function extractReferContext(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams;
  const referrerHeader = req.headers.get("referer") || req.headers.get("referrer") || "-";

  return {
    referrer: referrerHeader,
    pathname: url.pathname || "-",
    utm_source: search.get("utm_source") || "-",
    utm_medium: search.get("utm_medium") || "-",
    utm_campaign: search.get("utm_campaign") || "-",
    utm_content: search.get("utm_content") || "-",
    utm_term: search.get("utm_term") || "-",
  };
}

/* =========================
 * Handler
 * ========================= */
export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY || !FROM || !ADMIN) {
      return NextResponse.json({ ok: false, error: "ENV missing" }, { status: 500 });
    }

    // Content-Type が JSON でない場合も空オブジェクトにフォールバック
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;

    // --- 蜜壺（honeypot）: 人間は触らない隠しフィールド。値があればBotと判断して成功風レスポンス ---
    if (typeof body.hp === "string" && body.hp.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // クライアント互換（複数キー許容）
    const name: string = (body.name ?? "").toString().trim();
    const email: string = (body.email ?? "").toString().trim().toLowerCase();
    const company: string | undefined = body.company ? String(body.company).trim() : undefined;
    const tel: string | undefined = normalizeTel(body.tel ?? body.phone);
    const messageRaw: string = (body.detail ?? body.message ?? "").toString().trim();

    // バリデーション
    if (!name || !email || !messageRaw) {
      return NextResponse.json(
        { ok: false, error: "name, email, message/detail は必須です" },
        { status: 400 },
      );
    }
    if (!emailValid(email)) {
      return NextResponse.json({ ok: false, error: "email の形式が不正です" }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ ok: false, error: "name が長すぎます（100文字以内）" }, { status: 400 });
    }
    if (messageRaw.length < 10 || messageRaw.length > 8000) {
      return NextResponse.json(
        { ok: false, error: "message/detail は10〜8000文字で入力してください" },
        { status: 400 },
      );
    }

    // 付随情報（ユーザー向けメールには載せない）
    const ip = getClientIp(req);
    const ua = req.headers.get("user-agent") || "";
    const stamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    const refer = extractReferContext(req);

    // --- 自動返信（ユーザー向け） ---
    // ✅ 要望により「参照情報（referrer / pathname / utm_*）」は一切記載しない
    const userSubject = "【Relayo】お問い合わせありがとうございます";
    const userHtml = `
      <p>${esc(name)} 様</p>
      <p>この度はお問い合わせありがとうございます。原則24時間以内（営業日）に担当よりご連絡いたします。</p>
      <hr />
      <p><strong>送信内容の控え</strong></p>
      <p>
        お名前：${esc(name)}<br/>
        会社名：${esc(company) || "-"}<br/>
        メール：${esc(email)}<br/>
        電話番号：${esc(tel) || "-"}<br/>
        送信日時：${esc(stamp)}
      </p>
      <p><strong>ご要件・相談内容</strong></p>
      <pre style="white-space:pre-wrap;word-wrap:break-word;">${esc(messageRaw)}</pre>
      <hr/>
      <p>このメールに返信いただければ、そのまま担当に届きます。</p>
    `;

    await sendMail([email], userSubject, userHtml, {
      replyTo: ADMIN, // ユーザーが返信→運営に届く
      text:
        `${name} 様\n` +
        `お問い合わせありがとうございます。原則24時間以内にご連絡します。\n\n` +
        `--- 送信内容の控え ---\n` +
        `お名前: ${name}\n会社名: ${company || "-"}\nメール: ${email}\n電話番号: ${tel || "-"}\n送信日時: ${stamp}\n\n` +
        `${messageRaw}\n`,
      tags: { category: "contact", kind: "auto-reply" },
    });

    // --- 社内通知（ADMIN向け） ---
    // ここにだけ参照情報を載せる
    const adminSubject = `【Relayo】新規お問い合わせ：${name}`;
    const adminHtml = `
      <p><strong>新規お問い合わせ</strong>（${esc(stamp)}）</p>
      <p>
        氏名：${esc(name)}<br/>
        会社名：${esc(company) || "-"}<br/>
        メール：${esc(email)}<br/>
        電話番号：${esc(tel) || "-"}<br/>
        IP：${esc(ip)}<br/>
        UA：${esc(ua)}
      </p>
      <p><strong>ご要件・相談内容</strong></p>
      <pre style="white-space:pre-wrap;word-wrap:break-word;">${esc(messageRaw)}</pre>
      <hr/>
      <p><strong>参照情報（内部用）</strong></p>
      <pre style="white-space:pre-wrap;word-wrap:break-word;">
referrer: ${esc(refer.referrer)}
pathname: ${esc(refer.pathname)}
utm_source: ${esc(refer.utm_source)} / utm_medium: ${esc(refer.utm_medium)} / utm_campaign: ${esc(refer.utm_campaign)}
utm_content: ${esc(refer.utm_content)} / utm_term: ${esc(refer.utm_term)}
      </pre>
    `;

    await sendMail([ADMIN], adminSubject, adminHtml, {
      replyTo: email, // そのまま返信でやり取り開始
      text:
        `新規お問い合わせ（${stamp}）\n` +
        `氏名: ${name}\n会社名: ${company || "-"}\nメール: ${email}\n電話番号: ${tel || "-"}\n` +
        `IP: ${ip}\nUA: ${ua}\n\n` +
        `${messageRaw}\n\n` +
        `--- 参照情報（内部用） ---\n` +
        `referrer: ${refer.referrer}\n` +
        `pathname: ${refer.pathname}\n` +
        `utm_source: ${refer.utm_source} / utm_medium: ${refer.utm_medium} / utm_campaign: ${refer.utm_campaign}\n` +
        `utm_content: ${refer.utm_content} / utm_term: ${refer.utm_term}\n`,
      tags: { category: "contact", kind: "notify" },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("contact API error:", e);
    return NextResponse.json(
      { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 },
    );
  }
}

/* -------------------------
 * Turnstile（Cloudflare）再導入メモ：
 *  - フロントから cfToken / turnstileToken を受け取り、
 *  - SECRET_KEY で https://challenges.cloudflare.com/turnstile/v0/siteverify を検証、
 *  - 成功時のみ送信処理を続行する。
 * ※現状は無効（honeypot のみ）
 * ------------------------- */
