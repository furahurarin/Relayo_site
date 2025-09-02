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

type QA = { q: string; a: React.ReactNode };

export default function FAQSection() {
  const faqs: QA[] = [
    {
      q: "ヒアリングは電話や会議が必要ですか？",
      a: (
        <>
          いいえ、<span className="font-medium">オンライン（メール中心）の非対面ヒアリング</span>で完結します。
          お問い合わせ後に「診断シート」をご案内し、メール往復（1〜2回）で要件を確定します。
          必要に応じてビデオ通話にも対応可能です。
        </>
      ),
    },
    {
      q: "料金体系は？（制作と保守）",
      a: (
        <>
          制作は
          <span className="font-medium">
            Starter-LP ¥79,800／Standard ¥198,000／Growth ¥348,000〜
          </span>
          （税込）が基本です。月額は
          <span className="font-medium">
            セルフ ¥0／ライト ¥3,980／スタンダード ¥14,800／グロース ¥39,800〜
          </span>
          （税込）。詳細・内訳は{" "}
          <Link href="/pricing" className="underline underline-offset-4">
            料金ページ
          </Link>
          をご覧ください（ドメイン／サーバ等の実費は別）。
        </>
      ),
    },
    {
      q: "制作期間の目安は？",
      a: (
        <>
          素材・要件確定後の目安は
          <span className="font-medium">
            Starter 5–10営業日／Standard 3–4週間／Growth 4–6週間
          </span>
          です（規模や外部連携により前後）。
        </>
      ),
    },
    {
      q: "スマホ対応・SEO・計測は含まれますか？",
      a: (
        <>
          はい。全プランで
          <span className="font-medium">
            レスポンシブ・基本SEO（OGP／メタ／サイトマップ／robots）
          </span>
          と
          <span className="font-medium">計測（Umami または GA4）</span>
          の初期設定を含みます。
        </>
      ),
    },
    {
      q: "品質やパフォーマンスの基準は？",
      a: (
        <>
          公開時の目安としてモバイルで
          <span className="font-medium">LCP ≤ 2.5s ／ CLS ≤ 0.1</span>
          を狙います。主要導線でのキーボード操作・コントラスト・代替テキストなど基本的なアクセシビリティにも配慮します。
        </>
      ),
    },
    {
      q: "運用開始後のサポート（SLA）は？",
      a: (
        <>
          <span className="font-medium">ライト保守</span>は
          <span className="font-medium">軽微改修：月2h/2件（繰越なし）</span>
          、依存アップデート（月1回目安）、障害は
          <span className="font-medium">P1＝即時初動</span>
          で対応します（受付：平日10–19時・メール）。上位プランでは改善頻度やA/Bテストが強化されます。詳細は{" "}
          <Link href="/pricing" className="underline underline-offset-4">
            料金ページ
          </Link>
          をご確認ください。
        </>
      ),
    },
    {
      q: "所有権やアカウント名義は？",
      a: (
        <>
          原則、ドメイン／ホスティング／計測等は
          <span className="font-medium">お客様名義</span>
          で契約します。納品物（コード／Figma／画像／テキスト等）の利用権はお客様に帰属し、当社テンプレート等は利用許諾（再利用可）となります。
          具体は個別契約に明記します。
        </>
      ),
    },
    {
      q: "追加機能（予約／決済／会員など）は対応できますか？",
      a: (
        <>
          可能です。テンプレ範囲外のため
          <span className="font-medium">別見積（例：+¥59,800〜）</span>
          で対応します。要件をメールまたはフォームでお知らせください。
        </>
      ),
    },
    {
      q: "キャンペーンの内容や解約条件は？",
      a: (
        <>
          最新の適用条件・対象・注意事項は{" "}
          <Link href="/campaign" className="underline underline-offset-4">
            キャンペーン案内
          </Link>
          に集約しています。解約・移管の取り扱いは{" "}
          <Link href="/legal/terms" className="underline underline-offset-4">
            利用規約
          </Link>
          に従い安全に対応します。
        </>
      ),
    },
    {
      q: "医療・士業など法令配慮が必要な業種は？",
      a: (
        <>
          対応可能です。表現審査や追加確認が必要な場合は
          <span className="font-medium">別途お見積り</span>
          となります。
        </>
      ),
    },
  ];

  return (
    <section className="bg-white py-20" aria-labelledby="faq-heading" role="region">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 sm:text-4xl">
            よくある質問
          </h2>
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

          {/* 統一注記（サイト全体の表記と整合） */}
          <p className="mt-6 text-xs text-gray-500">
            ※ 価格は税込表示です。ドメイン／サーバ等の実費は別。表示の納期・SLAは目安で、要件・素材の準備状況・外部連携により変動します。
          </p>
        </div>

        {/* その他のご質問 CTA（入口は /contact に統一、メールは表示のみ） */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-4xl border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-8">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">その他のご質問</h3>
              <p className="mx-auto mb-5 max-w-2xl text-gray-600">
                お問い合わせはフォームからお願いします（無料診断つき・2分で完了）。メールをご希望の方は下記アドレスへどうぞ。
              </p>
              <div className="flex justify-center">
                <ContactCTA />
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <span className="font-mono">{BRAND.email}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
