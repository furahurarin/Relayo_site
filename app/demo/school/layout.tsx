// app/demo/school/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import SchoolHeader from "./components/SchoolHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | 未来進学塾（デモ）",
    default: "未来進学塾 | 地域密着型の個別指導",
  },
  description: "【Relayo制作実績デモ】地域密着型の個別指導塾「未来進学塾」のWebサイトサンプル。保護者の信頼獲得と体験申し込みへの導線を重視した、BtoC向けのデザインです。",
  robots: { index: false, follow: false },
};

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-sky-200">
      {/* デモ用管理バー */}
      <div className="sticky top-0 z-[100] flex items-center justify-between bg-slate-900 px-4 py-2 text-xs text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="rounded bg-yellow-500 px-2 py-0.5 text-[10px] font-bold text-slate-900">
            DEMO
          </span>
          <span className="hidden sm:inline text-slate-300">
            制作実績デモ：学習塾（BtoC / 集客重視）
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/works"
            className="flex items-center text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            実績一覧に戻る
          </Link>
          <Link
            href="/contact"
            className="flex items-center rounded bg-blue-600 px-3 py-1.5 font-bold transition-colors hover:bg-blue-700"
          >
            制作を相談する
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>

      <SchoolHeader />

      <main>{children}</main>

      {/* フッターは SchoolHeader コンポーネント側ではなく、ページ側またはここで記述済み */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          {/* ...（フッター内容は変更なし）... */}
          <div className="mt-12 border-t border-slate-200 pt-8 text-center">
            <p className="text-xs text-slate-400">
              &copy; 2025 Mirai Shingaku Juku. All Rights Reserved.
            </p>
            <p className="mt-2 text-[10px] text-slate-400">
              ※このサイトはRelayoの制作実績デモです。実在の学習塾ではありません。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}