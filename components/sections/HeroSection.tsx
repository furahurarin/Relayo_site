// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import ContactCTA from "@/components/cta/ContactCTA";
import { FadeIn } from "@/components/ui/FadeIn";

export default function HeroSection() {
  return (
    <section
      id="hero"
      // 変更点: min-h-screen にして「画面の高さいっぱい」まで広げる
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      role="region"
    >
      {/* 1. 背景画像（フルスクリーン） */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-mockup.png"
          alt="Office Background"
          fill
          className="object-cover"
          priority
          placeholder="empty" // 画像がない場合の対策
        />
        {/* 2. オーバーレイ（文字を読みやすくするための黒いフィルター） */}
        {/* 写真が明るい場合は bg-black/60 (60%) などを /70 に強めてください */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 3. コンテンツ（中央揃え） */}
      <div className="relative z-10 w-full py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-4xl space-y-8 text-center">
              {/* 見出し（白文字） */}
              <h1
                id="hero-heading"
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
              >
                中小企業・スタートアップの、
                <span className="mt-2 block">
                  迷わないホームページ制作
                </span>
              </h1>

              {/* リード文（薄いグレー） */}
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
                必要なページだけを、分かりやすい料金で。
                <br className="hidden md:block" />
                最短2〜4週間で公開し、その後の運用・保守まで継続して伴走します。
              </p>

              {/* 提供内容の一行サマリ（さらに薄いグレー） */}
              <p className="text-sm font-medium text-gray-300 sm:text-base">
                全国どこでもオンライン完結／スマホ対応／高速表示／
                Google検索対策（SEO）まで標準対応。
              </p>

              {/* CTA ボタン行 */}
              <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
                {/* お問い合わせボタン */}
                {/* 背景に負けないよう、少しガラス風の座布団を敷く */}
                <div className="rounded-lg bg-white/10 p-1.5 backdrop-blur-md transition-transform hover:scale-105">
                  <ContactCTA />
                </div>
                
                <Link
                  href="#pricing"
                  aria-label="料金とプランを確認する"
                  data-umami-event="cta_pricing"
                  data-umami-event-section="hero"
                  className="text-base font-semibold text-white underline-offset-8 hover:text-blue-200 hover:underline"
                >
                  料金とプランを見る
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* 下部へのスクロールを促すインジケーター（任意） */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
}