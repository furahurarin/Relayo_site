// components/sections/CompanySection.tsx
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

export default function CompanySection() {
  return (
    <section
      id="company"
      aria-label="運営者情報とお問い合わせ"
      className="bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            運営者情報とお問い合わせ
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]">
          {/* 説明テキスト */}
          <div className="space-y-4 text-sm leading-relaxed text-gray-800">
            <p>
              Relayo（リレイオ）は、中小企業・個人事業主向けに、
              オンライン完結でのホームページ制作と運用支援を行う個人事業です。
              少人数の現場でも運用しやすいシンプルな構成と、
              後から拡張しやすい設計を重視し、「作って終わり」にならないサイトづくりを目指しています。
            </p>
            <p>
              技術的な前提知識がなくても、「誰に・何を・どのように伝えるか」を整理するところから一緒に進めていきます。
              事業やサービスの状況に合わせて、無理のない立ち上げ・改善プランをご提案します。
            </p>
            <p>
              まずは、今お考えのことや気になっている点をお聞かせください。
            </p>

            <div className="mt-6">
              <ContactCTA />
            </div>
          </div>

          {/* 運営者情報カード */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">
                運営者情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-800">
              <dl className="space-y-2">
                <div className="flex justify-between gap-2">
                  <dt className="text-xs text-gray-500">屋号</dt>
                  <dd className="text-xs font-medium text-gray-900">
                    Relayo（リレイオ）
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-xs text-gray-500">事業形態</dt>
                  <dd className="text-xs text-gray-900">個人事業</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-xs text-gray-500">提供サービス</dt>
                  <dd className="text-xs text-gray-900">
                    ホームページ制作・運用支援
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-xs text-gray-500">対応エリア</dt>
                  <dd className="text-xs text-gray-900">
                    全国（オンライン対応）
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                <Mail className="mt-[2px] h-4 w-4 text-blue-600" aria-hidden />
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    お問い合わせ窓口（メール）
                  </p>
                  <p className="text-xs font-mono text-gray-800">
                    {BRAND.email}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                ご相談内容やご状況に応じて、オンライン面談のご案内や、
                必要な情報の整理からサポートいたします。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
