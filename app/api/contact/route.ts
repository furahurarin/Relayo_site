// app/api/contact/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = process.env.EMAIL_FROM!;
const ADMIN = process.env.EMAIL_TO!;

async function sendMail(to: string[], subject: string, html: string) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(`Resend ${r.status}: ${JSON.stringify(data)}`);
  return data;
}

export async function POST(req: Request) {
  try {
    if (!RESEND_API_KEY || !FROM || !ADMIN) {
      return NextResponse.json({ ok: false, error: "ENV missing" }, { status: 500 });
    }

    const { name, email, detail } = await req.json();

    // ✅ Turnstile 検証は一時停止中
    // if (process.env.TURNSTILE_SECRET_KEY) { ... }

    // 申込者へ自動返信
    await sendMail(
      [email],
      "【Relayo】お問い合わせありがとうございます",
      `<p>${name} 様</p><p>お問い合わせを受け付けました。担当よりご連絡いたします。</p>`
    );

    // 社内通知
    await sendMail(
      [ADMIN],
      "【Relayo】新規お問い合わせ",
      `<p>氏名: ${name}</p><p>メール: ${email}</p><p>内容:</p><pre>${detail ?? ""}</pre>`
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("contact API error:", e?.message ?? e);
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
