import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Analytics from "@/components/analytics/Analytics";
import { BRAND, DOCUMENT_POC } from "@/lib/constants";

export const viewport = {
  themeColor: "#111827",
  colorScheme: "light",
};

const siteDescription =
  "PDF・FAX・スキャンされた注文書や帳票を、Excel・CSVへデータ化。まずは1社1帳票から、人による確認付きで小さく有料検証します。";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${DOCUMENT_POC.name} | PDF・帳票をExcel・CSVへ`,
    template: `%s | ${DOCUMENT_POC.name}`,
  },
  description: siteDescription,
  openGraph: {
    title: `${DOCUMENT_POC.name} | PDF・帳票をExcel・CSVへ`,
    description: siteDescription,
    url: BRAND.siteUrl,
    siteName: DOCUMENT_POC.name,
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: `${DOCUMENT_POC.name} | PDF・帳票をExcel・CSVへ`,
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
    name: DOCUMENT_POC.name,
    description: siteDescription,
    provider: {
      "@type": "Organization",
      name: BRAND.name,
    },
    areaServed: "JP",
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
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
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
