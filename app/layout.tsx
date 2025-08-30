// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Header from "@/components/Header"; // 大文字小文字を統一
import Footer from "@/components/footer";
import Analytics from "@/components/analytics/Analytics";
import { BRAND, CAMPAIGN, CONTACT } from "../lib/constants";

export const metadata: Metadata = {
  title: BRAND.name,
  description: CAMPAIGN.metaDescription,
};

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
      <head>
        {/* Cloudflare Turnstile（ボット対策） */}
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </head>
      <body className="antialiased">
        {/* Umami */}
        <Analytics />
        {/* JSON-LD 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, siteJsonLd]) }}
        />
        <CampaignRibbon />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
