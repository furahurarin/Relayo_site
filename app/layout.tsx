// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Analytics from "@/components/analytics/Analytics";
import { BRAND } from "@/lib/constants";
import FloatingContactCTA from "@/components/cta/FloatingContactCTA";

export const viewport = {
  themeColor: "#111827", // gray-900
  colorScheme: "dark",
};

const siteDescription =
  "中小企業・個人事業主向けのWeb/アプリ制作。Next.js + Tailwindで高速・保守しやすいサイトを短納期で提供。予約/会員/決済、LINE連携、運用保守まで一気通貫。";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: BRAND.name,
    template: `%s | ${BRAND.name}`,
  },
  description: siteDescription,
  openGraph: {
    title: BRAND.name,
    description: siteDescription,
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    images: ["/og.png"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: siteDescription,
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/", // 各ページで個別に上書き（/pricing など）
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

        {/* ※キャンペーン帯は常時表示を廃止（/campaign ページで個別掲載） */}

        <Header />

        {/* 主コンテンツ領域（ランドマーク＋ID） */}
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
