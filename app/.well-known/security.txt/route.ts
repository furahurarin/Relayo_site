// app/.well-known/security.txt/route.ts
// ↓ 相対パスに変更
import { BRAND, CONTACT } from "../../../lib/constants";

export async function GET() {
  const sixMonthsMs = 180 * 24 * 60 * 60 * 1000;
  const expiresIso = new Date(Date.now() + sixMonthsMs).toISOString();

  const body = [
    `Contact: ${CONTACT.mailto}`,
    `Expires: ${expiresIso}`,
    `Preferred-Languages: ja, en`,
    `Canonical: ${BRAND.siteUrl}/.well-known/security.txt`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
