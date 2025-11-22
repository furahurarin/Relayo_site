// app/demo/school/news/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock } from "lucide-react";
import { getNewsBySlug, schoolNews } from "../../_data/news";

export async function generateStaticParams() {
  return schoolNews.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SchoolNewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="bg-white pb-20 min-h-[calc(100vh-200px)]">
      {/* ヘッダーエリア */}
      <div className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="mb-6">
            {/* ▼ 修正: リンク先をホーム(/demo/school)から一覧(/demo/school/news)に変更 */}
            <Button variant="ghost" size="sm" asChild className="pl-0 text-slate-500 hover:text-sky-600 hover:bg-transparent">
              <Link href="/demo/school/news">
                <ChevronLeft className="mr-1 h-4 w-4" />
                一覧に戻る
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center text-slate-500">
              <Clock className="w-4 h-4 mr-1" />
              <time className="font-mono">{news.date}</time>
            </div>
            <span className={`px-2 py-0.5 text-xs font-bold rounded ${
              news.category === "重要" ? "bg-red-100 text-red-600" : "bg-sky-100 text-sky-600"
            }`}>
              {news.category}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
            {news.title}
          </h1>
        </div>
      </div>

      {/* 本文エリア */}
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl mt-12">
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline">
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </article>

        <div className="mt-16 pt-8 border-t border-slate-100 text-center">
          {/* ▼ 修正: リンク先を一覧に変更 */}
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/demo/school/news">お知らせ一覧に戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}