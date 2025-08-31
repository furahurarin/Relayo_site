// app/sitemap.ts
import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const pages = [
    "/",
    "/contact",
    "/legal/terms",
    "/legal/privacy",
    "/legal/tokusho",
  ] as const;

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
