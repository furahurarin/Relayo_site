"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSpreadsheet, Menu, X } from "lucide-react";
import { DOCUMENT_POC } from "@/lib/constants";

type NavItem = {
  href: string;
  label: string;
};

const NAV: NavItem[] = [
  { href: "/#overview", label: "サービス概要" },
  { href: "/#documents", label: "対応帳票" },
  { href: "/#process", label: "PoCの流れ" },
  { href: "/#pricing", label: "料金" },
  { href: "/#safety", label: "確認事項" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur ${
        isScrolled ? "shadow-sm" : ""
      }`}
      aria-label="サイト全体のナビゲーション"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-2 text-gray-900 hover:opacity-80"
          aria-label={`${DOCUMENT_POC.name} ホームへ`}
          rel="home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-900 text-white">
            <FileSpreadsheet className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate text-sm font-bold sm:text-base">
            {DOCUMENT_POC.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label="グローバルナビゲーション"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-700 transition-colors hover:text-gray-950"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={DOCUMENT_POC.contactHref}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            PoCを相談する
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 shadow-sm lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="モバイル用ナビゲーション">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={DOCUMENT_POC.contactHref}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              onClick={() => setOpen(false)}
            >
              PoCを相談する
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
