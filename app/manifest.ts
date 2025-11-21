// app/manifest.ts
import type { MetadataRoute } from "next";
import { BRAND, CAMPAIGN } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: BRAND.name,
    description: CAMPAIGN.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#111827", // サイト全体の背景色に合わせる
    theme_color: "#111827",
    icons: [
      {
        // ホーム画面などで使われる小さめアイコン
        src: "/images/relayo-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        // スプラッシュスクリーン等で使われる大きめアイコン
        src: "/images/relayo-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
