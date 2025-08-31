// inngest/send-emails.ts
import "server-only";
import { inngest } from "@/lib/inngest";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend";

type ApplicationPayload = {
  name: string;
  email: string;
  company?: string;
  tel?: string;        // フォームA
  phone?: string;      // フォームB互換
  message?: string;    // フォームA
  detail?: string;     // フォームB互換
  referer?: string | null;
};

const nowJST = () =>
  new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

const buildSummary = (p: {
  name: string;
  email: string;
  company?: string;
  tel?: string;
  message: string;
  referer?: string | null;
  stamp?: string;
}) => {
  const lines = [
    p.stamp ? `受付日時: ${p.stamp}` : "",
    `お名前: ${p.name}`,
    `会社名: ${p.company || "-"}`,
    `メール: ${p.email}`,
    `電話番号: ${p.tel || "-"}`,
    p.referer ? `参照元: ${p.referer}` : "",
    "",
    "ご要件・相談内容:",
    p.message || "-",
  ].filter(Boolean);
  return lines.join("\n");
};

/**
 * 申込イベント受信時の一連のメール送信
 * - 社内通知
 * - 申込者への自動返信（控え付き）
 * - 24時間後のフォロー通知
 *
 * トリガーイベント: "application/received"
 */
export const sendEmails = inngest.createFunction(
  { id: "send-emails-on-application" },
  { event: "application/received" },
  async ({ event, step }) => {
    const raw = event.data as ApplicationPayload | undefined;
    if (!raw) throw new Error("No event data");

    // ---- フィールド正規化（互換キーを吸収）----
    const name = raw.name?.trim();
    const email = raw.email?.trim();
    const company = raw.company?.trim();
    const tel = (raw.tel ?? raw.phone)?.trim();
    const message = (raw.message ?? raw.detail ?? "").toString().trim();
    const referer = raw.referer ?? null;
    const stamp = nowJST();

    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, message/detail");
    }

    const summary = buildSummary({
      name,
      email,
      company,
      tel,
      message,
      referer: referer || undefined,
      stamp,
    });

    // 1) 社内通知
    await step.run("notify-admin", async () => {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        replyTo: [email],
        subject: `【Relayo】新規申込み: ${name} さん`,
        text: `新規申込みを受信しました。\n\n${summary}`,
      });
    });

    // 2) 自動返信（控えつき）
    await step.run("auto-reply", async () => {
      const lines = [
        `${name} 様`,
        "",
        "Relayoです。お問い合わせありがとうございます。",
        "内容を確認し、1営業日以内にご連絡いたします。",
        "",
        "—— 送信内容の控え ——",
        summary,
        "",
        "—",
        "Relayo",
        "contact@relayo.jp",
      ];
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [email],
        bcc: [EMAIL_TO], // 社内控え
        subject: "【Relayo】お問い合わせありがとうございます",
        text: lines.join("\n"),
      });
    });

    // 3) 24時間後フォロー（未対応防止）
    await step.sleep("wait-24h", "PT24H");
    await step.run("follow-up", async () => {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        subject: "【Relayo】24h未対応フォロー",
        text: [
          "24時間前の申込みに対応していますか？",
          "",
          summary,
        ].join("\n"),
      });
    });

    return { ok: true };
  }
);
