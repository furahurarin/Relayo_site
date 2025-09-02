// components/sections/ServicesSection.tsx
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Lightbulb, Code, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactCTA from "@/components/cta/ContactCTA";

export default function ServicesSection() {
  const services = [
    {
      icon: Lightbulb,
      title: "設計",
      subtitle: "要件定義・情報設計（オンライン：メール中心）",
      description:
        "メール往復（1〜2回）で目的とKPIを短時間で確定。小さく始めて拡張できる設計で、短期公開と将来の拡張性を両立します。",
      features: [
        "オンラインヒアリング（メール中心）",
        "KPI設定／優先順位づけ",
        "サイトマップ・ワイヤーフレーム",
        "コピー叩き台（各p〜1,000字）",
        "計測設計（Umami／GA4）",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Code,
      title: "制作",
      subtitle: "実装・連携（短納期）",
      description:
        "Next.js＋Tailwindを中心に実装。レスポンシブ・速度最適化・基本SEO・計測を標準搭載。予約/決済などは必要に応じて拡張可能です。",
      features: [
        "Next.js + Tailwind 実装",
        "レスポンシブ／表示速度の最適化",
        "基本SEO（OGP／sitemap／robots）",
        "問い合わせフォーム",
        "予約・会員・決済（別見積で拡張可）",
      ],
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Settings,
      title: "運用",
      subtitle: "保守・改善（SLA付き）",
      description:
        "公開後はデータに基づく継続改善。ライト保守は月2h/2件の軽微改修と依存更新をカバー。障害は優先度に応じて初動し、必要に応じてA/Bテストを実施します。",
      features: [
        "ライト保守：月2h/2件（繰越なし）",
        "依存アップデート（月1回目安）",
        "監視・障害初動（P1=即時）",
        "月次レポート／改善提案",
        "A/Bテスト（プランに応じて）",
      ],
      color: "from-orange-500 to-red-500",
    },
  ] as const;

  return (
    <section
      className="bg-white py-20"
      aria-labelledby="services-heading"
      id="services"
      role="region"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 id="services-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            サービス内容
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            設計 → 制作 → 運用をワンチームで。オンライン（メール中心）のヒアリングで
            <span className="font-medium">最短公開</span>、公開後は
            <span className="font-medium">保守で継続改善</span>します。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="relative">
                <Card className="group h-full border-0 shadow-md transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="space-y-4 text-center">
                    <div
                      className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${service.color}`}
                    >
                      <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-500">
                        {service.subtitle}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-center leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      <p className="font-medium text-gray-700">主要サービス</p>
                      <ul className="space-y-2">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center text-sm text-gray-600">
                            <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-gray-400" aria-hidden="true" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 3枚を矢印で接続（大画面のみ） */}
                {index < services.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-8 w-8 text-gray-300" aria-hidden="true" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* クイックウィンとCTA */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-4xl border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">公開直後のクイックウィン</h3>
              <p className="mb-4 text-gray-600">初月は「成果に直結する導線」を最優先で最適化します。</p>
              <ul className="mx-auto mb-6 grid max-w-3xl grid-cols-1 gap-2 text-left text-sm text-gray-700 sm:grid-cols-3">
                <li>・第一CTAの統一（迷わせない）</li>
                <li>・電話/予約ボタンの固定</li>
                <li>・料金/営業時間の即決表</li>
              </ul>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="group bg-blue-600 text-white hover:bg-blue-700">
                  <Link
                    href="/#pricing"
                    aria-label="料金プランへ"
                    data-umami-event="cta_pricing"
                    data-umami-event-section="services-quickwins"
                  >
                    最適プランを見る
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Button>
                {/* 入口は /contact に一本化 */}
                <ContactCTA />
              </div>
              <p className="mt-4 text-xs text-gray-500">
                キャンペーンの条件・対象・注意事項は{" "}
                <Link href="/campaign" className="underline underline-offset-4">
                  キャンペーン案内
                </Link>
                をご確認ください。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
