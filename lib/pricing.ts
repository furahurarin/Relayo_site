// lib/pricing.ts
// SSOT: 料金・対応水準・注記の“単一の正”
// 表示や並べ替えは各ページ側で行い、このファイルでは値と構造のみを定義します。

/** 共通 */
export type Sla = {
  /** 例: "翌営業日から対応開始" / "重大な不具合は4時間以内に対応開始" */
  label: string;
  /** 優先度P1（重大：問い合わせ不可・決済不可など） */
  p1?: string;
  /** 優先度P2（中度：一部機能不調・軽微障害） */
  p2?: string;
  /** 優先度P3（軽度：表示調整・文言修正など） */
  p3?: string;
};

export type LeadTime = {
  /** 例: "素材受領後 2〜3週間" */
  note: string;
};

export type Price = {
  /** 例: "¥138,000" / "¥348,000〜" / "¥3,980／月" */
  text: string;
  /** 既定: true（本SSOTは税別） */
  taxExcluded?: boolean;
};

export const META = {
  version: "2025-09-02",
  currency: "JPY",
  tax: "税別",
  businessHours: "平日 10:00–18:00（日本時間）",
  minOrder: "¥9,800",
  definitions: {
    /** UIツールチップで出す“対応開始”の定義（一次連絡＋暫定措置） */
    firstResponse:
      "対応開始＝一次連絡と暫定的な回避策の提示を指します。営業時間外のP1は可能な範囲で対応します。",
    /** SLAラベルの補助説明（UIのtitle属性などで使用想定） */
    pLevels:
      "P1=重大（決済・フォーム不可等）／P2=中度（一部機能不調）／P3=軽度（表示崩れ・文言修正等）",
  },
  notes: {
    included: [
      "テンプレートを基にしたデザイン調整",
      "Google検索対策（SEO）・表示スピード高速化",
      "お問い合わせフォーム（1種）",
      "アクセス解析ツールの初期設定",
      "画像の軽量化・最適化（最大20点）",
    ],
    excluded: [
      "写真撮影",
      "大量の原稿作成（ライティング）",
      "高度な機能開発（複雑な予約・権限管理・外部システム連携など）",
      "大規模なデータ移行",
    ],
    payment:
      "お支払い：着手20%・中間30%・検収50%（請求書発行から30日以内）。振込手数料はお客様のご負担となります。",
    upgrade:
      "検収前または公開後30日以内の上位プラン変更は、差額と追加仕様分のみご請求します。",
    disclaimers: [
      "表示価格はすべて税別です。",
      "有料ツールや外部決済手数料などの実費は別途となる場合があります。",
    ],
  },
} as const;

/** セットプラン（3つ） */
export type SetPlan = {
  code: "essential" | "standard" | "growth";
  name: string;
  catch?: string;
  price: Price;
  pages: string; // 例: "3〜5ページ"
  form: string; // 例: "お問い合わせフォーム：1種"
  includes: readonly string[];
  sla: Sla;
  leadTime: LeadTime;
  popular?: boolean;
};

