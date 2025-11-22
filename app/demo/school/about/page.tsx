// app/demo/school/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Lightbulb, Target } from "lucide-react";

export const metadata = {
  title: "当塾について | 未来進学塾（デモ）",
};

export default function SchoolAboutPage() {
  return (
    <div className="bg-white pb-20">
      {/* ヘッダー画像エリア */}
      <div className="relative h-[300px] w-full bg-sky-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sky-900/10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">当塾について</h1>
          <p className="mt-4 text-slate-600">About Us</p>
        </div>
        {/* 装飾 */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full opacity-50"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-sky-200 rounded-full opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* 理念セクション */}
        <section className="bg-white rounded-3xl p-8 sm:p-16 shadow-sm border border-slate-100 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sky-600 font-bold tracking-widest text-xs uppercase mb-4 block">PHILOSOPHY</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-relaxed">
              「勉強しなさい」と言うのを、<br />
              今日で終わりにしませんか？
            </h2>
            <p className="text-slate-600 leading-loose text-lg mb-8">
              未来進学塾が目指すのは、単なる成績アップではありません。<br />
              それは、子どもたちが自らの意思で机に向かい、<br />
              「わかった！」という喜びを通じて自信を手に入れることです。
            </p>
            <p className="text-slate-600 leading-loose text-lg">
              強制された勉強は長続きしません。<br />
              私たちは「対話」を重視した個別指導を通じて、<br />
              一人ひとりのやる気のスイッチを見つけ出します。
            </p>
          </div>
        </section>

        {/* 3つの強み */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">私たちが大切にしていること</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-sky-50 p-8 rounded-2xl">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-sky-600 mb-4 shadow-sm">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">承認と共感</h3>
              <p className="text-slate-600 leading-relaxed">
                まずは生徒の現状を否定せず、受け入れることから始めます。安心できる場所があるからこそ、挑戦する心が育ちます。
              </p>
            </div>
            <div className="bg-sky-50 p-8 rounded-2xl">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-sky-600 mb-4 shadow-sm">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">「なぜ？」の追求</h3>
              <p className="text-slate-600 leading-relaxed">
                公式を丸暗記するのではなく、「なぜそうなるのか」を理解することを重視。応用力の土台を作ります。
              </p>
            </div>
            <div className="bg-sky-50 p-8 rounded-2xl">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-sky-600 mb-4 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">スモールステップ</h3>
              <p className="text-slate-600 leading-relaxed">
                大きな目標も、小さな「できた」の積み重ね。適切な難易度の課題設定で、成功体験を積み重ねます。
              </p>
            </div>
          </div>
        </section>

        {/* 教室の様子（画像追加） */}
        <section className="mb-20">
           <div className="grid md:grid-cols-2 gap-8 items-center">
             {/* ▼ 修正: ダミーボックスを本物の画像に差し替え */}
             <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
               <Image 
                 src="/images/demo/school/classroom.jpg" 
                 alt="教室の様子" 
                 fill 
                 className="object-cover" 
               />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-4">集中できる学習環境</h2>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-1" />
                   <span className="text-slate-600">隣の席とパーテーションで区切られた個別ブース</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-1" />
                   <span className="text-slate-600">授業のない日でも使い放題の「自習室」完備</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-1" />
                   <span className="text-slate-600">過去問や参考書が自由に閲覧できるライブラリー</span>
                 </li>
               </ul>
               <div className="mt-8">
                 <Button asChild className="bg-sky-600 text-white hover:bg-sky-700 rounded-full px-8">
                   <Link href="/demo/school/contact">無料体験で教室を見る</Link>
                 </Button>
               </div>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
}