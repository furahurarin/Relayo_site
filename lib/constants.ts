// lib/constants.ts
export const BRAND = {
  name: "Relayo",
  email: "contact.relayo@gmail.com",
  siteUrl: "https://relayo.jp", // 本番ドメイン
} as const;

export const CAMPAIGN = {
  // キャンペーン名
  name: "短納期・低コスト Web/アプリ制作キャンペーン",

  // 枠数（例：先着3社 → seats=3）
  seats: 3,

  // 提供スコープ（Legal/LP内の表記と整合）
  scope: "LP 3–5p / 作業40h相当",

  // 無料保守期間（月）
  freeCareMonths: 3,

  // 無料解約・移管注記（Legalで参照）
  freeCancelNote: "無料解約＆移管2h",

  // リボン表示文言（必要なら帯で使用）
  ribbonText: "先着3社｜短納期・低コスト",

  // サイト全体の meta description 用（layout.tsx で参照）
  // ※ 恒常的・中立的な説明に寄せ、キャンペーン固有文言は含めない
  metaDescription:
    "オンライン（メール中心）の非対面ヒアリングで、中小企業・個人事業主向けのWeb/アプリを短納期で構築。公開後は保守・運用まで一貫対応します。",

  // メール件名（mailto: の subject に利用）
  mailSubject: "料金相談／お問い合わせ",

  // ボタン等のラベル（任意で参照）
  labels: {
    email: "メールで相談",
    sheet: "診断シートを受け取る",
  },

  // 診断シート導線（/contact にパラメータ付きで飛ばす）
  sheetHref: "/contact#get-sheet",

  // 補足注記（Legalの注意文に使用）
  note: "状況により予告なく終了する場合があります",
} as const;

export const CONTACT = {
  // クリックで件名＆本文の雛形が入ったメール作成を開く
  mailto: `mailto:${BRAND.email}?subject=${encodeURIComponent(
    CAMPAIGN.mailSubject
  )}&body=${encodeURIComponent(
    [
      "以下をご記入のうえ、そのまま送信してください。",
      "",
      "■会社名／屋号：",
      "■ご担当者名：",
      "■ご連絡先（電話任意）：",
      "■ご相談概要：",
      "■ご希望時期：",
      "■ご予算目安：",
      "",
      "（本メールはサイトの「メールで相談」から送信されています）",
    ].join("\n")
  )}`,
} as const;

export const PLANS = {
  lp: { code: "LP", label: "LP（3–5頁）" },
  corporate: { code: "CORP", label: "コーポレート（8–15頁）" },
  pro: { code: "PRO", label: "プロ（15頁〜）" },
} as const;
