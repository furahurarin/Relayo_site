// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Analytics from "@/components/analytics/Analytics";
import { BRAND, CAMPAIGN, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: BRAND.name,
  description: CAMPAIGN.metaDescription,
};

// 上部のキャンペーン帯（薄いグリーン）
function CampaignRibbon() {
  return (
    <div className="w-full bg-emerald-50 text-emerald-900">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-2 text-center text-sm sm:flex-row sm:text-left">
        <p className="font-medium">
          <span className="mr-1">先着{CAMPAIGN.seats}社限定</span>
          ：<strong>制作費¥0 ＋ 保守{CAMPAIGN.freeCareMonths}ヶ月¥0</strong>
          <span className="ml-2 text-emerald-800">{CAMPAIGN.freeCancelNote}</span>
        </p>
        <div className="flex items-center gap-2">
          {/* メールで相談（計測：email_click） */}
          <a
            href={CONTACT.mailto}
            className="rounded bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700"
            data-umami-event="email_click"
            data-umami-event-section="ribbon"
          >
            {CAMPAIGN.labels.email}
          </a>
          {/* 診断シート（計測：cta_sheet） */}
          <Link
            href={CAMPAIGN.sheetHref}
            className="rounded border border-emerald-300 px-3 py-1.5 text-emerald-900 hover:bg-emerald-100"
            data-umami-event="cta_sheet"
            data-umami-event-section="ribbon"
          >
            {CAMPAIGN.labels.sheet}
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
        <Link href="/" className="text-lg font-bold text-gray-900" aria-label={`${BRAND.name} Home`}>
          {BRAND.name}
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm text-gray-700 sm:flex"
          aria-label="Global"
        >
          <Link href="/#pricing" className="hover:text-gray-900">
            料金
          </Link>
          <Link href="/#faq" className="hover:text-gray-900">
            FAQ
          </Link>
          {/* 診断シート（計測：cta_sheet） */}
          <Link
            href={CAMPAIGN.sheetHref}
            className="rounded border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
            data-umami-event="cta_sheet"
            data-umami-event-section="nav"
          >
            {CAMPAIGN.labels.sheet}
          </Link>
          {/* メールで相談（計測：email_click） */}
          <a
            href={CONTACT.mailto}
            className="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
            data-umami-event="email_click"
            data-umami-event-section="nav"
          >
            {CAMPAIGN.labels.email}
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD構造化データ
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.siteUrl,
    email: BRAND.email,
  };
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: BRAND.siteUrl,
    name: BRAND.name,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BRAND.siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="ja">
      <head />
      <body className="antialiased">
        {/* Umami */}
        <Analytics />
        {/* JSON-LD 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, siteJsonLd]) }}
        />
        <CampaignRibbon />
        <TopNav />
        {children}
      </body>
    </html>
  );
}
