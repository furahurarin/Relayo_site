// app/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactCTA from "@/components/cta/ContactCTA";
import { PRICING } from "@/lib/pricing";

const siteDescription =
  "制作範囲・納期・価格・運用保守・名義と権利・対応目安（SLA）・アクセシビリティ・セキュリティに関するFAQ。";

export const metadata: Metadata = {
  // レイアウトの title テンプレート適用前提のためプレーン文言のみ
  title: "よくある質問",
  description: siteDescription,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問",
    description: siteDescription,
    url: "/faq",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "よくある質問",
    description: siteDescription,
    images: ["/og.png"],
  },
};

const QA = ({ q, a }: { q: string; a: React.ReactNode }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5">
    <h3 className="font-semibold text-gray-900">{q}</h3>
    <div className="mt-2 text-gray-700">{a}</div>
  </div>
);

// 本ページは静的生成（FAQの安定性重視）
export const dynamic = "force-static";

const jpName = (name: string) => {
  // 例: "Self（セルフ運用）" → "セルフ運用"
  const m = name.match(/（(.+?)）/);
  return m ? m[1] : name;
};
const stripPerMonth = (text: string) => text.replace(/\/?／?月$/, "");

export default function FaqPage() {
  const { setPlans, lpPack, monthlyPlans, meta } = PRICING;

  const standard = setPlans.find((p) => p.code === "standard");
  const growth = setPlans.find((p) => p.code === "growth");

  const selfM = monthlyPlans.find((m) => m.code === "self");
  const liteM = monthlyPlans.find((m) => m.code === "lite");
  const stdM = monthlyPlans.find((m) => m.code === "standard");
  const growthM = monthlyPlans.find((m) => m.code === "growth");
  const assistM = monthlyPlans.find((m) => m.code === "assist");

  return (
    <main
      className="container mx-auto space-y-8 px-4 py-12"
      aria-labelledby="faq-title"
      role="main"
    >
      <h1 id="faq-title" className="text-3xl font-bold text-gray-900">
        よくある質問
      </h1>

      <div className="grid gap-4">
        <QA
          q="公開までの目安は？"
          a={
            <>
              素材のご準備と要件確定後の目安は
              <strong>
                {" "}
                {lpPack ? `Starter-LP：${lpPack.leadTime.note}／` : ""}
                {standard ? `Standard：${standard.leadTime.note}／` : ""}
                {growth ? `Growth：${growth.leadTime.note}` : ""}
              </strong>
              です。規模や外部サービス連携により前後します。必要な範囲から公開し、計測結果に基づいて拡張します。
            </>
          }
        />

        <QA
          q="保守は必須ですか？"
          a={
            <>
              任意です。目安は{" "}
              <strong>
                {selfM ? `${jpName(selfM.name)} ${stripPerMonth(selfM.price.text)}` : ""}
                {liteM ? `／${jpName(liteM.name)} ${stripPerMonth(liteM.price.text)}` : ""}
                {stdM ? `／${jpName(stdM.name)} ${stripPerMonth(stdM.price.text)}` : ""}
                {growthM ? `／${jpName(growthM.name)} ${stripPerMonth(growthM.price.text)}` : ""}
              </strong>
              （{meta.tax}）。依存アップデート、軽微な改修、レポートや改善提案をご希望の場合は保守契約をご検討ください。詳細は{" "}
              <Link href="/pricing" className="underline underline-offset-4">
                料金ページ
              </Link>{" "}
              をご覧ください。
            </>
          }
        />

        <QA
          q="ドメインやホスティングは？"
          a={
            <>
              <strong>お客様名義</strong>での取得・契約を基本とします。ホスティングは要件に応じて選定（例：Vercel 等）。アクセス権限と課金主体を明確にし、当方は
              <strong>最小権限</strong>で運用します。
            </>
          }
        />

        <QA
          q="途中で仕様変更はできますか？"
          a={
            <>
              可能です。<strong>変更管理票</strong>で範囲・費用・納期・リスクの影響を明確化し、合意のうえで反映します。影響が小さい順に優先して実施します。
            </>
          }
        />

        <QA
          q="所有権やアカウント名義は？"
          a={
            <>
              成果物の利用権および各種アカウントは<strong>原則お客様名義</strong>です（テンプレートや外部コンポーネントは各ライセンス準拠）。GitHub リポジトリや公開環境も、原則お客様側に帰属させます。
            </>
          }
        />

        <QA
          q="スマホ対応・検索対策・計測は含まれますか？"
          a={
            <>
              はい。全案件で<strong>レスポンシブ対応・表示速度の調整・基本的な検索対策（タイトル／OGP／サイトマップ 等）</strong>と、<strong>アクセス計測の初期設定（例：Umami／GA4）</strong>を行います。
            </>
          }
        />

        <QA
          q="品質や表示速度の目安は？"
          a={
            <>
              公開時の目安として、モバイルで<strong>LCP ≤ 2.5s／CLS ≤ 0.1</strong>を目指します。主要導線ではキーボード操作、コントラスト、代替テキストなど基本的なアクセシビリティにも配慮します。
            </>
          }
        />

        <QA
          q="アクセシビリティへの配慮は？"
          a={
            <>
              国内指針<strong>JIS X 8341-3（AA 目標）</strong>を参考に、見出し構造、フォーカス可視化、適切な代替テキスト、十分なコントラストを基本として設計します。
            </>
          }
        />

        <QA
          q="対応時間とSLAは？"
          a={
            <>
              受付は<strong>{meta.businessHours}</strong>（メール）です。対応開始の目安は<strong>重大：4時間以内／中度：翌営業日から順次／軽度：週内</strong>（プランにより異なります）。
              例：{" "}
              <strong>
                {liteM ? `${jpName(liteM.name)}=${liteM.initial}` : ""}
                {assistM ? `／${jpName(assistM.name)}=${assistM.initial}` : ""}
                {stdM ? `／${jpName(stdM.name)}=${stdM.initial}` : ""}
                {growthM ? `／${jpName(growthM.name)}=${growthM.initial}` : ""}
              </strong>
              。詳細は{" "}
              <Link href="/pricing" className="underline underline-offset-4">
                料金ページ
              </Link>
              をご確認ください。
            </>
          }
        />

        <QA
          q="セキュリティ・個人情報の扱いは？"
          a={
            <>
              <strong>最小権限・二要素認証・変更履歴の管理</strong>を徹底します。個人情報の取り扱いはお客様の社内規程に従い、必要に応じて個別の契約（委託契約 等）を締結します。
            </>
          }
        />

        <QA
          q="キャンペーンの条件は？"
          a={
            <>
              最新の適用条件・対象・注意事項は{" "}
              <Link href="/campaign" className="underline underline-offset-4">
                キャンペーン案内
              </Link>
              に集約しています。解約・移管の取り扱いは{" "}
              <Link href="/legal/terms" className="underline underline-offset-4">
                利用規約
              </Link>
              に基づき安全に対応します。
            </>
          }
        />
      </div>

      <p className="text-xs text-gray-600">
        ※ 価格は{meta.tax}表示です。ドメイン／サーバー等の実費は別途。納期や対応の目安は参考値で、要件・素材のご準備状況・外部連携により変動します。
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <ContactCTA />
        <Button asChild variant="secondary" size="lg">
          <Link href="/pricing">料金を見る</Link>
        </Button>
      </div>
    </main>
  );
}
