// components/sections/PricingSection.tsx
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
import { Check, Star } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { PRICING } from "@/lib/pricing";

export default function PricingSection() {
  const { setPlans, monthlyPlans, meta } = PRICING;

  // トップ用は3プランのダイジェストのみ（LPパックは /pricing で詳しく）
  // 月額は代表4つをダイジェスト表示
  const monthlyDigest = monthlyPlans.filter((m) =>
    ["self", "lite", "standard", "growth"].includes(m.code)
  );

  // Lite の統一文言（“正”）
  const LITE_LINE =
    "稼働・フォームの簡易監視／バックアップ。月1回：文言1箇所 または 画像3点までの軽微な更新。";

  return (
    <section className="bg-gray-50 py-20" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-10 space-y-4 text-center">
          <h2 id="pricing-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            料金プラン
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            価格は<strong>すべて {meta.tax}</strong>です。ドメイン／サーバー等の実費は別途となります。
            公開後は月額プランでの運用・保守もご利用いただけます。
          </p>
          <p className="mx-auto max-w-2xl text-xs text-gray-500">
            ※ キャンペーンの適用には条件があります。詳しくは{" "}
            <Link href="/campaign" className="underline underline-offset-2">
              キャンペーン案内
            </Link>
            をご確認ください。
          </p>
        </div>

        {/* 制作セット（Essential / Standard / Growth） */}
        <div className="grid gap-8 lg:grid-cols-3">
          {setPlans.map((plan) => (
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
                  <CardDescription className="mt-1 text-base text-gray-600">
                    {plan.pages}／{plan.form}
                  </CardDescription>
                  {plan.catch && (
                    <p className="mt-2 text-sm text-gray-700">{plan.catch}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-sm text-gray-500">初期費用</span>
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price.text}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <p className="mb-4 font-medium text-gray-800">標準に含まれるもの</p>
                  <ul className="space-y-3">
                    {plan.includes.map((f) => (
                      <li key={f} className="flex items-start">
                        <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-4 text-sm text-gray-700">
                  <p>
                    <strong>サポート体制（対応開始の目安）：</strong>
                    {plan.sla.label}
                    {(plan.sla.p1 || plan.sla.p2 || plan.sla.p3) && "／"}
                    {plan.sla.p1 && <span>重大：{plan.sla.p1}</span>}
                    {plan.sla.p2 && <span>／中度：{plan.sla.p2}</span>}
                    {plan.sla.p3 && <span>／軽度：{plan.sla.p3}</span>}
                  </p>
                  <p className="mt-1">
                    <strong>納期目安：</strong>
                    {plan.leadTime.note}
                  </p>
                </div>

                <div className="pt-2">
                  <ContactCTA />
                  <p className="mt-2 text-center text-xs text-gray-500">
                    約2分で完了。ご案内はメールでお送りします。
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 月額（ダイジェスト） */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">月額（運用・保守）</h3>
          <div className="grid gap-6 md:grid-cols-4">
            {monthlyDigest.map((m) => (
              <Card key={m.code} className="border border-gray-200 bg-white">
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl">{m.name}</CardTitle>
                  <CardDescription className="text-base">
                    月額 <span className="text-2xl font-bold">{m.price.text}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-gray-700">
                  {/* Liteだけは“正”の一行に強制統一（元データのゆれを吸収） */}
                  {m.code === "lite" ? LITE_LINE : m.features[0]}
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-gray-600">
            契約の縛りはありません。詳しくは{" "}
            <Link
              href="/pricing"
              className="font-medium text-blue-600 underline-offset-2 hover:underline"
            >
              料金ページ
            </Link>
            をご覧ください。
          </p>
        </div>

        {/* 取引条件・注記（支払条件／変更管理／対応目安 抜粋） */}
        <div className="mt-16">
          <Card className="mx-auto max-w-4xl border-2 border-gray-100 bg-white">
            <CardContent className="p-6 text-sm leading-relaxed text-gray-800">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>お支払い条件：</strong>着手20%／中間30%／検収50%（お支払い期日：請求書発行から30日以内）
                </li>
                <li>
                  <strong>変更管理：</strong>仕様変更は「変更管理票」で合意のうえ、範囲・費用・納期・リスクを更新します。
                </li>
                <li>
                  <strong>サポート体制（抜粋）：</strong>重大：4時間以内に対応開始／中度：翌営業日から順次／軽度：週内
                  （プランにより異なる場合があります）
                </li>
                <li>
                  <strong>ご注意：</strong>価格は{meta.tax}表示。ドメイン／サーバー等の実費は別途。要件により変動します。
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* カスタム案内 */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-4xl border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardContent className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">個別のご要望にも対応します</h3>
              <p className="mb-6 leading-relaxed text-gray-700">
                予約・決済・会員・多言語・外部サービス連携などの追加にも対応可能です。課題と目標に合わせ、最適な構成をご提案します。
              </p>
              <div className="flex justify-center">
                <ContactCTA />
              </div>
              <p className="mt-6 text-xs leading-relaxed text-gray-500">
                ※ 「〜」表記は要件により変動します。価格は{meta.tax}表示。ドメイン／サーバー等の実費は別途です。
                個別お見積りは無料です。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
