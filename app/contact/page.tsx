// app/contact/page.tsx
import type { Metadata } from "next";
import { Mail, ShieldCheck, Clock3, FileText } from "lucide-react";

import { BRAND } from "@/lib/constants";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: `お問い合わせ・無料診断 | ${BRAND.name}`,
  description:
    "Relayoへのお問い合わせ・無料診断の窓口です。Webサイト制作やリニューアル、保守・運用のご相談をオンライン（メール中心）で受け付けています。約2分で入力が完了し、通常1営業日以内にご返信します。",
};

export default function ContactPage() {
  return (
    <main
      className="bg-gray-50 py-16 sm:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ページヘッダー */}
        <div className="mb-10 space-y-4 text-center">
          <h1
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            お問い合わせ・無料診断
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            Webサイト・LP制作、リニューアル、保守・運用に関するご相談を受け付けています。
            約2分で入力が完了します。内容を確認のうえ、
            <span className="font-semibold">通常1営業日以内にメールでご連絡</span>
            します。
          </p>
          <p className="mx-auto max-w-2xl text-sm text-gray-500">
            営業電話は行いません。やり取りは原則メールで進行しますので、
            お時間の取りづらい方でもご相談いただけます。
          </p>
        </div>

        {/* 2カラムレイアウト：左＝説明／右＝フォーム */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* 左カラム：案内・診断シート説明など */}
          <section
            aria-labelledby="contact-info-heading"
            className="space-y-6"
          >
            <Card className="border-0 bg-white shadow-md">
              <CardHeader>
                <CardTitle
                  id="contact-info-heading"
                  className="text-xl font-bold text-gray-900"
                >
                  まずはお気軽にご相談ください
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-gray-700">
                <p>
                  「まだ具体的に決まっていない」「予算や時期のイメージだけ決まっている」
                  といった段階でも問題ありません。現状とご希望をもとに、
                  <span className="font-semibold">
                    必要なページ数や構成、概算費用の目安
                  </span>
                  を整理してご提案します。
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <ShieldCheck
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <p>
                      <span className="font-semibold">
                        営業電話・しつこい営業はいたしません。
                      </span>
                      ご希望がない限り、やり取りはメール中心で完結します。
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock3
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <p>
                      送信後、
                      <span className="font-semibold">通常1営業日以内</span>
                      にご返信します。お急ぎの場合は「ご要件」欄にその旨をご記入ください。
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <p>
                      具体的なイメージがある場合は、
                      既存サイトのURLや参考サイトのURLを「ご要件」欄にお書きください。
                      より精度の高いご提案が可能になります。
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 診断シート導線エリア（CAMPAIGN.sheetHref = /contact#get-sheet からの着地点） */}
            <section
              id="get-sheet"
              aria-label="無料診断シートについて"
              className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4 text-sm leading-relaxed text-gray-800"
            >
              <h2 className="mb-2 text-base font-semibold text-gray-900">
                無料診断シートをご希望の方へ
              </h2>
              <p className="mb-2">
                フォーム送信後、
                <span className="font-semibold">
                  現状のWebサイトや集客状況を整理した「簡易診断シート」
                </span>
                をメールでお送りすることができます。
              </p>
              <p className="mb-2">
                ご希望の方は、
                <span className="font-semibold">
                  「ご要件・現状の課題」欄の冒頭に「診断シート希望」
                </span>
                とご記入ください。内容を拝見し、現状の整理と改善の方向性をまとめてお送りします。
              </p>
              <p className="text-xs text-gray-600">
                ※ 無料診断は、Web制作・リニューアル・運用をご検討中の事業者さま向けのサービスです。
                内容によってはお時間をいただく場合があります。
              </p>
            </section>

            {/* 連絡先メール（表示のみ） */}
            <Card className="border-0 bg-white shadow-md">
              <CardContent className="flex items-start gap-3 p-4">
                <Mail
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    メールでのご相談先
                  </p>
                  <p className="text-sm text-gray-800">
                    {BRAND.email}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    メールアドレスのコピーのみご利用いただけます。
                    お問い合わせ窓口はこのページのフォームに統一しています。
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 右カラム：フォーム本体 */}
          <section
            aria-label="お問い合わせフォーム"
            className="space-y-4"
          >
            <ApplicationForm />
            <p className="text-xs text-gray-600">
              ご入力いただいた内容は、お見積りやご連絡の目的以外には使用しません。
              詳しくは{" "}
              <a
                href="/legal/privacy"
                className="underline underline-offset-4"
              >
                プライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
