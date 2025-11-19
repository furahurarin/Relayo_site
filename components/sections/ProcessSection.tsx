// components/sections/ProcessSection.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  LayoutTemplate,
  Rocket,
} from "lucide-react";

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-label="制作の流れ"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            制作の流れ
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            お問い合わせから公開・運用サポートまでの、大まかな流れです。
            状況により順番や回数は前後することがありますが、
            各ステップで確認しながら進めていきます。
          </p>
        </div>

        {/* STEP 1〜4 */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* STEP1 */}
          <Card className="h-full border-gray-200">
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                  STEP1
                </span>
                <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <CardTitle className="text-sm font-semibold text-gray-900">
                お問い合わせ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-gray-800">
              <p>
                フォームから、現在の状況やお困りごと、おおよそのご予算感などをお知らせください。
              </p>
              <p>
                内容を確認のうえ、メールで初回のご案内をお送りします。
              </p>
            </CardContent>
          </Card>

          {/* STEP2 */}
          <Card className="h-full border-gray-200">
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
              <CardTitle className="text-sm font-semibold text-gray-900">
                ヒアリング・ご提案
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-gray-800">
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
          <Card className="h-full border-gray-200">
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
              <CardTitle className="text-sm font-semibold text-gray-900">
                設計・制作
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-gray-800">
              <p>
                ご提案内容に合意いただいたあと、文章案・デザイン案のご確認と修正を重ねながらサイトを仕上げていきます。
              </p>
              <p>
                公開までの目安は、<span className="whitespace-nowrap">2〜4週間前後</span>です。
              </p>
            </CardContent>
          </Card>

          {/* STEP4 */}
          <Card className="h-full border-gray-200">
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
              <CardTitle className="text-sm font-semibold text-gray-900">
                公開・運用サポート
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-gray-800">
              <p>
                公開後は、軽微な修正やシステム更新、不具合時の初動対応などを継続して行い、長く使える状態を保ちます。
              </p>
              <p>
                必要に応じて、ページ追加や構成の見直しもご相談いただけます。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
