import * as React from "react";
import { BRAND } from "@/lib/constants";

type Props = {
  name: string;
};

export function UserAutoreply({ name }: Props) {
  const displayName = name ? `${name} 様` : "お客様";

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
            お問い合わせありがとうございます
          </h1>
        </div>

        {/* 本文 */}
        <div
          style={{
            padding: 20,
            fontSize: 14,
            lineHeight: "22px",
          }}
        >
          <p style={{ margin: "0 0 12px 0" }}>{displayName}</p>

          <p style={{ margin: "0 0 12px 0" }}>
            このたびは {BRAND.name} にお問い合わせいただき、ありがとうございます。
            お送りいただいた内容を確認のうえ、通常<b>1営業日以内</b>にメールでご連絡いたします。
          </p>

          <p style={{ margin: "0 0 12px 0" }}>
            追加で共有いただきたい点や、ご希望の条件（ご予算・公開時期・参考サイトなど）がありましたら、
            このメールにそのままご返信ください。いただいた情報をもとに、より具体的なご提案を行います。
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
              1）メールにて簡単なヒアリング
              <br />
              2）現状とご希望に合わせたご提案・お見積り
              <br />
              3）要件のすり合わせ・確定
              <br />
              4）デザイン・実装 → ご確認 → 公開・初期運用
            </p>
          </div>

          <p style={{ margin: "16px 0 0 0", fontSize: 13, lineHeight: "20px" }}>
            「こういうことはお願いできるか」「まだ検討段階だけれど相談したい」など、
            具体度が高くなくても構いません。お気軽にご相談ください。
          </p>
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
            本メールは {BRAND.name} のお問い合わせフォームからの自動送信です。
            心当たりがない場合は、このメールは破棄してください。
            <br />
            © {BRAND.name} ({BRAND.siteUrl})
          </p>
        </div>
      </div>
    </div>
  );
}
