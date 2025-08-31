// app/api/contact/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

type Body = {
  name: string;
  email: string;
  company?: string;
  tel?: string;
  message?: string;
  turnstileToken: string; // フロントの Turnstile onVerify で取得
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const { name, email, company, tel, message, turnstileToken } = body ?? {};

    if (!name || !email || !turnstileToken) {
      return NextResponse.json({ ok: false, error: "Bad Request" }, { status: 400 });
    }

    // Turnstile サーバー検証
    const form = new URLSearchParams();
    form.append("secret", process.env.TURNSTILE_SECRET_KEY ?? "");
    form.append("response", turnstileToken);
    form.append("remoteip", req.headers.get("x-forwarded-for") ?? "");

    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    }).then(r => r.json() as Promise<{ success: boolean; ["error-codes"]?: string[] }>);

    if (!verify.success) {
      return NextResponse.json(
        { ok: false, error: "Turnstile failed", details: verify["error-codes"] },
        { status: 400 }
      );
    }

    // Inngest にイベント送信（send-emails.ts が処理）
    await inngest.send({
      name: "application/received",
      data: {
        name,
        email,
        company,
        tel,
        message,
        referer: req.headers.get("referer") ?? null,
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server Error" }, { status: 500 });
  }
}