export const SET_PLANS: readonly SetPlan[] = [
  {
    code: "essential",
    name: "Starter プラン",
    catch:
      "まずは最小限のページで、サービス概要とお問い合わせ窓口を整えたい方向けのプランです。",
    price: { text: "¥138,000〜", taxExcluded: true },
    pages: "1〜3ページ程度（LP 含む）",
    form: "お問い合わせフォーム：1種",
    includes: [
      "トップまたはLP 1ページ＋簡易下層ページ（会社概要等）",
      "スマホ・タブレット対応（レスポンシブ）",
      "Google検索対策（SEO）の基本設定（タイトル・OGP画像等）",
      "お問い合わせフォーム 1種（メール通知付き）",
      "アクセス解析ツールの設定（例：Google アナリティクス等）",
    ],
    sla: {
      label: "翌営業日から対応開始",
      p1: "翌営業日内",
      p2: "3営業日内",
      p3: "週内",
    },
    leadTime: { note: "要件と素材の確定後 2〜3週間前後" },
  },
  {
    code: "standard",
    name: "Standard プラン",
    catch:
      "会社情報やサービス紹介、よくある質問まで、一通りを整えたい中小企業・事務所向けのプランです。",
    price: { text: "¥198,000〜", taxExcluded: true },
    pages: "〜8ページ程度",
    form: "お問い合わせフォーム：1種",
    includes: [
      "Starter プランの内容",
      "トップページ＋下層ページ（会社概要・サービス紹介・お問い合わせ等）",
      "よくある質問（FAQ）ブロックの設置（〜10項目）",
      "ブログ／お知らせ機能（CMS）の導入（基本テンプレート）",
      "更新しやすいナビゲーション・構成の設計",
    ],
    sla: {
      label: "翌営業日から対応開始",
      p1: "翌営業日内",
      p2: "3営業日内",
      p3: "週内",
    },
    leadTime: { note: "要件と素材の確定後 3〜4週間前後" },
    popular: true,
  },
  {
    code: "growth",
    name: "Growth プラン",
    catch:
      "事例紹介やブログ、採用情報など、コンテンツを増やしながらサイトを育てていきたい方向けのプランです。",
    price: { text: "¥348,000〜", taxExcluded: true },
    pages: "〜12ページ程度＋LP 1本まで",
    form: "お問い合わせフォーム：1〜2種",
    includes: [
      "Standard プランの内容",
      "事例紹介／実績・メニュー一覧などのコンテンツページ追加",
      "採用情報ページやエントリーフォームの追加",
      "LP（ランディングページ）1本分の追加制作（テンプレートベース）",
      "将来的なページ追加や機能拡張（会員・予約・決済など）を見据えた構成",
    ],
    sla: {
      label: "重大な不具合は4時間以内に対応開始",
      p1: "4時間以内",
      p2: "翌営業日",
      p3: "週内",
    },
    leadTime: { note: "要件と素材の確定後 4〜6週間前後" },
  },
];

/** LP特化パック（別枠） */
export type LpPack = {
  code: "starter_lp";
  name: string;
  price: Price;
  includes: readonly string[];
  sla: Sla;
  leadTime: LeadTime;
};

