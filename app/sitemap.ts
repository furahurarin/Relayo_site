// app/sitemap.ts
import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://relayo.example";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // 法務ページ（作る場合）
    {
      url: `${site}/legal/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site}/legal/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site}/legal/tokusho`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
