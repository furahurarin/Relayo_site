import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
// import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CompanySection from "@/components/sections/CompanySection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Relayo | 中小企業・個人事業主向け Web/アプリ制作",
  description:
    "メール中心の非対面ヒアリングで短納期。先着3社は制作費¥0＋保守3ヶ月¥0（完全無料解約OK）。Next.js・CMS・予約/決済にも対応します。",
};

const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* 実績は環境変数で制御（デフォルト非表示） */}
      {showPortfolio && (
        // <PortfolioSection />
        <div className="sr-only">Portfolio disabled</div>
      )}

      <ServicesSection />

      {/* ヒーローからのアンカー用に id を付与 */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* FAQ へもアンカーを付与（/contact から #faq で遷移） */}
      <section id="faq">
        <FAQSection />
      </section>

      <CompanySection />
      <Footer />
    </main>
  );
}
