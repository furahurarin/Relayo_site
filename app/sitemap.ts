// app/sitemap.ts
import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

type RouteCfg = {
  path: string;
  change:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number; // 0.0 - 1.0
};

// 公開中の主要ページを列挙（存在しないページは削除orコメントアウト）
const routes: RouteCfg[] = [
  { path: "/", change: "weekly", priority: 1.0 },
  { path: "/pricing", change: "weekly", priority: 0.9 },
  { path: "/services", change: "monthly", priority: 0.8 },
  { path: "/contact", change: "monthly", priority: 0.8 },
  { path: "/faq", change: "monthly", priority: 0.6 },
  { path: "/campaign", change: "weekly", priority: 0.7 },
  { path: "/legal/terms", change: "yearly", priority: 0.3 },
  { path: "/legal/privacy", change: "yearly", priority: 0.3 },
  { path: "/legal/tokusho", change: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = safeBaseUrl(BRAND.siteUrl);
  const lastModified = new Date();

  // 末尾スラッシュ差異などの重複を除去
  const seen = new Set<string>();
  const unique = routes.filter((r) => {
    const key = normalizePath(r.path);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.map((r) => ({
    url: base + normalizePath(r.path),
    lastModified,
    changeFrequency: r.change,
    priority: r.priority,
  }));
}

/** URLのorigin+パス基準を安全に返す（末尾スラッシュ無し） */
function safeBaseUrl(input?: string): string {
  try {
    if (!input) throw new Error("no siteUrl");
    const u = new URL(input);
    return `${u.origin}${u.pathname.replace(/\/$/, "")}`;
  } catch {
    return "https://relayo.jp";
  }
}

/** 先頭スラッシュを担保し、末尾スラッシュを除去（ルートのみ "/" を許可） */
function normalizePath(p: string): string {
  if (!p) return "/";
  const withLead = p.startsWith("/") ? p : `/${p}`;
  if (withLead === "/") return "/";
  return withLead.replace(/\/+$/, "");
}
