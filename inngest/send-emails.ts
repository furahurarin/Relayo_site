// inngest/send-emails.ts
import { inngest } from "@/lib/inngest";
import { Resend } from "resend";
import * as React from "react";
import { AdminNotification } from "@/emails/AdminNotification";
import { UserAutoreply } from "@/emails/UserAutoreply";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.EMAIL_FROM ?? "Relayo <onboarding@resend.dev>";
const ADMIN = process.env.EMAIL_TO!;

type LeadData = {
  name: string;
  email: string;
  message: string;
  submittedAt?: string; // 任意（あれば通知に表示）
};

export const sendEmails = inngest.createFunction(
  { id: "send-emails" },
  { event: "lead/created" },
  async ({ event, step }) => {
    const { name, email, message, submittedAt } = event.data as LeadData;

    // 管理者通知
    await step.run("notify-admin", async () => {
      const res = await resend.emails.send({
        from: FROM,
        to: ADMIN,
        subject: `【申込み】${name || "（不明）"} さんより`,
        replyTo: email || undefined, // ← 修正
        react: React.createElement(AdminNotification, {
          name,
          email,
          message,
          submittedAt,
        }),
      });
      return res;
    });

    // 自動返信（メールがある場合のみ）
    if (email) {
      await step.run("auto-reply", async () => {
        const res = await resend.emails.send({
          from: FROM,
          to: email,
          subject: "お申込みありがとうございます｜Relayo",
          react: React.createElement(UserAutoreply, { name }),
        });
        return res;
      });
    }
  }
);
