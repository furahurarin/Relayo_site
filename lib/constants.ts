// lib/constants.ts

export const BRAND = {
  name: "Relayo",
  email: "contact.relayo@gmail.com",
  siteUrl: "https://relayo.jp", // 本番ドメイン

  // サイト内で共通利用するロゴ／アイコン
  logo: "/images/relayo-logo.png", // ヘッダー・フッターなどで使う横長ロゴ
  icon: "/images/relayo-icon.png", // サイト内で使うシンボル（小さな装飾など）
} as const;

export const EC_INVENTORY_POC = {
  name: "Relayo EC在庫・粗利診断",
  description:
    "販売・在庫データから赤字SKUや60日・90日以上の滞留在庫、在庫原価を整理し、次に試すアクション候補をまとめる共同検証サービスです。",
  plannedPrice: "5,500円",
  partnerSlots: "1〜2社",
  contactHref: "/contact?type=ec_inventory_partner",
  sampleReportHref: "/samples/relayo-ec-inventory-validation-kit.xlsx",
  sampleReportImage: "/images/ec-inventory-sample-report.png",
} as const;

export const CAMPAIGN = {
  // キャンペーン名
  name: "短納期・低コスト Webサイト制作キャンペーン",

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

  // サイト全体の meta description 用（layout.tsx 相当と整合）
  // ※ 恒常的・中立的な説明に寄せ、キャンペーン固有文言は含めない
  metaDescription: EC_INVENTORY_POC.description,

  // メール件名（mailto: の subject に利用）
  mailSubject: "Relayoへのお問い合わせ",

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
  mailto:
    "mailto:" +
    BRAND.email +
    "?subject=" +
    encodeURIComponent(CAMPAIGN.mailSubject),
} as const;

export const PLANS = {
  lp: { code: "LP", label: "LP（3〜5ページ想定）" },
  corporate: { code: "CORP", label: "コーポレートサイト（8〜15ページ）" },
  pro: { code: "PRO", label: "プロプラン（15ページ〜）" },
} as const;
