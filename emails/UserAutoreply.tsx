// emails/UserAutoreply.tsx
import * as React from "react";

type Props = {
  name: string;
};

export function UserAutoreply({ name }: Props) {
  return (
    <div
      style={{
        margin: 0,
        padding: "24px",
        backgroundColor: "#f6f9fc",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif',
        color: "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e5e7eb",
            background: "linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)",
          }}
        >
          <h1
            style={{
              fontSize: 18,
              lineHeight: "24px",
              margin: 0,
            }}
          >
            お申込みありがとうございます
          </h1>
        </div>

        {/* 本文 */}
        <div style={{ padding: 20, fontSize: 14, lineHeight: "22px" }}>
          <p style={{ margin: "0 0 12px 0" }}>
            {name ? `${name} 様` : "お客様"}、
          </p>
          <p style={{ margin: "0 0 12px 0" }}>
            このたびは Relayo にお申込みいただき、ありがとうございます。
            内容を確認のうえ、<b>1営業日以内</b>に担当者よりご連絡いたします。
          </p>
          <p style={{ margin: "0 0 12px 0" }}>
            追加で共有いただける情報やご要望がございましたら、
            このメールにそのままご返信ください。
          </p>

          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              fontSize: 13,
              lineHeight: "20px",
            }}
          >
            <p style={{ margin: 0 }}>
              ▼ 今後の流れ（目安）
              <br />
              1) ヒアリング（オンライン15分）
              <br />
              2) ご提案・お見積り
              <br />
              3) 要件確定 → デザイン/実装
              <br />
              4) ご確認後、公開・初期運用
            </p>
          </div>
        </div>

        {/* フッター */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#fafafa",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#64748b",
              lineHeight: "18px",
            }}
          >
            本メールは自動送信です。心当たりがない場合は破棄してください。
            <br />
            © Relayo
          </p>
        </div>
      </div>
    </div>
  );
}
