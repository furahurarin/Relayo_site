import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BadgeJapaneseYen, Info, ShieldCheck } from "lucide-react";
import { CAMPAIGN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "料金 | Relayo",
  description:
    "ライト/スタンダード/プロの制作プランと、運用保守（Lite/Std/Pro）。範囲・目安・注意点を明示し、見積もりの透明性を担保します。",
};

const Plan = ({
  name,
  price,
  points,
  note,
  featured = false,
}: {
  name: string;
  price: string;
  points: string[];
  note?: string;
  featured?: boolean;
}) => (
  <div
    className={[
      "rounded-2xl border p-6",
      featured ? "border-emerald-600 bg-emerald-900/10" : "border-gray-700/40",
    ].join(" ")}
  >
    <h2 className="text-xl font-semibold">{name}</h2>
    <p className="mt-1 text-2xl font-bold">{price}</p>
    <ul className="mt-4 list-disc pl-5 text-gray-300 space-y-1">
      {points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
    {note && <p className="mt-3 text-xs text-gray-500">{note}</p>}
  </div>
);

export default function PricingPage() {
  return (
    <main className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">料金</h1>
        <p className="text-gray-300">
          まずは最小構成で着地。効果が出た箇所に投資します。下記は<span className="font-semibold">目安</span>です。
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link href="/contact#get-sheet" data-umami-event="pricing_cta_sheet">
              診断シートで見積もり相談
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/services" data-umami-event="pricing_cta_services">
              サービス内容を確認
            </Link>
          </Button>
        </div>
      </section>

      {/* プラン */}
      <section className="grid gap-6 md:grid-cols-3">
        <Plan
          name="ライト（LP 3–5頁）"
          price="¥198,000（税別）"
          points={[
            "トップ/サービス/問い合わせ等の最小構成",
            "基本SEO・OGP・計測（Umami）",
            "モバイル最適化／高速化（Core Web Vitals配慮）",
          ]}
          note="素材支給前提。スピード優先の最短公開向け。"
        />
        <Plan
          featured
          name="スタンダード（8–12頁）"
          price="¥680,000（税別）"
          points={[
            "お知らせ/ブログ等の簡易CMS",
            "採用ページ・FAQ・法務ページ整備",
            "計測設計/イベント計測、改善提案",
          ]}
          note="多ページ構成や運用前提の企業サイトに最適。"
        />
        <Plan
          name="プロ（15–25頁〜）"
          price="¥980,000〜（税別）"
          points={[
            "要件に応じた個別設計",
            "予約/会員/決済等の機能追加",
            "情報設計/検索/多言語など拡張",
          ]}
          note="仕様確定後に詳細見積。段階公開にも対応。"
        />
      </section>

      {/* オプション・保守 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">オプション・運用保守</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-700/40 p-6">
            <h3 className="font-semibold">主なオプション（目安）</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-300 space-y-1">
              <li>予約/会員/決済：+ ¥200,000 – 450,000</li>
              <li>LINE連携・自動返信：+ ¥50,000 – 150,000</li>
              <li>速度/SEO改善（追加）：要相談</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              ※ 仕様・連携サービス・データ構造により変動します。
            </p>
          </div>
          <div className="rounded-2xl border border-gray-700/40 p-6">
            <h3 className="font-semibold">保守プラン（月額・税別）</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-300 space-y-1">
              <li>Lite：¥30,000（軽微改修 / 依存更新 / 月次レポ）</li>
              <li>Std：¥100,000（+ 改善提案 / 簡易AB / 小機能）</li>
              <li>Pro：¥300,000（+ 優先対応 / SLA強化 / 機能開発）</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              ※ 工数やSLAにより個別見積。スポット対応のみも可。
            </p>
          </div>
        </div>
      </section>

      {/* 注記 */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">注意書き（重要）</h2>
        <div className="rounded-2xl border border-amber-700/40 bg-amber-900/20 p-4 text-amber-100">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 h-5 w-5" />
            表示価格は目安です。要件・素材の準備状況・連携サービス・セキュリティ要件により増減します。
            契約前に範囲と前提、除外項目、変更管理を明文化します。
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/20 p-4 text-emerald-100">
          <p className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-5 w-5" />
            {CAMPAIGN.name}：先着{CAMPAIGN.seats}社、制作費¥0 + 保守{CAMPAIGN.freeCareMonths}ヶ月¥0（Lite相当）
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="flex gap-3">
        <Button asChild size="lg">
          <Link href="/contact#get-sheet" data-umami-event="pricing_bottom_cta_sheet">
            診断シートで見積もり相談
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/contact" data-umami-event="pricing_bottom_cta_contact">
            メールで相談
          </Link>
        </Button>
      </section>

      {/* 構造化データ（簡易） */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Relayo Pricing",
            itemListElement: [
              { "@type": "Offer", name: "Lite (LP)", price: "198000", priceCurrency: "JPY" },
              { "@type": "Offer", name: "Standard", price: "680000", priceCurrency: "JPY" },
              { "@type": "Offer", name: "Pro", price: "980000", priceCurrency: "JPY" },
            ],
          }),
        }}
      />
    </main>
  );
}
