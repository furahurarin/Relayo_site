// app/api/debug/mail/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } = process.env as Record<string,string>;
  if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) {
    return NextResponse.json({ ok:false, error:"ENV missing" }, { status:500 });
  }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: EMAIL_FROM, to: [EMAIL_TO],
      subject: "Relayo Debug (app/api)", html: "<p>app/api からの送信テスト</p>"
    }),
  });
  const data = await r.json();
  return NextResponse.json({ ok: r.ok, status: r.status, data }, { status: r.ok ? 200 : 500 });
}
