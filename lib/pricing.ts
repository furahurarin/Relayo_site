// lib/pricing.ts
// SSOT: 料金・SLA・備考の“真実の源泉”
// 表示や並べ替えは各ページ側で行い、このファイルでは値と構造だけを定義します。

/** 共通 */
export type Sla = {
  label: string; // 例: "翌営業日初動" / "P1=4時間初動"
  p1?: string;
  p2?: string;
  p3?: string;
};

export type LeadTime = {
  note: string; // 例: "素材受領から 2–3 週間"
};

export type Price = {
  text: string; // 例: "¥138,000" / "¥348,000〜" / "¥3,980／月"
  taxExcluded?: boolean; // 既定: true（本資料は税別）
};

export const META = {
  currency: "JPY",
  tax: "税別",
  businessHours: "平日 10:00–18:00（日本時間）",
  minOrder: "¥9,800",
  notes: {
    included: [
      "テンプレベースのデザイン調整",
      "基本SEO・速度最適化",
      "問い合わせフォーム1種",
      "初期計測",
      "画像最適化（20点）",
    ],
    excluded: [
      "写真撮影",
      "大幅な文章ライティング",
      "高度UI開発（複雑予約・会員権限・外部API多数連携）",
      "大規模移行作業",
    ],
    payment: "着手20%／中間30%／検収50%／支払サイト30日",
    upgrade:
      "検収前または公開後30日以内の上位プラン変更は、差額＋追加仕様分のみ請求",
  },
} as const;

/** セットプラン（3つ） */
export type SetPlan = {
  code: "essential" | "standard" | "growth";
  name: string;
  catch?: string;
  price: Price;
  pages: string; // 例: "3–5ページ"
  form: string; // 例: "問い合わせフォーム：1種"
  includes: string[];
  sla: Sla;
  leadTime: LeadTime;
  popular?: boolean;
};

export const SET_PLANS: SetPlan[] = [
  {
    code: "essential",
    name: "Essential（ミニコーポレート）",
    catch: "最短で“名刺代わり以上”を整えるスターター",
    price: { text: "¥138,000", taxExcluded: true },
    pages: "3–5ページ",
    form: "問い合わせフォーム：1種",
    includes: [
      "初期セットアップ一式（ドメイン／DNS／SSL／計測／SEO初期／速度最適化／OGP画像）",
      "ブログ／お知らせ（CMS）",
      "FAQブロック（10項目まで）",
      "事例／メニュー一覧テンプレ導入",
      "画像最適化（20点まで）",
    ],
    sla: {
      label: "翌営業日初動",
      p1: "翌営業日内",
      p2: "3営業日内",
    },
    leadTime: { note: "素材受領から 2–3 週間" },
  },
  {
    code: "standard",
    name: "Standard（いちばん人気）",
    catch: "8ページ前後で“会社の顔”と更新しやすさを両立",
    price: { text: "¥198,000", taxExcluded: true },
    pages: "〜8ページ",
    form: "問い合わせフォーム：1種",
    includes: [
      "Essentialの全て",
      "構成拡張（下層3ページ相当の追加）",
      "更新レクチャー",
      "計測強化の初期整理（タグ設計の基本確認）",
    ],
    sla: {
      label: "翌営業日初動",
      p1: "翌営業日内",
      p2: "3営業日内",
      p3: "週内",
    },
    leadTime: { note: "要件確定から 3–4 週間" },
    popular: true,
  },
  {
    code: "growth",
    name: "Growth（運用強化・攻め）",
    catch: "追加LPとABテスト初期設計まで含め、集客を“回す”",
    price: { text: "¥348,000〜", taxExcluded: true },
    pages: "〜10ページ ＋ LP 1本",
    form: "問い合わせフォーム：1種",
    includes: [
      "Standardの全て",
      "ABテスト初期設定",
      "タグ設計の強化",
      "全体最適化（コンバージョン前提の構成見直し）",
    ],
    sla: {
      label: "P1=4時間以内",
      p1: "4時間以内",
      p2: "翌営業日",
      p3: "週内",
    },
    leadTime: { note: "要件確定から 4–6 週間" },
  },
] as const;

/** LP特化パック（別枠） */
export type LpPack = {
  code: "starter_lp";
  name: string;
  price: Price;
  includes: string[];
  sla: Sla;
  leadTime: LeadTime;
};

export const LP_PACK: LpPack = {
  code: "starter_lp",
  name: "Starter-LP（まず出す）",
  price: { text: "¥79,800", taxExcluded: true },
  includes: [
    "LP（テンプレ1ページ）＋ 問い合わせフォーム1種",
    "初期セットアップ一式（ドメイン／DNS／SSL／計測／SEO初期／速度最適化／OGP画像）",
    "画像最適化（20点まで）",
  ],
  sla: {
    label: "翌営業日初動",
    p1: "翌営業日内",
    p2: "3営業日内",
  },
  leadTime: { note: "素材受領から 5–10 営業日" },
};

/** 単体メニュー（4群） */
export type SoloItem = {
  name: string;
  price: Price;
  note?: string;
};

export type SoloGroup = {
  code: "setup" | "pages" | "addons" | "updates";
  title: string;
  items: SoloItem[];
};

