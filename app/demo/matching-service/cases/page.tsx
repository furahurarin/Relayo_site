// app/demo/matching-service/cases/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, TrendingUp, Clock, Users } from "lucide-react";

export const metadata = {
  title: "導入事例 | HireFlow（デモ）",
};

export default function ServiceCasesPage() {
  const cases = [
    {
      company: "株式会社テックフロンティア",
      industry: "IT・通信",
      scale: "従業員 150名",
      title: "採用コストを1/3に削減。エンジニア採用の成功事例。",
      tags: ["エンジニア採用", "コスト削減"],
      result: { label: "採用単価", value: "200万→60万" },
      description: "以前は人材紹介エージェントに頼り切りでしたが、HireFlowのスカウト機能を活用することで自社採用力が向上しました。AIが候補者を推薦してくれるので、工数をかけずに優秀な層にアプローチできています。",
    },
    {
      company: "グローバル・ロジスティクス",
      industry: "物流",
      scale: "従業員 500名",
      title: "急募の配送ドライバー、2週間で5名の採用に成功。",
      tags: ["大量採用", "スピード採用"],
      result: { label: "応募数", value: "前年比 300%" },
      description: "求人票の自動生成AIを使って魅力的な募集要項を作成したところ、応募が殺到。面接日程調整の自動化機能のおかげで、面接官のスケジュール管理もスムーズになり、取りこぼしがなくなりました。",
    },
    {
      company: "Next Design Studio",
      industry: "デザイン",
      scale: "従業員 30名",
      title: "カルチャーマッチ重視の採用で、定着率が大幅改善。",
      tags: ["クリエイティブ", "定着率改善"],
      result: { label: "離職率", value: "15% → 3%" },
      description: "スキルだけでなく「価値観」のマッチングを重視したことで、入社後のギャップが減りました。小さな組織だからこそ、チームに馴染めるかどうかが重要。HireFlowはその見極めを助けてくれます。",
    },
    {
      company: "あおぞら会計事務所",
      industry: "士業",
      scale: "従業員 10名",
      title: "未経験ポテンシャル層の採用に成功。",
      tags: ["若手採用", "ポテンシャル"],
      result: { label: "内定承諾率", value: "90%超" },
      description: "業界未経験でも活躍できる人材を探していましたが、レジュメだけでは判断が難しかった。AIによる行動特性分析のおかげで、「粘り強く取り組める」資質を持った方に出会うことができました。",
    },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* ▼ 修正: 配色を白ベース（bg-slate-50, text-slate-900）に統一 */}
      <section className="text-center py-20 bg-slate-50 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          導入事例
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          スタートアップから上場企業まで。<br />
          2,000社以上の企業がHireFlowで採用を変えています。
        </p>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cases.map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  {c.industry} / {c.scale}
                </div>
                <div className="flex gap-2">
                  {c.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-snug">
                {c.title}
              </h2>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 flex items-center justify-between">
                <span className="text-sm font-bold text-indigo-900">{c.result.label}</span>
                <span className="text-xl font-extrabold text-indigo-600">{c.result.value}</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                {c.description}
              </p>
              
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{c.company}</div>
                  <div className="text-xs text-slate-500">採用担当者様</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            次は、あなたのチームの番です。
          </h2>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 shadow-lg">
              <Link href="/demo/matching-service/pricing">料金プランを見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}