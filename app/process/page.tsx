import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  LayoutTemplate,
  Rocket,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export const metadata: Metadata = {
  title: "制作の流れ",
  description:
    "お問い合わせから公開・運用サポートまでの、ホームページ制作の標準的な工程をご紹介します。",
};

export default function ProcessPage() {
  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <PageBreadcrumb items={[{ label: "制作の流れ" }]} />

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            制作の流れ
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
            お問い合わせから公開・運用サポートまでの、大まかな流れです。
            状況により順番や回数は前後することがありますが、
            各ステップで確認しながら進めていきます。
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* STEP1 */}
          <Card className="flex h-full flex-col border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                  STEP1
                </span>
                <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <CardTitle className="text-base font-bold text-gray-900">
                お問い合わせ
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-sm leading-relaxed text-gray-800">
              <p>
                フォームから、現在の状況やお困りごと、おおよそのご予算感などをお知らせください。
              </p>
              <p>
                内容を確認のうえ、メールで初回のご案内をお送りします。
              </p>
            </CardContent>
          </Card>

          {/* STEP2 */}
          <Card className="flex h-full flex-col border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                  STEP2
                </span>
                <MessageSquare
                  className="h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-base font-bold text-gray-900">
                ヒアリング・ご提案
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-sm leading-relaxed text-gray-800">
              <p>
                メールまたはオンライン面談で、サイトの狙いや想定しているお客さま像、
                必要なページ・機能を整理します。
              </p>
              <p>
                その上で、ページ構成案・概算のお見積り・スケジュール案をご提案します。
              </p>
            </CardContent>
          </Card>

          {/* STEP3 */}
          <Card className="flex h-full flex-col border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                  STEP3
                </span>
                <LayoutTemplate
                  className="h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-base font-bold text-gray-900">
                設計・制作
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-sm leading-relaxed text-gray-800">
              <p>
                ご提案内容に合意いただいたあと、文章案・デザイン案のご確認と修正を重ねながらサイトを仕上げていきます。
              </p>
              <p>
                公開までの目安は、<span className="whitespace-nowrap">2〜4週間前後</span>です。
              </p>
            </CardContent>
          </Card>

          {/* STEP4 */}
          <Card className="flex h-full flex-col border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                  STEP4
                </span>
                <Rocket
                  className="h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-base font-bold text-gray-900">
                公開・運用サポート
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-sm leading-relaxed text-gray-800">
              <p>
                公開後は、軽微な修正やシステム更新、不具合時の初動対応などを継続して行い、長く使える状態を保ちます。
              </p>
              <p>
                必要に応じて、ページ追加や構成の見直しもご相談いただけます。
              </p>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </main>
  );
}