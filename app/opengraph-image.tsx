// app/opengraph-image.tsx
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          fontSize: 42,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* ロゴ的なタイトル */}
        <div
          style={{
            color: "#111827",
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          Relayo
        </div>

        {/* テキスト部分：複数行なので display:flex を明示する */}
        <div
          style={{
            display: "flex", // ★ 複数子要素を持つので必須
            flexDirection: "column",
            color: "#1f2937",
            lineHeight: 1.4,
            gap: 8,
          }}
        >
          <span>メール中心の非対面ヒアリングで最短公開。</span>
          <span>先着3社は制作費¥0 × 保守3ヶ月¥0（完全無料解約OK）</span>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
