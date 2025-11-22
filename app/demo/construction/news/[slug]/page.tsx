// app/demo/construction/news/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { getNewsBySlug, constructionNews } from "../../_data/news";

export async function generateStaticParams() {
  return constructionNews.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ConstructionNewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="bg-white pb-20">
      {/* 記事ヘッダー */}
      <div className="bg-slate-50 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="flex items-center gap-4 mb-6 text-xs font-bold tracking-wider">
            <span className="text-amber-600 bg-amber-50 px-2 py-1 border border-amber-200">
              {news.category}
            </span>
            <div className="flex items-center text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <time className="font-mono">{news.date}</time>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-relaxed">
            {news.title}
          </h1>
        </div>
      </div>

      {/* 本文 */}
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-12">
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline">
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </article>

        <div className="mt-16 pt-12 border-t border-gray-100 text-center">
          <Button asChild variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-sm px-8">
            <Link href="/demo/construction/news">
              <ArrowLeft className="mr-2 h-4 w-4" /> 一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}