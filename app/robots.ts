// app/robots.ts
import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

/**
 *  robots.txt
 *  - 本番以外（development/preview）はクローリングを禁止
 *  - 本番のみ sitemap / host を明示
 */
export default function robots(): MetadataRoute.Robots {
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
  const isProd = env === "production";

  const base = (() => {
    try {
      const u = new URL(BRAND.siteUrl);
      // 末尾スラッシュ除去
      return `${u.origin}${u.pathname.replace(/\/$/, "")}`;
    } catch {
      return "https://relayo.jp";
    }
  })();

  const host = (() => {
    try {
      return new URL(BRAND.siteUrl).host;
    } catch {
      return undefined;
    }
  })();

  return {
    rules: isProd
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
    ...(isProd ? { sitemap: `${base}/sitemap.xml` } : {}),
    ...(isProd && host ? { host } : {}),
  };
}
