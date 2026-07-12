import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Analytics from "@/components/analytics/Analytics";
import { BRAND, EC_INVENTORY_POC } from "@/lib/constants";

export const viewport = {
  themeColor: "#111827",
  colorScheme: "light",
};

const siteDescription = EC_INVENTORY_POC.description;

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${EC_INVENTORY_POC.name} | 赤字SKU・滞留在庫を次のアクションへ`,
    template: `%s | ${EC_INVENTORY_POC.name}`,
  },
  description: siteDescription,
  keywords: [
    "EC在庫管理",
    "粗利分析",
    "滞留在庫",
    "赤字SKU",
    "在庫原価",
  ],
  openGraph: {
    title: `${EC_INVENTORY_POC.name} | 赤字SKU・滞留在庫を次のアクションへ`,
    description: siteDescription,
    url: BRAND.siteUrl,
    siteName: EC_INVENTORY_POC.name,
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `${EC_INVENTORY_POC.name} | 赤字SKU・滞留在庫を次のアクションへ`,
    description: siteDescription,
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.siteUrl,
    ...(BRAND.email ? { email: BRAND.email } : {}),
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: EC_INVENTORY_POC.name,
    description: siteDescription,
    serviceType: "EC在庫・粗利診断",
    provider: {
      "@type": "Organization",
      name: BRAND.name,
    },
    areaServed: "JP",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "非PC商材を扱うEC事業者",
    },
  };

  return (
    <html lang="ja">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
        >
          コンテンツへスキップ
        </a>

        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />

        <Analytics />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />

        <Header />

        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
