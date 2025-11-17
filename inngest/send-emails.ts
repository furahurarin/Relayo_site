// inngest/send-emails.ts
import "server-only";
import { inngest } from "@/lib/inngest";
import { makeResend, getEMAIL_FROM, getEMAIL_TO } from "@/lib/resend";
import { BRAND } from "@/lib/constants";

type ApplicationPayload = {
  name: string;
  email: string;
  company?: string;
  tel?: string; // フォームA
  phone?: string; // フォームB互換
  message?: string; // フォームA
  detail?: string; // フォームB互換
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
    "お問い合わせ内容:",
    p.message || "-",
  ].filter(Boolean);
  return lines.join("\n");
};

export const sendEmails = inngest.createFunction(
  { id: "send-emails-on-application" },
  { event: "application/received" },
  async ({ event, step }) => {
    const raw = event.data as ApplicationPayload | undefined;
    if (!raw) throw new Error("No event data");

    // ---- フィールド正規化 ----
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

    // ✅ 実行時チェック（import時に落とさない）
    const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
    const EMAIL_FROM = getEMAIL_FROM();
    const EMAIL_TO = getEMAIL_TO();
    if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) {
      console.warn(
        "[send-emails] Missing one of RESEND_API_KEY / EMAIL_FROM / EMAIL_TO. Skip sending."
      );
      return { ok: false, skipped: true };
    }

    // ここで初めて Resend を生成（遅延）
    const resend = makeResend(RESEND_API_KEY);

    const summary = buildSummary({
      name,
      email,
      company,
      tel,
      message,
      referer: referer || undefined,
      stamp,
    });

    // 1) 管理者向け通知（社内）
    await step.run("notify-admin", async () => {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        replyTo: [email],
        subject: `【${BRAND.name}】新規お問い合わせ: ${name} 様`,
        text: [
          "新しいお問い合わせを受信しました。",
          "",
          summary,
          "",
          `このメールには返信できます（返信先: ${email}）。`,
        ].join("\n"),
      });
    });

    // 2) 自動返信（テキスト版・控えつき）
    await step.run("auto-reply", async () => {
      const lines = [
        `${name} 様`,
        "",
        `${BRAND.name}です。お問い合わせありがとうございます。`,
        "お送りいただいた内容を確認のうえ、通常1営業日以内にメールでご連絡いたします。",
        "",
        "追加で共有いただける情報（ご予算・公開時期・参考サイトなど）がありましたら、",
        "このメールにそのままご返信ください。",
        "",
        "—— お問い合わせ内容の控え ——",
        summary,
        "",
        "—",
        BRAND.name,
        BRAND.siteUrl,
        BRAND.email,
      ];

      await resend.emails.send({
        from: EMAIL_FROM,
        to: [email],
        bcc: [EMAIL_TO], // 社内控え
        subject: `【${BRAND.name}】お問い合わせありがとうございます`,
        text: lines.join("\n"),
      });
    });

    // 3) 24時間後フォロー（未対応チェック用・社内向け）
    await step.sleep("wait-24h", "PT24H");
    await step.run("follow-up", async () => {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        subject: `【${BRAND.name}】24時間フォロー（お問い合わせ対応のご確認）`,
        text: [
          "24時間前に受信したお問い合わせへの対応状況をご確認ください。",
          "",
          "▼ 該当のお問い合わせ概要",
          summary,
        ].join("\n"),
      });
    });

    return { ok: true };
  }
);
