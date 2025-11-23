import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { posts } from "@/app/data/posts";

export function JournalSection() {
  // 最新3件を取得
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {/* ヘッダー部分：中央揃えに統一 */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Journal
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Web制作のノウハウや、Relayoからのお知らせをお届けします。
            </p>
          </div>

          {/* 記事グリッド */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <Card className="flex h-full flex-col overflow-hidden border-gray-100 bg-white shadow-sm hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300 rounded-2xl">
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
                    {/* カテゴリラベル */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-md bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-bold text-blue-700 shadow-sm border border-white/50">
                        <Tag className="mr-1 h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <time className="font-mono">{post.date}</time>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-3 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-600 line-clamp-2 mt-auto">
                      {post.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* ボタンエリア：中央揃えに統一 */}
          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link href="/blog">
                すべての記事を見る 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default JournalSection;