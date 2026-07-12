import { ImageResponse } from "@vercel/og";
import { EC_INVENTORY_POC } from "@/lib/constants";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${EC_INVENTORY_POC.name} | ECの粗利と滞留在庫を次の3アクションへ`;

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 90% 10%, #1d4ed8 0%, #0f172a 42%, #020617 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              fontWeight: 700,
              color: "#bfdbfe",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 42,
                height: 42,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                background: "#2563eb",
                fontSize: 22,
              }}
            >
              R
            </span>
            <span>{EC_INVENTORY_POC.name}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 52,
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: "-1px",
            }}
          >
            <span>ECの粗利と滞留在庫を、</span>
            <span style={{ color: "#93c5fd" }}>次の3アクションに変える。</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 26,
              color: "#cbd5e1",
            }}
          >
            赤字SKU・60/90日滞留・在庫原価を整理
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {["値下げ", "再出品", "仕入停止"].map((item) => (
            <span
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #475569",
                borderRadius: 999,
                padding: "10px 22px",
                fontSize: 22,
                fontWeight: 700,
                background: "rgba(15, 23, 42, 0.72)",
              }}
            >
              {item}
            </span>
          ))}
          <span
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 20,
              color: "#94a3b8",
            }}
          >
            共同検証パートナー 1〜2社募集
          </span>
        </div>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}
