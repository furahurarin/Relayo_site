// app/demo/school/achievements/page.tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "合格実績 | 未来進学塾（デモ）",
};

// ダミーデータ
const ACHIEVEMENTS = [
  {
    id: 1,
    school: "〇〇大学 文学部",
    type: "大学入試",
    student: "S.Yさん（高3）",
    comment: "高2の冬から英語を徹底的に強化。偏差値45から65まで上がり、第一志望に現役合格できました！",
    tag: "推薦入試",
  },
  {
    id: 2,
    school: "県立〇〇高校 理数科",
    type: "高校入試",
    student: "M.Kさん（中3）",
    comment: "数学が苦手でしたが、先生が図を書いて丁寧に教えてくれたので理解できました。過去問対策もバッチリでした。",
    tag: "一般入試",
  },
  {
    id: 3,
    school: "〇〇大学附属中学校",
    type: "中学入試",
    student: "R.Tくん（小6）",
    comment: "自習室に毎日通って勉強しました。先生がいつも励ましてくれたので、最後まで頑張れました。",
    tag: "一般入試",
  },
  {
    id: 4,
    school: "△△工業高校",
    type: "高校入試",
    student: "K.Iくん（中3）",
    comment: "面接練習を何度もしてくれたおかげで、本番は緊張せずに話せました。ありがとうございました。",
    tag: "推薦入試",
  },
  {
    id: 5,
    school: "□□大学 経済学部",
    type: "大学入試",
    student: "A.Oさん（高3）",
    comment: "部活を引退してからのスタートでしたが、効率的なカリキュラムを組んでもらい、短期間で成績が伸びました。",
    tag: "一般入試",
  },
];

export default function SchoolAchievementsPage() {
  return (
    <div className="bg-white pb-20">
      <div className="relative h-[300px] w-full bg-sky-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sky-900/10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">合格実績</h1>
          <p className="mt-4 text-slate-600">Achievements</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="border-sky-200 text-sky-700 bg-sky-50">
                    {item.type}
                  </Badge>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    {item.tag}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                   <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                   <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{item.school} 合格</h3>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg mb-4 flex-1">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                <div className="text-right text-xs font-bold text-sky-600 mt-auto">
                  {item.student}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
             <p className="text-sm text-slate-500 mb-4">※プライバシー保護のため、お名前はイニシャルで掲載しています。</p>
             <Button asChild variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
               <Link href="/demo/school/contact">
                 合格実績について問い合わせる <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
          </div>
        </section>
      </div>
    </div>
  );
}