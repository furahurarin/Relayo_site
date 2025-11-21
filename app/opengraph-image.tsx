// app/opengraph-image.tsx
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { BRAND } from "@/lib/constants";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// alt テキスト（metadata からも参照される）
export const alt = `${BRAND.name} | 中小企業・個人事業主向けWebサイト制作`;

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background:
            "linear-gradient(135deg, #eff6ff 0%, #ffffff 40%, #fff7ed 100%)",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* ロゴ + ブランド名 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {/* 正式ロゴ画像（横長） */}
          <img
            src={`${BRAND.siteUrl}${BRAND.logo}`}
            alt={BRAND.name}
            width={260}
            height={64}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* キャッチコピー：複数行なので display:flex を明示する */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#1f2937",
            lineHeight: 1.4,
            gap: 10,
            fontSize: 32,
            maxWidth: 880,
          }}
        >
          <span>売上につながるホームページを、オンライン完結で。</span>
          <span>中小企業・個人事業主向け。最短2〜4週間で公開します。</span>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
