"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/services", label: "サービス" },
  { href: "/pricing", label: "料金" },
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシー" },
  { href: "/legal/tokusho", label: "特商法" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur dark:bg-gray-900/80">
      <div className="container mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Relayo
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={[
                "text-sm transition-colors",
                isActive(n.href)
                  ? "font-semibold text-black dark:text-white"
                  : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white",
              ].join(" ")}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" className="rounded-xl">
            <a
              href="mailto:contact.relayo@gmail.com?subject=Relayo%20%E3%81%B8%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87&body=%E4%BB%A5%E4%B8%8B%E3%82%92%E3%82%B3%E3%83%94%E3%83%9A%E3%81%97%E3%81%A6%E3%81%94%E5%9B%9E%E7%AD%94%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%EF%BC%9A%0A1.%20%E4%BC%81%E6%A5%AD%E5%90%8D%2F%E6%A5%AD%E7%A8%AE%0A2.%20%E7%8F%BE%E7%8A%B6%E3%81%AE%E8%AA%BF%E5%AD%90%0A3.%20%E7%9B%AE%E6%A8%99%0A4.%20%E5%AE%9A%E7%A8%BF%2F%E7%84%A1%E5%AE%9A%0A5.%20%E3%81%94%E4%BC%9A%E7%A4%BEURL"
            >
              メールで相談
            </a>
          </Button>
          <Button asChild className="rounded-xl">
            <Link href="/contact#get-sheet">診断シートを受け取る</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
