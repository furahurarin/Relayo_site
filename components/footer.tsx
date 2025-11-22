// components/footer.tsx
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/constants";

// サイトマップ用リンク（ブログ・実績を除外）
const SITEMAP = [
  { label: "ホーム", href: "/" },
  { label: "サービス", href: "/services" },
  // { label: "制作実績", href: "/works" },
  { label: "料金プラン", href: "/pricing" },
  { label: "制作の流れ", href: "/process" },
  // { label: "ブログ・お知らせ", href: "/blog" },
  { label: "運営者情報", href: "/company" },
  { label: "FAQ", href: "/faq" },
];

// 法的情報リンク
const LEGAL = [
  { label: "プライバシーポリシー", href: "/legal/privacy" },
  { label: "特定商取引法に基づく表記", href: "/legal/tokusho" },
  { label: "利用規約", href: "/legal/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          {/* ブランド情報 */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={BRAND.logo}
                alt={BRAND.name}
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
              中小企業・スタートアップのためのホームページ制作・運用サービス。
              「小さく始めて、大きく育てる」サイトづくりを支援します。
            </p>
          </div>

          {/* リンク集 */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Menu</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                {/* 前半4つを表示 (worksを除外しているので調整) */}
                {SITEMAP.slice(0, 3).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-blue-700 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Support</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                {/* 後半を表示 */}
                {SITEMAP.slice(3).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-blue-700 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
             <div className="space-y-4 col-span-2 sm:col-span-1 lg:col-span-1">
              <h4 className="text-sm font-bold text-gray-900">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                {LEGAL.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-blue-700 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8 text-center">
          <p className="text-[10px] text-gray-400">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}