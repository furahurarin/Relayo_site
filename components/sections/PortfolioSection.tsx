// components/sections/PortfolioSection.tsx
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
import { ExternalLink, Calendar, Clock } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";

// 想定業種ベースのデモ用データ（実案件・デモいずれにも対応できる表現）
const portfolios = [
  {
    title: "美容サロン向け ホームページ",
    description: "予約導線とメニュー回遊を整理し、来店予約の取りこぼしを減らす構成。",
    category: "美容・サロン",
    features: ["オンライン予約導線", "メニュー一覧", "スタッフ紹介", "SNS連携"],
    date: "2025年（想定）",
    result: "予約率の改善・更新工数の削減を目指したレイアウト案。",
  },
  {
    title: "治療院向け 予約ページ",
    description: "スマホからの予約を前提に、注意事項やメニュー選択を整理したページ構成。",
    category: "医療・治療院",
    features: ["Web予約フォーム", "メニュー／コース表示", "注意事項の整理"],
    date: "2025年（想定）",
    result: "電話対応の削減とノーショー抑制を狙った導線設計。",
  },
  {
    title: "小規模事業者向け コーポレートサイト",
    description: "事業内容とお問い合わせ窓口をコンパクトにまとめた、シンプルな構成例。",
    category: "士業・小規模事業",
    features: ["会社概要", "サービス紹介", "お問い合わせフォーム"],
    date: "2025年（想定）",
    result: "信頼感と分かりやすさを重視した情報構成。",
  },
];

export default function PortfolioSection() {
  const enabled = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

  // 実績公開フラグが false の場合：準備中メッセージ＋CTA
  if (!enabled) {
    return (
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              制作例
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              実際の画面イメージを確認いただけるように、
              いくつかの業種を想定したサイト例（デモを含む）を準備しています。
              公開でき次第、こちらに掲載していきます。
            </p>
            <p className="text-xs leading-relaxed text-gray-500">
              具体的なレイアウトや構成のイメージを知りたい方には、
              ヒアリングの際に近い事例やデモ画面をご紹介します。
            </p>
            <div className="mt-4 flex justify-center">
              <ContactCTA />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 公開中の場合：カードグリッドで制作例を表示
  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            制作例
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base">
            実際の画面イメージを確認いただけるように、
            いくつかの業種を想定したサイト例（デモを含む）を公開しています。
            具体的なレイアウトや構成のイメージを掴みたい方は、
            制作例のページもあわせてご覧ください。
          </p>
        </div>

        {/* カード一覧 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p, i) => (
            <Card
              key={i}
              className="group flex h-full flex-col border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge
                    variant="secondary"
                    className="text-[11px] font-medium text-gray-800"
                  >
                    {p.category}
                  </Badge>
                  <div className="flex items-center text-[11px] text-gray-500">
                    <Calendar className="mr-1 h-3.5 w-3.5" aria-hidden />
                    {p.date}
                  </div>
                </div>
                <CardTitle className="text-sm font-semibold text-gray-900 sm:text-base">
                  {p.title}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed text-gray-700">
                  {p.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-auto space-y-4 p-5 pt-0 text-xs text-gray-800">
                <div>
                  <p className="mb-2 font-medium text-gray-700">想定する主な構成</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.features.map((f, fi) => (
                      <Badge
                        key={fi}
                        variant="outline"
                        className="text-[10px] font-normal"
                      >
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-[11px] font-medium text-green-700">
                    📈 {p.result}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-gray-600">
                  <div className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    <span>制作期間の目安：2〜4週間前後</span>
                  </div>
                  {/* リンク先を /works に変更 */}
                  <Link
                    href="/works"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900"
                    aria-label="制作例の詳細を見る"
                  >
                    制作例を見る
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}