// app/demo/matching-service/features/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MessageSquare, 
  FileText, 
  Zap, 
  Shield, 
  Smartphone 
} from "lucide-react";

export const metadata = {
  title: "機能一覧 | HireFlow（デモ）",
};

export default function ServiceFeaturesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* ヘッダー */}
      <section className="text-center py-20 bg-slate-50 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
          採用活動のすべてを、<br />ひとつの場所で。
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          母集団形成から面接日程の調整、内定通知まで。<br />
          HireFlowには、採用チームに必要なすべての機能が揃っています。
        </p>
      </section>

      {/* 機能詳細 */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <div className="space-y-32">
          
          {/* 機能1: スカウト */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-4">
                <Zap className="w-3 h-3" /> Direct Scout
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                欲しい人材に、<br />直接届くスカウトメール。
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                データベースから条件に合う候補者を検索し、ワンクリックでスカウトを送信。
                AIが候補者のプロフィールを分析し、返信率が高まる文面を自動生成します。
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">✓</span>
                  開封率・返信率のリアルタイム分析
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">✓</span>
                  チーム内での候補者共有・コメント機能
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-slate-100 rounded-2xl aspect-[4/3] relative overflow-hidden shadow-lg border border-slate-200">
              {/* ダミーUI */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 font-bold">
                Scout UI Screen
              </div>
            </div>
          </div>

          {/* 機能2: 日程調整 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-2xl aspect-[4/3] relative overflow-hidden shadow-lg border border-slate-200">
              {/* ダミーUI */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 font-bold">
                Calendar UI Screen
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold mb-4">
                <MessageSquare className="w-3 h-3" /> Scheduling
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                面倒な日程調整は、<br />URLを送るだけ。
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                GoogleカレンダーやOutlookと連携し、空いている時間を自動で抽出。
                候補者にURLを送るだけで、面接の日程調整が完了します。ダブルブッキングの心配もありません。
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  カレンダー連携による自動空き枠抽出
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  Zoom / Google Meet のURL自動発行
                </li>
              </ul>
            </div>
          </div>

          {/* 機能3: 求人作成 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-4">
                <FileText className="w-3 h-3" /> Job Description
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                魅力的な求人票を、<br />誰でも簡単に。
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                職種ごとのテンプレートを選ぶだけで、プロ並みの求人票が完成。
                SEO対策も自動で行われるため、Googleしごと検索などからの流入も見込めます。
              </p>
            </div>
            <div className="order-1 md:order-2 bg-slate-100 rounded-2xl aspect-[4/3] relative overflow-hidden shadow-lg border border-slate-200">
              {/* ダミーUI */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 font-bold">
                Editor UI Screen
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* その他の機能（グリッド） */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
            その他にも、便利な機能がたくさん
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Search className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">高度な絞り込み検索</h3>
              <p className="text-sm text-slate-600">「Python経験3年以上」「マネジメント経験あり」など、詳細な条件で候補者を検索できます。</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Shield className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">権限管理・セキュリティ</h3>
              <p className="text-sm text-slate-600">面接官ごとに閲覧できる情報を制限したり、操作ログを保存したりできます。</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Smartphone className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">モバイル対応</h3>
              <p className="text-sm text-slate-600">スマホアプリからも応募者の確認やメッセージの返信が可能。移動中も採用活動を止めません。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          まずは無料で、機能を体験してください。
        </h2>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">
            <Link href="/demo/matching-service/pricing">無料で始める</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}