// app/demo/construction/recruit/interview/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "先輩社員の声 | アークフィールド建設（デモ）",
};

export default function ConstructionInterviewPage() {
  return (
    <div className="bg-white pb-20">
      <div className="bg-slate-900 py-20 text-center text-white">
        <h1 className="text-3xl font-bold tracking-widest mb-2">INTERVIEW</h1>
        <p className="text-xs text-gray-400 font-mono">先輩社員の声</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* インタビュー1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[3/4] bg-slate-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                Staff Photo
              </div>
            </div>
            <div>
              <span className="text-amber-600 font-bold text-sm">建築部 / 入社3年目</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-6">
                「地図に残る」という誇りが、<br />
                日々の原動力です。
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                学生時代、完成したばかりのビルを見上げて「これを作った人はすごいな」と思ったのがきっかけでした。
                今は自分がその「作る側」にいることが不思議で、同時に誇らしくもあります。
              </p>
              <p className="text-slate-600 leading-relaxed">
                現場は毎日状況が変わります。予期せぬトラブルもありますが、
                先輩や職人さんと協力して解決できた時の達成感は格別です。
                アークフィールドは若手の意見もしっかり聞いてくれる風通しの良さがあるので、
                失敗を恐れずにチャレンジできています。
              </p>
            </div>
          </div>

          {/* インタビュー2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <div className="aspect-[3/4] bg-slate-200 relative md:order-2">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                Staff Photo
              </div>
            </div>
            <div className="md:order-1">
              <span className="text-amber-600 font-bold text-sm">土木部 / 入社10年目</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-6">
                地域の暮らしを守る責任感。<br />
                技術者としての成長を実感できる環境。
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                道路や橋梁などのインフラ整備は、派手さはありませんが、人々の当たり前の生活を支える重要な仕事です。
                災害時の復旧工事などで地域の方から「ありがとう」と言葉をかけていただいた時、この仕事を選んでよかったと心から思います。
              </p>
              <p className="text-slate-600 leading-relaxed">
                会社が資格取得を全面的にバックアップしてくれるので、働きながら1級土木施工管理技士を取得できました。
                今は後輩の指導にも力を入れています。
              </p>
            </div>
          </div>

        </div>

        <div className="mt-20 text-center">
          <Button asChild variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-sm px-8">
            <Link href="/demo/construction/recruit">
              <ArrowLeft className="mr-2 h-4 w-4" /> 採用トップに戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}