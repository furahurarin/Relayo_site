import Link from "next/link";
import Image from "next/image"; // ▼ 追加
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import { getPostBySlug, posts } from "@/app/data/posts";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <PageBreadcrumb 
          items={[
            { label: "ブログ・お知らせ", href: "/blog" },
            { label: post.title }
          ]} 
        />

        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-blue-700">
              <Link href="/blog">
                <ChevronLeft className="mr-1 h-4 w-4" />
                記事一覧に戻る
              </Link>
            </Button>
          </div>

          <article className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            {/* ▼ アイキャッチ画像 */}
            {post.thumbnail && (
              <div className="relative aspect-video w-full bg-gray-100 border-b border-gray-100">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-8 sm:p-12">
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
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </article>
        </div>
      </FadeIn>
    </main>
  );
}