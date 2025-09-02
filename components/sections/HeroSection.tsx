// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import ContactCTA from "@/components/cta/ContactCTA";
import { Mail, Megaphone } from "lucide-react";
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
                売上につながる
                <span className="text-blue-600"> Web/アプリ </span>
                を、
                <br />
                <span className="text-orange-500">オンライン（メール中心）</span>
                で最短 2〜4 週間で。
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                初期費用を抑えて小さく立ち上げ、公開後は
                <strong>月額保守で継続改善</strong>。
                全国どこでも、非対面のスムーズな進行で成果に直結する導線を作ります。
              </p>
            </div>

            {/* ✅ CTAは「お問い合わせ」で統一 */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <ContactCTA />
              <Link
                href="#pricing"
                className="text-sm font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
              >
                料金を見る →
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              2分で完了。営業電話は行いません。回答はメールでお送りします。
            </p>

            {/* Campaign / Notice（詳細は専用ページへ集約） */}
            <Card className="bg-white/80 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Megaphone className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">キャンペーンのご案内</p>
                  <p className="text-sm text-emerald-900">
                    条件・対象・注意事項は
                    <Link
                      href="/campaign"
                      className="ml-1 underline underline-offset-4 decoration-emerald-600/60 hover:text-emerald-700"
                    >
                      キャンペーン案内
                    </Link>
                    に集約しています。
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
                  <span className="text-sm text-gray-700">{BRAND.email}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl bg-white p-8 shadow-xl">
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
