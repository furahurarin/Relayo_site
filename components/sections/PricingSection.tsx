"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

type BuildPlan = {
  name: string;
  subtitle: string;
  initialPrice: number | string; // Proは "980,000〜" を許容
  monthlyText?: string;
  popular?: boolean;
  description: string;
  features: string[];
  notes?: string[];
};

export default function PricingSection() {
  const buildPlans: BuildPlan[] = [
    {
      name: "LPプラン",
      subtitle: "3–5ページ／最短で公開",
      initialPrice: 198000,
      monthlyText: "保守Lite: ¥30,000〜",
      popular: false,
      description:
        "問い合わせを最短で増やす小規模構成。フォーム・基本SEO・計測・速度最適化を含みます。",
      features: [
        "3–5ページ",
        "問い合わせフォーム",
        "基本SEO・OGP",
        "計測（Umami or GA4）",
        "表示速度の最適化",
      ],
      notes: ["追加機能（予約/会員/決済など）は別見積"],
    },
    {
      name: "コーポレート",
      subtitle: "8–12ページ／採用・ブログ雛形込み",
      initialPrice: 680000,
      monthlyText: "保守Lite/Std: ¥30,000〜",
      popular: true,
      description:
        "会社情報・採用・ブログ雛形まで含む標準構成。拡張や将来の追加にも対応しやすい設計。",
      features: [
        "8–12ページ",
        "会社情報・採用・ブログ雛形",
        "OGP・サイトマップ/robots",
        "計測・イベント可視化",
        "高速ホスティング前提の最適化",
      ],
      notes: [],
    },
    {
      name: "プロ",
      subtitle: "15–25ページ〜／多言語・拡張対応",
      initialPrice: "980,000〜",
      monthlyText: "要件に応じて保守を選択",
      popular: false,
      description:
        "大規模構成や多言語、外部連携を前提としたプラン。要件に応じて最適な設計をご提案します。",
      features: [
        "15–25ページ〜",
        "多言語／拡張機能に対応",
        "外部SaaS連携（予約・決済 等）",
        "パフォーマンス/アクセシビリティ配慮",
        "運用を見据えた情報設計",
      ],
      notes: ["要件ヒアリング後に詳細見積"],
    },
  ];

  const maintenance = [
    { name: "Lite", monthly: 30000, desc: "軽微改修 月2h/2件、繰越なし、依存アップデート" },
    { name: "Std", monthly: 100000, desc: "8hまで、月次レポ＋A/Bテスト1本" },
    { name: "Pro", monthly: 300000, desc: "30hまで、四半期ロードマップ" },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-10 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">料金プラン</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            <strong>メール中心の非対面ヒアリング</strong>でスピーディに進行。
            初期費用を抑え、公開後は保守で継続改善します。
          </p>
        </div>

        {/* キャンペーン告知 */}
        <Card className="mb-12 border-2 border-emerald-200 bg-emerald-50">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-emerald-800">創業応援ローンチ（先着3社）</h3>
              <p className="mt-1 text-emerald-900">
                <strong>制作費 ¥0（諸経費のみ）＋ 保守3ヶ月 ¥0（Lite相当）</strong>／
                <strong>完全無料解約OK</strong>。移管・撤去も無償（上限2h）。
              </p>
              <p className="mt-1 text-sm text-emerald-900">
                対象範囲：LP 3–5p・40h上限／追加機能は別見積。条件：実績掲載・レビュー協力、素材提出=KO+7日。
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <a
                  href="mailto:contact.relayo@gmail.com?subject=%E6%96%99%E9%87%91%E7%9B%B8%E8%AB%87%EF%BC%88%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%9A%E3%83%BC%E3%83%B3%E5%B8%8C%E6%9C%9B%EF%BC%89"
                  aria-label="メールで相談（メール作成画面を開く）"
                  data-umami-event="email_click"
                  data-umami-event-section="pricing-campaign"
                >
                  メールで相談
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="/contact?campaign=launch#get-sheet"
                  aria-label="診断シートを受け取る"
                  data-umami-event="cta_sheet"
                  data-umami-event-section="pricing-campaign"
                >
                  診断シートを受け取る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 制作パッケージ */}
        <div className="grid gap-8 lg:grid-cols-3">
          {buildPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative h-full bg-white transition-all duration-300 ${
                plan.popular
                  ? "scale-105 border-2 border-blue-500 shadow-xl"
                  : "border border-gray-200 shadow-md hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="flex items-center bg-blue-600 px-4 py-1 text-white">
                    <Star className="mr-1 h-4 w-4" />
                    人気プラン
                  </Badge>
                </div>
              )}

              <CardHeader className="space-y-4 pb-8 text-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-lg text-gray-500">
                    {plan.subtitle}
                  </CardDescription>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-sm text-gray-500">初期費用</span>
                    <span className="text-4xl font-bold text-gray-900">
                      {typeof plan.initialPrice === "number"
                        ? `¥${plan.initialPrice.toLocaleString()}`
                        : `¥${plan.initialPrice}`}
                    </span>
                  </div>
                  {plan.monthlyText && (
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-sm text-gray-500">月額</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {plan.monthlyText}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-gray-600">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <p className="mb-4 font-medium text-gray-700">含まれる内容</p>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start">
                        <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {!!plan.notes?.length && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">補足</p>
                    <ul className="space-y-2">
                      {plan.notes!.map((l) => (
                        <li key={l} className="text-xs text-gray-500">
                          ※ {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                    size="lg"
                    asChild
                  >
                    <a
                      href="mailto:contact.relayo@gmail.com?subject=%E6%96%99%E9%87%91%E7%9B%B8%E8%AB%87%EF%BC%88%E3%83%97%E3%83%A9%E3%83%B3%E6%A4%9C%E8%A8%8E%EF%BC%89"
                      aria-label={`メールで相談（${plan.name}）`}
                      data-umami-event="email_click"
                      data-umami-event-section="pricing-card"
                      data-umami-event-plan={plan.name}
                    >
                      メールで相談
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link
                      href="/contact?from=pricing#contact"
                      aria-label={`診断シートを受け取る（${plan.name}）`}
                      data-umami-event="cta_sheet"
                      data-umami-event-section="pricing-card"
                      data-umami-event-plan={plan.name}
                    >
                      診断シートを受け取る
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 保守プラン（別枠） */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">保守プラン（SLA付き）</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {maintenance.map((m) => (
              <Card key={m.name} className="border border-gray-200">
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl">{m.name}</CardTitle>
                  <CardDescription className="text-base">
                    月額{" "}
                    <span className="text-2xl font-bold">¥{m.monthly.toLocaleString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-gray-600">{m.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* カスタム案内 */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-4xl border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardContent className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">カスタマイズも承ります</h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                上記に当てはまらない要件も柔軟に対応します。予約・決済・外部連携、アクセシビリティや法令配慮もご相談ください。
              </p>
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-200 hover:bg-orange-50"
                  asChild
                >
                  <a
                    href="mailto:contact.relayo@gmail.com?subject=%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E8%A6%81%E4%BB%B6%E3%81%AE%E7%9B%B8%E8%AB%87"
                    aria-label="カスタム要件の相談メールを開く"
                    data-umami-event="email_click"
                    data-umami-event-section="pricing-custom"
                  >
                    カスタムプランの相談をする
                  </a>
                </Button>
                <Button size="lg" asChild>
                  <Link
                    href="/contact?from=pricing"
                    aria-label="診断シートを受け取る"
                    data-umami-event="cta_sheet"
                    data-umami-event-section="pricing-custom"
                  >
                    診断シートを受け取る
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-gray-500">
                ※ 価格は税抜表示。制作の範囲外（予約/会員/決済 等）は別見積です。詳細はメールにてご案内します。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
