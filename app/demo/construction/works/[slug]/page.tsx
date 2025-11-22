// app/demo/construction/works/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Building } from "lucide-react";
import { getWorkById, constructionWorks } from "../../_data/works";

export async function generateStaticParams() {
  return constructionWorks.map((work) => ({
    slug: work.id,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ConstructionWorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkById(slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="bg-white pb-20">
      <div className="bg-slate-100 py-12 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block bg-amber-600 text-white text-xs font-bold px-3 py-1 mb-3">
                {work.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                {work.title}
              </h1>
            </div>
            <div className="flex flex-col gap-1 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" /> {work.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" /> {work.date} 竣工
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* 左側：メイン画像エリア */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-slate-200 w-full flex items-center justify-center text-slate-400 font-bold text-xl">
              Main Photo
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-slate-100 w-full"></div>
              <div className="aspect-video bg-slate-100 w-full"></div>
            </div>
          </div>

          {/* 右側：詳細情報 */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-8 border border-slate-100 sticky top-32">
              <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                プロジェクト概要
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                {work.description}
              </p>
              
              <dl className="space-y-4 text-sm">
                <div className="flex flex-col pb-4 border-b border-slate-200 border-dashed">
                  <dt className="text-slate-500 text-xs mb-1">発注者</dt>
                  <dd className="font-bold text-slate-900">{work.client || "非公開"}</dd>
                </div>
                <div className="flex flex-col pb-4 border-b border-slate-200 border-dashed">
                  <dt className="text-slate-500 text-xs mb-1">所在地</dt>
                  <dd className="font-bold text-slate-900">{work.location}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-slate-500 text-xs mb-1">竣工年月</dt>
                  <dd className="font-bold text-slate-900">{work.date}</dd>
                </div>
              </dl>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <Button asChild variant="outline" className="w-full border-slate-300 hover:bg-white text-slate-600">
                  <Link href="/demo/construction/works">
                    <ArrowLeft className="mr-2 h-4 w-4" /> 一覧に戻る
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}