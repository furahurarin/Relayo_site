// app/faq/page.tsx
import type { Metadata } from "next";
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
import { FadeIn } from "@/components/ui/FadeIn";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "Relayoのサービスや料金、契約に関するよくある質問をまとめています。",
};

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
  {
    q: "契約期間の縛りはありますか？",
    a: "制作プランについては買い切りですので、契約期間の縛りはありません。運用・保守プランについては原則6ヶ月ごとの更新となりますが、解約希望月の1ヶ月前までにご連絡いただければスムーズに解約・移管手続きを行います。",
  },
  {
    q: "ドメインやサーバーは自分で用意する必要がありますか？",
    a: "基本的にはお客様名義でご契約いただくことを推奨していますが、取得方法のサポートや代行も可能です。お気軽にご相談ください。",
  },
];

// 構造化データ用ヘルパー
const toPlainText = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join(" ");
  if (typeof node === "object" && "props" in (node as any)) {
    return toPlainText((node as any).props.children);
  }
  return "";
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: toPlainText(f.a) },
  })),
};

export default function FAQPage() {
  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <PageBreadcrumb items={[{ label: "よくある質問" }]} />
        
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />

        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            FAQ
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            よくある質問と回答をまとめています。
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-gray-200 bg-white px-6 py-2 shadow-sm"
              >
                <AccordionTrigger className="text-left text-sm font-bold text-gray-900 hover:no-underline hover:text-blue-700">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-700 pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* お問い合わせ誘導 */}
          <div className="mt-12">
            <Card className="border border-blue-100 bg-blue-50/50 shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-bold text-gray-900">
                    解決しない場合はこちら
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    運用中のご質問や、ここに載っていない内容についても、
                    <br />
                    お気軽にご相談ください。
                  </p>
                </div>
                <ContactCTA />
                <p className="text-xs font-mono text-gray-500 mt-2">{BRAND.email}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}