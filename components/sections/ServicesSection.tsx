// components/sections/ServicesSection.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Lightbulb, Code, Settings } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";

const SERVICES = [
  {
    icon: Lightbulb,
    title: "設計",
    subtitle: "目的整理・ページ計画（オンライン：メール中心）",
    description:
      "目的と課題を確認し、必要なページだけに絞った計画と文章案を作成します。読み手にとって分かりやすい掲載順と構成を整えます。",
    features: [
      "オンラインヒアリング（メール中心）",
      "目標の確認と優先順位付け",
      "サイトマップ・ワイヤーフレームの作成",
      "文章案の作成（1ページあたり目安1,000字）",
      "アクセス計測項目の整理（設定の準備）",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    title: "制作",
    subtitle: "実装・公開（短期間で丁寧に）",
    description:
      "スマートフォン対応、表示の速さ、基本的な検索対策、お問い合わせフォームまで標準対応。必要に応じて予約・会員・決済などの機能を追加できます。",
    features: [
      "スマホ最適化と表示速度の改善",
      "基本的な検索対策（タイトル・画像の見え方・サイトマップ 等）",
      "お問い合わせフォームの設置",
      "画像の最適化と表示品質の調整",
      "予約・会員・決済などの追加（別途お見積もり）",
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Settings,
    title: "運用",
    subtitle: "保守・改善（体制あり）",
    description:
      "公開後はアクセス状況を確認し、計画に沿って改善します。監視やバックアップ、軽微な修正に対応。重大な不具合は4時間以内に対応を開始します。",
    features: [
      "基本保守：監視・バックアップ・軽微な修正（月1回：文言1箇所または画像3点）",
      "ソフトウェア更新（目安：月1回）",
      "監視と緊急対応（重大な不具合は4時間以内に対応開始）",
      "月次レポートと改善提案",
      "比較検証（2案を比べて良い方を採用）※プランにより実施",
    ],
    color: "from-orange-500 to-red-500",
  },
] as const;

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white py-20"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-16 space-y-4 text-center">
          <h2
            id="services-heading"
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            サービス内容
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            設計 → 制作 → 運用をひとつの体制でご提供します。オンライン（メール中心）の
            ヒアリングで無理なく進行し、公開後も計画に沿って改善します。
          </p>
        </div>

        {/* 3ステップ（設計→制作→運用） */}
        <div className="grid gap-8 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
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
                      <CardDescription className="text-lg font-medium text-gray-600">
                        {service.subtitle}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-center leading-relaxed text-gray-700">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      <p className="font-medium text-gray-800">提供内容（例）</p>
                      <ul className="space-y-2">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <span
                              className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-gray-400"
                              aria-hidden="true"
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 3枚を矢印で接続（大画面のみ） */}
                {index < SERVICES.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 lg:block">
                    <ArrowRight
                      className="h-8 w-8 text-gray-300"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 中腹CTA（/contact に統一） */}
        <div className="mt-12">
          <div className="rounded-2xl border bg-white/60 p-6 text-center shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
            <h3 className="mb-3 text-xl font-semibold">お問い合わせ</h3>
            <p className="mx-auto mb-4 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
              約2分で完了。営業電話は行いません。メールで丁寧にご案内します。
            </p>
            <div className="flex justify-center">
              <ContactCTA />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
