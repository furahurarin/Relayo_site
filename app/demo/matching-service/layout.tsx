// app/demo/matching-service/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Hexagon, Twitter, Facebook, Linkedin } from "lucide-react";
import ServiceHeader from "./components/ServiceHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | HireFlow（デモ）",
    default: "HireFlow | AI搭載の次世代求人マッチングプラットフォーム",
  },
  description: "【Relayo制作実績デモ】AI求人マッチング「HireFlow」のサービスサイト（LP）サンプル。先進的な機能性とコンバージョンを意識した、SaaS・スタートアップ向けのデザインです。",
  robots: { index: false, follow: false },
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-indigo-100">
      {/* デモ用管理バー */}
      <div className="sticky top-0 z-[100] flex items-center justify-between bg-slate-900 px-4 py-2 text-xs text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-500 px-2 py-0.5 text-[10px] font-bold text-white">
            DEMO
          </span>
          <span className="hidden sm:inline text-slate-300">
            制作実績デモ：Webサービス（SaaS / スタートアップ）
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/works"
            className="flex items-center text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            実績一覧に戻る
          </Link>
          <Link
            href="/contact"
            className="flex items-center rounded bg-blue-600 px-3 py-1.5 font-bold transition-colors hover:bg-blue-700"
          >
            制作を相談する
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>

      <ServiceHeader />

      <main className="relative">{children}</main>

      {/* フッター */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          {/* ...（フッター内容は変更なし）... */}
          <div className="grid gap-12 md:grid-cols-4 mb-16">
             {/* ...Logo, Product, Support... */}
             <div className="col-span-1 md:col-span-2">
                <Link href="/demo/matching-service" className="flex items-center gap-2 mb-6">
                  <Hexagon className="h-6 w-6 text-indigo-600 fill-indigo-600" />
                  <span className="text-lg font-bold text-slate-900">HireFlow</span>
                </Link>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
                  AIが最適な人材と企業を瞬時にマッチング。採用活動を、もっとスマートに、もっと科学的に。
                </p>
             </div>
             {/* ... */}
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">
              &copy; 2025 HireFlow Inc. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              ※このサイトはRelayoの制作実績デモです（架空のサービス）
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}