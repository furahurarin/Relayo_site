// components/sections/PricingSection.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";

type BuildPlan = {
  code: string;
  name: string;
  subtitle: string;
  initialPrice: number | string;
  monthlyText?: string;
  popular?: boolean;
  description: string;
  features: string[];
  notes?: string[];
};

type MaintenancePlan = {
  name: string;
  monthly: number | string;
  desc: string;
};

export default function PricingSection() {
  const buildPlans: BuildPlan[] = [
    {
      code: "starter",
      name: "Starter-LP",
      subtitle: "LP 1ページ／まず公開",
      initialPrice: 79_800,
      monthlyText: "ライト保守 ¥3,980〜",
      popular: false,
      description:
        "最小構成で素早く公開。問い合わせフォームや基本の計測・SEOをセットにした入門パッケージです。",
      features: [
        "LP（テンプレ 1ページ）＋問い合わせフォーム",
        "計測導入（Umami または GA4）",
        "SEO初期（title / OGP / サイトマップ）",
        "パフォーマンス調整・画像最適化（20点）",
        "ドメイン・DNS・SSL・ホスティング初期設定",
        "ファビコン & OGP 画像生成",
      ],
      notes: ["目安納期：素材受領から 5–10 営業日"],
    },
    {
      code: "standard",
      name: "Standard",
      subtitle: "目安8ページ（5p＋下層3p）／いちばん人気",
      initialPrice: 198_000,
      monthlyText: "スタンダード運用 ¥14,800",
      popular: true,
      description:
        "企業サイトの標準構成。更新しやすいCMSやFAQ、事例一覧まで含めて、公開後の運用に強い設計です。",
      features: [
        "コーポレート基本（テンプレ 5p）＋下層 3p",
        "CMS導入（更新レクチャー付）",
        "事例一覧テンプレ／FAQブロック",
        "計測導入／SEO初期",
        "ドメイン・DNS・SSL／パフォーマンス調整",
        "画像最適化／ファビコン & OGP",
      ],
      notes: ["目安納期：要件確定から 3–4 週間"],
    },
    {
      code: "growth",
      name: "Growth",
      subtitle: "目安10p＋LP 1本／攻めの運用",
      initialPrice: "348,000〜",
      monthlyText: "グロース運用 ¥39,800〜",
      popular: false,
      description:
        "計測強化とABテストを前提とした拡張プラン。LP追加やタグ管理、CV設計まで含めて継続最適化します。",
      features: [
        "コーポレート（テンプレ 10p）＋LP（テンプレ）1本",
        "ABテスト初期設定／タグ管理・CV設計",
        "ブログ/お知らせ（CMS）／SEO初期",
        "ドメイン・DNS・SSL／パフォーマンス調整",
        "画像最適化／ファビコン & OGP",
      ],
      notes: ["目安納期：要件確定から 4–6 週間"],
    },
  ];

  const maintenance: MaintenancePlan[] = [
    { name: "セルフ運用", monthly: 0, desc: "月例作業なし。不具合や更新は単発パックで都度依頼。" },
    { name: "ライト保守", monthly: 3_980, desc: "稼働/フォームの簡易監視・バックアップ。月1回：テキスト1箇所または画像3点。" },
    { name: "スタンダード運用", monthly: 14_800, desc: "監視・バックアップ＋毎月“ミニ改善”1回。四半期に速度/SEOケア。簡易レポート付き。" },
    { name: "グロース運用", monthly: "39,800〜", desc: "毎月“改善”2回＋CTA/A-Bテスト1本。四半期でLP1本追加（テンプレ）または全体最適化。" },
  ];

  const fmtJPY = (v: number | string) =>
    typeof v === "number" ? `¥${v.toLocaleString("ja-JP")}` : `¥${v}`;

  return (
    <section className="bg-gray-50 py-20" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-10 space-y-4 text-center">
          <h2 id="pricing-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            料金プラン
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            価格は<strong>すべて税込</strong>。ドメイン/サーバ等の実費は別となります。公開後は月額プランで継続改善も可能です。
          </p>
        </div>

        {/* 制作パッケージ */}
        <div className="grid gap-8 lg:grid-cols-3">
          {buildPlans.map((plan) => (
            <Card
              key={plan.code}
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
                      {fmtJPY(plan.initialPrice)}
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

                <div className="pt-2">
                  <ContactCTA full />
                  <p className="mt-2 text-center text-xs text-gray-500">
                    2分で完了。回答はメールでお送りします。
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 保守プラン（別枠） */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">月額（運用・保守）</h3>
          <div className="grid gap-6 md:grid-cols-4">
            {maintenance.map((m) => (
              <Card key={m.name} className="border border-gray-200">
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl">{m.name}</CardTitle>
                  <CardDescription className="text-base">
                    月額 <span className="text-2xl font-bold">{fmtJPY(m.monthly)}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-gray-600">
                  {m.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 信頼注記（支払条件／変更管理票／SLA 抜粋） */}
        <div className="mt-16">
          <Card className="mx-auto max-w-4xl border-2 border-gray-100 bg-white">
            <CardContent className="p-6 text-sm leading-relaxed text-gray-700">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>支払条件：</strong>着手20%／中間30%／検収50%（支払サイト30日）
                </li>
                <li>
                  <strong>変更管理：</strong>仕様変更は「変更管理票」で合意のうえ、範囲・費用・納期・リスクを更新します
                </li>
                <li>
                  <strong>SLA（抜粋）：</strong>P1 初動4h／P2 翌営業日／P3 週次（プランにより異なります）
                </li>
                <li>
                  <strong>注意：</strong>表示価格は税込。ドメイン/サーバ等の実費は別。要件により変動します
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* カスタム案内 */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-4xl border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardContent className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">カスタマイズも承ります</h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                予約・決済・会員・多言語・外部連携などの機能追加も可能です。要件に合わせて最適な構成をご提案します。
              </p>
              <div className="flex justify-center">
                <ContactCTA />
              </div>
              <p className="mt-6 text-xs leading-relaxed text-gray-500">
                ※ 「〜」表記は要件により変動。価格は税込表示。ドメイン/サーバ等の実費は別です。個別見積は無料です。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
