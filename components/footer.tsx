import Link from "next/link";
import { Mail } from "lucide-react";
import { BRAND, CONTACT } from "@/lib/constants";

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/services", label: "サービス" },
  { href: "/pricing", label: "料金" },
  { href: "/faq", label: "FAQ" },
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシー" },
  { href: "/legal/tokusho", label: "特商法" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
      <div className="container mx-auto grid gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:grid-cols-3">
        {/* Brand & Contact */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Relayo</h3>
          <p className="text-gray-600 dark:text-gray-400">
            中小企業・個人事業主向けのWeb/アプリ制作。短納期×運用で成果を出します。
          </p>
          <a
            href={CONTACT.mailto}
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            aria-label="メールで問い合わせ"
          >
            <Mail className="h-4 w-4" />
            {BRAND.email}
          </a>
        </div>

        {/* Nav */}
        <nav className="lg:col-span-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-black dark:hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
        © {new Date().getFullYear()} Relayo
      </div>
    </footer>
  );
}
