// app/campaign/page.tsx  ← サーバーコンポーネント
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND, CAMPAIGN } from "@/lib/constants";
import { CheckCircle2, Info, ShieldCheck } from "lucide-react";

const desc =
  `${CAMPAIGN.name}の内容と適用条件をまとめたご案内ページです。` +
  `先着${CAMPAIGN.seats}社限定で、制作費¥0と保守${CAMPAIGN.freeCareMonths}ヶ月無料（Liteプラン相当）の特典をご用意しています。`;

export const metadata: Metadata = {
  title: "キャンペーンのご案内",
  description: desc,
  alternates: { canonical: "/campaign" },
  openGraph: {
    title: "キャンペーンのご案内",
    description: desc,
    url: "/campaign",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "キャンペーンのご案内",
    description: desc,
    images: ["/og.png"],
  },
};

export const dynamic = "force-static";

const LITE_NOTE =
  "フォームの稼働状況の簡易チェック・バックアップ・軽微な文言や画像の差し替え（月1回目安）を想定した内容です。";

export default function CampaignPage() {
  return (
    <main className="container mx-auto space-y-12 px-4 py-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">キャンペーンのご案内</h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          <span className="font-semibold">{CAMPAIGN.name}</span> は、
          中小企業・スタートアップ・個人事業主向けの
          ホームページ制作を対象とした期間・枠数限定のキャンペーンです。
          先着{CAMPAIGN.seats}社まで、
          <span className="font-semibold">制作費¥0</span>
          （ドメイン・サーバーなどの実費のみご負担）と、
          <span className="font-semibold">
            保守{CAMPAIGN.freeCareMonths}ヶ月無料（Liteプラン相当）
          </span>
          をセットでご提供します。
        </p>
      </section>

      {/* キャンペーン内容 */}
      <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
        <Card>
          <CardHeader>
            <CardTitle>キャンペーンの内容</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            <p>
              本キャンペーンでは、{BRAND.name}
              が通常ご提供しているホームページ制作のうち、
              条件が合う案件について
              <span className="font-semibold">制作費を¥0</span>
              とし、公開後
              <span className="font-semibold">
                {CAMPAIGN.freeCareMonths}ヶ月分の保守（Liteプラン相当）
              </span>
              を無料でお付けします。
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                  aria-hidden
                />
                <span>
                  対象の制作範囲：
                  <span className="font-semibold">{CAMPAIGN.scope}</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                  aria-hidden
                />
                <span>
                  制作費：
                  <span className="font-semibold">¥0</span>
                  （ドメイン・サーバー費、撮影や有料素材利用などの
                  <span className="font-semibold">実費のみご負担</span>いただきます）
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                  aria-hidden
                />
                <span>
                  保守：
                  <span className="font-semibold">
                    {CAMPAIGN.freeCareMonths}ヶ月無料（Liteプラン相当）
                  </span>
                  。期間終了後はご希望に応じて通常プランへ切替え可能です。
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                  aria-hidden
                />
                <span>受付枠：先着{CAMPAIGN.seats}社（枠が埋まり次第終了）</span>
              </li>
            </ul>
            {CAMPAIGN.note && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ※ {CAMPAIGN.note}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-emerald-700/40 bg-emerald-900/5 dark:bg-emerald-900/10">
          <CardHeader className="flex flex-row items-center gap-2">
            <ShieldCheck
              className="h-5 w-5 flex-shrink-0 text-emerald-600"
              aria-hidden
            />
            <CardTitle className="text-base">無料保守（Lite相当）について</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-emerald-950 dark:text-emerald-50">
            <p>{LITE_NOTE}</p>
            <p className="text-xs text-emerald-800 dark:text-emerald-100/80">
              ※ 大きなデザイン変更やページ追加、機能追加などは別途お見積りとなります。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 対象・こんな方に向いています */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>対象となる方</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            <ul className="list-disc space-y-1 pl-5">
              <li>中小企業・スタートアップ・個人事業主の方</li>
              <li>新規立ち上げ、または小規模なリニューアルをご検討中の方</li>
              <li>
                基本的なページ構成（トップ／サービス説明／会社情報／お問い合わせなど）で
                始めたい方
              </li>
              <li>オンライン中心のやり取り（メール／ビデオ通話）が可能な方</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>こんなお悩みにフィットします</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            <ul className="list-disc space-y-1 pl-5">
              <li>今のホームページが古く、事業の内容や強みが伝わっていない</li>
              <li>スマホで見づらく、問い合わせや採用につながる実感がない</li>
              <li>
                ホームページを新しく作りたい／作り直したいが、
                どこにいくらで頼めばよいか分からない
              </li>
              <li>
                まずは最小限の構成で公開し、事業の成長に合わせて育てていきたい
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 適用条件・対象外・注意事項 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">適用条件・対象外となるケース</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>適用条件</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <ul className="list-disc space-y-1 pl-5">
                <li>制作実績としてサイト名・ロゴ・概要の掲載にご協力いただけること</li>
                <li>
                  お打ち合わせ後、
                  <span className="font-semibold">7日以内を目安</span>
                  に原稿や素材をご提出いただけること
                </li>
                <li>
                  デザイン案や原稿へのフィードバックを
                  <span className="font-semibold">3営業日程度</span>
                  でいただけること
                </li>
                <li>本キャンペーンの趣旨（小さく立ち上げて育てていく）にご賛同いただけること</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>対象外となる可能性がある例</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <ul className="list-disc space-y-1 pl-5">
                <li>大規模なECサイトや会員制システムの新規開発</li>
                <li>複雑な予約・決済フローを伴うシステム連携が必須の案件</li>
                <li>多数言語対応や、大量のページ数が前提となる案件</li>
                <li>
                  セキュリティ・コンプライアンス要件が厳格で、
                  個別の審査やドキュメント作成が多く発生する案件
                </li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ※ 上記に当てはまる場合でも、内容によっては通常プランとしてご提案可能です。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Info className="h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden />
              <CardTitle>その他の注意事項</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  ドメイン・サーバー費や有料素材等の実費は
                  お客様にご負担いただきます。
                </li>
                <li>
                  無料保守期間終了後は、自動継続は行わず、
                  ご希望がある場合のみ通常保守プランをご案内します。
                </li>
                <li>
                  詳細な条件や法的な記載は、
                  <Link
                    href="/legal/tokusho"
                    className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-white"
                  >
                    特定商取引法に基づく表記
                  </Link>
                  もあわせてご確認ください。
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 申し込みの流れ ＋ CTA */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">お申し込みの流れ</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>1. フォームからご相談</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <p>
                お問い合わせフォームにて、キャンペーン利用希望であることと、
                現在の状況・作りたいサイトのイメージをお知らせください。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. ヒアリング・適用可否の確認</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <p>
                メール（必要に応じてオンラインミーティング）で
                詳細を伺い、キャンペーンの対象となるか、
                制作範囲やスケジュールの目安をご案内します。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. ご提案・お見積もり</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <p>
                キャンペーン適用の可否を含めた構成案・お見積もりをお送りし、
                内容にご納得いただけましたら正式なお申し込みとなります。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 space-y-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            まずは簡単なご相談からで構いません。キャンペーンの対象かどうかも含めて、
            現実的なプランをご提案します。
          </p>
          <div className="inline-block">
            <ContactCTA />
          </div>
        </div>
      </section>
    </main>
  );
}
