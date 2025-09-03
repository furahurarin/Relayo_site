// lib/resend.ts
import { Resend } from "resend";

/**
 * ❌ ここで環境変数を assert しない（import 時に落ちるため）
 * ✅ 使う瞬間にだけインスタンス化（遅延生成）
 */
export const makeResend = (apiKey: string) => new Resend(apiKey);

// 送信元・宛先は “実行時” に取り出す（未設定で import が落ちないようにする）
export const getEMAIL_FROM = () => process.env.EMAIL_FROM ?? "";
export const getEMAIL_TO = () => process.env.EMAIL_TO ?? "";
