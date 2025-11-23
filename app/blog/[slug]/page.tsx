import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import { getPostBySlug, posts } from "@/app/data/posts";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import type { Metadata } from "next";

function ArticleCTA() {
  return (
    <div className="my-12 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 p-8 sm:p-10 text-center shadow-sm">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-relaxed tracking-wide">
        あなたのWebサイト、もっと活用しませんか？
      </h3>
      <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
      <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto leading-loose tracking-wide">
        Relayoでは、初期費用を抑えた制作から、集客のためのリニューアルまで幅広くサポートしています。<br className="hidden sm:block"/>
        「まずは話だけ聞いてみたい」という方も大歓迎です。
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="font-bold shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all" asChild>
          <Link href="/contact">
            無料相談・お見積もり
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="bg-white hover:bg-slate-50 border-slate-300" asChild>
          <Link href="/pricing">料金プランを見る</Link>
        </Button>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

// 【追加】SEOメタデータの生成関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: `${post.title} | Relayo Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://relayo.jp/blog/${post.slug}`,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-10rem)] bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-6">
            <PageBreadcrumb 
              items={[
                { label: "ブログ・お知らせ", href: "/blog" },
                { label: post.title }
              ]} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
            <article className="min-w-0">
              {/* 記事ヘッダー */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                  <span className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    <Tag className="mr-1.5 h-3 w-3" />
                    {post.category}
                  </span>
                  <time className="flex items-center text-gray-500 font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200">
                    <Calendar className="mr-1.5 h-3 w-3 text-gray-400" />
                    {post.date}
                  </time>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-[1.6] tracking-wide mb-6">
                  {post.title}
                </h1>

                {post.thumbnail && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* 記事本文 */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50">
                <div className="article-body">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                <ArticleCTA />
              </div>

              <div className="mt-8">
                <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-gray-500 hover:text-blue-600 transition-colors">
                  <Link href="/blog">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    記事一覧に戻る
                  </Link>
                </Button>
              </div>
            </article>

            <div className="space-y-8">
               <BlogSidebar />
            </div>
            
          </div>
        </FadeIn>
      </div>
    </main>
  );
}