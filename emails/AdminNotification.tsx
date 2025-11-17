// emails/AdminNotification.tsx
import * as React from "react";

type Props = {
  name: string;
  email: string;
  message: string;
  submittedAt?: string; // ISO文字列（任意）
};

export function AdminNotification({ name, email, message, submittedAt }: Props) {
  const submitted = submittedAt ? new Date(submittedAt) : null;

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
            background: "linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)",
          }}
        >
          <h1
            style={{
              fontSize: 18,
              lineHeight: "24px",
              margin: 0,
            }}
          >
            新しいお問い合わせを受信しました
          </h1>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: 12,
              color: "#475569",
            }}
          >
            {submitted
              ? `受信日時：${submitted.toLocaleString("ja-JP")}`
              : "受信日時：—"}
          </p>
        </div>

        {/* 本文 */}
        <div style={{ padding: 20 }}>
          <table
            cellPadding={0}
            cellSpacing={0}
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: 120,
                    padding: "10px 0",
                    color: "#64748b",
                    verticalAlign: "top",
                  }}
                >
                  お名前
                </td>
                <td style={{ padding: "10px 0" }}>
                  {name || "（未入力）"}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: 120,
                    padding: "10px 0",
                    color: "#64748b",
                    verticalAlign: "top",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  メール
                </td>
                <td
                  style={{
                    padding: "10px 0",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      style={{ color: "#1d4ed8", textDecoration: "underline" }}
                    >
                      {email}
                    </a>
                  ) : (
                    "（未入力）"
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                marginBottom: 6,
              }}
            >
              ご要件・メッセージ
            </div>
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily:
                  'ui-monospace,SFMono-Regular,Menlo,Monaco,"Liberation Mono","Courier New",monospace',
                fontSize: 13,
                lineHeight: "20px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: 12,
              }}
            >
              {message || "（本文なし）"}
            </pre>
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
            このメールは Relayo のお問い合わせ／お申込みフォームから送信された内容の自動通知です。
            必要に応じて、このまま返信してください（返信先は送信者のメールアドレスです）。
          </p>
        </div>
      </div>
    </div>
  );
}
