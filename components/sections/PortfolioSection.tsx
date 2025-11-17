"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";
import { umami } from "@/lib/track";

const enabled = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

export default function PortfolioSection() {
  if (!enabled) {
    // 実績公開までは控えめなプレースホルダーのみ表示（入口は /contact に統一）
    return (
      <section
        id="portfolio"
        className="bg-gray-50 py-20"
        aria-labelledby="portfolio-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2
              id="portfolio-heading"
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              制作実績
            </h2>
            <p className="text-lg text-gray-600">
              現在、公開可能な事例を準備中です。掲載でき次第、こちらに追加します。
              まずは無料ヒアリングにて、近い事例や実装イメージをご紹介します。
            </p>
            <div className="flex justify-center">
              <ContactCTA />
            </div>
            <p className="text-xs text-gray-500">
              約2分で完了。営業電話は行いません。ご案内はメールでお送りします。
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 将来、実績を公開する際のテンプレ（ダミー文言は地域色を排除）
  const portfolios = [
    {
      title: "美容サロン向け Webサイト",
      description:
        "予約導線とメニューの見せ方を最適化し、来店予約の増加に貢献した事例です。",
      category: "美容・サロン",
      features: ["オンライン予約", "スタッフ紹介", "メニュー表示", "SNS連携"],
      date: "2025年",
      result: "予約率の改善と更新作業の削減",
    },
    {
      title: "治療院向け 予約システム",
      description:
        "スマホ最適の予約フローで、業務効率と患者さんの利便性を両立したケースです。",
      category: "医療・治療院",
      features: ["Web予約", "患者管理", "注意書き/確認", "通知連携"],
      date: "2025年",
      result: "電話対応の負担軽減とノーショー抑制",
    },
    {
      title: "ECサイト向け 販売ページ",
      description:
        "生産者と利用者をつなぐ販売ページを短期間で構築し、オンライン売上の底上げにつなげました。",
      category: "EC・小売",
      features: ["商品管理", "決済", "配送連携", "出店者ページ"],
      date: "2025年",
      result: "オンライン売上の向上と在庫状況の可視化",
    },
  ] as const;

  const tracking = umami("cta_portfolio_contact", {
    section: "portfolio",
    via: "portfolio_section",
  });

  return (
    <section
      id="portfolio"
      className="bg-gray-50 py-20"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2
            id="portfolio-heading"
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            制作実績
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            業種や目的に合わせて、予約・問い合わせ・販売など
            「実際の行動」につながる導線を設計します。
            機密保持の都合で公開できない事例は、ヒアリング時に個別にご紹介します。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p, i) => (
            <Card
              key={i}
              className="group border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium tracking-tight"
                  >
                    {p.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" aria-hidden="true" />
                    {p.date}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold transition-colors group-hover:text-blue-600">
                  {p.title}
                </CardTitle>
                <CardDescription className="leading-relaxed text-gray-600">
                  {p.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    実装機能（例）
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.features.map((f, fi) => (
                      <Badge key={fi} variant="outline" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <p className="text-sm font-medium text-green-600">📈 {p.result}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-1 h-4 w-4" aria-hidden="true" />
                  詳細な数値や画面構成は、ヒアリング時に個別にお伝えします。
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* セクション下部の統一CTA（入口は /contact に一本化） */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-gray-700">
            「自社だとどうなるか知りたい」「似た業種の事例を見たい」など、
            まずはお気軽にお問い合わせください。
          </p>
          <div className="flex justify-center">
            <div {...tracking}>
              <ContactCTA />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            約2分で完了。営業電話は行いません。{BRAND.email} からメールでご連絡します。
          </p>
        </div>
      </div>
    </section>
  );
}
