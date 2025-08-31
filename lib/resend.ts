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

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is required");
}
export const resend = new Resend(RESEND_API_KEY);

const _FROM = process.env.EMAIL_FROM?.trim();
if (!_FROM) {
  throw new Error("EMAIL_FROM is required (e.g. 'Relayo <noreply@relayo.jp>')");
}
export const EMAIL_FROM: string = _FROM;

const _TO = process.env.EMAIL_TO?.trim();
if (!_TO) {
  throw new Error("EMAIL_TO is required (internal notifications recipient)");
}
export const EMAIL_TO: string = _TO;
