"use client";

import Link from "next/link";
import { Mail, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-2xl font-bold">Relayo</h3>
            <p className="max-w-md leading-relaxed text-gray-300">
              全国の中小企業・個人事業主のデジタル化を支援。
              <br className="hidden sm:block" />
              テンプレ＋AI活用で<strong>短納期・低コスト</strong>のWeb/アプリを構築し、
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
                <a
                  href="mailto:contact.relayo@gmail.com"
                  className="text-blue-400 transition-colors hover:text-blue-300"
                  aria-label="メールで相談（メール作成画面を開く）"
                  data-umami-event="email_click"
                  data-umami-event-section="footer-info"
                >
                  contact.relayo@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">サービス</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-white"
                  data-umami-event="cta_pricing"
                  data-umami-event-section="footer-services"
                >
                  Web制作
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-white"
                  data-umami-event="cta_pricing"
                  data-umami-event-section="footer-services"
                >
                  アプリ開発
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-white"
                  data-umami-event="cta_pricing"
                  data-umami-event-section="footer-services"
                >
                  情報設計・要件定義
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?campaign=launch#get-sheet"
                  className="transition-colors hover:text-white"
                  data-umami-event="cta_sheet"
                  data-umami-event-section="footer-services"
                >
                  運用サポート（診断シート）
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">法的情報</h4>
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
          <strong className="text-emerald-300">創業応援ローンチ（先着3社）</strong>
          ：制作費 ¥0（諸経費のみ）＋ 保守3ヶ月 ¥0（Lite相当）／完全無料解約OK。
          移管・撤去も無償（上限2h）。対象：LP 3–5p・40h上限／条件：実績掲載・レビュー協力、
          素材提出＝KO+7日。
        </div>

        {/* CTA + Copy */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-gray-400">© {year} Relayo. All rights reserved.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                <a
                  href="mailto:contact.relayo@gmail.com?subject=%E6%96%99%E9%87%91%E7%9B%B8%E8%AB%87%EF%BC%88%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%9A%E3%83%BC%E3%83%B3%E5%B8%8C%E6%9C%9B%EF%BC%89"
                  aria-label="メールで相談（メール作成画面を開く）"
                  data-umami-event="email_click"
                  data-umami-event-section="footer-cta"
                >
                  メールで相談
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 hover:bg-gray-800"
              >
                <Link
                  href="/contact?campaign=launch#get-sheet"
                  aria-label="診断シートを受け取る"
                  data-umami-event="cta_sheet"
                  data-umami-event-section="footer-cta"
                >
                  診断シートを受け取る
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
