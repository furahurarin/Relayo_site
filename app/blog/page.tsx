import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/card";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export const metadata: Metadata = {
  title: "ブログ・お知らせ",
  description: "Web制作に関するノウハウやRelayoからのお知らせ。",
};

// ブログデータ（仮）
const posts = [
  {
    slug: "web-renewal-tips",
    title: "失敗しないホームページリニューアルのポイント",
    date: "2025.03.15",
    category: "ノウハウ",
    excerpt: "リニューアルを成功させるために、事前に準備しておくべき3つのことについて解説します。",
  },
  {
    slug: "campaign-start",
    title: "【期間限定】短納期・低コスト制作キャンペーンを開始しました",
    date: "2025.03.01",
    category: "お知らせ",
    excerpt: "先着3社様限定の特別プランのご案内です。",
  },
  {
    slug: "why-nextjs",
    title: "なぜRelayoはNext.jsを採用しているのか？",
    date: "2025.02.20",
    category: "技術コラム",
    excerpt: "表示速度とSEO、そして将来の拡張性を考えた技術選定の理由。",
  },
];

export default function BlogPage() {
  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <PageBreadcrumb items={[{ label: "ブログ・お知らせ" }]} />

        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Journal
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            お知らせ・Web活用のヒント
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {posts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block transition-all duration-200 hover:-translate-x-[-4px]"
            >
              <Card className="p-6 border-gray-100 hover:border-blue-100 hover:shadow-sm transition-colors">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                  <time className="text-xs text-gray-400 font-mono">{post.date}</time>
                  <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}