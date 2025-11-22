// app/demo/construction/components/ConstructionHeader.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X, Phone, Mail } from "lucide-react";

export default function ConstructionHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "ホーム", href: "/demo/construction" },
    { label: "会社案内", href: "/demo/construction/company" },
    { label: "施工実績", href: "/demo/construction/works" },
    { label: "採用情報", href: "/demo/construction/recruit" },
    { label: "お知らせ", href: "/demo/construction/news" },
  ];

  return (
    <header className="sticky top-9 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* ロゴエリア */}
        <Link href="/demo/construction" className="flex items-center gap-3 group z-50 relative">
          <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white rounded-sm">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-wide text-slate-900 leading-none">
              アークフィールド建設
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-widest mt-1">
              ARCHFIELD CONSTRUCTION CO., LTD.
            </span>
          </div>
        </Link>

        {/* PC用ナビゲーション */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  pathname === item.href || (item.href !== "/demo/construction" && pathname.startsWith(item.href))
                    ? "text-amber-600 border-b-2 border-amber-600 py-7"
                    : "text-slate-600 hover:text-slate-900 py-7 border-b-2 border-transparent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200 h-10">
            <div className="flex flex-col text-right mr-2">
              <span className="text-[10px] text-slate-500 font-bold">お電話でのお問い合わせ</span>
              <span className="text-lg font-bold text-slate-900 leading-none font-mono">03-9999-9999</span>
            </div>
            <Button asChild className="bg-amber-600 text-white hover:bg-amber-700 rounded-sm shadow-sm h-10 px-6">
              <Link href="/demo/construction/contact">
                <Mail className="mr-2 h-4 w-4" /> お問い合わせ
              </Link>
            </Button>
          </div>
        </div>

        {/* スマホ用ハンバーガーボタン */}
        <button
          className="md:hidden z-50 relative p-2 text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニューを開く"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>

        {/* スマホ用フルスクリーンメニュー */}
        <div
          className={`fixed inset-0 z-40 bg-slate-900 flex flex-col items-center justify-center gap-10 transition-all duration-300 md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-6 text-white">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xl font-bold tracking-widest ${
                  pathname === item.href ? "text-amber-500" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col gap-6 w-64">
            <Button asChild size="lg" className="w-full bg-amber-600 text-white hover:bg-amber-700 rounded-sm">
              <Link href="/demo/construction/contact">お問い合わせフォーム</Link>
            </Button>
            <a href="tel:03-9999-9999" className="flex flex-col items-center justify-center gap-1 text-white">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-sm">お電話でのご相談</span>
              </div>
              <span className="text-2xl font-bold font-mono">03-9999-9999</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}