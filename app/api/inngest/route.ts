// app/api/inngest/route.ts
export const runtime = "nodejs";

import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { sendEmails } from "@/inngest/send-emails";
import { Resend } from "resend";

// Resend
const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.EMAIL_FROM ?? "Relayo <onboarding@resend.dev>";
const ADMIN = process.env.EMAIL_TO!;

// application/received → 申込者へ自動返信 & 社内通知 → 24h後フォロー
const sendOnApplication = inngest.createFunction(
  { id: "send-emails-on-application" },
  { event: "application/received" },
  async ({ event, step }) => {
    const d = event.data as {
      name: string;
      company?: string;
      email: string;
      phone?: string;
      detail: string;
      ip?: string;
      ua?: string;
    };

    const submittedAt = new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });

    // 申請者へ自動返信
    await step.run("resend:auto-reply", async () => {
      await resend.emails.send({
        from: FROM,
        to: d.email,
        replyTo: ADMIN,
        subject: "【自動返信】お申し込みを受け付けました｜Relayo",
        text: `${d.name} 様

Relayo へのお申し込み、ありがとうございます。
内容を確認のうえ、担当者より1営業日以内にご連絡いたします。

―― 送信内容 ――
お名前：${d.name}
会社名：${d.company || "-"}
メール：${d.email}
電話番号：${d.phone || "-"}
ご要件：
${d.detail}

送信日時：${submittedAt}
（送信IP：${d.ip || "-"}）

※本メールは自動送信です。心当たりがない場合は、このメールは破棄してください。
Relayo（リレヨ）`,
      });
    });

    // 社内通知
    await step.run("resend:internal-notify", async () => {
      await resend.emails.send({
        from: FROM,
        to: ADMIN,
        subject: `【新規申請】${d.name} 様（${d.company || "個人"}）`,
        text: `新規申請を受信しました。

お名前：${d.name}
会社名：${d.company || "-"}
メール：${d.email}
電話番号：${d.phone || "-"}
ご要件：
${d.detail}

送信日時：${submittedAt}
IP：${d.ip || "-"}
UA：${d.ua || "-"}
`,
      });
    });

    // 24時間後フォロー（不要なら削除OK）
    await step.sleep("followup-24h", "24h");
    await step.run("resend:follow-up-internal", async () => {
      await resend.emails.send({
        from: FROM,
        to: ADMIN,
        subject: `【Follow-up】24h経過：${d.name} 様`,
        text: `対応状況をご確認ください。

申請者: ${d.name}（${d.company || "-"}）
メール: ${d.email}`,
      });
    });
  }
);

// Inngest エンドポイント（署名検証ON）
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendEmails,        // lead/created → React Email
    sendOnApplication, // application/received → テキストメール＋フォロー
  ],
  signingKey: process.env.INNGEST_SIGNING_KEY,
});
