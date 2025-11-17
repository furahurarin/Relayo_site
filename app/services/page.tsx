// app/services/page.tsx  
import type { Metadata } from "next";
import ServicesPageClient from "./_client";

const siteDescription =
  "中小企業・個人事業主向けのホームページ制作。オンライン完結で最短2〜4週間で公開。スマホ対応・高速表示・基本的な検索対策・お問い合わせフォームまで標準対応。予約・決済・会員・SNS連携の追加も可能で、公開後の運用・保守まで一貫してサポートします。";

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
