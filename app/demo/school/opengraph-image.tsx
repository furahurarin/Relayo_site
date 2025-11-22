// app/demo/school/opengraph-image.tsx
import { ImageResponse } from "next/og";

// 画像のサイズ設定
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// 画像生成関数
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f9ff", // bg-sky-50
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #e0f2fe 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e0f2fe 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0284c7", // text-sky-600
            color: "white",
            borderRadius: "20px",
            width: "120px",
            height: "120px",
            marginBottom: "40px",
            boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.4)",
          }}
        >
          {/* 簡易的な本のアイコン */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#0f172a", // text-slate-900
            letterSpacing: "-0.05em",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          未来進学塾
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#475569", // text-slate-600
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0284c7",
              padding: "8px 20px",
              borderRadius: "9999px",
              marginRight: "16px",
              fontSize: 24,
            }}
          >
            DEMO
          </span>
          地域密着・完全個別指導
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}