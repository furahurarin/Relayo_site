// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import CompanySection from "@/components/sections/CompanySection";
import ContactCTA from "@/components/cta/ContactCTA";
import { Shield, FileText, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * ✅ レイアウトで title テンプレート（`%s | BRAND`）を使っているため、
 * ここではプレーンなタイトル文字列だけを指定します。
 */
const siteDescription =
  "中小企業・スタートアップのための、迷わないホームページ制作。必要なページだけを分かりやすい料金で、最短2〜4週間で公開。その後の運用・保守まで継続して伴走します。全国対応・オンライン完結・スマホ対応・高速表示・Google検索対策（SEO）も標準対応です。";

export const metadata: Metadata = {
  title: "中小企業・個人事業主向け ホームページ制作",
  description: siteDescription,
};

const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HeroSection 内ですでに FadeIn を使用しているため、ここはラップしない */}
      <HeroSection />

      {/* 制作例（実績）は環境変数で制御 */}
      {showPortfolio && (
        <section id="portfolio">
          <FadeIn>
            <PortfolioSection />
          </FadeIn>
        </section>
      )}

      {/* 悩み → Relayo の説明 → 3つの特徴 → サービス内容 */}
      <FadeIn>
        <ServicesSection />
      </FadeIn>

      {/* 料金とプラン（アンカー用に id を付与） */}
      <section id="pricing">
        <FadeIn>
          <PricingSection />
        </FadeIn>
      </section>

      {/* 制作の流れ */}
      <section id="process">
        <FadeIn>
          <ProcessSection />
        </FadeIn>
      </section>

      {/* サポート体制・セキュリティ・法令配慮 */}
      <section
        id="trust"
        aria-label="trust"
        className="container mx-auto my-12 px-4 sm:px-6 lg:px-8"
      >
        <FadeIn>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {/* サポート体制 */}
            <div className="rounded-2xl border bg-white/90 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
              <div className="mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5" aria-hidden />
                <h3 className="text-base font-semibold">サポート体制（対応目安）</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  重大な不具合については、原則
                  <span className="whitespace-nowrap">4時間以内</span>
                  の対応開始を目安としています。
                  その他のご相談や中程度の不具合については、翌営業日以降、順次対応します。
                  軽微な修正については、週内での対応を基本とし（ご契約プランにより異なります）、
                  運用に支障が出ない状態を保ちます。
                </p>
                <p>
                  運用中のご質問やご相談は、メールにて随時受け付けています。
                  「少し気になる」「判断に迷っている」といった段階でも、お気軽にご相談ください。
                </p>
              </div>
            </div>

            {/* セキュリティ */}
            <div className="rounded-2xl border bg-white/90 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" aria-hidden />
                <h3 className="text-base font-semibold">セキュリティ</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                アカウントは原則お客様名義で運用し、二要素認証と最小限の権限で管理します。
                将来の乗り換えや引き継ぎを見据え、アクセス権限と変更履歴を整理した形で運用します。
              </p>
            </div>

            {/* 法令・アクセシビリティ */}
            <div className="rounded-2xl border bg-white/90 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" aria-hidden />
                <h3 className="text-base font-semibold">法令・アクセシビリティ</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                個人情報の取り扱い・特定商取引法などのルールに配慮し、
                読みやすく誤解のない表現を心がけます。
                アクセシビリティは国内指針（JIS X 8341-3のAA相当）を参考に設計します。
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 中腹CTA（/contact に統一） */}
      <section
        aria-label="mid-cta"
        className="container mx-auto my-12 px-4 sm:px-6 lg:px-8"
      >
        <FadeIn>
          <div className="rounded-2xl border bg-white/90 p-6 text-center shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
            <h2 className="mb-3 text-xl font-semibold">お問い合わせ</h2>
            <p className="mx-auto mb-4 max-w-2xl text-sm text-gray-700 dark:text-gray-300">
              約2分で完了。営業電話はいたしません。ご案内はメールでお送りします。
            </p>
            <div className="flex justify-center">
              <ContactCTA />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ（よくある質問） */}
      <section id="faq">
        <FadeIn>
          <FAQSection />
        </FadeIn>
      </section>

      {/* 運営者情報とお問い合わせ */}
      <CompanySection />
    </main>
  );
}