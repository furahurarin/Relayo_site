// app/services/page.tsx  ← サーバーコンポーネント
import type { Metadata } from "next";
import ServicesPageClient from "./_client";

export const metadata: Metadata = {
  // レイアウトで title テンプレートがあるため、ここは素の文言のみ
  title: "サービス",
  description:
    "中小企業・個人事業主向けのWeb/アプリ制作。Next.js + Tailwindで高速・保守しやすいサイトを短納期で提供。予約/会員/決済、LINE連携、運用保守まで一気通貫。",
};

export default function Page() {
  return <ServicesPageClient />;
}
