// components\sections\PortfolioSection.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Clock } from "lucide-react";

export default function PortfolioSection() {
  const enabled = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

  if (!enabled) {
    // 実績公開までは控えめなプレースホルダーのみ表示
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">制作実績</h2>
            <p className="text-lg text-gray-600">
              現在、公開可能な事例を準備中です。掲載でき次第、こちらに追加します。
              まずは無料ヒアリングにて、近い事例や実装イメージをご紹介します。
            </p>
            <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="mailto:contact.relayo@gmail.com?subject=%E7%84%A1%E6%96%99%E3%83%92%E3%82%A2%E3%83%AA%E3%83%B3%E3%82%B0%E5%8F%97%E4%BB%98">
                ヒアリングを予約
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // 将来、実績を公開する際のテンプレ（ダミー文言は地域色を排除）
  const portfolios = [
    {
      title: "美容サロン向け Webサイト",
      description: "予約導線とメニュー回遊を最適化し、来店予約の増加に貢献。",
      category: "美容・サロン",
      features: ["オンライン予約", "スタッフ紹介", "メニュー表示", "SNS連携"],
      date: "2025年",
      result: "予約率の改善・更新工数の削減",
    },
    {
      title: "治療院向け 予約システム",
      description: "スマホ最適の予約フローで、業務効率と顧客満足を両立。",
      category: "医療・治療院",
      features: ["Web予約", "患者管理", "注意書き/確認", "通知連携"],
      date: "2025年",
      result: "電話比率の低下・ノーショー抑制",
    },
    {
      title: "ローカルECサイト",
      description: "生産者と消費者をつなぐ販売プラットフォームを短期構築。",
      category: "EC・小売",
      features: ["商品管理", "決済", "配送連携", "出店者ページ"],
      date: "2025年",
      result: "オンライン売上の底上げ・在庫可視化",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">制作実績</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            業種ごとのユースケースに最適化したソリューションを提供しています。
            機密保持の都合で公開できない事例は、ヒアリング時に個別にご紹介します。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p, i) => (
            <Card key={i} className="group border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {p.category}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {p.date}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold transition-colors group-hover:text-blue-600">
                  {p.title}
                </CardTitle>
                <CardDescription className="leading-relaxed text-gray-600">{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">実装機能</p>
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
                <div className="flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
                  <Clock className="mr-1 h-4 w-4" />
                  概要はヒアリングで個別にご案内します
                  <ExternalLink className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
