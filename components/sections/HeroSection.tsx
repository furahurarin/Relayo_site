// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import ContactCTA from "@/components/cta/ContactCTA";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 lg:py-32"
      aria-labelledby="hero-heading"
      role="region"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-200 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            {/* 見出し */}
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              中小企業・スタートアップのための、
              <span className="block whitespace-nowrap">
                迷わないホームページ制作。
              </span>
            </h1>

            {/* リード文 */}
            <p className="text-lg leading-relaxed text-gray-700">
              必要なページだけを、分かりやすい料金で。
              <br className="hidden md:block" />
              最短2〜4週間で公開し、その後の運用・保守まで継続して伴走します。
            </p>

            {/* 提供内容の一行サマリ */}
            <p className="text-sm text-gray-700">
              全国対応／オンライン完結／スマホ最適化／高速表示／
              基本的な検索対策まで標準対応。
            </p>

            {/* CTA 行 */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ContactCTA />
              <Link
                href="#pricing"
                aria-label="料金とプランを確認する"
                data-umami-event="cta_pricing"
                data-umami-event-section="hero"
                className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
              >
                料金とプランを見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
