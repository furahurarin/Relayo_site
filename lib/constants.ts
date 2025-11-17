// lib/constants.ts
export const BRAND = {
  name: "Relayo",
  email: "contact.relayo@gmail.com",
  siteUrl: "https://relayo.jp", // 本番ドメイン
} as const;

export const CAMPAIGN = {
  // キャンペーン名
  name: "短納期・低コスト Webサイト／アプリ制作キャンペーン",

  // 枠数（例：先着3社 → seats=3）
  seats: 3,

  // 提供スコープ（Legal/LP内の表記と整合）
  scope: "LP 3〜5ページ／作業40時間目安",

  // 無料保守期間（月）
  freeCareMonths: 3,

  // 無料解約・移管注記（Legalで参照）
  freeCancelNote: "無料解約＆移管2時間分つき",

  // リボン表示文言（必要なら帯で使用）
  ribbonText: "先着3社限定｜短納期・低コスト",

  // サイト全体の meta description 用（layout.tsx で参照）
  // ※ 恒常的・中立的な説明に寄せ、キャンペーン固有文言は含めない
  metaDescription:
    "オンライン（メール中心）のヒアリングで、中小企業・個人事業主向けのWebサイトやシンプルなWebアプリを短納期で制作。公開後の保守・運用まで一貫してサポートします。",

  // メール件名（mailto: の subject に利用）
  mailSubject: "料金・制作のご相談",

  // ボタン等のラベル（任意で参照）
  labels: {
    email: "メールで相談する",
    sheet: "診断シートを受け取る",
  },

  // 診断シート導線（/contact にパラメータ付きで飛ばす）
  sheetHref: "/contact#get-sheet",

  // 補足注記（Legalの注意文に使用）
  note: "キャンペーンは状況により予告なく終了する場合があります。",
} as const;

export const CONTACT = {
  // クリックで件名＆本文の雛形が入ったメール作成を開く
  mailto: `mailto:${BRAND.email}?subject=${encodeURIComponent(
    CAMPAIGN.mailSubject
  )}&body=${encodeURIComponent(
    [
      "以下、わかる範囲でご記入のうえ、そのまま送信してください。",
      "未定の項目は「未定」とご記入いただいて構いません。",
      "",
      "■会社名／屋号：",
      "■ご担当者名：",
      "■ご連絡先（電話番号・任意）：",
      "■ご相談概要：",
      "■ご希望の公開時期：",
      "■ご予算の目安：",
      "",
      "（本メールはサイトの「メールで相談する」ボタンから送信されています）",
    ].join("\n")
  )}`,
} as const;

export const PLANS = {
  lp: { code: "LP", label: "LP（3〜5ページ想定）" },
  corporate: { code: "CORP", label: "コーポレートサイト（8〜15ページ）" },
  pro: { code: "PRO", label: "プロプラン（15ページ〜）" },
} as const;
