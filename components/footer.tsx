// components/footer.tsx
import Link from "next/link";
import { Building, MapPin, Mail } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND, CAMPAIGN } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-2xl font-bold">{BRAND.name}</h3>
            <p className="max-w-md leading-relaxed text-gray-300">
              全国の中小企業・個人事業主のデジタル化を支援。
              <br className="hidden sm:block" />
              テンプレ＋AI活用で<strong>{CAMPAIGN.ribbonText}</strong>のWeb/アプリを構築し、
              公開後は<strong>運用まで伴走</strong>します（メール中心の非対面ヒアリング）。
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">個人事業（将来法人化予定）</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">拠点：オンライン／全国対応</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                {/* CTA統一のため mailto は貼らず情報表示のみ */}
                <span className="text-gray-300">{BRAND.email}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">サービス</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-white">
                  Web制作
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-white">
                  アプリ開発
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-white">
                  情報設計・要件定義
                </Link>
              </li>
            </ul>
          </div>

          {/* Site / Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">サイト</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  ホーム
                </Link>
              </li>
              <li>
                {/* 入口はフォームに統一 */}
                <Link href="/contact" className="transition-colors hover:text-white">
                  お問い合わせ（無料診断つき）
                </Link>
              </li>
            </ul>

            <h4 className="mt-6 text-lg font-semibold">法的情報</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/legal/terms" className="transition-colors hover:text-white">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="transition-colors hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/legal/tokusho" className="transition-colors hover:text-white">
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Campaign note */}
        <div className="mt-10 rounded-md border border-emerald-900/30 bg-emerald-800/10 p-4 text-sm text-emerald-200">
          <strong className="text-emerald-300">{CAMPAIGN.name}</strong>
          ：制作費 ¥0（諸経費のみ）＋ 保守{CAMPAIGN.freeCareMonths}ヶ月 ¥0（Lite相当）／
          {CAMPAIGN.freeCancelNote}。 対象：{CAMPAIGN.scope}／条件：実績掲載・レビュー協力、素材提出＝KO+7日。
        </div>

        {/* CTA + Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-gray-400">© {year} {BRAND.name}. All rights reserved.</p>
            {/* CTAはフォームへ一本化 */}
            <div className="w-full sm:w-auto">
              <ContactCTA />
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">
            2分で完了。営業電話は行いません。回答はメールでお送りします。
          </p>
        </div>
      </div>
    </footer>
  );
}
