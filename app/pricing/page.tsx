// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ShieldCheck, CheckCircle2 } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";

const siteDescription =
  "中小企業・個人事業主向けのWeb/アプリ制作。Next.js + Tailwindで高速・保守しやすいサイトを短納期で提供。予約/会員/決済、LINE連携、運用保守まで一気通貫。";

export const metadata: Metadata = {
  title: "料金",
  description: siteDescription,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "料金",
    description: siteDescription,
    url: "/pricing",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "料金",
    description: siteDescription,
    images: ["/og.png"],
  },
};

// ---------- data ----------
type Price = number | string; // "〜" など可

const singleMenus: { category: string; items: { name: string; price: Price }[] }[] = [
  {
    category: "基本セットアップ",
    items: [
      { name: "ドメイン / DNS / SSL / ホスティング初期設定（Vercel）", price: 9800 },
      { name: "計測導入（Umami または GA4 + タグ設定）", price: 9800 },
      { name: "SEO 初期（title/OGP/サイトマップ）", price: 9800 },
      { name: "パフォーマンス微調整（画像圧縮・キャッシュ設定）", price: 9800 },
      { name: "ファビコン & OGP 画像生成", price: 4980 },
    ],
  },
  {
    category: "ページ制作・コンテンツ",
    items: [
      { name: "LP（テンプレ・1ページ）", price: 59800 },
      { name: "コーポレート基本（テンプレ・5ページ）", price: 129800 },
      { name: "ページ追加（テンプレ下層・1ページ）", price: 9800 },
      { name: "ページ追加（オリジナル要素多め・1ページ）", price: 19800 },
      { name: "ブログ/お知らせ（CMS導入＋基本テンプレ）", price: 29800 },
      { name: "FAQ ブロック作成（10項目まで）", price: 9800 },
      { name: "事例/メニュー一覧テンプレ導入", price: 19800 },
      { name: "画像最適化（20点まで）", price: 4980 },
      { name: "ロゴ微調整/配置（既存データ前提）", price: 9800 },
    ],
  },
  {
    category: "機能アドオン",
    items: [
      { name: "予約（既存SaaS設定代行・カレンダー/通知連携）", price: "29,800〜" },
      { name: "予約（Firebase カスタム UI/ロジック最小構成）", price: "59,800〜" },
      { name: "オンライン決済（Stripe）", price: "59,800〜" },
      { name: "会員/ログイン（限定ページ）", price: "89,800〜" },
      { name: "多言語追加（日本語＋英語/1言語あたり）", price: 59800 },
    ],
  },
  {
    category: "単発の更新・改善パック",
    items: [
      { name: "テキスト差し替えパック（最大5箇所）", price: 4980 },
      { name: "画像差し替えパック（最大10点）", price: 4980 },
      { name: "FAQ 更新パック（10件まで）", price: 4980 },
      { name: "セクション追加（テンプレ 1ブロック）", price: 9800 },
      { name: "下層ページ追加（テンプレ 1ページ）", price: 9800 },
      { name: "LP 追加（テンプレ 1本）", price: 49800 },
      { name: "軽微不具合対応（表示崩れ/リンク切れ等・1件）", price: 3980 },
    ],
  },
];

