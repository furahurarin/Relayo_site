// app/pricing/page.tsx
import type { Metadata } from "next";
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
import { FadeIn } from "@/components/ui/FadeIn";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export const metadata: Metadata = {
  title: "料金プラン",
  description: "わかりやすい3つの制作プランと、安心の運用・保守プランについて。",
};

export default function PricingPage() {
  const { setPlans, monthlyPlans } = PRICING;

  // 運用・保守プランのダイジェスト
  const monthlyDigest = monthlyPlans.filter((m) =>
    ["lite", "assist", "standard", "growth"].includes(m.code),
  );

  const LITE_LINE =
    "公開後の稼働確認（死活監視）やセキュリティ更新、軽微な修正などをまとめた、安心運用のための保守プランです。";

  const getPlanSubtitle = (code: string) => {
    switch (code) {
      case "starter_lp": return "スターター（LP制作）";
      case "essential": return "エッセンシャル（基本プラン）";
      case "standard": return "スタンダード（標準プラン）";
      case "growth": return "グロース（拡張プラン）";
      default: return "";
    }
  };

  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <PageBreadcrumb items={[{ label: "料金プラン" }]} />

        {/* 見出し */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            料金とプラン
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
            目的や規模に応じて、3つの制作プランをご用意しています。
            <br className="hidden sm:inline" />
            必要な機能だけを選んで、無駄のないコストでスタートできます。
          </p>
        </div>

        {/* 3つの制作プラン */}
        <div className="grid gap-6 lg:grid-cols-3">
          {setPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <Card
                key={plan.code}
                className={`flex h-full flex-col border-gray-200 bg-white shadow-sm ${
                  isPopular ? "ring-2 ring-amber-400 ring-offset-2" : ""
                }`}
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <CardTitle className="text-base font-bold text-gray-900">
                        {plan.name}
                      </CardTitle>
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
                   {/* プランごとの補足説明 */}
                  {plan.code === "essential" && (
                    <p className="leading-relaxed">
                      ランディングページ1枚など、小さな構成で「誰に・何を伝えるか」を絞ったサイトを制作します。
                    </p>
                  )}
                  {plan.code === "standard" && (
                    <p className="leading-relaxed">
                      トップページに加え、会社概要・サービス紹介・お問い合わせなど、複数ページ構成のサイトを基本とします。
                    </p>
                  )}
                  {plan.code === "growth" && (
                    <p className="leading-relaxed">
                      将来的なページ追加や、会員・予約・決済などの機能拡張を見据えて設計します。
                    </p>
                  )}

                  <ul className="mt-1 space-y-2 border-t border-gray-100 pt-4">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className="mt-[3px] h-4 w-4 text-blue-600 flex-shrink-0"
                          aria-hidden
                        />
                        <span className="leading-snug text-gray-800">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 運用・保守プラン */}
        <div className="mt-16">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-8 shadow-sm">
            <div className="md:flex md:items-start md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold text-gray-900">
                  運用・保守プラン　月額 ¥3,980〜
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-800">
                  {LITE_LINE}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {monthlyDigest.map((m) => (
                    <div key={m.code} className="rounded-lg bg-white p-4 shadow-sm">
                      <div className="flex justify-between items-baseline mb-1">
                         <p className="text-sm font-bold text-gray-900">{m.name}</p>
                         <p className="text-sm font-bold text-gray-900">{m.price.text}</p>
                      </div>
                      <ul className="space-y-1">
                        {m.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <Check className="mt-[2px] h-3 w-3 text-blue-600" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 flex-shrink-0 text-center md:text-right">
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm inline-block text-left">
                    <p className="text-sm font-bold text-gray-900 mb-2">ご相談・お見積り</p>
                    <p className="text-xs text-gray-600 mb-4 max-w-[200px]">
                      プラン選びで迷われた場合も、お気軽にご相談ください。
                    </p>
                    <ContactCTA />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* 注記 */}
        <p className="mt-8 text-xs text-gray-500 text-center">
          ※表示価格はすべて税別です。ドメイン・サーバー費用などの実費は別途ご負担となります。
        </p>
      </FadeIn>
    </main>
  );
}