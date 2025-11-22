// app/demo/construction/recruit/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock, GraduationCap, Heart } from "lucide-react";

export const metadata = {
  title: "採用情報 | アークフィールド建設（デモ）",
};

export default function ConstructionRecruitPage() {
  return (
    <div className="bg-white pb-20">
      <div className="bg-slate-900 py-20 text-center text-white">
        <h1 className="text-3xl font-bold tracking-widest mb-2">RECRUIT</h1>
        <p className="text-xs text-gray-400 font-mono">採用情報</p>
      </div>

      {/* メッセージ */}
      <div className="container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
            未来の街を、<br />
            私たちの手で創ろう。
          </h2>
          <p className="text-slate-600 leading-loose mb-12">
            私たちが作っているのは、単なる建物や道路ではありません。<br />
            そこで暮らす人々の「日常」と「未来」を作っています。<br />
            <br />
            ものづくりの最前線で、あなたの情熱を形にしませんか。<br />
            経験は問いません。チームで一つの目標に向かって汗を流せる、<br />
            熱い想いを持った仲間を待っています。
          </p>
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-sm px-10 py-6 h-auto text-lg">
            <Link href="#entry">
              募集要項を見る <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 数字で見るアークフィールド */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">数字で見るアークフィールド</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 text-center rounded shadow-sm border border-gray-100">
              <Clock className="w-8 h-8 text-amber-600 mx-auto mb-4" />
              <p className="text-xs text-gray-500 mb-2">月平均残業時間</p>
              <p className="text-3xl font-bold text-slate-900">18.5<span className="text-sm font-normal ml-1">時間</span></p>
            </div>
            <div className="bg-white p-6 text-center rounded shadow-sm border border-gray-100">
              <Heart className="w-8 h-8 text-amber-600 mx-auto mb-4" />
              <p className="text-xs text-gray-500 mb-2">有休取得率</p>
              <p className="text-3xl font-bold text-slate-900">80<span className="text-sm font-normal ml-1">%</span></p>
            </div>
            <div className="bg-white p-6 text-center rounded shadow-sm border border-gray-100">
              <Users className="w-8 h-8 text-amber-600 mx-auto mb-4" />
              <p className="text-xs text-gray-500 mb-2">平均年齢</p>
              <p className="text-3xl font-bold text-slate-900">38.2<span className="text-sm font-normal ml-1">歳</span></p>
            </div>
            <div className="bg-white p-6 text-center rounded shadow-sm border border-gray-100">
              <GraduationCap className="w-8 h-8 text-amber-600 mx-auto mb-4" />
              <p className="text-xs text-gray-500 mb-2">資格取得支援</p>
              <p className="text-3xl font-bold text-slate-900">全額<span className="text-sm font-normal ml-1">会社負担</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* 先輩社員の声（リンク導線） */}
      <div className="container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://placehold.jp/1200x600.png?text=Members')] bg-cover bg-center"></div>
          <div className="relative z-10 p-10 md:p-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">先輩社員の声</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              現場の最前線で活躍する社員たちに、仕事のやりがいや会社の雰囲気について聞きました。
            </p>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 rounded-sm px-8">
              <Link href="/demo/construction/recruit/interview">インタビューを読む</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 募集要項 */}
      <div id="entry" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">募集要項</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {/* 施工管理 */}
            <div className="bg-white p-8 border border-gray-200 hover:border-amber-400 transition-colors cursor-pointer shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 mb-2 font-bold">正社員</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">建築施工管理</h3>
                  <p className="text-sm text-slate-600">建築工事現場における工程・品質・安全管理業務</p>
                </div>
                <Button asChild className="bg-slate-900 hover:bg-slate-700 text-white rounded-sm">
                  <Link href="/demo/construction/contact">応募する</Link>
                </Button>
              </div>
            </div>

            {/* 土木施工管理 */}
            <div className="bg-white p-8 border border-gray-200 hover:border-amber-400 transition-colors cursor-pointer shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 mb-2 font-bold">正社員</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">土木施工管理</h3>
                  <p className="text-sm text-slate-600">道路・河川・橋梁などの土木工事における管理業務</p>
                </div>
                <Button asChild className="bg-slate-900 hover:bg-slate-700 text-white rounded-sm">
                  <Link href="/demo/construction/contact">応募する</Link>
                </Button>
              </div>
            </div>

            {/* 事務 */}
            <div className="bg-white p-8 border border-gray-200 hover:border-amber-400 transition-colors cursor-pointer shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 mb-2 font-bold">契約社員</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">一般事務・現場事務</h3>
                  <p className="text-sm text-slate-600">電話応対、書類作成、データ入力などの事務業務全般</p>
                </div>
                <Button asChild className="bg-slate-900 hover:bg-slate-700 text-white rounded-sm">
                  <Link href="/demo/construction/contact">応募する</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}