// app/sitemap.ts
import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

type RouteCfg = {
  path: string;
  change: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number; // 0.0 - 1.0
};

const routes: RouteCfg[] = [
  { path: "/",            change: "weekly",  priority: 1.0 },
  { path: "/pricing",     change: "weekly",  priority: 0.9 },
  { path: "/services",    change: "monthly", priority: 0.8 }, // ※ページが無ければ削除
  { path: "/contact",     change: "monthly", priority: 0.8 },
  { path: "/legal/terms", change: "yearly",  priority: 0.3 },
  { path: "/legal/privacy", change: "yearly", priority: 0.3 },
  { path: "/legal/tokusho", change: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (BRAND.siteUrl ?? "").replace(/\/+$/, "");
  const lastModified = new Date();

  // 末尾スラッシュ差異などの重複を除去
  const seen = new Set<string>();
  const unique = routes.filter((r) => {
    const key = r.path === "/" ? "/" : r.path.replace(/\/+$/, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.change,
    priority: r.priority,
  }));
}
