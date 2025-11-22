import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/FadeIn";
import { Calendar, ArrowRight } from "lucide-react";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

export const metadata: Metadata = {
  title: "制作実績",
  description: "Relayoの制作実績・事例一覧です。",
};

// 実績データ（仮）
const works = [
  {
    id: "salon-demo",
    title: "美容サロン向け ホームページ",
    description: "予約導線とメニュー回遊を整理し、来店予約の取りこぼしを減らす構成。",
    category: "美容・サロン",
    features: ["オンライン予約", "SNS連携"],
    date: "2025.01",
    imageColor: "bg-rose-50", // 画像がない場合の背景色
  },
  {
    id: "clinic-demo",
    title: "治療院向け 予約ページ",
    description: "スマホからの予約を前提に、注意事項やメニュー選択を整理したページ構成。",
    category: "医療・治療院",
    features: ["Web予約", "メニュー表示"],
    date: "2025.02",
    imageColor: "bg-teal-50",
  },
  {
    id: "corp-demo",
    title: "小規模事業者向け コーポレートサイト",
    description: "事業内容とお問い合わせ窓口をコンパクトにまとめた、シンプルな構成例。",
    category: "士業・小規模事業",
    features: ["会社概要", "お問い合わせ"],
    date: "2025.03",
    imageColor: "bg-slate-50",
  },
];

export default function WorksPage() {
  return (
    <main className="container mx-auto min-h-[calc(100vh-10rem)] px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <PageBreadcrumb items={[{ label: "制作実績" }]} />

        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Works
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            制作実績・事例をご紹介します。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col overflow-hidden border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                {/* サムネイル画像エリア（仮で色ベタ） */}
                <div className={`aspect-video w-full ${work.imageColor} flex items-center justify-center text-gray-400`}>
                  <span className="text-xs">Image Area</span>
                </div>
                
                <CardHeader className="space-y-2 p-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-[10px] font-medium">
                      {work.category}
                    </Badge>
                    <div className="flex items-center text-[10px] text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {work.date}
                    </div>
                  </div>
                  <CardTitle className="text-sm font-bold leading-snug text-gray-900 group-hover:text-blue-700">
                    {work.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs text-gray-600">
                    {work.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="mt-auto p-5 pt-0">
                   <div className="flex items-center text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                     詳細を見る <ArrowRight className="ml-1 h-3 w-3" />
                   </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}