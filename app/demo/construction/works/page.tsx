// app/demo/construction/works/page.tsx
import Link from "next/link";
import { MapPin } from "lucide-react";
import { constructionWorks } from "../_data/works";

export const metadata = {
  title: "施工実績 | アークフィールド建設（デモ）",
};

export default function ConstructionWorksListPage() {
  return (
    <div className="bg-white pb-20">
      <div className="bg-slate-900 py-20 text-center text-white">
        <h1 className="text-3xl font-bold tracking-widest mb-2">WORKS</h1>
        <p className="text-xs text-gray-400 font-mono">施工実績</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {constructionWorks.map((work) => (
            <Link key={work.id} href={`/demo/construction/works/${work.id}`} className="group block">
              {/* サムネイル画像エリア */}
              <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden mb-4">
                {/* 画像があればここに <Image /> */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold bg-slate-200 group-hover:scale-105 transition-transform duration-500">
                  No Image
                </div>
                <div className="absolute top-0 left-0 bg-amber-600 text-white text-xs font-bold px-3 py-1">
                  {work.category}
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                  {work.title}
                </h2>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {work.location}
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="font-mono">{work.date} 竣工</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}