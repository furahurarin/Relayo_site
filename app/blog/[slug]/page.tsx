// app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

// 仮のデータ取得関数
async function getBlogPost(slug: string) {
  return {
    slug,
    title: "記事タイトルサンプル",
    date: "2025.03.15",
    category: "カテゴリ",
    content: "ここに記事の本文が入ります。CMSなどを導入することで、マークダウン形式やリッチテキストで記事を入稿できるようになります。",
  };
}

type Props = {
  params: { slug: string };
};

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-blue-700">
              <Link href="/blog">
                <ChevronLeft className="mr-1 h-4 w-4" />
                記事一覧に戻る
              </Link>
            </Button>
          </div>

          <article className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 sm:p-12">
            <header className="mb-10 border-b border-gray-100 pb-8">
              <div className="mb-4 flex items-center gap-3">
                <time className="text-sm text-gray-500 font-mono">{post.date}</time>
                <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {post.category}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {post.title}
              </h1>
            </header>

            <div className="prose prose-sm sm:prose-base prose-blue max-w-none text-gray-800">
              <p>{post.content}</p>
              {/* 以下、ダミーテキスト */}
              <p className="mt-8 text-gray-400 text-xs">
                （※ここは詳細ページのテンプレートです。実際には記事ごとに固有の内容が表示されます）
              </p>
            </div>
          </article>
        </div>
      </FadeIn>
    </main>
  );
}