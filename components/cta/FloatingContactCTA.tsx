// components/cta/FloatingContactCTA.tsx
"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // パス判定用

export default function FloatingContactCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // 300px以上スクロールしたら表示
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ▼ 追加: デモページでは表示しない
  if (pathname?.startsWith("/demo")) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Button
        asChild
        size="lg"
        className="h-14 w-14 rounded-full shadow-xl sm:h-auto sm:w-auto sm:rounded-full sm:px-6"
      >
        <Link href="/contact">
          <Mail className="h-6 w-6 sm:mr-2 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">お問い合わせ</span>
        </Link>
      </Button>
    </div>
  );
}