// lib/resend.ts
import "server-only";
import { Resend } from "resend";

/**
 * Resend クライアントと送信元/通知先の一元管理
 * 必須環境変数（Vercel の Env に設定）:
 *  - RESEND_API_KEY
 *  - EMAIL_FROM   例: 'Relayo <noreply@relayo.jp>'  ※ドメインは Resend で Verified 済み
 *  - EMAIL_TO     例: 'contact.relayo@gmail.com'
 */

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) throw new Error("RESEND_API_KEY is required");

export const resend = new Resend(apiKey);

export const EMAIL_FROM = process.env.EMAIL_FROM;
export const EMAIL_TO = process.env.EMAIL_TO;

if (!EMAIL_FROM) throw new Error("EMAIL_FROM is required (e.g. 'Relayo <noreply@relayo.jp>')");
if (!EMAIL_TO) throw new Error("EMAIL_TO is required (internal notifications recipient)");
