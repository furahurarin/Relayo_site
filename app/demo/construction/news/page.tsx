// app/demo/construction/news/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import { constructionNews } from "../_data/news";

export const metadata = {
  title: "お知らせ一覧 | アークフィールド建設（デモ）",
};

export default function ConstructionNewsListPage() {
  return (
    <div className="bg-white pb-20">
      {/* ヘッダー */}
      <div className="bg-slate-900 py-20 text-center text-white">
        <h1 className="text-3xl font-bold tracking-widest mb-2">NEWS</h1>
        <p className="text-xs text-gray-400 font-mono">お知らせ</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {constructionNews.map((news) => (
              <article key={news.slug} className="group bg-white border border-gray-100 shadow-sm p-6 transition-all hover:shadow-md hover:border-amber-200">
                <Link href={`/demo/construction/news/${news.slug}`} className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <time className="text-sm text-gray-400 font-mono">{news.date}</time>
                    <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-white ${
                      news.category === "採用" ? "bg-blue-600" :
                      news.category === "実績" ? "bg-amber-600" :
                      "bg-slate-600"
                    }`}>
                      {news.category}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-800 group-hover:text-amber-600 transition-colors flex-1">
                    {news.title}
                  </h2>
                  <div className="hidden sm:block text-gray-300 group-hover:text-amber-600 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}