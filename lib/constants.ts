// lib/constants.ts
export const BRAND = {
  name: "Relayo",
  email: "contact.relayo@gmail.com",
  siteUrl: "https://relayo.jp",
} as const;

export const CAMPAIGN = {
  // キャンペーン名
  name: "短納期・低コストWeb/アプリ制作キャンペーン",

  // 枠数（例：先着3社 → seats=3）
  seats: 3,

  // 提供スコープ
  scope: "LP 3–5p / 作業40h相当",

  // 無料保守期間（月）
  freeCareMonths: 3,

  // 無料解約・移管注記
  freeCancelNote: "無料解約＆移管2h",

  // リボン表示文言（帯にそのまま出す）
  ribbonText: "先着3社｜短納期・低コスト",

  // サイト全体の meta description 用
  metaDescription:
    "メール中心の非対面ヒアリング。先着3社は制作費¥0＋保守3ヶ月¥0（完全無料解約OK）。中小企業・個人事業主向けWeb/アプリ制作。",

  // メール件名（mailto: の subject に利用）
  mailSubject: "料金相談（キャンペーン希望）",

  // ボタン等のラベル
  labels: {
    email: "メールで相談",
    sheet: "診断シートを受け取る",
  },

  // 診断シート導線（/contact にパラメータ付きで飛ばす）
  sheetHref: "/contact?campaign=launch#get-sheet",

  // 補足注記
  note: "状況により予告なく終了する場合があります",
} as const;

export const CONTACT = {
  mailto: `mailto:${BRAND.email}?subject=${encodeURIComponent(
    CAMPAIGN.mailSubject
  )}`,
} as const;

export const PLANS = {
  lp: { code: "LP", label: "LP（3–5頁）" },
  corporate: { code: "CORP", label: "コーポレート（8–15頁）" },
  pro: { code: "PRO", label: "プロ（15頁〜）" },
} as const;
