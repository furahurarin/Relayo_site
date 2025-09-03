// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import ContactCTA from "@/components/cta/ContactCTA";
import { Mail, Megaphone, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 lg:py-32"
      aria-labelledby="hero-heading"
      role="region"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1
                id="hero-heading"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                売上につながる<span className="whitespace-nowrap">ホームページ</span>を、
                <br />
                オンライン完結で。最短<span className="whitespace-nowrap">2〜4週間</span>で公開します。
              </h1>

              <p className="text-lg leading-relaxed text-gray-700">
                初期費用を抑え、必要なページから着実に公開します。公開後は計画に沿った継続的な改善までお任せください。
                全国対応。主にメールで進行し、必要に応じてオンライン面談を行います。
              </p>

              {/* 基本ポリシー */}
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-800 sm:grid-cols-3">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  <span>重大な不具合は<span className="font-semibold">4時間以内に対応開始</span></span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  <span>税込価格表示・契約の縛りなし</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  <span>お問い合わせは約2分で完了</span>
                </li>
              </ul>
            </div>

            {/* ✅ 主導線は /contact、料金はサブ導線 */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <ContactCTA />
              <Link
                href="#pricing"
                aria-label="料金セクションへ（プランと価格を確認）"
                data-umami-event="cta_pricing"
                data-umami-event-section="hero"
                className="text-sm font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
              >
                料金を見る →
              </Link>
            </div>
            <p className="text-xs text-gray-600">
              約2分で完了。営業電話はいたしません。ご案内はメールでお送りします。
            </p>

            {/* Campaign / Notice（詳細は専用ページへ集約） */}
            <Card className="bg-white/80 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Megaphone className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">キャンペーンのご案内</p>
                  <p className="text-sm text-emerald-900">
                    「制作費¥0＋保守3ヶ月¥0（条件あり）」の条件・対象・注意事項は
                    <Link
                      href="/campaign"
                      className="ml-1 underline underline-offset-4 decoration-emerald-600/60 hover:text-emerald-700"
                    >
                      キャンペーン案内
                    </Link>
                    に掲載しています。
                  </p>
                </div>
              </div>
            </Card>

            {/* 連絡先メール（表示のみ。クリック導線は /contact に統一） */}
            <Card className="bg-white/80 p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-gray-900">お問い合わせ</p>
                  <span className="text-sm text-gray-800">{BRAND.email}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div
              className="relative z-10 rounded-2xl bg-white p-8 shadow-xl"
              role="img"
              aria-label="オンライン完結・短納期のWeb制作イメージ"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="mb-2 h-6 animate-pulse rounded bg-blue-200" />
                  <div className="space-y-2">
                    <div className="h-3 animate-pulse rounded bg-blue-100" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-blue-100" />
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Gradient Orbs */}
            <div className="absolute -top-6 -right-6 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-20" />
            <div className="absolute -bottom-6 -left-6 h-72 w-72 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
