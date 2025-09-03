// lib/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * ✅ ポリシー
 * - import時に一切 throw しない（= build を落とさない）
 * - 実行時にだけ環境変数を読み、無ければ null を返す
 * - 本番(Vercel)のみ軽いバリデーションを行い、壊れていそうなら null + warn
 */

function looksLikeServiceRoleJWT(jwt: string): boolean {
  // "xxx.yyy.zzz" の3区切りになっていて、payload の role に "service" を含むかを軽く見る
  const parts = jwt.split(".");
  if (parts.length !== 3) return false;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payloadJson =
      typeof atob === "function"
        ? atob(padded) // edge/runtime 互換
        : Buffer.from(padded, "base64").toString("utf8");
    const payload = JSON.parse(payloadJson);
    const role = String(payload?.role || payload?.user_role || payload?.type || "");
    return /service/i.test(role);
  } catch {
    return false;
  }
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!url || !serviceKey) {
    // 環境が未設定なら利用側でスキップできるように null を返す
    if (process.env.VERCEL) {
      console.warn("[supabase] missing url or service role key; skip creating admin client");
    }
    return null;
  }

  // 本番(Vercel)のみ軽い妥当性チェック（壊れていそうなら null）
  if (process.env.VERCEL && !looksLikeServiceRoleJWT(serviceKey)) {
    console.warn("[supabase] service role key doesn't look like a service JWT; skip creating admin client");
    return null;
  }

  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

/**
 * もし anon クライアントも使うならこちらを利用（未設定なら null）
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !anon) return null;
  return createClient(url, anon, {
    auth: { persistSession: false },
    global: { headers: { "X-Client-Info": "relayo-site" } },
  });
}
