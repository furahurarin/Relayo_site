// components/sections/CompanySection.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Building,
  Users,
  Target,
  Award,
  TrendingUp,
  Mail,
} from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND, CAMPAIGN } from "@/lib/constants";

export default function CompanySection() {
  const companyInfo = [
    { icon: Building, label: "事業形態", value: "個人事業（将来法人化予定）" },
    { icon: MapPin, label: "対応エリア", value: "全国（オンライン／リモート対応）" },
    { icon: Users, label: "対象顧客", value: "中小企業・個人事業主" },
    { icon: Target, label: "専門分野", value: "Web/アプリ制作・デジタル化支援（設計→制作→運用）" },
  ] as const;

  const strengths = [
    {
      icon: Target,
      title: "行動から逆算した設計",
      description:
        "予約・電話・問い合わせなど“売上に直結する行動”から逆算。KPI起点で情報設計と導線を最適化します。",
    },
    {
      icon: Award,
      title: "メール非対面でも精度高く",
      description:
        "診断シート → メール往復（1–2回）で要件を確定。打合せコストを抑えつつ、文言と決裁フローの精度を両立。",
    },
    {
      icon: TrendingUp,
      title: "データで継続改善",
      description:
        "Umami または GA4で可視化し、軽微改修（月2h/2件）とA/Bテスト（プランに応じて）で“作って終わり”にしません。",
    },
  ] as const;

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">会社情報</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Relayo は、全国の中小企業・個人事業主のみなさまのデジタル化を
            「設計→制作→運用」の一貫体制で支援します。すべて<strong>メール中心の非対面</strong>で完結します。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Company Basic Info */}
          <Card className="border-0 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Relayo（リレイオ）</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                中小企業・個人事業主向け Web/アプリ制作・運用支援
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {companyInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{info.label}</p>
                        <p className="text-base text-gray-900">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm leading-relaxed text-gray-600">
                  「小さく立ち上げ、計測し、改善する」を軸に、長期の伴走体制で成果へコミット。
                  ドメイン・ホスティングは原則お客様名義、当方は必要権限のみで運用する安心設計です。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Strengths */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">私たちの強み</h3>
            {strengths.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.title} className="border-0 bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-2 text-lg font-semibold text-gray-900">{s.title}</h4>
                        <p className="leading-relaxed text-gray-600">{s.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA（入口は /contact に一本化、メールは表示のみ） */}
        <div className="mt-16">
          <Card className="mx-auto max-w-4xl border-2 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">まずはお問い合わせ（無料診断つき）</h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                診断シートで現状とKPIを共有いただければ、最短ルートの立ち上げと公開後の運用計画までまとめてご提案します。
              </p>

              <div className="flex justify-center">
                <ContactCTA />
              </div>

              {/* メールは信頼担保のために明記（クリックはさせない） */}
              <p className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <span className="font-mono">{BRAND.email}</span>
              </p>

              <p className="mt-4 text-xs text-gray-500">
                ※ {CAMPAIGN.name}：先着{CAMPAIGN.seats}社は「制作費¥0 × 保守{CAMPAIGN.freeCareMonths}ヶ月¥0（Lite相当）」＋
                {CAMPAIGN.freeCancelNote}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
