// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { Buffer } from "node:buffer";

function mustEnvAscii(name: string, fallback?: string) {
  const raw = process.env[name] ?? fallback;
  if (!raw) throw new Error(`ENV ${name} is missing`);
  const v = raw.trim();
  for (let i = 0; i < v.length; i++) {
    const code = v.charCodeAt(i);
    if (code > 255) {
      throw new Error(
        `ENV ${name} contains non-ASCII at index ${i} (U+${code.toString(
          16
        )})`
      );
    }
  }
  return v;
}

function assertServiceRoleJWT(jwt: string) {
  const parts = jwt.split(".");
  if (parts.length !== 3) {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY がJWT形式ではありません（"."で3分割できない）`
    );
  }
  try {
    const payloadJson = Buffer.from(
      parts[1].replace(/-/g, "+").replace(/_/g, "/") +
        "=".repeat((4 - (parts[1].length % 4)) % 4),
      "base64"
    ).toString("utf8");
    const payload = JSON.parse(payloadJson);
    const role =
      String(payload?.role || payload?.user_role || payload?.type || "") || "";
    if (!/service/i.test(role)) {
      throw new Error(
        `SUPABASE_SERVICE_ROLE_KEY は service role ではありません（role="${role || "unknown"}"）`
      );
    }
  } catch (e) {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY のJWTデコードに失敗（値が壊れている可能性）`
    );
  }
}

// URL は NEXT_PUBLIC_SUPABASE_URL 優先、無ければ SUPABASE_URL
const url = mustEnvAscii(
  "NEXT_PUBLIC_SUPABASE_URL",
  process.env.SUPABASE_URL
);
const serviceRoleKey = mustEnvAscii("SUPABASE_SERVICE_ROLE_KEY");
assertServiceRoleJWT(serviceRoleKey);

export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});
