// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, LayoutTemplate, Users } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection"; // ▼追加
import JournalSection from "@/components/sections/JournalSection";     // ▼追加
import { FadeIn } from "@/components/ui/FadeIn";
import ContactCTA from "@/components/cta/ContactCTA";
import { Button } from "@/components/ui/button";

const siteDescription =
  "中小企業・スタートアップのための、迷わないホームページ制作。必要なページだけを分かりやすい料金で、最短2〜4週間で公開。その後の運用・保守まで継続して伴走します。";

export const metadata: Metadata = {
  title: "中小企業・個人事業主向け ホームページ制作",
  description: siteDescription,
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* サービス概要セクション */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Service
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                中小企業・スタートアップに特化した、
                <br className="hidden sm:inline" />
                「小さく始めて、大きく育てる」Web制作サービスです。
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <LayoutTemplate className="mb-4 h-8 w-8 text-blue-600" />
                <h3 className="font-bold text-gray-900">Small Start</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  まずは必要なページだけに絞り、最短2週間での公開を実現します。
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <FileText className="mb-4 h-8 w-8 text-blue-600" />
                <h3 className="font-bold text-gray-900">Design</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  採用や集客など、目的に合わせて導線を設計します。
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <Users className="mb-4 h-8 w-8 text-blue-600" />
                <h3 className="font-bold text-gray-900">Support</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  公開後の更新や保守も、専任の担当者が継続してサポートします。
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/services">
                  サービス詳細を見る <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 制作実績セクション（復活） */}
      <PortfolioSection />

      {/* ブログセクション（復活・追加） */}
      <JournalSection />

      {/* 制作の流れ・会社情報・お問い合わせへの誘導 */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid gap-8 md:grid-cols-2">
              {/* 制作の流れ */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Process</h3>
                <p className="mt-2 text-sm text-gray-600">
                  お問い合わせからヒアリング、制作、公開までの流れをご案内します。
                </p>
                <div className="mt-6">
                  <Link
                    href="/process"
                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    制作の流れを見る &rarr;
                  </Link>
                </div>
              </div>

              {/* 運営者情報 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">About</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Relayoの運営方針や、私たちが大切にしていることについて。
                </p>
                <div className="mt-6">
                  <Link
                    href="/company"
                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    運営者情報を見る &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* 最終CTA */}
            <div className="mt-16 rounded-3xl bg-gray-900 py-12 text-center sm:py-16 px-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                まずは、お気軽にご相談ください
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-gray-300">
                「何から始めればいいか分からない」という段階でも構いません。
                現状の課題やご予算に合わせて、最適なプランをご提案します。
              </p>
              <div className="mt-8 flex justify-center">
                <ContactCTA />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}