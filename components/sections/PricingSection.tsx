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
  const { setPlans, monthlyPlans } = PRICING;

  // 3つの制作プラン（Starter / Standard / Growth）
  const orderedPlans = setPlans;

  // 運用・保守プランのダイジェスト
  const monthlyDigest = monthlyPlans.filter((m) =>
    ["lite", "assist", "standard", "growth"].includes(m.code),
  );

  // テキスト：運用・保守プランの概要（具体性を向上）
  const LITE_LINE =
    "公開後の稼働確認（死活監視）やセキュリティ更新、軽微な修正などをまとめた、安心運用のための保守プランです。";

  // プラン名の日本語補足マッピング
  const getPlanSubtitle = (code: string) => {
    switch (code) {
      case "starter_lp":
        return "スターター（LP制作）";
      case "essential":
        return "エッセンシャル（基本プラン）";
      case "standard":
        return "スタンダード（標準プラン）";
      case "growth":
        return "グロース（拡張プラン）";
      default:
        return "";
    }
  };

  return (
    <section
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-10 space-y-4 text-center">
          <h2
            id="pricing-heading"
            className="text-2xl font-bold text-gray-900 sm:text-3xl"
          >
            料金とプラン
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-700">
            目的や規模に応じて、3つの制作プランをご用意しています。
            詳しい内容やカスタマイズ例は、料金ページにてご確認いただけます。
          </p>
        </div>

        {/* 3つの制作プラン */}
        <div className="grid gap-6 lg:grid-cols-3">
          {orderedPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <Card
                key={plan.code}
                className="flex h-full flex-col border border-gray-200 bg-white shadow-sm"
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <CardTitle className="text-base font-bold text-gray-900">
                        {plan.name}
                      </CardTitle>
                      {/* 日本語名を追記して分かりやすく */}
                      <span className="text-xs font-normal text-gray-500">
                        {getPlanSubtitle(plan.code)}
                      </span>
                    </div>
                    {isPopular && (
                      <Badge className="inline-flex items-center gap-1 bg-amber-500 text-xs font-semibold text-white hover:bg-amber-600">
                        <Star className="h-3 w-3" aria-hidden />
                        人気
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {plan.price.text}
                    <span className="ml-1 text-xs font-normal text-gray-500">
                      （税別）
                    </span>
                  </p>
                  {plan.catch && (
                    <CardDescription className="text-sm leading-relaxed text-gray-700">
                      {plan.catch}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4 text-sm text-gray-800">
                  {/* 原稿の2文目に相当する補足 */}
                  {plan.code === "essential" && (
                    <p className="leading-relaxed">
                      ランディングページ1枚など、小さな構成で
                      「誰に・何を伝えるか」を絞ったサイトを制作します。
                    </p>
                  )}
                  {plan.code === "standard" && (
                    <p className="leading-relaxed">
                      トップページに加え、会社概要・サービス紹介・お問い合わせなど、
                      複数ページ構成のサイトを基本とします。
                    </p>
                  )}
                  {plan.code === "growth" && (
                    <p className="leading-relaxed">
                      将来的なページ追加や、会員・予約・決済などの機能拡張を見据えて設計します。
                    </p>
                  )}

                  <ul className="mt-1 space-y-2">
                    {plan.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className="mt-[3px] h-4 w-4 text-blue-600"
                          aria-hidden
                        />
                        <span className="leading-snug text-gray-800">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2 text-xs leading-relaxed text-gray-500">
                    ページ数・機能・原稿量により、実際のお見積りは前後します。
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 運用・保守プランのダイジェスト */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-6 text-sm text-gray-900 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">
              運用・保守プラン　月額 ¥3,980〜
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-800">
              {LITE_LINE}
            </p>
            {/* 文字サイズを text-[11px] から text-xs に拡大 */}
            <div className="mt-4 grid gap-3 text-xs text-gray-800 sm:grid-cols-2">
              {monthlyDigest.map((m) => (
                <div key={m.code} className="rounded-lg bg-white/60 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {m.name}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {m.price.text}
                    <span className="ml-1 font-normal text-gray-500">
                      （税別）
                    </span>
                  </p>
                  <ul className="mt-2 space-y-1">
                    {m.features.slice(0, 2).map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <Check
                          className="mt-[2px] h-3.5 w-3.5 text-blue-600"
                          aria-hidden
                        />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-gray-500">
                    対応開始目安：{m.initial}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA + 詳細リンク */}
          <div className="flex flex-col justify-between gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm leading-relaxed text-gray-800">
                「どのプランが良いか分からない」という段階でも構いません。
                現在の状況とご予算感を伺いながら、無理のないプランをご提案します。
              </p>
              <div className="mt-4 flex justify-center">
                <ContactCTA />
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
                aria-label="料金の詳細ページを見る"
              >
                料金の詳細を見る
              </Link>
            </div>
          </div>
        </div>

        {/* 備考：実費の目安を追記 */}
        <p className="mt-6 text-xs leading-relaxed text-gray-500">
          表示価格はすべて税別です。有料SaaSや外部決済手数料などの実費
          （例：ドメイン・サーバー費用として年額1〜2万円程度）
          は、別途ご負担となる場合があります。
        </p>
      </div>
    </section>
  );
}