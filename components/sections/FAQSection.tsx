// components/sections/FAQSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "どのような業種に対応していますか？",
    answer:
      "美容院・整骨院・クリニック・飲食店・士業・教室・オンラインサービスなど、中小企業・個人事業主の方を中心に幅広く対応しています。専門用語だらけのサイトではなく、「お客さまに伝わる日本語」で組み立てることを重視しています。",
  },
  {
    question: "まだ内容が固まっていないのですが、相談だけでも可能ですか？",
    answer:
      "もちろん可能です。「何から決めればよいか分からない」という段階からご一緒します。目的（問い合わせ・予約・資料請求など）を整理したうえで、必要なページ構成や原稿の方向性をご提案します。",
  },
  {
    question: "制作期間はどれくらいかかりますか？",
    answer:
      "ページ数や準備状況にもよりますが、基本的な構成であれば、原稿・写真などの素材が揃ってから約3〜6週間を目安としています。お急ぎの場合はスケジュールを調整のうえ、可能な範囲で前倒し対応も検討いたします。",
  },
  {
    question: "月額費用や、ドメイン・サーバーの費用はどうなりますか？",
    answer:
      "制作費とは別に、ドメイン・サーバーなどの実費が発生します（おおよそ月数百円〜千円台が目安です）。月額の運用・保守プランは任意加入で、契約の縛りはありません。料金の考え方は「料金プラン」セクションで詳しくご案内しています。",
  },
  {
    question: "営業電話などはありますか？オンラインだけで完結できますか？",
    answer:
      "営業電話は行っておらず、やり取りは原則としてメール（必要に応じてオンライン通話）で完結します。対面での打ち合わせが難しい場合や、営業時間外に落ち着いて確認したい方にも安心してご利用いただけます。",
  },
  {
    question: "途中でやめたくなった場合、違約金などは発生しますか？",
    answer:
      "着手後のキャンセル時は、進行状況に応じてそれまでに発生した作業分のみご請求いたします。月額プランには最低契約期間の縛りはなく、翌月以降の停止希望を事前にご連絡いただければ、違約金などはかかりません。",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-10 text-center">
          <h2
            id="faq-heading"
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            よくあるご質問
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-700">
            ご検討の際によくいただくご質問をまとめました。
            ここにない内容も、お気軽にお問い合わせください。
          </p>
        </div>

        {/* FAQリスト */}
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="pr-4 text-base font-semibold text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`px-5 pb-4 text-sm leading-relaxed text-gray-700 transition-[max-height,opacity] duration-200 ${
                    isOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 [&>*]:hidden"
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 追いCTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-gray-700">
            「自分のケースではどうなるか？」など、
            個別のご事情についてはフォームから直接ご相談いただけます。
          </p>
          <div className="flex justify-center">
            <ContactCTA />
          </div>
        </div>
      </div>
    </section>
  );
}