const packages = [
  {
    id: "starter",
    name: "Starter-LP",
    label: "まず出す",
    price: 79800,
    bullets: [
      "LP（テンプレ1p）／問い合わせフォーム1種",
      "計測導入／SEO初期／ドメイン・DNS・SSL・ホスティング初期設定",
      "パフォーマンス微調整／ファビコン&OGP生成／画像最適化（20点）",
    ],
    strike: "通常合計 ¥118,760 → パック ¥79,800（▲¥38,960）",
    sla: "SLA：翌営業日初動（P1＝翌営業日内／P2＝3営業日内）",
    lead: "納期目安：素材受領から 5–10 営業日",
    extra: "", // キャンペーン系の露出は /campaign に隔離
    featured: false,
  },
  {
    id: "standard",
    name: "Standard",
    label: "いちばん人気",
    price: 198000,
    bullets: [
      "コーポレート（テンプレ 5p）＋下層 3p 追加（計 8p 目安）",
      "CMS 導入（更新レクチャー付）／計測導入／SEO 初期",
      "事例一覧テンプレ／FAQ ブロック／ドメイン・DNS・SSL",
      "パフォーマンス調整／画像最適化／ファビコン&OGP",
    ],
    strike: "通常合計 ¥267,760 → パック ¥198,000（▲¥69,760）",
    sla: "SLA：翌営業日初動（P1＝翌営業日内／P2＝3営業日内／P3＝週内）",
    lead: "納期目安：要件確定から 3–4 週間",
    extra: "",
    featured: true,
  },
  {
    id: "growth",
    name: "Growth",
    label: "攻めの運用",
    price: "348,000〜",
    bullets: [
      "コーポレート（テンプレ 10p）＋LP 追加（テンプレ 1本）",
      "ABテスト初期設定／計測強化（タグ管理・CV設計）",
      "ブログ/お知らせ（CMS）／SEO 初期／ドメイン・DNS・SSL",
      "パフォーマンス調整／画像最適化／ファビコン&OGP",
    ],
    strike: "通常合計 ¥386,560 → パック ¥348,000（▲¥38,560）",
    sla: "SLA：P1＝4時間初動／P2＝翌営業日／P3＝週内",
    lead: "納期目安：要件確定から 4–6 週間",
    extra: "",
    featured: false,
  },
] as const;

const monthly = [
  {
    id: "self",
    name: "セルフ運用",
    price: 0,
    bullets: ["月例の作業は無し。不具合/更新は単発パックで都度依頼。"],
    sla: "初動：-",
  },
  {
    id: "light",
    name: "ライト保守",
    price: 3980,
    bullets: [
      "稼働/フォームの簡易監視・バックアップ",
      "月1回：テキスト差し替え（1箇所）または画像差し替え（3点）",
    ],
    sla: "初動：翌営業日",
  },
  {
    id: "std",
    name: "スタンダード運用",
    price: 14800,
    bullets: [
      "監視・バックアップ＋毎月“ミニ改善”1回",
      "例：テンプレセクション1つ新設／FAQ 10件更新／料金表更新／OG・カード調整",
      "四半期：速度/SEOケア、月1回の簡易レポート",
    ],
    sla: "初動：翌営業日",
  },
  {
    id: "growth",
    name: "グロース運用",
    price: "39,800〜",
    bullets: [
      "監視・バックアップ＋毎月“改善”2回＋CTA/A-B テスト1本",
      "四半期：LP 1本追加（テンプレ）または全体最適化1回",
    ],
    sla: "初動：P1＝4時間内",
  },
] as const;

// ---------- utils ----------
const jpy = (v: Price) =>
  typeof v === "number"
    ? new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(v)
    : v;

// ---------- tiny components ----------
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-700/40 bg-emerald-900/20 px-2 py-0.5 text-xs text-emerald-200">
    <CheckCircle2 className="h-3.5 w-3.5" /> {children}
  </span>
);

type Package = (typeof packages)[number];

