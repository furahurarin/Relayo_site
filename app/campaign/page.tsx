// app/campaign/page.tsx  ← サーバーコンポーネント（新規）
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND, CAMPAIGN } from "@/lib/constants";
import { Check, Info, ShieldCheck } from "lucide-react";

const desc =
  `${CAMPAIGN.name}の適用条件・対象・注意事項をまとめた案内ページ。` +
  `先着${CAMPAIGN.seats}社／制作費¥0＋保守${CAMPAIGN.freeCareMonths}ヶ月¥0（Lite相当）、${CAMPAIGN.freeCancelNote}。`;

export const metadata: Metadata = {
  title: "キャンペーン",
  description: desc,
  alternates: { canonical: "/campaign" },
  openGraph: {
    title: "キャンペーン",
    description: desc,
    url: "/campaign",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "キャンペーン",
    description: desc,
    images: ["/og.png"],
  },
};

export const dynamic = "force-static";

export default function CampaignPage() {
  return (
    <main className="container mx-auto space-y-10 px-4 py-12">
      {/* Hero */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">キャンペーン</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          <strong>{CAMPAIGN.name}</strong> — 先着{CAMPAIGN.seats}社。
          <strong>制作費¥0</strong>（諸経費のみ）＋ <strong>保守{CAMPAIGN.freeCareMonths}ヶ月¥0</strong>（Lite相当）。
          {CAMPAIGN.freeCancelNote}
        </p>
      </section>

      {/* 概要カード */}
      <Card>
        <CardHeader>
          <CardTitle>概要</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden />
              <span>対象範囲：{CAMPAIGN.scope}</span>
            </li>
            {CAMPAIGN.note && (
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden />
                <span>{CAMPAIGN.note}</span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden />
              <span>オンライン中心で全国対応（メール／必要に応じてビデオ）</span>
            </li>
          </ul>
          <div className="rounded-lg border border-emerald-700/30 bg-emerald-900/10 p-4 text-sm text-emerald-100 dark:bg-emerald-900/20">
            <p className="text-emerald-200">
              まずは現状とKPIを共有ください。最小構成で立ち上げ、公開後に継続改善していきます。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 条件・対象・除外 */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>適用条件</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>例：</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>実績掲載・レビュー協力</li>
              <li>素材提出：キックオフ後7日以内（遅延時は通常見積に切替）</li>
              <li>適用範囲は本ページ記載のテンプレ構成に準拠</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>対象</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <ul className="list-disc space-y-1 pl-5">
              <li>中小企業・個人事業主</li>
              <li>新規立ち上げ／小規模リニューアル</li>
              <li>要件がテンプレ範囲に収まる案件</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>除外・留意事項</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <ul className="list-disc space-y-1 pl-5">
              <li>多機能カスタム・大規模移行は通常見積</li>
              <li>ドメイン/サーバ等の実費は別</li>
              <li>当社判断でお断りする場合があります</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 進め方・信頼注記 */}
      <Card>
        <CardHeader>
          <CardTitle>進め方と注意（重要）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden />
            <p>
              契約前に範囲・前提・除外項目・変更管理・SLAを明文化します（
              <Link href="/legal/terms" className="underline underline-offset-4">利用規約</Link>／
              <Link href="/legal/privacy" className="underline underline-offset-4">プライバシー</Link>／
              <Link href="/legal/tokusho" className="underline underline-offset-4">特商法</Link>
              ）。
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-5 w-5 text-amber-600" aria-hidden />
            <p>
              表示は税込。要件により通常見積に切替となる場合があります。解約・移管はガイドラインに従い安全に対応します（{CAMPAIGN.freeCancelNote}）。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <section className="text-center">
        <h2 className="mb-3 text-2xl font-semibold">適用可否の確認・お申し込み</h2>
        <p className="mx-auto mb-4 max-w-2xl text-gray-600 dark:text-gray-300">
          まずは無料ヒアリングで適用可否をご案内します。要件がキャンペーン範囲外でも、最適な構成でお見積り可能です。
        </p>
        <div className="inline-block">
          <ContactCTA />
        </div>
      </section>
    </main>
  );
}
