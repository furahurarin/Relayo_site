// app/sitemap.ts
import type { MetadataRoute } from "next";
import { BRAND } from "../lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/", "/contact", "/legal/terms", "/legal/privacy", "/legal/tokusho"];
  return pages.map((path) => ({
    url: `${BRAND.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
