// components/sections/FAQSection.tsx
"use client";

import type { ReactNode } from "react";
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

type QA = { q: string; a: ReactNode };

const faqs: QA[] = [
  {
    q: "公開までどのくらいの期間がかかりますか？",
    a: (
      <>
        サイトの規模にもよりますが、
        ランディングページであれば<span className="whitespace-nowrap">2週間前後</span>、
        一般的な企業サイトであれば
        <span className="whitespace-nowrap">2〜4週間前後</span>を目安としています。
      </>
    ),
  },
  {
    q: "スマホ対応や検索対策は含まれますか？",
    a: (
      <>
        はい、全プランに含まれます。
        スマホでの見やすさを前提に構築し、表示速度やタイトル・説明文などの
        基本的な検索対策もあわせて行います。
      </>
    ),
  },
  {
    q: "まだ内容が固まっていないのですが、相談できますか？",
    a: (
      <>
        可能です。現状の事業内容や今後の方針を伺いながら、
        「まず何ページから始めるか」「どこまで載せるか」といった整理からご一緒します。
      </>
    ),
  },
];

// FAQ用：ReactNodeをプレーンテキストにする簡易関数（構造化データ用）
const toPlainText = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join(" ");

  // React要素（childrenを辿る）
  if (typeof node === "object" && "props" in (node as any)) {
    return toPlainText((node as any).props.children);
  }

  return "";
};

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

export default function FAQSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
      role="region"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-8 text-center">
          <h2
            id="faq-heading"
            className="text-2xl font-bold text-gray-900 sm:text-3xl"
          >
            よくある質問（抜粋）
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            初回のご相談でいただくことが多いご質問の一部です。
          </p>
        </div>

        {/* Q&A本体 */}
        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            aria-label="よくある質問"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.q}
                value={`item-${index}`}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <AccordionTrigger className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hover:no-underline sm:px-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="border-t px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-800 sm:px-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 補足＆お問い合わせ */}
        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]">
          {/* 「もっと見る」＋説明 */}
          <div className="flex flex-col justify-between gap-4">
            <p className="text-sm leading-relaxed text-gray-700">
              契約やお支払い方法、解約・運用中のルールなど、ここに載せきれていないご質問もあります。
              詳しく知りたい方は、よくある質問の詳細ページもあわせてご覧ください。
            </p>
            <div>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center text-xs font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
                aria-label="よくある質問をもっと見る"
              >
                よくある質問をもっと見る
              </Link>
            </div>
          </div>

          {/* メール・CTAカード */}
          <Card className="border border-gray-200 bg-gray-50/80 shadow-sm">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
                <p className="text-sm font-semibold text-gray-900">
                  個別のご質問・ご相談
                </p>
              </div>
              <p className="text-xs leading-relaxed text-gray-700">
                運用中のご質問や、ここに載っていない内容についても、
                メールでのご相談を随時受け付けています。
              </p>
              <p className="text-xs font-mono text-gray-800">{BRAND.email}</p>
              <div className="mt-2">
                <ContactCTA />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 構造化データ（FAQPage） */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </div>
    </section>
  );
}
