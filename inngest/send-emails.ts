// inngest/send-emails.ts
import "server-only";
import { inngest } from "@/lib/inngest";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend";

type ApplicationPayload = {
  name: string;
  email: string;
  company?: string;
  tel?: string;
  message?: string;
  referer?: string | null;
};

/**
 * 申込イベント受信時の一連のメール送信
 * - 社内通知
 * - 申込者への自動返信
 * - 24時間後のフォロー通知
 *
 * トリガーイベント: "application/received"
 */
export const sendEmails = inngest.createFunction(
  { id: "send-emails-on-application" },
  { event: "application/received" },
  async ({ event, step }) => {
    const data = event.data as ApplicationPayload;

    if (!data?.name || !data?.email) {
      throw new Error("Missing required fields: name or email");
    }

    const adminText = [
      "新規申込みを受信しました。",
      `名前: ${data.name}`,
      data.company ? `会社: ${data.company}` : "",
      `メール: ${data.email}`,
      data.tel ? `電話: ${data.tel}` : "",
      data.message ? `内容:\n${data.message}` : "",
      data.referer ? `参照元: ${data.referer}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // 1) 社内通知
    await step.run("notify-admin", async () => {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        replyTo: [data.email],
        subject: `【Relayo】新規申込み: ${data.name} さん`,
        text: adminText,
      });
    });

    // 2) 自動返信
    await step.run("auto-reply", async () => {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [data.email],
        bcc: [EMAIL_TO], // 社内控え
        subject: "【Relayo】お問い合わせありがとうございます",
        text: [
          `${data.name} 様`,
          "",
          "Relayo です。お問い合わせありがとうございます。",
          "内容を確認し、1営業日以内にご連絡いたします。",
          "",
          "—",
          "Relayo",
          "contact@relayo.jp",
        ].join("\n"),
      });
    });

    // 3) 24時間後フォロー（未対応防止）
    await step.sleep("wait-24h", "PT24H");
    await step.run("follow-up", async () => {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        subject: "【Relayo】24h未対応フォロー",
        text: `24時間前の申込みに対応していますか？\n申込者: ${data.name} (${data.email})`,
      });
    });

    return { ok: true };
  }
);
