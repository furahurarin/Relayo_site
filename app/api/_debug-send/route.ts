// app/api/_debug-send/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const to = url.searchParams.get("to") || EMAIL_TO;

  try {
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject: "Relayo debug mail",
      text: "This is a debug email from /api/_debug-send.",
    });
    return NextResponse.json({ ok: true, to, result });
  } catch (err: any) {
    return NextResponse.json({ ok: false, to, error: String(err?.message || err) }, { status: 500 });
  }
}
