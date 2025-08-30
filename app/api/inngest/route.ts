// app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { resend } from "@/lib/resend";

type ApplicationReceivedEvent = {
  name: "application/received";
  data: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
    detail: string;
    ip?: string;
    ua?: string;
  };
};

// 受付時：申請者へ自動返信 & 社内通知 → 24h後にフォロー
const sendOnApplication = inngest.createFunction(
  { id: "send-emails-on-application" },
  { event: "application/received" },
  async ({ event, step }) => {
    const d = (event as ApplicationReceivedEvent).data;
    const submittedAt = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

    // 申請者へ自動返信
    await step.run("resend:auto-reply", async () => {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: d.email,
        replyTo: process.env.EMAIL_TO!, // 担当がそのまま返信できる
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
        from: process.env.EMAIL_FROM!,
        to: process.env.EMAIL_TO!,
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

    // 24時間後フォロー（任意・不要ならこの2行を削除）
    await step.sleep("followup-24h", "24h");
    await step.run("resend:follow-up-internal", async () => {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: process.env.EMAIL_TO!,
        subject: `【Follow-up】24h経過：${d.name} 様`,
        text: `対応状況をご確認ください。\n\n申請者: ${d.name}（${d.company || "-"}）\nメール: ${d.email}`,
      });
    });
  }
);

// Inngest エンドポイント（署名検証ON）
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendOnApplication],
  signingKey: process.env.INNGEST_SIGNING_KEY, // ← Inngestダッシュボードで発行して env に設定
});

// 外部APIを使うため Node ランタイム
export const runtime = "nodejs";
