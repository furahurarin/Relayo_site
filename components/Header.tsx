// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
 * - ブログと制作実績を一時的に隠蔽
 */
const NAV: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/services", label: "サービス" },
  // { href: "/works", label: "制作実績" }, // 準備中のため隠す
  { href: "/pricing", label: "料金" },
  { href: "/process", label: "制作の流れ" },
  // { href: "/blog", label: "ブログ" },    // 準備中のため隠す
  { href: "/company", label: "運営者情報" },
  { href: "/faq", label: "FAQ" },
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

  // パスベースのアクティブ判定
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
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
            className="inline-flex items-center hover:opacity-90"
            aria-label={`${BRAND.name} ホームへ`}
            rel="home"
          >
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={132}
              height={32}
              priority
            />
            <span className="sr-only">{BRAND.name}</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-6 lg:flex"
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

        {/* Mobile menu button（ハンバーガー） */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:ring-offset-gray-950 lg:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="border-t border-gray-200 bg-white/95 px-4 pb-4 pt-2 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 lg:hidden">
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

            <div className="pt-2">
              <ContactCTA />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}