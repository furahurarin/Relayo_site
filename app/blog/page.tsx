import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/card";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import { posts } from "@/app/data/posts";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Calendar, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "ブログ・お知らせ | Relayo",
  description: "Web制作に関するノウハウやRelayoからのお知らせ。",
};

export default function BlogPage() {
  return (
    <main className="min-h-[calc(100vh-10rem)] bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <FadeIn>
          <PageBreadcrumb items={[{ label: "ブログ・お知らせ" }]} />

          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Journal
            </h1>
            <p className="mt-4 text-sm text-gray-600">
              お知らせ・Web活用のヒント
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* メインカラム：記事一覧 */}
            <div className="grid gap-8 sm:grid-cols-2">
              {posts.map((post) => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <Card className="flex h-full flex-col overflow-hidden border-gray-100 bg-white shadow-sm hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300 rounded-xl">
                    {/* サムネイル画像 */}
                    <div className="relative aspect-[1.91/1] w-full overflow-hidden bg-gray-100">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                      {/* カテゴリバッジ */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-blue-700 shadow-sm ring-1 ring-inset ring-gray-200">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <time className="font-mono">{post.date}</time>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-3 line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs leading-relaxed text-gray-600 line-clamp-3 mt-auto">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        続きを読む &rarr;
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* サイドバー */}
            <div className="space-y-8">
              <BlogSidebar />
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}