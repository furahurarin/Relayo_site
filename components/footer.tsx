// components/footer.tsx
"use client"; // ▼ 追加: パス判定のためにクライアントコンポーネント化

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ▼ 追加
import { BRAND } from "@/lib/constants";

// サイトマップ用リンク（シンプルに統合）
const SITEMAP = [
  { label: "ホーム", href: "/" },
  { label: "サービス", href: "/services" },
  { label: "料金プラン", href: "/pricing" },
  { label: "制作の流れ", href: "/process" },
  { label: "運営者情報", href: "/company" },
  { label: "FAQ", href: "/faq" },
  // 準備ができたらコメントアウトを解除
  // { label: "制作実績", href: "/works" },
  // { label: "ブログ", href: "/blog" },
];

// 法的情報リンク
const LEGAL = [
  { label: "プライバシーポリシー", href: "/legal/privacy" },
  { label: "特定商取引法に基づく表記", href: "/legal/tokusho" },
  { label: "利用規約", href: "/legal/terms" },
];

export default function Footer() {
  const pathname = usePathname(); // ▼ 追加

  // ▼ 追加: デモページ（/demo/〜）の場合はメインフッターを表示しない
  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
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

          {/* リンク集：Menu（統合版） */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900">Menu</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-blue-700 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* リンク集：Legal */}
          <div className="space-y-4">
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

        <div className="mt-16 border-t border-gray-100 pt-8 text-center">
          <p className="text-[10px] text-gray-400">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}