export const SOLO_GROUPS: SoloGroup[] = [
  {
    code: "setup",
    title: "4-1 基本セットアップ",
    items: [
      {
        name:
          "初期セットアップ一式（ドメイン／DNS／SSL／計測／SEO初期／速度最適化／OGP画像）",
        price: { text: "¥29,800", taxExcluded: true },
        note: "各セットプランには込み",
      },
      {
        name: "SEO初期（単売時）",
        price: { text: "¥6,800", taxExcluded: true },
      },
    ],
  },
  {
    code: "pages",
    title: "4-2 ページ制作・コンテンツ",
    items: [
      { name: "LP（テンプレ・1ページ）", price: { text: "¥59,800", taxExcluded: true } },
      {
        name: "コーポレート基本（テンプレ・5ページ）",
        price: { text: "¥139,800", taxExcluded: true },
      },
      {
        name: "ページ追加（テンプレ下層・1ページ）",
        price: { text: "¥9,800", taxExcluded: true },
      },
      {
        name: "ページ追加（オリジナル要素多め・1ページ）",
        price: { text: "¥19,800", taxExcluded: true },
      },
      {
        name: "ブログ／お知らせ（CMS導入＋基本テンプレ）",
        price: { text: "¥39,800", taxExcluded: true },
      },
      { name: "FAQブロック作成（10項目まで）", price: { text: "¥9,800", taxExcluded: true } },
      { name: "事例／メニュー一覧テンプレ導入", price: { text: "¥19,800", taxExcluded: true } },
      { name: "画像最適化（20点まで）", price: { text: "¥4,980", taxExcluded: true } },
      { name: "ロゴ微調整／配置（既存データ前提）", price: { text: "¥9,800", taxExcluded: true } },
    ],
  },
  {
    code: "addons",
    title: "4-3 機能アドオン",
    items: [
      {
        name: "予約（既存SaaS設定代行・カレンダー／通知連携）",
        price: { text: "¥29,800〜", taxExcluded: true },
      },
      {
        name: "予約（Firebaseカスタム・最小構成）",
        price: { text: "¥98,000〜", taxExcluded: true },
      },
      { name: "オンライン決済（Stripe）", price: { text: "¥59,800〜", taxExcluded: true } },
      { name: "会員／ログイン（限定ページ）", price: { text: "¥120,000〜", taxExcluded: true } },
      {
        name: "多言語追加（日本語＋英語／1言語あたり）",
        price: { text: "¥69,800", taxExcluded: true },
        note: "翻訳テキストは原則ご支給",
      },
    ],
  },
  {
    code: "updates",
    title: "4-4 単発の更新・改善パック",
    items: [
      { name: "テキスト差し替えパック（最大5箇所）", price: { text: "¥4,980", taxExcluded: true } },
      { name: "画像差し替えパック（最大10点）", price: { text: "¥4,980", taxExcluded: true } },
      { name: "FAQ更新パック（10件まで）", price: { text: "¥4,980", taxExcluded: true } },
      { name: "セクション追加（テンプレ1ブロック）", price: { text: "¥9,800", taxExcluded: true } },
      { name: "下層ページ追加（テンプレ1ページ）", price: { text: "¥9,800", taxExcluded: true } },
      { name: "LP追加（テンプレ1本）", price: { text: "¥49,800", taxExcluded: true } },
      {
        name: "軽微不具合対応（表示崩れ／リンク切れ等・1件）",
        price: { text: "¥3,980", taxExcluded: true },
      },
    ],
  },
] as const;

/** 月額（運用・保守） */
export type MonthlyPlan = {
  code: "self" | "lite" | "assist" | "standard" | "growth";
  name: string;
  price: Price;
  features: string[];
  initial: string; // 初動
};

export const MONTHLY_PLANS: MonthlyPlan[] = [
  {
    code: "self",
    name: "Self（セルフ運用）",
    price: { text: "¥0／月", taxExcluded: true },
    features: ["月例の作業は無し。不具合・更新は単発パックで都度依頼"],
    initial: "—",
  },
  {
    code: "lite",
    name: "Lite",
    price: { text: "¥3,980／月", taxExcluded: true },
    features: [
      "稼働・フォームの簡易監視、バックアップ",
      "月1回：テキスト1箇所 または 画像3点",
    ],
    initial: "翌営業日",
  },
  {
    code: "assist",
    name: "Assist",
    price: { text: "¥7,980／月", taxExcluded: true },
    features: ["小修正2回／月", "Lite相当の監視・バックアップ"],
    initial: "翌営業日",
  },
  {
    code: "standard",
    name: "Standard",
    price: { text: "¥14,800／月", taxExcluded: true },
    features: [
      "監視・バックアップ",
      "毎月ミニ改善1回（例：セクション追加1ブロック）",
      "月1回：簡易レポート",
      "四半期：速度／SEOケア",
    ],
    initial: "翌営業日",
  },
  {
    code: "growth",
    name: "Growth",
    price: { text: "¥39,800〜／月", taxExcluded: true },
    features: [
      "監視・バックアップ",
      "毎月改善2回＋CTA／ABテスト1本",
      "四半期：LP1本追加（テンプレ）または全体最適化1回",
    ],
    initial: "P1=4時間以内",
  },
] as const;

/** エクスポートまとめ */
export const PRICING = {
  meta: META,
  setPlans: SET_PLANS,
  lpPack: LP_PACK,
  soloGroups: SOLO_GROUPS,
  monthlyPlans: MONTHLY_PLANS,
} as const;

export type PricingSchema = typeof PRICING;