export const LP_PACK: LpPack = {
  code: "starter_lp",
  name: "LPパック（短期公開）",
  price: { text: "¥79,800", taxExcluded: true },
  includes: [
    "LP（テンプレート1ページ）＋ お問い合わせフォーム1種",
    "初期セットアップ一式（ドメイン／DNS／SSL／解析／SEO初期設定／高速化／OGP画像）",
    "画像の軽量化・最適化（最大20点）",
  ],
  sla: { label: "翌営業日から対応開始", p1: "翌営業日内", p2: "3営業日内" },
  leadTime: { note: "素材受領後 5〜10営業日" },
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

export const SOLO_GROUPS: readonly SoloGroup[] = [
  {
    code: "setup",
    title: "基本セットアップ",
    items: [
      {
        name:
          "初期セットアップ一式（ドメイン／DNS／SSL／解析／SEO初期設定／高速化／OGP画像）",
        price: { text: "¥29,800", taxExcluded: true },
        note: "各セットプランに含まれます",
      },
      {
        name: "Google検索対策（SEO）の初期設定（単体でご依頼の場合）",
        price: { text: "¥6,800", taxExcluded: true },
      },
    ],
  },
  {
    code: "pages",
    title: "ページ制作・コンテンツ",
    items: [
      { name: "LP（テンプレート・1ページ）", price: { text: "¥59,800", taxExcluded: true } },
      {
        name: "コーポレート基本（テンプレート・5ページ）",
        price: { text: "¥139,800", taxExcluded: true },
      },
      {
        name: "ページ追加（テンプレート下層・1ページ）",
        price: { text: "¥9,800", taxExcluded: true },
      },
      {
        name: "ページ追加（オリジナル要素が多い場合・1ページ）",
        price: { text: "¥19,800", taxExcluded: true },
      },
      {
        name: "ブログ／お知らせ（CMS導入＋基本テンプレート）",
        price: { text: "¥39,800", taxExcluded: true },
      },
      {
        name: "FAQブロック作成（10項目まで）",
        price: { text: "¥9,800", taxExcluded: true },
      },
      {
        name: "事例／メニュー一覧のテンプレート導入",
        price: { text: "¥19,800", taxExcluded: true },
      },
      {
        name: "画像の軽量化・最適化（最大20点）",
        price: { text: "¥4,980", taxExcluded: true },
      },
      {
        name: "ロゴの微調整・配置（既存データ前提）",
        price: { text: "¥9,800", taxExcluded: true },
      },
    ],
  },
  {
    code: "addons",
    title: "機能追加",
    items: [
      {
        name: "予約（外部予約ツールの導入代行・カレンダー／通知連携）",
        price: { text: "¥29,800〜", taxExcluded: true },
      },
      {
        name: "予約（Firebaseカスタム・最小構成）",
        price: { text: "¥98,000〜", taxExcluded: true },
      },
      {
        name: "オンライン決済（Stripe）",
        price: { text: "¥59,800〜", taxExcluded: true },
      },
      {
        name: "会員／ログイン（限定ページ）",
        price: { text: "¥120,000〜", taxExcluded: true },
      },
      {
        name: "多言語追加（日本語＋英語／1言語あたり）",
        price: { text: "¥69,800", taxExcluded: true },
        note: "翻訳テキストは原則ご支給ください",
      },
    ],
  },
  {
    code: "updates",
    title: "単発の更新・改善パック",
    items: [
      {
        name: "テキスト差し替え（最大5箇所）",
        price: { text: "¥4,980", taxExcluded: true },
      },
      {
        name: "画像差し替え（最大10点）",
        price: { text: "¥4,980", taxExcluded: true },
      },
      {
        name: "FAQ更新（10件まで）",
        price: { text: "¥4,980", taxExcluded: true },
      },
      {
        name: "セクション追加（テンプレート1ブロック）",
        price: { text: "¥9,800", taxExcluded: true },
      },
      {
        name: "下層ページ追加（テンプレート1ページ）",
        price: { text: "¥9,800", taxExcluded: true },
      },
      {
        name: "LP追加（テンプレート1本）",
        price: { text: "¥49,800", taxExcluded: true },
      },
      {
        name: "軽微な不具合の対応（表示崩れ・リンク切れ等・1件）",
        price: { text: "¥3,980", taxExcluded: true },
      },
    ],
  },
];

/** 月額（運用・保守） */
export type MonthlyPlan = {
  code: "self" | "lite" | "assist" | "standard" | "growth";
  name: string;
  price: Price;
  features: readonly string[];
  /** 対応開始（SLA観点の一次対応表現） */
  initial: string;
};

export const MONTHLY_PLANS: readonly MonthlyPlan[] = [
  {
    code: "self",
    name: "Self（セルフ運用）",
    price: { text: "¥0／月", taxExcluded: true },
    features: [
      "定期作業は行いません。更新や不具合対応は単発パックでその都度ご依頼ください。",
    ],
    initial: "—",
  },
  {
    code: "lite",
    name: "Lite",
    price: { text: "¥3,980／月", taxExcluded: true },
    features: [
      "稼働確認（死活監視）・フォーム動作チェック",
      "月1回：文言1箇所 または 画像3点までの軽微な更新",
      "セキュリティ更新・データバックアップ",
    ],
    initial: "翌営業日",
  },
  {
    code: "assist",
    name: "Assist",
    price: { text: "¥7,980／月", taxExcluded: true },
    features: [
      "小さな修正：月2回まで",
      "Lite相当の監視・セキュリティ更新・バックアップ",
    ],
    initial: "翌営業日",
  },
  {
    code: "standard",
    name: "Standard",
    price: { text: "¥14,800／月", taxExcluded: true },
    features: [
      "監視・セキュリティ更新・バックアップ",
      "毎月の改善：1回（例：セクション1ブロック追加）",
      "月1回：簡易レポート",
      "四半期ごと：表示速度・基本SEOの見直し",
    ],
    initial: "翌営業日",
  },
  {
    code: "growth",
    name: "Growth",
    price: { text: "¥39,800〜／月", taxExcluded: true },
    features: [
      "監視・セキュリティ更新・バックアップ",
      "毎月の改善：2回＋改善提案（ボタン配置等）月1本",
      "四半期ごと：LP 1本追加（テンプレート）または全体の見直し 1回",
    ],
    initial: "重大な不具合は4時間以内",
  },
];

/** エクスポートまとめ */
export const PRICING = {
  meta: META,
  setPlans: SET_PLANS,
  lpPack: LP_PACK,
  soloGroups: SOLO_GROUPS,
  monthlyPlans: MONTHLY_PLANS,
} as const;

export type PricingSchema = typeof PRICING;