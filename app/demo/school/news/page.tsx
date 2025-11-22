// app/demo/school/news/page.tsx
import Link from "next/link";
import { Clock } from "lucide-react";
import { schoolNews } from "../_data/news";

export const metadata = {
  title: "お知らせ一覧 | 未来進学塾（デモ）",
};

export default function SchoolNewsListPage() {
  return (
    <div className="bg-white pb-20">
      {/* ヘッダー */}
      <div className="relative h-[300px] w-full bg-sky-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sky-900/10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">お知らせ</h1>
          <p className="mt-4 text-slate-600">News & Topics</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
          
          {/* ニュースリスト */}
          <div className="space-y-6">
            {schoolNews.map((news) => (
              <article key={news.slug} className="group border-b border-slate-100 pb-6 last:border-0">
                <Link href={`/demo/school/news/${news.slug}`} className="block">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <time className="font-mono">{news.date}</time>
                    </div>
                    <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded w-fit ${
                      news.category === "重要" ? "bg-red-100 text-red-600" : 
                      news.category === "イベント" ? "bg-green-100 text-green-600" :
                      "bg-sky-100 text-sky-600"
                    }`}>
                      {news.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-snug">
                    {news.title}
                  </h2>
                </Link>
              </article>
            ))}
          </div>

          {/* ▼ 修正: ページネーションを削除（記事数が少ないため不要） */}
          
        </div>
      </div>
    </div>
  );
}