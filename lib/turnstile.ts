// lib/turnstile.ts
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileVerifyResponse = {
  success?: boolean;
  // Turnstile は kebab-case のキーで返す
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
};

/**
 * Cloudflare Turnstile のサーバー検証（本番前提）
 * - 必須: TURNSTILE_SECRET_KEY
 * - 失敗理由はサーバーログにのみ出力（クライアントへは詳細を返さない）
 */
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is required");

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });

    const json: TurnstileVerifyResponse = await res.json();

    if (!json.success) {
      const codes = (json["error-codes"] ?? []).join(", ") || "unknown";
      console.error("[turnstile] verify failed:", codes);
    }
    return !!json.success;
  } catch (err) {
    console.error("[turnstile] verify error:", err);
    return false;
  }
}
