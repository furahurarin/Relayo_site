// app/api/contact/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";
// API は常に動的実行（キャッシュ回避）
export const dynamic = "force-dynamic";

// ---- ENV ----
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = process.env.EMAIL_FROM!;        // 例: "Relayo <noreply@relayo.jp>"
const ADMIN = process.env.EMAIL_TO!;         // 例: "owner@relayo.jp"

// ---- Utils ----
function esc(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type SendOpts = {
  replyTo?: string | string[];
  text?: string;
  tags?: string[];
};
async function sendMail(to: string[], subject: string, html: string, opts: SendOpts = {}) {
  const payload: Record<string, any> = {
    from: FROM,
    to,
    subject,
    html,
  };
  if (opts.replyTo) payload.reply_to = opts.replyTo;
  if (opts.text) payload.text = opts.text;
  if (opts.tags) payload.tags = opts.tags;

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

// ---- Handler ----
export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY || !FROM || !ADMIN) {
      return NextResponse.json({ ok: false, error: "ENV missing" }, { status: 500 });
    }

    // Content-Type が JSON でない場合に備え、例外は握りつぶして空オブジェクトに
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;

    // --- 蜜壺（honeypot）：値が入っていれば即拒否（人間は触らない） ---
    if (typeof body.hp === "string" && body.hp.trim() !== "") {
      // 成功風レスポンスで早期 return（Bot に手掛かりを与えない）
      return NextResponse.json({ ok: true });
    }

    // クライアント互換（複数キー許容）
    const name: string = (body.name ?? "").toString().trim();
    const email: string = (body.email ?? "").toString().trim().toLowerCase();
    const company: string | undefined = body.company ? String(body.company).trim() : undefined;
    const tel: string | undefined = normalizeTel(body.tel ?? body.phone);
    const messageRaw: string = (body.detail ?? body.message ?? "").toString().trim();

    // 軽いサニタイズ前の基本バリデーション
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

    // --- 付随情報（任意） ---
    const ip = getClientIp(req);
    const ua = req.headers.get("user-agent") || "";
    const now = new Date();
    const stamp = now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

    // --- 自動返信（ユーザー向け）---
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
      // 返信先は運営側（ユーザーがそのまま返信→運営に届く）
      replyTo: ADMIN,
      tags: ["contact", "auto-reply"],
      text:
        `${name} 様\n` +
        `お問い合わせありがとうございます。原則24時間以内にご連絡します。\n\n` +
        `--- 送信内容の控え ---\n` +
        `お名前: ${name}\n会社名: ${company || "-"}\nメール: ${email}\n電話番号: ${tel || "-"}\n送信日時: ${stamp}\n\n` +
        `${messageRaw}\n`,
    });

    // --- 社内通知（ADMIN 向け）---
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
    `;

    await sendMail([ADMIN], adminSubject, adminHtml, {
      // 返信先はユーザー（そのまま返信でやり取り開始できる）
      replyTo: email,
      tags: ["contact", "notify"],
      text:
        `新規お問い合わせ（${stamp}）\n` +
        `氏名: ${name}\n会社名: ${company || "-"}\nメール: ${email}\n電話番号: ${tel || "-"}\n` +
        `IP: ${ip}\nUA: ${ua}\n\n` +
        `${messageRaw}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("contact API error:", e?.message ?? e);
    // 内部詳細は伏せ、汎用メッセージを返す
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
 * 例：
 *   const cfToken = body.cfToken ?? body.turnstileToken;
 *   if (process.env.TURNSTILE_SECRET_KEY) {
 *     const vr = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
 *       method: "POST",
 *       body: new URLSearchParams({
 *         secret: process.env.TURNSTILE_SECRET_KEY!,
 *         response: String(cfToken || ""),
 *         remoteip: getClientIp(req),
 *       }),
 *     }).then(r => r.json());
 *     if (!vr.success) return NextResponse.json({ ok:false, error:"Bot verification failed" }, { status: 400 });
 *   }
 * ------------------------- */
