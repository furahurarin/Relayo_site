// components/sections/JournalSection.tsx
import Link from "next/link";
import Image from "next/image"; // ▼ 追加
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { posts } from "@/app/data/posts";

export default function JournalSection() {
  // 最新3件のみ取得
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Journal
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              お知らせ・Web活用のヒント
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block h-full transition-all duration-200 hover:-translate-y-1"
              >
                <Card className="flex h-full flex-col overflow-hidden border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                  {/* ▼ 画像表示エリア */}
                  {post.thumbnail ? (
                    <div className="relative aspect-[1.91/1] w-full overflow-hidden bg-gray-200">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[1.91/1] w-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between mb-3">
                      <time className="text-xs text-gray-400 font-mono">{post.date}</time>
                      <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-600 line-clamp-3 mt-auto">
                      {post.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/blog">
                記事一覧を見る <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}