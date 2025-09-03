// components/sections/FAQSection.tsx
"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import ContactCTA from "@/components/cta/ContactCTA";
import { Mail } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { PRICING } from "@/lib/pricing";

type QA = { q: string; a: React.ReactNode };

const shortName = (name: string) => name.split("（")[0] ?? name;
const stripPerMonth = (text: string) => text.replace(/／月$/, "");

// Lite の統一文言（サイト全体で合わせる）
const LITE_LINE =
  "稼働・フォームの簡易監視／バックアップ。月1回：文言1箇所 または 画像3点までの軽微な更新。";

/** JSX → 構造化データ用プレーンテキスト（簡易） */
function toPlainText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(toPlainText).join(" ");
  if (typeof node === "object" && node) {
    // @ts-ignore
    const { props } = node || {};
    return toPlainText(props?.children ?? "");
  }
  return "";
}

export default function FAQSection() {
  const { setPlans, lpPack, monthlyPlans, meta } = PRICING;

  const essential = setPlans.find((p) => p.code === "essential");
  const standard = setPlans.find((p) => p.code === "standard");
  const growth = setPlans.find((p) => p.code === "growth");

  const selfM = monthlyPlans.find((m) => m.code === "self");
  const liteM = monthlyPlans.find((m) => m.code === "lite");
  const stdM = monthlyPlans.find((m) => m.code === "standard");
  const growthM = monthlyPlans.find((m) => m.code === "growth");

  const faqs: QA[] = [
    {
      q: "打ち合わせは必須ですか？（電話や会議が苦手です）",
      a: (
        <>
          必須ではありません。<span className="font-medium">オンライン（メール中心）</span>で完結します。
          お問い合わせ後に簡単なヒアリングフォームをご案内し、メールのやり取り（目安1〜2回）で要件を確定します。
          必要に応じてオンライン面談も可能です。
        </>
      ),
    },
    {
      q: "料金体系はどうなっていますか？（制作と月額）",
      a: (
        <>
          制作の主なプランは{" "}
          <span className="font-medium">
            {essential ? `${shortName(essential.name)} ${essential.price.text}／` : null}
            {standard ? `${shortName(standard.name)} ${standard.price.text}／` : null}
            {growth ? `${shortName(growth.name)} ${growth.price.text}` : null}
          </span>
          （{meta.tax}）です。LP特化は{" "}
          <span className="font-medium">
            {lpPack.name} {lpPack.price.text}
          </span>
          。運用・保守の目安は{" "}
          <span className="font-medium">
            {selfM ? `${shortName(selfM.name)} ${stripPerMonth(selfM.price.text)}／` : null}
            {liteM ? `${shortName(liteM.name)} ${stripPerMonth(liteM.price.text)}／` : null}
            {stdM ? `${shortName(stdM.name)} ${stripPerMonth(stdM.price.text)}／` : null}
            {growthM ? `${shortName(growthM.name)} ${stripPerMonth(growthM.price.text)}` : null}
          </span>
          です。内訳と詳細は{" "}
          <Link href="/pricing" className="underline underline-offset-4">
            料金ページ
          </Link>
          をご覧ください（ドメイン／サーバー等の実費は別途）。
        </>
      ),
    },
    {
      q: "制作期間の目安を教えてください。",
      a: (
        <>
          素材のご準備と要件確定後の目安は{" "}
          <span className="font-medium">
            {lpPack ? `${shortName(lpPack.name)}：${lpPack.leadTime.note}／` : null}
            {standard ? `${shortName(standard.name)}：${standard.leadTime.note}／` : null}
            {growth ? `${shortName(growth.name)}：${growth.leadTime.note}` : null}
          </span>
          です（規模・外部サービス連携により前後します）。
        </>
      ),
    },
    {
      q: "スマホ対応や検索対策、アクセス計測は含まれますか？",
      a: (
        <>
          はい、全プランに含まれます。<span className="font-medium">スマホ最適化・表示速度の調整・基本的な検索対策（タイトル／SNSでの見え方［OGP］／サイトマップ 等）</span>
          に加え、<span className="font-medium">アクセス計測の初期設定（例：Umami／GA4）</span>を行います。
        </>
      ),
    },
    {
      q: "表示の速さや品質の基準はありますか？",
      a: (
        <>
          読み込みの速さと安定した表示を重視しています。公開時の目安として
          <span className="font-medium">モバイルの主要指標で快適に閲覧できる水準</span>
          を目指します（例：初回表示まで約2.5秒程度、レイアウトのズレを極力抑える など）。
          主要な導線ではキーボード操作・コントラスト・代替テキストにも配慮します。
        </>
      ),
    },
    {
      q: "公開後のサポート内容と、対応の目安は？",
      a: (
        <>
          例として<strong>Lite</strong>は「{LITE_LINE}」が標準です。対応開始の目安は
          <strong> 重大：4時間以内／中度：翌営業日から順次／軽度：週内</strong>
          （プランにより異なります）。詳細は{" "}
          <Link href="/pricing" className="underline underline-offset-4">
            料金ページ
          </Link>
          をご参照ください。
        </>
      ),
    },
    {
      q: "所有権やアカウントの名義はどうなりますか？",
      a: (
        <>
          原則として、<span className="font-medium">ドメイン／ホスティング／計測ツールはお客様名義</span>
          で契約します。納品物（コード・デザイン・画像・テキスト等）の利用権はお客様に帰属し、
          当方テンプレート等は利用許諾（再利用可）での提供となります。具体的な取り扱いは個別契約に明記します。
        </>
      ),
    },
    {
      q: "予約・決済・会員などの追加機能は対応できますか？",
      a: (
        <>
          可能です。テンプレート範囲外となるため、<span className="font-medium">別途お見積り（例：+¥59,800〜）</span>
          でご案内します。ご要望をフォームまたはメールでお知らせください。
        </>
      ),
    },
    {
      q: "キャンペーンの内容や解約条件を知りたいです。",
      a: (
        <>
          最新の条件・対象・注意事項は{" "}
          <Link href="/campaign" className="underline underline-offset-4">
            キャンペーン案内
          </Link>
          に集約しています。解約・移管の取り扱いは{" "}
          <Link href="/legal/terms" className="underline underline-offset-4">
            利用規約
          </Link>
          に基づいて安全に対応します。
        </>
      ),
    },
    {
      q: "医療・士業など、法令配慮が必要な業種にも対応できますか？",
      a: (
        <>
          対応可能です。表現確認や追加審査が必要な場合は、<span className="font-medium">別途お見積り</span>
          となります。業界のガイドラインに沿って進行します。
        </>
      ),
    },
  ];

  // 構造化データ（FAQPage）
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: toPlainText(f.a) },
    })),
  };

  return (
    <section className="bg-white py-20" aria-labelledby="faq-heading" role="region">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            よくある質問
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            料金・期間・運用など、よくいただくご質問をまとめました。より詳しい内容はメールでご案内します。
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-2 transition-colors hover:bg-gray-100"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pt-2 leading-relaxed text-gray-700">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* 統一注記（サイト全体の表記と整合） */}
          <p className="mt-6 text-xs text-gray-600">
            ※ 価格は{meta.tax}表示です。ドメイン／サーバー等の実費は別途。表示の納期や対応目安は参考値で、要件・素材のご準備状況・外部連携により変動します。
          </p>
        </div>

        {/* その他のご質問 CTA（入口は /contact に統一、メールは表示のみ） */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-4xl border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-8">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">その他のご質問</h3>
              <p className="mx-auto mb-5 max-w-2xl text-gray-700">
                お問い合わせはフォームからお願いします（無料診断つき・約2分で完了）。メールをご希望の方は下記アドレスへお送りください。
              </p>
              <div className="flex justify-center">
                <ContactCTA />
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-gray-800">
                <Mail className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <span className="font-mono">{BRAND.email}</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ 構造化データ（SEO） */}
        <script
          type="application/ld+json"
          // @ts-ignore
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </div>
    </section>
  );
}
