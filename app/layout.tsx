// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Analytics from "@/components/analytics/Analytics";
import { BRAND, CAMPAIGN } from "@/lib/constants";
import ContactCTA from "@/components/cta/ContactCTA";
import FloatingContactCTA from "@/components/cta/FloatingContactCTA";

export const viewport = {
  themeColor: "#111827", // gray-900
  colorScheme: "dark",
};

export const metadata: Metadata = {
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
    canonical: "/", // 各ページで上書き（/pricing など）
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// --- Ribbon（必要ない時はこのコンポーネントごと削除OK） ---
function CampaignRibbon() {
  return (
    <div className="w-full bg-emerald-50 text-emerald-900" role="region" aria-label="キャンペーン情報">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-2 text-center text-sm sm:flex-row sm:text-left">
        <p className="font-medium">
          <span className="mr-1">先着{CAMPAIGN.seats}社限定</span>
          ：<strong>制作費¥0 ＋ 保守{CAMPAIGN.freeCareMonths}ヶ月¥0</strong>
          <span className="ml-2 text-emerald-800">{CAMPAIGN.freeCancelNote}</span>
        </p>
        <div className="flex items-center gap-2">
          {/* 入口を /contact に統一（Umami 計測は ContactCTA 内で発火） */}
          <ContactCTA small />
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD（Organization + WebSite）
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.siteUrl,
      email: BRAND.email,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: BRAND.siteUrl,
      name: BRAND.name,
      potentialAction: {
        "@type": "SearchAction",
        target: `${BRAND.siteUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <html lang="ja">
      <body className="antialiased">
        {/* Skip link（キーボード操作のための主コンテンツショートカット） */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-white"
        >
          コンテンツへスキップ
        </a>

        {/* Cloudflare Turnstile（サイト全体で使わないなら削除可） */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />

        {/* Umami */}
        <Analytics />

        {/* 構造化データ（SSRとCSRの差異を抑制） */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <CampaignRibbon />
        <Header />

        {/* 主コンテンツ領域を明示（ランドマーク＋ID） */}
        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />

        {/* 共通フローティングCTA（1回だけレンダリング） */}
        <FloatingContactCTA />
      </body>
    </html>
  );
}
