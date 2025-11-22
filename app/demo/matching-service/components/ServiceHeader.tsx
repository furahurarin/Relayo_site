// app/demo/matching-service/components/ServiceHeader.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Hexagon } from "lucide-react";

export default function ServiceHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "機能", href: "/demo/matching-service/features" },
    { label: "導入事例", href: "/demo/matching-service/cases" },
    { label: "料金", href: "/demo/matching-service/pricing" },
  ];

  return (
    <header
      className={`sticky top-[37px] left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-gray-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <Link href="/demo/matching-service" className="flex items-center gap-2 group z-50">
          <div className="text-indigo-600 transition-transform group-hover:rotate-12">
            <Hexagon className="h-8 w-8 fill-indigo-600" />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${
            isScrolled || isOpen ? "text-slate-900" : "text-slate-900"
          }`}>
            HireFlow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            {/* ▼ 修正: ログインページへのリンクを追加 */}
            <Button asChild variant="ghost" className="text-slate-600 hover:text-indigo-600 font-medium">
              <Link href="/demo/matching-service/login">ログイン</Link>
            </Button>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 font-bold shadow-lg shadow-indigo-200">
              <Link href="/demo/matching-service/contact">無料で始める</Link>
            </Button>
          </div>
        </div>

        <button
          className="md:hidden z-50 p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div
          className={`fixed inset-0 z-40 bg-white flex flex-col pt-24 px-6 gap-8 transition-all duration-300 md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col gap-6 text-lg font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-800 border-b border-gray-100 pb-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4 mt-auto pb-10">
            {/* ▼ 修正: ログインページへのリンクを追加 */}
            <Button asChild variant="outline" className="w-full h-12 rounded-full border-gray-300">
              <Link href="/demo/matching-service/login">ログイン</Link>
            </Button>
            <Button asChild className="w-full h-12 bg-indigo-600 text-white rounded-full shadow-xl font-bold">
              <Link href="/demo/matching-service/contact">無料で始める</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}