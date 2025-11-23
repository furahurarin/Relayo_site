"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingContactCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const pathname = usePathname();

  // デモページ ("/demo" で始まるパス) では表示しない
  const isDemoPage = pathname?.startsWith("/demo");

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      // 300px以上スクロールしたら表示
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // デモページの場合、または閉じるボタンが押された場合は表示しない
  if (isDemoPage || isClosed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm md:bottom-8 md:right-8"
        >
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-xl shadow-blue-900/5">
            {/* 閉じるボタン */}
            <button
              onClick={() => setIsClosed(true)}
              className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label="閉じる"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4 pr-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  無料相談受付中
                </h3>
                <p className="mb-4 text-xs text-gray-600 leading-relaxed">
                  Web制作や集客について、お困りのことはありませんか？まずはメールで気軽にご相談ください。
                </p>
                <Button size="sm" className="w-full font-bold shadow-sm" asChild>
                  <Link href="/contact">
                    相談してみる
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingContactCTA;