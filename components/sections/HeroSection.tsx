"use client";

import Link from "next/link";
import Image from "next/image";
import ContactCTA from "@/components/cta/ContactCTA";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-start overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* 1. 背景画像（フルスクリーン） */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-mockup.png"
          alt="Office Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* 2. オーバーレイ
            左側（文字エリア）をしっかり暗くして可読性を確保しつつ、
            右側は写真が見えるようにするグラデーション
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/20" />
        
        {/* ドットパターン（うっすらと質感をプラス） */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* 3. コンテンツ（左寄せ） */}
      <div className="relative z-10 w-full py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl space-y-8">
              
              {/* メイン見出し：日本語で堂々と */}
              <h1
                id="hero-heading"
                className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl"
              >
                成果につながる、<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  迷わないWeb制作
                </span>
              </h1>

              {/* リード文 */}
              <p className="max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
                必要なページだけを、分かりやすい料金で。<br className="hidden sm:block"/>
                最短2週間で公開し、その後の運用・保守まで伴走します。<br className="hidden sm:block"/>
                デザインの美しさと、成果を出すための設計を両立。
              </p>

              {/* 特徴リスト（アイコンのみ青にしてアクセントに） */}
              <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm font-medium text-slate-300 sm:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                  <span>明朗会計な料金プラン</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                  <span>スマホ対応・SEO標準</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                  <span>全国オンライン完結</span>
                </div>
              </div>

              {/* CTA ボタン群 */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* 問い合わせボタン（少し光らせて目立たせる） */}
                <div className="shadow-lg shadow-blue-900/40 transition-transform hover:scale-105">
                  <ContactCTA />
                </div>
                
                <Link
                  href="#pricing"
                  className="group flex items-center gap-2 px-4 py-2 text-base font-semibold text-white transition-all hover:text-blue-200"
                >
                  料金とプランを見る
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* スクロールインジケーター */}
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