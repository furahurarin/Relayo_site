// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/services", label: "サービス" },
  { href: "/pricing", label: "料金" },
  { href: "/faq", label: "FAQ" },
  // 法的情報は現状ページ分割（利用規約／プライバシー／特商法）
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシー" },
  { href: "/legal/tokusho", label: "特商法" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ルート一致でactive（必要に応じて startsWith に変更可）
  const isActive = (href: string) => pathname === href;

  const linkBase =
    "text-sm text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors";

  // ルートが変わったらモバイルメニューを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-transparent bg-white/70 backdrop-blur dark:bg-gray-950/70 ${
        scrolled ? "border-gray-200 dark:border-gray-800" : ""
      }`}
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
        <nav className="hidden items-center gap-6 md:flex" aria-label="グローバルナビゲーション">
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${active ? "font-semibold text-black dark:text-white" : ""}`}
              >
                {n.label}
              </Link>
            );
          })}
          {/* 入口はフォームに統一 */}
          <ContactCTA small />
        </nav>

        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm md:hidden dark:border-gray-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "閉じる" : "メニュー"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-950"
        >
          <div className="container mx-auto grid gap-4 px-4 py-4 sm:px-6 lg:px-8">
            {NAV.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-2 py-2 ${
                    active
                      ? "bg-gray-100 font-semibold dark:bg-gray-900"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}

            {/* モバイルでも入口を統一 */}
            <div className="pt-2">
              <ContactCTA full />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                2分で完了。営業電話は行いません。回答はメールでお送りします。
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
