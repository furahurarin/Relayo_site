// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/services", label: "サービス" },
  { href: "/pricing", label: "料金" },
  { href: "/apply", label: "申し込み" }, // 追加
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシー" },
  { href: "/legal/tokusho", label: "特商法" },
];

// Umami（存在時のみ送信）
const track = (name: string, data?: Record<string, any>) => {
  if (typeof window === "undefined") return;
  (window as any)?.umami?.track?.(name, data);
};

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
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
          aria-label="Relayo ホームへ"
          onClick={() => track("header_logo_click", { to: "home" })}
          data-umami-event="header_logo_click"
        >
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
              onClick={() =>
                track("header_nav_click", { to: n.href, label: n.label })
              }
              data-umami-event="header_nav_click"
              data-umami-event-to={n.href}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="secondary"
            className="rounded-xl"
          >
            <a
              href={`mailto:contact.relayo@gmail.com?subject=${encodeURIComponent(
                "Relayo へのご相談"
              )}&body=${encodeURIComponent(
                `以下をご記入のうえご返信ください（未定は未定でOKです）
会社名／屋号：
ご担当者名：
想定ページ数：
公開希望時期：
要件（例：予約・問い合わせ・SNS連携 等）：`
              )}`}
              aria-label="メールで相談する"
              onClick={() => track("header_cta_click", { to: "mailto" })}
              data-umami-event="header_cta_click"
              data-umami-event-to="mailto"
            >
              メールで相談
            </a>
          </Button>

          <Button
            asChild
            className="rounded-xl"
          >
            <Link
              href="/contact#get-sheet"
              aria-label="診断シートを受け取る"
              onClick={() =>
                track("header_cta_click", { to: "contact_sheet" })
              }
              data-umami-event="header_cta_click"
              data-umami-event-to="contact_sheet"
            >
              診断シートを受け取る
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
