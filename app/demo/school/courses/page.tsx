// app/demo/school/courses/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "コース・料金 | 未来進学塾（デモ）",
};

export default function SchoolCoursesPage() {
  return (
    <div className="bg-white pb-20">
      <div className="relative h-[300px] w-full bg-sky-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sky-900/10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">コース・料金</h1>
          <p className="mt-4 text-slate-600">Courses & Fees</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">わかりやすい月謝制</h2>
            <p className="text-slate-600">
              入塾金：11,000円（税込）<br />
              教材費：実費のみ（1科目 年間2,000円程度）
            </p>
          </div>

          {/* 小学生コース */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-8 bg-orange-400 rounded-full"></span>
                小学生コース
              </h3>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">基礎力定着</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="p-4 text-sm font-bold text-slate-600 border-b border-slate-200">学年</th>
                    <th className="p-4 text-sm font-bold text-slate-600 border-b border-slate-200">週1回</th>
                    <th className="p-4 text-sm font-bold text-slate-600 border-b border-slate-200">週2回</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 text-slate-800 font-medium">小1〜小3</td>
                    <td className="p-4 text-slate-600">6,600円</td>
                    <td className="p-4 text-slate-600">12,100円</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 text-slate-800 font-medium">小4〜小6</td>
                    <td className="p-4 text-slate-600">7,700円</td>
                    <td className="p-4 text-slate-600">14,300円</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">※1コマ50分。算数・国語・英語から選択できます。</p>
          </div>

          {/* 中学生コース */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-8 bg-sky-500 rounded-full"></span>
                中学生コース
              </h3>
              <Badge variant="secondary" className="bg-sky-100 text-sky-700">定期テスト対策</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="p-4 text-sm font-bold text-slate-600 border-b border-slate-200">学年</th>
                    <th className="p-4 text-sm font-bold text-slate-600 border-b border-slate-200">週1回</th>
                    <th className="p-4 text-sm font-bold text-slate-600 border-b border-slate-200">週2回</th>
                    <th className="p-4 text-sm font-bold text-slate-600 border-b border-slate-200">週3回</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 text-slate-800 font-medium">中1・中2</td>
                    <td className="p-4 text-slate-600">13,200円</td>
                    <td className="p-4 text-slate-600">25,300円</td>
                    <td className="p-4 text-slate-600">36,300円</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 text-slate-800 font-medium">中3</td>
                    <td className="p-4 text-slate-600">14,300円</td>
                    <td className="p-4 text-slate-600">27,500円</td>
                    <td className="p-4 text-slate-600">39,600円</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">※1コマ80分。5教科（英数国理社）対応。</p>
          </div>

          {/* 高校生コース */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-8 bg-slate-700 rounded-full"></span>
                高校生コース
              </h3>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700">大学受験</Badge>
            </div>
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
               <p className="text-slate-600 mb-4">
                 志望校のレベルや受験方式（一般・推薦）に合わせてプランを作成します。<br />
                 詳しくは面談にてご提案させていただきます。
               </p>
               <p className="font-bold text-slate-900">月額 16,500円〜</p>
             </div>
          </div>

        </section>

        <div className="text-center">
          <p className="text-slate-600 mb-6">まずは無料体験授業で、授業の雰囲気をお確かめください。</p>
          <Button asChild size="lg" className="bg-sky-600 text-white hover:bg-sky-700 rounded-full px-12 py-6 text-lg font-bold shadow-lg">
            <Link href="/demo/school/contact">無料体験を申し込む</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}