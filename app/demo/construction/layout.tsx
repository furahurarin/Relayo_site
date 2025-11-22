// app/demo/construction/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Phone, Building2, Mail } from "lucide-react";
import ConstructionHeader from "./components/ConstructionHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | アークフィールド建設（デモ）",
    default: "アークフィールド建設 | 創業50年の信頼と実績",
  },
  description: "【Relayo制作実績デモ】総合建設業「アークフィールド建設」のコーポレートサイトサンプル。企業の信頼性と採用力を高める、堅実なBtoB向けデザインです。",
  robots: { index: false, follow: false },
};

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-amber-200">
      {/* デモ用管理バー */}
      <div className="sticky top-0 z-[100] flex items-center justify-between bg-slate-900 px-4 py-2 text-xs text-white shadow-md border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-slate-900">
            DEMO
          </span>
          <span className="hidden sm:inline text-slate-300">
            制作実績デモ：建設会社（BtoB / 採用・信頼）
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

      <ConstructionHeader />

      <main>{children}</main>

      <footer className="bg-slate-900 text-white pt-16 pb-8">
        {/* ...（フッター内容は変更なし）... */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-4 border-b border-slate-800 pb-12">
             {/* ...各カラム... */}
             {/* ※コード長省略のため中身は既存のまま維持してください */}
             <div className="col-span-2">
               <div className="flex items-center gap-3 mb-6">
                 <div className="flex h-10 w-10 items-center justify-center bg-white text-slate-900 rounded-sm">
                   <Building2 className="h-6 w-6" />
                 </div>
                 <div>
                   <h2 className="text-lg font-bold tracking-wide leading-none">アークフィールド建設</h2>
                   <p className="text-[10px] text-slate-400 tracking-widest mt-1">ARCHFIELD CONSTRUCTION CO., LTD.</p>
                 </div>
               </div>
               <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-md">
                 創業50年。地域に根ざしたインフラ整備から、未来をつくる都市開発まで。確かな技術と誠実な施工で、安心・安全な社会基盤を支え続けます。
               </p>
             </div>
             {/* ...Menu, Contact... */}
          </div>

          <div className="mt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; 2025 ArchField Construction Co., Ltd. All Rights Reserved.</p>
            <p>※このサイトはRelayoの制作実績デモです。実在の企業ではありません。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}