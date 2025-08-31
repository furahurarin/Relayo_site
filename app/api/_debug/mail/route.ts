// app/api/_debug/mail/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ←重要: Resend API は edge runtime 非対応

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = process.env.EMAIL_FROM!;
const TO = process.env.EMAIL_TO!;

export async function GET() {
  try {
    if (!RESEND_API_KEY || !FROM || !TO) {
      return NextResponse.json(
        { ok: false, error: "ENV missing: RESEND_API_KEY / EMAIL_FROM / EMAIL_TO" },
        { status: 500 }
      );
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: "Relayo Debug Mail",
        html: "<p>本番サーバーからのResend直叩きテストです。</p>",
      }),
    });

    const data = await resp.json();
    return NextResponse.json({ ok: resp.ok, status: resp.status, data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? String(e) }, { status: 500 });
  }
}
