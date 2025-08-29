"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FAQSection() {
  const faqs = [
    {
      q: "ヒアリングは電話や会議が必要ですか？",
      a: (
        <>
          いいえ、<span className="font-medium">メール中心の非対面ヒアリング</span>で完結します。
          お問い合わせ後にお送りする「診断シート」にご記入いただき、メール往復（1〜2回）で要件を確定します。
        </>
      ),
    },
    {
      q: "料金体系は？（制作と保守）",
      a: (
        <>
          制作の目安は<span className="font-medium">LP（3–5p）¥198,000／コーポ（8–12p）¥680,000／プロ（15–25p〜）¥980,000〜</span>（税別）。<br />
          保守は<span className="font-medium">Lite ¥30,000 / Std ¥100,000 / Pro ¥300,000</span>（月・税別）をご用意しています。
          詳細は「料金」セクションをご覧ください。
        </>
      ),
    },
    {
      q: "「先着3社キャンペーン」の内容は？解約はできますか？",
      a: (
        <>
          <span className="font-medium">制作費¥0（諸経費のみ）× 保守3ヶ月¥0（Lite相当）</span>です。
          <br />
          初回3社は<span className="font-medium">いつでも解約OK（Relayoへの費用は不要）</span>。
          移管・撤去も無償（上限2時間）で対応します。※ドメイン/ホスティング/素材等の外部費用は実費です。
          <br />
          対象範囲：<span className="font-medium">LP 3–5p・40h上限</span>、条件：実績掲載・レビュー協力、素材提出=KO+7日。
        </>
      ),
    },
    {
      q: "制作期間はどのくらいですか？",
      a: (
        <>
          素材が揃い次第、目安は<span className="font-medium">3〜5週間</span>です（規模により前後）。
          デザイン2回＋実装→UAT→公開の順で進めます。
        </>
      ),
    },
    {
      q: "スマホ対応・SEO・計測は含まれますか？",
      a: (
        <>
          はい。全案件で<span className="font-medium">レスポンシブ・基本SEO（OGP/メタ/サイトマップ/robots）</span>、
          <span className="font-medium">計測（Umami または GA4）</span>の初期設定を含みます。
        </>
      ),
    },
    {
      q: "品質やパフォーマンスの基準はありますか？",
      a: (
        <>
          公開時の目安として、モバイルで<span className="font-medium">LCP≤2.5s / CLS≤0.1</span>を狙います。
          主要導線でのキーボード操作・コントラスト・代替テキストなど、基本的なアクセシビリティにも配慮します。
        </>
      ),
    },
    {
      q: "運用開始後のサポート（SLA）は？",
      a: (
        <>
          保守Lite相当では、軽微改修<span className="font-medium">月2h/2件（繰越なし）</span>、依存アップデート（月1回目安）、
          障害は<span className="font-medium">P1=即時初動</span>で対応します（受付：平日10–19時・メール）。
        </>
      ),
    },
    {
      q: "所有権やアカウント名義はどうなりますか？",
      a: (
        <>
          原則、ドメイン/ホスティング/計測などは<span className="font-medium">お客様名義</span>で契約します。
          納品物（コード/Figma/画像/テキスト等）の利用権はお客様に帰属し、当社テンプレは利用許諾（再利用可）です。
        </>
      ),
    },
    {
      q: "追加機能（予約/決済/会員など）は対応できますか？",
      a: (
        <>
          可能です。キャンペーンの対象外（LP範囲外）のため、<span className="font-medium">別見積（例：+¥200,000〜）</span>での対応となります。
          具体的な要件をメールでお知らせください。
        </>
      ),
    },
    {
      q: "医療・士業など法令配慮が必要な業種は？",
      a: (
        <>
          対応可能です。表現審査や追加確認が必要な場合は、<span className="font-medium">別途お見積り</span>となります。
          美容・整骨等はキャンペーン対象ですが、過度な効能表現は避けます。
        </>
      ),
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">よくある質問</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            料金・期間・運用など、よくいただく質問をまとめました。詳細は
            <span className="font-medium">メールで丁寧にご案内します。</span>
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
                <AccordionContent className="pt-2 leading-relaxed text-gray-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 space-y-4 text-center">
          <p className="text-gray-600">その他のご質問は、こちらからどうぞ。</p>
          <div className="flex justify-center gap-3">
            <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href="mailto:contact.relayo@gmail.com?subject=質問（料金・期間・運用など）">
                contact.relayo@gmail.com にメールする
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Link href="/contact?campaign=launch#get-sheet">診断シートを受け取る</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
