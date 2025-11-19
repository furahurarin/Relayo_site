// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

type NavItem = {
  href: string;
  label: string;
};

/**
 * グローバルナビ：
 *   - ホーム内のセクションへ： /#services, /#pricing, /#process, /#faq, /#company
 *   - ホーム： /
 */
const NAV: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/#services", label: "サービス" },
  { href: "/#pricing", label: "料金" },
  { href: "/#process", label: "制作の流れ" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#company", label: "運営者情報" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // パスベースの簡易アクティブ判定（/ とそれ以外）
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // /#section は「ホーム」扱いとし、パスが / のときだけアクティブ風に
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  const linkBase =
    "text-sm text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-colors";

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80 ${
        isScrolled ? "shadow-sm" : ""
      }`}
      aria-label="サイト全体のナビゲーション"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-90"
            aria-label={`${BRAND.name} ホームへ`}
            rel="home"
          >
            {BRAND.name}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="グローバルナビゲーション"
        >
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${
                  active ? "font-semibold text-black dark:text-white" : ""
                }`}
              >
                {n.label}
              </Link>
            );
          })}

          {/* 入口は /contact に統一 */}
          <ContactCTA />
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:ring-offset-gray-950 md:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="border-t border-gray-200 bg-white/95 px-4 pb-4 pt-2 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 md:hidden">
          <nav
            className="flex flex-col gap-1"
            aria-label="モバイル用グローバルナビゲーション"
          >
            {NAV.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-2 py-2 text-sm ${
                    active
                      ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-900 dark:text-white"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              );
            })}

            {/* モバイルでも入口を統一 */}
            <div className="pt-2">
              <ContactCTA />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
