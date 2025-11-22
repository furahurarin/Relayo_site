import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

// 将来的にはCMSやDBから取得
// ここではビルドエラーを防ぐためのダミー詳細データ取得関数
async function getWorkDetail(slug: string) {
  // デモ用：どのslugが来ても同じデータを返す（IDだけ書き換え）
  // 実運用では slug に一致するデータを検索して返す
  return {
    id: slug,
    title: "制作実績詳細サンプル",
    category: "サンプルカテゴリ",
    date: "2025.01",
    content: "ここに制作の背景や工夫した点などの詳細記事が入ります。",
  };
}

type Props = {
  params: { slug: string };
};

export default async function WorkDetailPage({ params }: Props) {
  const work = await getWorkDetail(params.slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <PageBreadcrumb 
          items={[
            { label: "制作実績", href: "/works" }, 
            { label: work.title }
          ]} 
        />

        <div className="mx-auto max-w-3xl">
          {/* 戻るボタン */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-blue-700">
              <Link href="/works">
                <ChevronLeft className="mr-1 h-4 w-4" />
                一覧に戻る
              </Link>
            </Button>
          </div>

          {/* ヘッダー情報 */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                {work.category}
              </span>
              <time>{work.date}</time>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {work.title}
            </h1>
          </div>

          {/* 画像エリア（仮） */}
          <div className="mb-10 aspect-video w-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
            Main Visual Area
          </div>

          {/* 本文エリア */}
          <div className="prose prose-gray max-w-none">
            <p>{work.content}</p>
            <p className="text-sm text-gray-500 mt-8">
              ※現在、詳細ページは準備中です。順次公開予定です。
            </p>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}