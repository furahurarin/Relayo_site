// app/api/contact/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

// ---- ENV ----
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = process.env.EMAIL_FROM!;
const ADMIN = process.env.EMAIL_TO!;

// ---- Utils ----
function esc(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
async function sendMail(to: string[], subject: string, html: string) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(`Resend ${r.status}: ${JSON.stringify(data)}`);
  return data;
}

// ---- Handler ----
export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY || !FROM || !ADMIN) {
      return NextResponse.json({ ok: false, error: "ENV missing" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({} as any));

    // クライアント互換のため複数キーを許容
    const name: string = body.name ?? "";
    const email: string = body.email ?? "";
    const company: string | undefined = body.company || undefined;
    const telRaw: string | undefined = body.tel ?? body.phone ?? undefined;
    const messageRaw: string =
      body.detail ?? body.message ?? "";

    // 必須チェック（名前・メール・本文）
    if (!name || !email || !messageRaw) {
      return NextResponse.json(
        { ok: false, error: "name, email, message/detail は必須です" },
        { status: 400 }
      );
    }

    // ✅ Turnstile 検証は一時停止中（必要になったら再開）
    // const cfToken: string | undefined = body.cfToken ?? body.turnstileToken;
    // if (process.env.TURNSTILE_SECRET_KEY && cfToken) { ... }

    const now = new Date();
    const stamp = now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

    // ---- 自動返信（ユーザー向け）----
    await sendMail(
      [email],
      "【Relayo】お問い合わせありがとうございます",
      `
      <p>${esc(name)} 様</p>
      <p>お問い合わせを受け付けました。1営業日以内に担当よりご連絡いたします。</p>
      <hr />
      <p><strong>送信内容の控え</strong></p>
      <p>
        お名前：${esc(name)}<br/>
        会社名：${esc(company) || "-"}<br/>
        メール：${esc(email)}<br/>
        電話番号：${esc(telRaw) || "-"}<br/>
        送信日時：${esc(stamp)}
      </p>
      <p><strong>ご要件・相談内容</strong></p>
      <pre style="white-space:pre-wrap;word-wrap:break-word;">${esc(messageRaw)}</pre>
      `
    );

    // ---- 社内通知（ADMIN）----
    const adminHtml = `
      <p><strong>新規お問い合わせ</strong>（${esc(stamp)}）</p>
      <p>
        氏名：${esc(name)}<br/>
        会社名：${esc(company) || "-"}<br/>
        メール：${esc(email)}<br/>
        電話番号：${esc(telRaw) || "-"}
      </p>
      <p><strong>ご要件・相談内容</strong></p>
      <pre style="white-space:pre-wrap;word-wrap:break-word;">${esc(messageRaw)}</pre>
    `;
    await sendMail([ADMIN], "【Relayo】新規お問い合わせ", adminHtml);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("contact API error:", e?.message ?? e);
    return NextResponse.json(
      { ok: false, error: e?.message ?? "unknown" },
      { status: 500 }
    );
  }
}
