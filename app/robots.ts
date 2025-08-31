// app/robots.ts
import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = BRAND.siteUrl.replace(/\/$/, "");
  const host = (() => {
    try {
      return new URL(BRAND.siteUrl).host; // プロトコル除去を安全に
    } catch {
      return BRAND.siteUrl.replace(/^https?:\/\//, "").replace(/\/.*/, "");
    }
  })();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
