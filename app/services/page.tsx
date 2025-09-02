// app/services/page.tsx  ← サーバーコンポーネント（静的）
import type { Metadata } from "next";
import ServicesPageClient from "./_client";

const siteDescription =
  "中小企業・個人事業主向けのWeb/アプリ制作。Next.js + Tailwindで高速・保守しやすいサイトを短納期で提供。予約/会員/決済、LINE連携、運用保守まで一気通貫。";

export const metadata: Metadata = {
  // レイアウト側の title テンプレート（%s | BRAND）に合わせて素の文言のみ指定
  title: "サービス",
  description: siteDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "サービス",
    description: siteDescription,
    url: "/services", // layout の metadataBase と合成される
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "サービス",
    description: siteDescription,
    images: ["/og.png"],
  },
};

// 静的化を明示（動的要素が無ければビルド時に確定）
export const dynamic = "force-static";

export default function Page() {
  return <ServicesPageClient />;
}
