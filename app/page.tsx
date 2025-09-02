// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
// import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import CompanySection from "@/components/sections/CompanySection";
import ContactCTA from "@/components/cta/ContactCTA";
import { Shield, FileText, Clock } from "lucide-react";

/**
 * ✅ レイアウトで title テンプレート（`%s | BRAND`）を使っているため、
 *   ここではプレーンなタイトル文字列だけを指定します。
 */
const siteDescription =
  "中小企業・個人事業主向けのWeb/アプリ制作。Next.js + Tailwindで高速・保守しやすいサイトを短納期で提供。予約/会員/決済、LINE連携、運用保守まで一気通貫。";

export const metadata: Metadata = {
  title: "中小企業・個人事業主向け Web/アプリ制作",
  description: siteDescription,
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

      {/* 信頼性の取り組み（SLA・セキュリティ・法令配慮） */}
      <section
        id="trust"
        aria-label="trust"
        className="container mx-auto my-12 grid grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:gap-6 lg:px-8"
      >
        <div className="rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5" aria-hidden />
            <h3 className="text-base font-semibold">SLA（初動目安）</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            P1：4時間以内／P2：翌営業日／P3：週次。保守プランに応じて対応レベルを定義します。
          </p>
        </div>
        <div className="rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5" aria-hidden />
            <h3 className="text-base font-semibold">セキュリティ</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            最小権限・2FA・変更履歴の管理を徹底。ドメイン／ホスティングは原則お客様名義で運用します。
          </p>
        </div>
        <div className="rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5" aria-hidden />
            <h3 className="text-base font-semibold">法令・アクセシビリティ</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            プライバシー・特定商取引法に配慮し、JIS X 8341-3（AA 目標）を意識した設計・表記を行います。
          </p>
        </div>
      </section>

      {/* 中腹CTA（/contact に統一） */}
      <section
        aria-label="mid-cta"
        className="container mx-auto my-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border bg-white/60 p-6 text-center shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
          <h2 className="mb-3 text-xl font-semibold">お問い合わせ</h2>
          <p className="mx-auto mb-4 max-w-2xl text-sm text-gray-600 dark:text-gray-400">約2分で完了。営業電話は行いません。メールで丁寧にご案内します。
          </p>
          <div className="flex justify-center">
            <ContactCTA />
          </div>
        </div>
      </section>

      {/* ヒーローからのアンカー用に id を付与 */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* FAQ へもアンカーを付与（/contact から #faq で遷移） */}
      <section id="faq">
        <FAQSection />
      </section>

      <CompanySection />
    </main>
  );
}