const PackageCard = ({
  name,
  label,
  price,
  bullets,
  strike,
  sla,
  lead,
  featured,
  extra,
}: Package) => (
  <Card className={featured ? "border-emerald-600 bg-emerald-900/10" : "border-gray-700/40"}>
    <CardHeader className="space-y-1">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl">{name}</CardTitle>
        {label && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-600/40 bg-amber-900/20 px-2 py-0.5 text-xs text-amber-200">
            {label}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{typeof price === "number" ? jpy(price) : price}</p>
      <p className="text-xs text-gray-400">{strike}</p>
    </CardHeader>
    <CardContent className="space-y-3">
      <ul className="list-disc space-y-1 pl-5 text-gray-300">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className="space-y-1 text-sm text-gray-300">
        <p>{sla}</p>
        <p>{lead}</p>
      </div>
      {extra && <p className="rounded-md border border-gray-700/40 bg-gray-800/40 p-2 text-xs">{extra}</p>}
      <div className="pt-2">
        {/* 主CTAはサイト統一の文言に任せる */}
        <ContactCTA />
      </div>
    </CardContent>
  </Card>
);

// ---------- page ----------
export const dynamic = "force-static";

export default function PricingPage() {
  return (
    <main className="container mx-auto space-y-12 px-4 py-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">料金</h1>
        <p className="text-gray-300">
          料金は、<strong>単体メニュー</strong> → <strong>パッケージ（割引）</strong> → <strong>月額</strong> の順に掲載しています。
          価格はすべて<strong>税込</strong>で、ドメイン/サーバ等の実費は別途となります。
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Tag>税込表示</Tag>
          <Tag>契約縛りなし</Tag>
          <Tag>無料見積</Tag>
        </div>
        <div className="mt-2 flex gap-3">
          <ContactCTA />
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">サービス内容を確認</Link>
          </Button>
        </div>
      </section>

      {/* 単体メニュー */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">単体メニュー（サービスごとの定額）</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {singleMenus.map((block) => (
            <Card key={block.category} className="border-gray-700/40">
              <CardHeader>
                <CardTitle className="text-lg">{block.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-gray-700/40">
                  {block.items.map((it) => (
                    <li key={it.name} className="flex items-center justify-between py-2 text-gray-200">
                      <span className="pr-4">{it.name}</span>
                      <span className="shrink-0 font-semibold">{jpy(it.price)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-gray-500">※ 「〜」表記は要件により変動。個別見積は無料です。</p>
      </section>

      {/* パッケージ（パッケージ割） */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">パッケージ割</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.id} {...p} />
          ))}
        </div>
        <p className="text-sm text-gray-400">
          予約/決済/会員/多言語などは機能アドオンから追加可能です（パック価格に追い足しOK）。
        </p>
      </section>

      {/* 月額（運用・保守） */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">月額（運用・保守）</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {monthly.map((m) => (
            <Card key={m.id} className="border-gray-700/40">
              <CardHeader>
                <CardTitle className="text-lg">{m.name}</CardTitle>
                <p className="text-xl font-bold">{typeof m.price === "number" ? jpy(m.price) : m.price}/月</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="list-disc space-y-1 pl-5 text-gray-300">
                  {m.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400">{m.sla}</p>
                <ContactCTA />
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          すべて契約縛りなし／翌月からアップ/ダウン可。「これだけやってほしい」に合わせて単発パックだけで運用するのもOKです。
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">よくある質問</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-gray-700/40">
            <CardHeader>
              <CardTitle className="text-base">解約後のサイトは？</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              納品物はお客さま名義の資産。運用SaaSの契約は別ですが、サイト自体は使い続けられます。
            </CardContent>
          </Card>
          <Card className="border-gray-700/40">
            <CardHeader>
              <CardTitle className="text-base">見積のブレについて</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              本ページの価格は標準ケースの定額です。範囲が増える場合のみ、事前に追加メニューでご相談のうえ調整します。
            </CardContent>
          </Card>
          <Card className="border-gray-700/40">
            <CardHeader>
              <CardTitle className="text-base">納期の目安</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Starter 5–10 営業日／Standard 3–4 週間／Growth 4–6 週間が目安です。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 注意書き（信頼注記も兼ねる） */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">注意書き（重要）</h2>
        <div className="rounded-2xl border border-amber-700/40 bg-amber-900/20 p-4 text-amber-100">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 h-5 w-5" />
            表示価格は税込です。ドメイン/サーバ等の実費は別。要件・素材の準備状況・連携サービス・セキュリティ要件により増減します。
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/20 p-4 text-emerald-100">
          <p className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-5 w-5" />
            契約前に範囲と前提、除外項目、変更管理、SLAを明文化します。まずは「お問い合わせ」から。
          </p>
        </div>
        <div className="flex gap-3">
          <ContactCTA />
          <Button asChild variant="secondary">
            <Link href="/services">サービス内容を確認</Link>
          </Button>
        </div>
      </section>

      {/* 構造化データ（OfferCatalog 簡易） */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Relayo Pricing",
            itemListElement: [
              { "@type": "Offer", name: "Starter-LP", price: "79800", priceCurrency: "JPY" },
              { "@type": "Offer", name: "Standard", price: "198000", priceCurrency: "JPY" },
              { "@type": "Offer", name: "Growth（最小価格）", price: "348000", priceCurrency: "JPY" },
              { "@type": "Offer", name: "ライト保守（月額）", price: "3980", priceCurrency: "JPY" },
              { "@type": "Offer", name: "スタンダード運用（月額）", price: "14800", priceCurrency: "JPY" },
            ],
          }),
        }}
      />
    </main>
  );
}
