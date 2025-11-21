// app/manifest.ts
import type { MetadataRoute } from "next";
import { BRAND, CAMPAIGN } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: BRAND.name,
    description: CAMPAIGN.metaDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    lang: "ja-JP",
    icons: [
      {
        // PWA用アイコン（正方形シンボル）
        // まずは /images/relayo-icon.png を共用
        src: BRAND.icon, // "/images/relayo-icon.png"
        type: "image/png",
        // 必要に応じて 192x192, 512x512 などの専用アイコンを用意したら
        // sizes: "192x192" や "512x512" を追加していく
      },
    ],
  };
}
