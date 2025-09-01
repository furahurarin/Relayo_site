// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Analytics from "@/components/analytics/Analytics";
import { BRAND, CAMPAIGN } from "../lib/constants";
import ContactCTA from "@/components/cta/ContactCTA";
import FloatingContactCTA from "@/components/cta/FloatingContactCTA";

export const metadata: Metadata = {
  // 本番ドメインを基準URLに
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: BRAND.name,
    template: `%s | ${BRAND.name}`,
  },
  description: CAMPAIGN.metaDescription,
  openGraph: {
    title: BRAND.name,
    description: CAMPAIGN.metaDescription,
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    images: ["/og.png"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: CAMPAIGN.metaDescription,
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
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
          {/* 入口を /contact に統一（Umami計測は ContactCTA 内で click_contact_cta を発火） */}
          <ContactCTA small />
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD 構造化データ
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
      <body className="antialiased">
        {/* Cloudflare Turnstile（必要なら残す／邪魔なら削除OK） */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />

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

        {/* 画面下のフローティングCTA（全ページ共通で1回だけ出す） */}
        <FloatingContactCTA />
      </body>
    </html>
  );
}
