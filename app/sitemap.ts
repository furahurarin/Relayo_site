// app/sitemap.ts
import { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.siteUrl;

  const routes = [
    {
      route: "",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      route: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      route: "/legal/privacy",
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      route: "/legal/terms",
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      route: "/legal/tokusho",
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ].map(({ route, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return routes;
}
