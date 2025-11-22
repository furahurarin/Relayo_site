// app/demo/school/components/SchoolHeader.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, Phone } from "lucide-react";

export default function SchoolHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ▼ 修正: 「お知らせ」を追加
  const navItems = [
    { label: "ホーム", href: "/demo/school" },
    { label: "当塾について", href: "/demo/school/about" },
    { label: "コース・料金", href: "/demo/school/courses" },
    { label: "合格実績", href: "/demo/school/achievements" },
    { label: "お知らせ", href: "/demo/school/news" },
  ];

  return (
    <header className="sticky top-9 z-40 border-b border-slate-100 bg-white/95 backdrop-blur transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/demo/school" className="flex items-center gap-2 group z-50 relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white transition-transform group-hover:scale-110">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            未来進学塾
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href || (item.href !== "/demo/school" && pathname.startsWith(item.href))
                  ? "text-sky-600 font-bold"
                  : "text-slate-600 hover:text-sky-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-sky-600 text-white hover:bg-sky-700 rounded-full shadow-md shadow-sky-100">
            <Link href="/demo/school/contact">体験授業お申込み</Link>
          </Button>
        </nav>

        <button
          className="md:hidden z-50 relative p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニューを開く"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div
          className={`fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-6 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-bold ${
                  pathname === item.href ? "text-sky-600" : "text-slate-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col gap-4 w-64">
            <Button asChild size="lg" className="w-full bg-sky-600 text-white hover:bg-sky-700 rounded-full">
              <Link href="/demo/school/contact">体験授業お申込み</Link>
            </Button>
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1">お電話でのお問い合わせ</p>
              <a href="tel:03-1234-5678" className="flex items-center justify-center gap-2 text-xl font-bold text-slate-900">
                <Phone className="h-5 w-5 text-sky-600" />
                03-1234-5678
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}