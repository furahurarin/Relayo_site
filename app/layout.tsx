// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Analytics from "@/components/analytics/Analytics";

export const metadata: Metadata = {
  title: "Relayo",
  description:
    "メール中心の非対面ヒアリング。先着3社は制作費¥0＋保守3ヶ月¥0（完全無料解約OK）。中小企業・個人事業主向けWeb/アプリ制作。",
};

// 上部のキャンペーン帯（薄いグリーン）
function CampaignRibbon() {
  return (
    <div className="w-full bg-emerald-50 text-emerald-900">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-2 text-center text-sm sm:flex-row sm:text-left">
        <p className="font-medium">
          <span className="mr-1">先着3社限定</span>
          ：<strong>制作費¥0 ＋ 保守3ヶ月¥0（Lite相当）</strong>
          <span className="ml-2 text-emerald-800">
            完全無料解約OK（移管・撤去も無償：上限2h）
          </span>
        </p>
        <div className="flex items-center gap-2">
          {/* メールで相談（計測：email_click） */}
          <a
            href="mailto:contact.relayo@gmail.com?subject=%E6%96%99%E9%87%91%E7%9B%B8%E8%AB%87%EF%BC%88%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%9A%E3%83%BC%E3%83%B3%E5%B8%8C%E6%9C%9B%EF%BC%89"
            className="rounded bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700"
            data-umami-event="email_click"
            data-umami-event-section="ribbon"
          >
            メールで相談
          </a>
          {/* 診断シート（計測：cta_sheet） */}
          <Link
            href="/contact?campaign=launch#get-sheet"
            className="rounded border border-emerald-300 px-3 py-1.5 text-emerald-900 hover:bg-emerald-100"
            data-umami-event="cta_sheet"
            data-umami-event-section="ribbon"
          >
            診断シートを受け取る
          </Link>
        </div>
      </div>
    </div>
  );
}

// シンプルなグローバルナビ
function TopNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-gray-900" aria-label="Relayo Home">
          Relayo
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-gray-700 sm:flex" aria-label="Global">
          <Link href="/#pricing" className="hover:text-gray-900">
            料金
          </Link>
          <Link href="/#faq" className="hover:text-gray-900">
            FAQ
          </Link>
          {/* 診断シート（計測：cta_sheet） */}
          <Link
            href="/contact?campaign=launch#get-sheet"
            className="rounded border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
            data-umami-event="cta_sheet"
            data-umami-event-section="nav"
          >
            診断シートを受け取る
          </Link>
          {/* メールで相談（計測：email_click） */}
          <a
            href="mailto:contact.relayo@gmail.com?subject=%E6%96%99%E9%87%91%E7%9B%B8%E8%AB%87%EF%BC%88%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%9A%E3%83%BC%E3%83%B3%E5%B8%8C%E6%9C%9B%EF%BC%89"
            className="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
            data-umami-event="email_click"
            data-umami-event-section="nav"
          >
            メールで相談
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head />
      <body className="antialiased">
        {/* Umami */}
        <Analytics />
        <CampaignRibbon />
        <TopNav />
        {children}
      </body>
    </html>
  );
}
