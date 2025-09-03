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
  "中小企業・個人事業主向けのホームページ制作。オンライン完結で最短2〜4週間で公開。スマホ対応・表示速度・基本の検索対策・お問い合わせフォームまで標準対応。予約や決済などの機能追加、公開後の運用・保守にも対応します。";

export const metadata: Metadata = {
  title: "中小企業・個人事業主向け ホームページ制作",
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

      {/* 信頼性の取り組み（対応目安・セキュリティ・法令配慮） */}
      <section
        id="trust"
        aria-label="trust"
        className="container mx-auto my-12 grid grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:gap-6 lg:px-8"
      >
        <div className="rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5" aria-hidden />
            <h3 className="text-base font-semibold">サポート体制（対応目安）</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            重大な不具合は<strong>4時間以内に対応を開始</strong>します。その他のご相談は翌営業日から順次対応。
            定期の点検や報告はご契約プランに合わせて行います。
          </p>
        </div>

        <div className="rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5" aria-hidden />
            <h3 className="text-base font-semibold">セキュリティ</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            アカウントは原則お客様名義で運用。二要素認証と最小限の権限で管理し、変更履歴も記録します。
            将来の乗り換えや引き継ぎも安心です。
          </p>
        </div>

        <div className="rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5" aria-hidden />
            <h3 className="text-base font-semibold">法令・アクセシビリティ</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            個人情報の取り扱い・特定商取引法などのルールに配慮し、読みやすく誤解のない表現を心がけます。
            アクセシビリティは国内指針（JIS X 8341-3のAA相当）を参考に設計します。
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
          <p className="mx-auto mb-4 max-w-2xl text-sm text-gray-700 dark:text-gray-300">
            約2分で完了。営業電話はいたしません。ご案内はメールでお送りします。
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
