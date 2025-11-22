// app/sitemap.ts
import { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.siteUrl;

  // 固定ページ（準備中の works, blog を除外）
  const routes = [
    "",           // ホーム
    "/services",  // サービス
    // "/works",  // 制作実績（準備中）
    "/pricing",   // 料金
    "/process",   // 制作の流れ
    // "/blog",   // ブログ（準備中）
    "/company",   // 運営者情報
    "/faq",       // FAQ
    "/contact",   // お問い合わせ
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes];
}