// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

const NAV = [
  { href: "/", label: "ホーム" },
  // ほかの公開ページがあれば追加（例：{ href: "/services", label: "サービス" }）
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシー" },
  { href: "/legal/tokusho", label: "特商法" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-transparent bg-white/70 backdrop-blur dark:bg-gray-950/70 ${
        scrolled ? "border-gray-200 dark:border-gray-800" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-90">
            {BRAND.name}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {n.label}
            </Link>
          ))}
          {/* 入口はフォームに統一 */}
          <ContactCTA small />
        </nav>

        {/* Mobile menu toggle */}
        <button
          aria-label="メニューを開く"
          className="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm md:hidden dark:border-gray-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "閉じる" : "メニュー"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-950">
          <div className="container mx-auto grid gap-4 px-4 py-4 sm:px-6 lg:px-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-2 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}

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
