// components/footer.tsx
import Link from "next/link";
import { Building, MapPin, Mail } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-900 py-16 text-white"
      role="contentinfo"
      aria-label={`${BRAND.name} フッター`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-2xl font-bold">{BRAND.name}</h2>
            <p className="max-w-md leading-relaxed text-gray-300">
              {BRAND.name}
              （リレイオ）は、中小企業・スタートアップ・個人事業主のための
              ホームページ制作・運用サービスです。
              <br className="hidden sm:block" />
              必要なページだけに絞ったシンプルな構成で
              「まずは小さく立ち上げ」、公開後も更新・保守までまとめてお任せいただけます。
              全国対応・オンライン中心でご相談いただけます。
            </p>

            <div className="space-y-3" aria-label="運営情報">
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-gray-300">個人事業（将来法人化予定）</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-gray-300">拠点：オンライン／全国対応</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                {/* CTA統一のため mailto は貼らず情報表示のみ */}
                <span className="text-gray-300">{BRAND.email}</span>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav aria-label="メニュー" className="space-y-4">
            <h3 className="text-lg font-semibold">メニュー</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/#services"
                  className="transition-colors hover:text-white"
                >
                  サービス内容
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-white"
                >
                  料金とプラン
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="transition-colors hover:text-white"
                >
                  よくある質問
                </Link>
              </li>
              <li>
                <Link
                  href="/#company"
                  className="transition-colors hover:text-white"
                >
                  運営者情報
                </Link>
              </li>
            </ul>
          </nav>

          {/* Site / Legal */}
          <nav aria-label="各種ページ" className="space-y-4">
            <h3 className="text-lg font-semibold">各種ページ</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-white"
                >
                  料金ページ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
                  FAQページ
                </Link>
              </li>
              <li>
                <Link
                  href="/campaign"
                  className="transition-colors hover:text-white"
                >
                  キャンペーン
                </Link>
              </li>
              <li>
                {/* 入口はフォームに統一 */}
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold">法的情報</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/legal/terms"
                  className="transition-colors hover:text-white"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="transition-colors hover:text-white"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/tokusho"
                  className="transition-colors hover:text-white"
                >
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* CTA + Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-gray-400">
              © {year} {BRAND.name}. All rights reserved.
            </p>
            {/* CTAはフォームへ一本化 */}
            <div className="w-full sm:w-auto">
              <ContactCTA small full={false} />
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">
            お問い合わせは24時間受付。通常1〜2営業日以内にメールでご連絡いたします。
          </p>
        </div>
      </div>
    </footer>
  );
}
