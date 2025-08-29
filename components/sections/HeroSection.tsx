"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ArrowRight, Megaphone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                売上につながる
                <span className="text-blue-600"> Web/アプリ </span>
                を、
                <br />
                <span className="text-orange-500">メールだけ</span>
                で最短2–4週で。
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                初期費用を抑え、公開後の月額保守で継続改善。<strong>非対面ヒアリング（メール主導）</strong>
                で、全国どこでもスピーディに進行します。
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group bg-blue-600 text-white hover:bg-blue-700"
                asChild
              >
                <a
                  href="mailto:contact.relayo@gmail.com?subject=%E6%96%99%E9%87%91%E7%9B%B8%E8%AB%87%EF%BC%88%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%9A%E3%83%BC%E3%83%B3%E5%B8%8C%E6%9C%9B%EF%BC%89"
                  aria-label="メールで相談（メール作成画面を開く）"
                  data-umami-event="email_click"
                  data-umami-event-section="hero"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  メールで相談
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
                asChild
              >
                <Link
                  href="/contact?campaign=launch#get-sheet"
                  aria-label="診断シートを受け取る"
                  data-umami-event="cta_sheet"
                  data-umami-event-section="hero"
                >
                  診断シートを受け取る
                </Link>
              </Button>
            </div>

            {/* Campaign Info */}
            <Card className="bg-white/80 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Megaphone className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    創業応援ローンチ（先着3社）
                  </p>
                  <p className="text-sm text-emerald-900">
                    <strong>制作費 ¥0（諸経費のみ）＋ 保守3ヶ月 ¥0（Lite相当）</strong>
                    ／<strong>完全無料解約OK</strong>。移管・撤去も無償（上限2h）。
                  </p>
                  <p className="text-xs text-emerald-900">
                    対象：LP 3–5p・40h上限／追加機能は別見積。条件：実績掲載・レビュー協力、素材提出=KO+7日。
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Email */}
            <Card className="bg-white/80 p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">お問い合わせ</p>
                  <a
                    href="mailto:contact.relayo@gmail.com"
                    className="text-sm text-blue-600 underline-offset-2 hover:underline"
                    aria-label="メールで相談（メール作成画面を開く）"
                    data-umami-event="email_click"
                    data-umami-event-section="hero-contact"
                  >
                    contact.relayo@gmail.com
                  </a>
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
                  <div className="h-4 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="mb-2 h-6 rounded bg-blue-200 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 rounded bg-blue-100 animate-pulse" />
                    <div className="h-3 w-2/3 rounded bg-blue-100 animate-pulse" />
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
