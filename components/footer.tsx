"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { BRAND, EC_INVENTORY_POC } from "@/lib/constants";

const SITEMAP = [
  { label: "サービス概要", href: "/#overview" },
  { label: "見本レポート", href: "/#sample-report" },
  { label: "対象・対象外", href: "/#eligibility" },
  { label: "進め方", href: "/#process" },
  { label: "価格・共同検証枠", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "共同検証に応募", href: EC_INVENTORY_POC.contactHref },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-950 pb-8 pt-14 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_0.8fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-bold text-white transition-opacity hover:opacity-80"
              aria-label={`${EC_INVENTORY_POC.name} ホームへ`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <BarChart3 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{EC_INVENTORY_POC.name}</span>
            </Link>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              販売・在庫データから、赤字SKUや滞留在庫、在庫原価を整理し、
              値下げ・再出品・仕入停止の候補をレポートにまとめます。
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
              {["Relayo運営", "EC販売経験あり", "古物商許可保有", "オンライン対応"].map(
                (item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">メニュー</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-300 lg:grid-cols-1">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:underline hover:underline-offset-4"
                    {...(item.href === EC_INVENTORY_POC.contactHref
                      ? {
                          "data-umami-event": "ec_design_partner_cta_click",
                          "data-umami-event-location": "footer",
                        }
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">ポリシー</h2>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li>
                <Link
                  href="/legal/terms"
                  className="hover:text-white hover:underline hover:underline-offset-4"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/tokusho"
                  className="hover:text-white hover:underline hover:underline-offset-4"
                >
                  特定商取引法に基づく表記
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="hover:text-white hover:underline hover:underline-offset-4"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center">
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
