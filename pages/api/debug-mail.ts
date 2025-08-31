// pages/api/debug-mail.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } = process.env as Record<string, string>;
    if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) {
      res.status(500).json({ ok: false, error: "ENV missing" });
      return;
    }
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        subject: "Relayo Debug (pages/api)",
        html: "<p>pages/api からの送信テスト</p>",
      }),
    });
    const data = await r.json();
    res.status(r.ok ? 200 : 500).json({ ok: r.ok, status: r.status, data });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message ?? String(e) });
  }
}
