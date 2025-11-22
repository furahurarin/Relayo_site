import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink, Lock } from "lucide-react"; // ▼ Lockアイコンを追加
import { FadeIn } from "@/components/ui/FadeIn";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";
import { getWorkById, works } from "@/app/data/works";

export async function generateStaticParams() {
  return works.map((work) => ({
    slug: work.id,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkById(slug);

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
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-blue-700">
              <Link href="/works">
                <ChevronLeft className="mr-1 h-4 w-4" />
                一覧に戻る
              </Link>
            </Button>
          </div>

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

            {/* ▼ 修正: URLの有無でボタンを出し分け */}
            <div className="pt-2">
              {work.siteUrl ? (
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a href={work.siteUrl} target="_blank" rel="noopener noreferrer">
                    Webサイトを見る
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button disabled variant="ghost" size="sm" className="gap-2 bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-100">
                  Webサイト公開準備中
                  <Lock className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* メインビジュアルエリア */}
          {work.thumbnail ? (
            <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl bg-gray-100 border border-gray-100 shadow-sm">
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div className={`mb-10 aspect-video w-full rounded-xl ${work.imageColor} flex items-center justify-center text-gray-400`}>
              No Image
            </div>
          )}

          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: work.content }} />
          </div>
        </div>
      </FadeIn>
    </main>
  );
}