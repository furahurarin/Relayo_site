// lib/supabase.ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * サーバー専用の Supabase 管理クライアント（Service Role）
 * 必須環境変数:
 *  - SUPABASE_URL
 *  - SUPABASE_SERVICE_ROLE_KEY
 * ※ このファイルはクライアントから import しないでください。
 */
const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を環境変数に設定してください");
}

export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { headers: { "X-Client-Info": "relayo-admin" } },
});
