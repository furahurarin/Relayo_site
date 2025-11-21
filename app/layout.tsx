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

const OG_IMAGE_ABS = `${BRAND.siteUrl}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: { default: BRAND.name, template: `%s | ${BRAND.name}` },
  description: siteDescription,
  openGraph: {
    title: BRAND.name,
    description: siteDescription,
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    type: "website",
    locale: "ja_JP",
    images: [
      {
        // SNS向けのOGP画像（/app/opengraph-image.tsx）
        url: OG_IMAGE_ABS,
        width: 1200,
        height: 630,
        alt: `${BRAND.name} | 中小企業・個人事業主向けWeb/アプリ制作`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: siteDescription,
    // Twitter画像は絶対URL必須
    images: [OG_IMAGE_ABS],
  },
  alternates: { canonical: "/" },
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
  // favicon / apple-touch-icon は app/icon.png 等のファイル規約に任せる
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD をオブジェクト2本に分ける（配列にしない）
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.siteUrl,
    // Google にロゴを明示（Knowledge Panel・ロゴ表示用）
    logo: {
      "@type": "ImageObject",
      url: `${BRAND.siteUrl}${BRAND.logo}`,
    },
    ...(BRAND.email ? { email: BRAND.email } : {}),
  };

  const siteLd = {
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
        {/* Skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-white"
        >
          コンテンツへスキップ
        </a>

        {/* Cloudflare Turnstile（不要なら削除可） */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />

        {/* Umami */}
        <Analytics />

        {/* 構造化データを script 2本に分割して挿入 */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />

        <Header />

        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />

        <FloatingContactCTA />
      </body>
    </html>
  );
}
