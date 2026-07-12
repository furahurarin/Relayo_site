"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Menu, X } from "lucide-react";
import { EC_INVENTORY_POC } from "@/lib/constants";

type NavItem = {
  href: string;
  label: string;
};

const NAV: NavItem[] = [
  { href: "/#overview", label: "サービス概要" },
  { href: "/#sample-report", label: "見本レポート" },
  { href: "/#eligibility", label: "対象・対象外" },
  { href: "/#process", label: "進め方" },
  { href: "/#faq", label: "FAQ" },
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur ${
        isScrolled ? "shadow-sm" : ""
      }`}
      aria-label="サイト全体のナビゲーション"
    >
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-2 text-slate-950 transition-opacity hover:opacity-80"
          aria-label={`${EC_INVENTORY_POC.name} ホームへ`}
          rel="home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold leading-tight sm:text-base">
              Relayo
            </span>
            <span className="hidden truncate text-[10px] font-semibold leading-tight text-slate-500 sm:block">
              EC在庫・粗利診断
            </span>
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
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={EC_INVENTORY_POC.contactHref}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            data-umami-event="ec_design_partner_cta_click"
            data-umami-event-location="header"
          >
            共同検証に応募
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 shadow-sm lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="モバイル用ナビゲーション">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={EC_INVENTORY_POC.contactHref}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              data-umami-event="ec_design_partner_cta_click"
              data-umami-event-location="mobile_header"
              onClick={() => setOpen(false)}
            >
              共同検証に応募
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
