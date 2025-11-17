// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { BRAND } from "@/lib/constants";
import { PRICING } from "@/lib/pricing";
import PricingSection from "@/components/sections/PricingSection";
import ContactCTA from "@/components/cta/ContactCTA";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const { meta, setPlans, lpPack, soloGroups, monthlyPlans } = PRICING;

export const metadata: Metadata = {
  title: `料金・プラン | ${BRAND.name}`,
  description: `RelayoのWebサイト制作・LP制作、運用・保守の料金とプランのご案内です。Essential / Standard / Growthのセットプランに加え、LP特化プランや月額保守、単発の更新・改善パックなどを用意しています。価格はすべて${meta.tax}表示です。`,
};

export default function PricingPage() {
  return (
    <main
      className="bg-gray-50 pb-20 pt-16 sm:pt-20"
      aria-labelledby="pricing-page-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ページヘッダー */}
        <header className="mb-10 space-y-4 text-center">
          <h1
            id="pricing-page-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            料金・プラン
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            Webサイト制作・LP制作、公開後の運用・保守までを
            わかりやすいプランにまとめています。まずはおおよその
            目安をご確認いただき、詳細はお問い合わせください。
          </p>
          <p className="mx-auto max-w-2xl text-sm text-gray-500">
            表示価格は<strong>すべて {meta.tax}</strong>です。
            ドメイン／サーバーなどの実費は別途となります。
          </p>
        </header>

        {/* セットプランのダイジェスト（トップと同じUIを再利用） */}
        <section
          aria-label="制作セットプランの概要"
          className="mb-16"
        >
          <PricingSection />
        </section>

        {/* LP特化パック */}
        <section
          aria-labelledby="lp-pack-heading"
          className="mb-16"
        >
          <div className="mb-6 text-center">
            <h2
              id="lp-pack-heading"
              className="text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              LP特化プラン
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-700">
              広告やキャンペーン用など、まずは1本のLPから試したい方向けの
              プランです。のちにコーポレートサイトや他のLPへ拡張していく前提でもご相談いただけます。
            </p>
          </div>

          <Card className="mx-auto max-w-3xl border border-blue-200 bg-white">
            <CardHeader className="space-y-2 text-center">
              <Badge className="mx-auto w-fit bg-blue-600 text-xs font-semibold text-white">
                LP特化
              </Badge>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {lpPack.name}
              </CardTitle>
              <CardDescription className="text-base text-gray-700">
                {lpPack.price.text}（{meta.tax}）
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700">
              <ul className="space-y-2">
                {lpPack.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                素材のご準備状況や外部サービスとの連携内容により、
                実際の費用や納期は前後する場合があります。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 月額（運用・保守） */}
        <section
          aria-labelledby="monthly-heading"
          className="mb-16"
        >
          <div className="mb-6 text-center">
            <h2
              id="monthly-heading"
              className="text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              月額プラン（運用・保守）
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-700">
              公開後の監視・バックアップ・軽微な修正、
              改善サイクルの実行などを、月額プランとしてご提供します。
              「まずは自分たちで更新したい」という方向けの無料枠も用意しています。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {monthlyPlans.map((m) => (
              <Card
                key={m.code}
                className="flex h-full flex-col border border-gray-200 bg-white shadow-sm"
              >
                <CardHeader className="pb-3 text-center">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {m.name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-base text-gray-700">
                    月額{" "}
                    <span className="text-2xl font-bold">
                      {m.price.text}
                    </span>
                    （{meta.tax}）
                  </CardDescription>
                  <p className="mt-2 text-xs text-gray-500">
                    対応開始の目安：{m.initial || "—"}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between pb-5 text-sm text-gray-700">
                  <ul className="space-y-2">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span
                          className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"
                          aria-hidden="true"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            契約の縛りはありません。必要な期間のみご利用いただけます。
            詳細な条件やSLA（対応開始の定義など）は、
            お見積り時のご案内および利用規約にてご確認いただけます。
          </p>
        </section>

        {/* 単体メニュー（セットに含まれない追加オプションや単発作業） */}
        <section
          aria-labelledby="solo-heading"
          className="mb-16"
        >
          <div className="mb-6 text-center">
            <h2
              id="solo-heading"
              className="text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              単体メニュー・追加オプション
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-700">
              既存サイトの一部だけを直したい場合や、特定の機能だけを追加したい場合は、
              単体メニューや追加オプションとしてご依頼いただけます。
            </p>
          </div>

          <div className="space-y-8">
            {soloGroups.map((group) => (
              <section key={group.code} aria-label={group.title}>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {group.title}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((item) => (
                    <Card
                      key={item.name}
                      className="border border-gray-200 bg-white"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-800">
                          {item.price.text}（{meta.tax}）
                        </CardDescription>
                      </CardHeader>
                      {item.note && (
                        <CardContent className="pt-0 text-xs text-gray-600">
                          {item.note}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-6 text-xs text-gray-500">
            作業内容がメニュー表に収まらない場合は、必要な範囲をヒアリングのうえ、
            個別にお見積りいたします。小さな修正からでもご相談ください。
          </p>
        </section>

        {/* 注記・支払い条件の抜粋（SSOTのnoteを活かす） */}
        <section
          aria-labelledby="notes-heading"
          className="mb-16"
        >
          <Card className="mx-auto max-w-4xl border-2 border-gray-100 bg-white">
            <CardHeader>
              <CardTitle
                id="notes-heading"
                className="text-lg font-semibold text-gray-900"
              >
                料金に関する補足・ご注意
              </CardTitle>
              <CardDescription className="text-sm text-gray-700">
                ご検討時に知っておいていただきたい条件や注意点をまとめています。
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-gray-800">
              <ul className="list-disc space-y-2 pl-5">
                {meta.notes.included.map((line) => (
                  <li key={`included-${line}`}>
                    <span className="font-medium">標準で含まれる例：</span>
                    <span className="ml-1">{line}</span>
                  </li>
                ))}
                {meta.notes.excluded.map((line) => (
                  <li key={`excluded-${line}`}>
                    <span className="font-medium">含まれない例：</span>
                    <span className="ml-1">{line}</span>
                  </li>
                ))}
                <li>
                  <span className="font-medium">お支払い：</span>
                  <span className="ml-1">{meta.notes.payment}</span>
                </li>
                <li>
                  <span className="font-medium">上位プランへの変更：</span>
                  <span className="ml-1">{meta.notes.upgrade}</span>
                </li>
                {meta.notes.disclaimers.map((line) => (
                  <li key={`disc-${line}`}>{line}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 最終CTA */}
        <section
          aria-label="料金に関するお問い合わせ"
          className="mt-10"
        >
          <Card className="mx-auto max-w-4xl border-2 border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardContent className="p-8 text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                料金の詳細や最適なプランについて相談したい方へ
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-sm text-gray-700">
                具体的なページ数や機能、ご予算の目安を教えていただければ、
                最適なプランを整理してご提案します。
                「どれを選べば良いか分からない」という段階でも構いません。
              </p>
              <div className="flex justify-center">
                <ContactCTA />
              </div>
              <p className="mt-3 text-xs text-gray-500">
                約2分で完了。営業電話は行いません。ご案内はメールでお送りします。
              </p>
              <p className="mt-1 text-xs text-gray-500">
                契約前のご相談やお見積りは無料です。
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
