// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContactCTA from "@/components/cta/ContactCTA";
import { PRICING } from "@/lib/pricing";
import { BRAND } from "@/lib/constants";
import { Info } from "lucide-react";

const siteDescription =
  "中小企業・スタートアップのための、迷わないホームページ制作の料金とプラン。Starter・Standard・Growth の3つの制作プランと、LPパック・単体メニュー・公開後の運用・保守プラン（月額¥3,980〜）についてご案内します。";

export const metadata: Metadata = {
  // レイアウト側で title テンプレ適用前提なのでプレーン文言のみ
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

export const dynamic = "force-static";

export default function PricingPage() {
  const { setPlans, lpPack, soloGroups, monthlyPlans, meta } = PRICING;

  const liteM = monthlyPlans.find((m) => m.code === "lite");
  const assistM = monthlyPlans.find((m) => m.code === "assist");
  const standardM = monthlyPlans.find((m) => m.code === "standard");
  const growthM = monthlyPlans.find((m) => m.code === "growth");

  // 構造化データ（OfferCatalog）
  const offerCatalogLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Relayo Pricing",
    itemListElement: [
      ...setPlans.map((p) => ({
        "@type": "Offer" as const,
        name: p.name,
        price: p.price.text.replace(/[^\d]/g, ""),
        priceCurrency: "JPY",
      })),
      {
        "@type": "Offer" as const,
        name: lpPack.name,
        price: lpPack.price.text.replace(/[^\d]/g, ""),
        priceCurrency: "JPY",
      },
      ...soloGroups.flatMap((g) =>
        g.items.map((item) => ({
          "@type": "Offer" as const,
          name: item.name,
          price: item.price.text.replace(/[^\d]/g, ""),
          priceCurrency: "JPY",
        })),
      ),
      ...monthlyPlans.map((m) => ({
        "@type": "Offer" as const,
        name: m.name,
        price: m.price.text.replace(/[^\d]/g, ""),
        priceCurrency: "JPY",
      })),
    ],
  };

  return (
    <main
      className="container mx-auto space-y-12 px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="pricing-title"
      role="main"
    >
      {/* ヘッダー */}
      <section className="space-y-4">
        
        <h1
          id="pricing-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          目的や規模に応じた、3つの制作プランと運用・保守
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base">
          Starter・Standard・Growth の3つの制作プランをベースに、
          LPパックやページ追加・機能追加などの単体メニュー、
          公開後の運用・保守プラン（月額 {liteM?.price.text ?? "¥3,980"}〜）をご用意しています。
          実際のお見積りは、ページ数・機能・原稿量などにより前後します。
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-start gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-900">
            <Info className="mt-[1px] h-4 w-4" aria-hidden />
            <p className="leading-relaxed">
              価格は<strong>すべて {meta.tax}</strong>です。
              ドメイン・サーバー・外部SaaSなどの実費は、別途ご負担となる場合があります。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-gray-700">
            <span className="rounded-full bg-gray-100 px-2.5 py-1">
              見積無料
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1">
              契約の縛りなし（月額プラン）
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1">
              全国オンライン対応
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <ContactCTA />
          <Link
            href="/#services"
            className="text-xs font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
          >
            サービス内容を確認する
          </Link>
        </div>
      </section>

      {/* セットプラン */}
      <section aria-label="制作プラン" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">制作プラン</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-700">
            まずは 3つの制作プランのいずれかをベースに、
            必要に応じてページ追加や機能追加のメニューを組み合わせていきます。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {setPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <Card
                key={plan.code}
                className="flex h-full flex-col border border-gray-200 bg-white shadow-sm"
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base font-semibold text-gray-900">
                      {plan.name}
                    </CardTitle>
                    {isPopular && (
                      <Badge className="bg-amber-500 text-[11px] font-semibold text-white hover:bg-amber-600">
                        
                        人気
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {plan.price.text}
                    <span className="ml-1 text-xs font-normal text-gray-500">
                      （{meta.tax}）
                    </span>
                  </p>
                  {plan.catch && (
                    <p className="text-xs leading-relaxed text-gray-700">
                      {plan.catch}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-3 text-xs text-gray-800">
                  <div className="space-y-1">
                    <p>
                      <span className="font-semibold">想定ページ数：</span>
                      {plan.pages}
                    </p>
                    <p>
                      <span className="font-semibold">フォーム：</span>
                      {plan.form}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">主な内容</p>
                    <ul className="list-disc space-y-1 pl-5">
                      {plan.includes.map((item) => (
                        <li key={item} className="leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto space-y-1">
                    <p className="text-[11px] text-gray-600">
                      <span className="font-semibold">対応開始目安：</span>
                      {plan.sla.label}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      実際の金額は、ページ数・原稿量・写真点数・機能追加の有無などにより前後します。
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* LPパック */}
      <section aria-label="LPパック" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">LPパック</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-700">
            期間限定のキャンペーンや、単一のサービス紹介など、
            「まずは1本のランディングページから試したい」方向けのパックです。
          </p>
        </div>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base font-semibold text-gray-900">
                {lpPack.name}
              </CardTitle>
              <Badge className="bg-blue-600 text-[11px] font-semibold text-white hover:bg-blue-700">
                短期公開
              </Badge>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {lpPack.price.text}
              <span className="ml-1 text-xs font-normal text-gray-500">
                （{meta.tax}）
              </span>
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-gray-800">
            <ul className="list-disc space-y-1 pl-5">
              {lpPack.includes.map((item) => (
                <li key={item} className="leading-snug">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-gray-600">
              素材のご準備状況や、既存の仕組みとの連携の有無によって、金額や期間が変動する場合があります。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 単体メニュー */}
      <section aria-label="単体メニュー" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">単体メニュー</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-700">
            既存サイトの部分的な改善や、特定ページの追加だけを依頼したい場合など、
            セットプランとは別に「単体メニュー」としてご利用いただけます。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {soloGroups.map((group) => (
            <Card
              key={group.code}
              className="border border-gray-200 bg-white shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-gray-800">
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start justify-between gap-3 border-b border-dashed border-gray-100 pb-2 last:border-b-0 last:pb-0"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-gray-900">
                          {item.name}
                        </p>
                        {item.note && (
                          <p className="text-[11px] text-gray-500">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <p className="whitespace-nowrap text-right text-xs font-semibold text-gray-900">
                        {item.price.text}
                        <span className="ml-1 text-[10px] font-normal text-gray-500">
                          （{meta.tax}）
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 月額（運用・保守プラン） */}
      <section aria-label="運用・保守プラン" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            運用・保守プラン（月額）
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-700">
            公開後の稼働確認や軽微な修正、システム更新などをまとめた、
            継続運用のための保守プランもご用意しています。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {[liteM, assistM, standardM, growthM]
            .filter(Boolean)
            .map((m) => (
              <Card
                key={m!.code}
                className="flex h-full flex-col border border-gray-200 bg-white shadow-sm"
              >
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {m!.name}
                  </CardTitle>
                  <p className="text-lg font-bold text-gray-900">
                    {m!.price.text}
                    <span className="ml-1 text-xs font-normal text-gray-500">
                      （{meta.tax}）
                    </span>
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-2 text-xs text-gray-800">
                  <ul className="list-disc space-y-1 pl-5">
                    {m!.features.map((f) => (
                      <li key={f} className="leading-snug">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto text-[11px] text-gray-600">
                    対応開始目安：{m!.initial}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>

        <p className="text-[11px] leading-relaxed text-gray-500">
          月額プランは原則としていつでも解約可能です（当月末または翌月末解約）。
          詳細な条件や解約方法は、お申し込み時のご案内にて改めてご説明します。
        </p>
      </section>

      {/* 備考・CTA */}
      <section className="space-y-4" aria-label="備考とお問い合わせ">
        <div className="space-y-1 text-[11px] leading-relaxed text-gray-500">
          <p>【共通の注意事項】</p>
          <ul className="list-disc space-y-1 pl-5">
            {meta.notes.included.map((n) => (
              <li key={`inc-${n}`}>料金に含まれるもの：{n}</li>
            ))}
          </ul>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {meta.notes.excluded.map((n) => (
              <li key={`exc-${n}`}>料金に含まれないもの：{n}</li>
            ))}
          </ul>
          <p className="mt-1">{meta.notes.payment}</p>
          <p>{meta.notes.disclaimers[0]}</p>
          {meta.notes.disclaimers.slice(1).map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="max-w-xl space-y-1 text-sm leading-relaxed text-gray-800">
            <p>
              「自社の状況だと、どのプランが良いか分からない」という段階でも構いません。
            </p>
            <p>
              現在のホームページや事業の状況、ご予算感を共有いただきながら、
              無理のない構成と料金プランをご提案します。
            </p>
          </div>
          <div className="flex-shrink-0">
            <ContactCTA />
          </div>
        </div>
      </section>

      {/* 構造化データ（OfferCatalog + 事業情報の簡易定義） */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              offerCatalogLd,
              {
                "@type": "ProfessionalService",
                name: BRAND.name,
                url: BRAND.siteUrl,
                areaServed: "JP",
                serviceType: [
                  "Website Development",
                  "Website Maintenance",
                  "Landing Page Production",
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
