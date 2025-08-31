// app/api/inngest/route.ts
export const runtime = "nodejs";

import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { sendEmails } from "@/inngest/send-emails";
import { resend, EMAIL_FROM as FROM, EMAIL_TO as ADMIN } from "@/lib/resend";

/** 必須環境変数の存在チェック（本番のみ厳格） */
function requireEnvInProd(name: string, value?: string | null) {
  if (process.env.NODE_ENV === "production" && !value) {
    throw new Error(`ENV ${name} is missing in production`);
  }
}

/** application/received → 申込者へ自動返信 & 社内通知 → 24h後フォロー */
const sendOnApplication = inngest.createFunction(
  { id: "send-emails-on-application" },
  { event: "application/received" },
  async ({ event, step }) => {
    type ApplicationReceived = {
      name: string;
      company?: string;
      email: string;
      phone?: string;
      detail: string;
      ip?: string;
      ua?: string;
    };

    // 本番で必要な送信元・送信先が未設定なら即時エラー
    requireEnvInProd("EMAIL_FROM", FROM);
    requireEnvInProd("EMAIL_TO", ADMIN);

    const d = event.data as ApplicationReceived;

    const submittedAt = new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });

    // 申請者へ自動返信（失敗しても他ステップは継続）
    await step.run("resend:auto-reply", async () => {
      if (!FROM || !d.email) return;
      await resend.emails.send({
        from: FROM,
        to: d.email,
        replyTo: ADMIN || undefined,
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
Relayo（リレイオ）`,
      });
    });

    // 社内通知
    await step.run("resend:internal-notify", async () => {
      if (!FROM || !ADMIN) return;
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

    // 24時間後フォロー（不要ならこの2ステップを削除可）
    await step.sleep("followup-24h", "24h");
    await step.run("resend:follow-up-internal", async () => {
      if (!FROM || !ADMIN) return;
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

// ───────────────────────────────────────────────────────────
// Inngest エンドポイント
// 本番では署名検証（INNGEST_SIGNING_KEY）を強く推奨
// ───────────────────────────────────────────────────────────
const signingKey = process.env.INNGEST_SIGNING_KEY || undefined;
// 本番で未設定ならログだけ出し、動作は継続（必要なら下行を throw に変更）
if (process.env.NODE_ENV === "production" && !signingKey) {
  console.warn("[inngest] INNGEST_SIGNING_KEY is missing in production (verification disabled)");
}

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendEmails,        // lead/created → React Email（別ファイル）
    sendOnApplication, // application/received → テキストメール＋フォロー
  ],
  signingKey,         // 署名検証（ある場合のみ有効）
});
