"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSpreadsheet } from "lucide-react";
import { DOCUMENT_POC } from "@/lib/constants";

const SITEMAP = [
  { label: "サービス概要", href: "/#overview" },
  { label: "対応帳票", href: "/#documents" },
  { label: "PoCの流れ", href: "/#process" },
  { label: "料金", href: "/#pricing" },
  { label: "PoCを相談する", href: DOCUMENT_POC.contactHref },
];

const LEGAL = [
  { label: "プライバシーポリシー", href: "/legal/privacy" },
  { label: "特定商取引法に基づく表記", href: "/legal/tokusho" },
  { label: "利用規約", href: "/legal/terms" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <footer className="border-t border-gray-100 bg-white pb-8 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-gray-900 hover:opacity-80"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-900 text-white">
                <FileSpreadsheet className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{DOCUMENT_POC.name}</span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-gray-500">
              PDF・FAX・スキャンされた注文書や帳票を、
              人による確認付きでExcel・CSVへデータ化する小規模PoCです。
            </p>
          </div>

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
            &copy; {new Date().getFullYear()} {DOCUMENT_POC.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
