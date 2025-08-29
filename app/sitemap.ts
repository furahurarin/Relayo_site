// app/sitemap.ts
import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BRAND.siteUrl}/`, lastModified: now },
    { url: `${BRAND.siteUrl}/legal/terms`, lastModified: now },
    { url: `${BRAND.siteUrl}/legal/privacy`, lastModified: now },
    { url: `${BRAND.siteUrl}/legal/tokusho`, lastModified: now },
    { url: `${BRAND.siteUrl}/contact`, lastModified: now },
  ];
}
