// app/demo/matching-service/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Search
} from "lucide-react";

export default function ServiceLpPage() {
  return (
    <div className="overflow-hidden">
      
      {/* 1. ヒーローセクション（全幅画像 + 文字乗せ） */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/demo/matching-service/hero.jpg"
            alt="オフィスで働く人々"
            fill
            className="object-cover"
            priority
          />
          {/* 文字を読みやすくするためのグラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-900/20 z-10"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="max-w-3xl">
             {/* テキストコンテンツ（白文字・ドロップシャドウ付き） */}
             <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white drop-shadow-md">
                <span className="block text-indigo-300 text-xl md:text-2xl font-bold mb-3 tracking-widest uppercase">
                  AI Matching Platform
                </span>
                採用のミスマッチを、<br />
                科学でゼロにする。
              </h1>
              
              <p className="text-lg text-slate-100 mb-8 leading-relaxed max-w-2xl drop-shadow">
                経験や勘に頼る採用はもう終わり。AIがスキル、カルチャー、志向性を分析し、<br className="hidden sm:inline" />
                あなたのチームに「本当に合う」人材を瞬時に提案します。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg h-auto border-none">
                  <Link href="/demo/matching-service/contact">
                    無料で試してみる <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {/* 背景に合わせてボタンのスタイルも調整 */}
                <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white rounded-full px-8 py-6 text-lg font-bold h-auto backdrop-blur-sm transition-colors">
                  <Link href="/demo/matching-service/features">
                    機能を見る
                  </Link>
                </Button>
              </div>
          </div>
        </div>
      </section>

     {/* 2. 導入企業ロゴ（日本語化） */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 tracking-widest mb-6">
            多くの成長企業に選ばれています
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* 日本語のダミー企業名に変更 */}
            {['株式会社テック', 'グローバル産業', 'ネクストソリューション', '未来デザイン', 'サークルシステム'].map((name) => (
              <span key={name} className="text-lg md:text-xl font-bold text-slate-700 font-sans whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 課題提起 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              採用活動、こんなことで<br className="sm:hidden"/>消耗していませんか？
            </h2>
            <p className="text-slate-600">
              従来の手法では、優秀な人材に出会う前に、膨大な時間とコストが消えていきます。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ...（課題カードの中身は変更なし）... */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 text-xl font-bold">!</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">書類選考に時間がかかる</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                何百通ものレジュメを目視で確認。スキルセットの見極めに時間がかかり、その間に他社に決まってしまう。
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 text-xl font-bold">!</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">ミスマッチによる早期離職</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                入社後に「カルチャーが合わない」と判明。採用コストが無駄になり、現場の士気も下がってしまう。
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 text-xl font-bold">!</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">エージェント費用が高い</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                成功報酬型の手数料が高騰。採用人数を増やしたくても、予算の壁に阻まれてしまう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 特徴（配色を白ベースに変更） */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="flex-1 space-y-6">
              {/* バッジの色を調整 */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                <Zap className="w-3 h-3" /> AI Matching
              </div>
              {/* 文字色を濃い色に変更 */}
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                履歴書には書かれない<br />
                「可能性」を見つけ出す。
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                独自のAIアルゴリズムが、スキルだけでなく、過去のプロジェクト実績や行動特性を分析。
                あなたのチームで活躍できる確率が高い人材を、スコア付きでレコメンドします。
              </p>
              {/* リストの色を調整 */}
              <ul className="space-y-3 text-slate-600 pt-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <span>スキルとカルチャーのダブルマッチング</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <span>バイアスを排除した公平な選考</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full">
              {/* 画像エリアの背景色を調整 */}
              <div className="aspect-video bg-white rounded-2xl border border-slate-200 relative overflow-hidden shadow-lg">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                  AI Analysis Visualization
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              {/* バッジの色を調整 */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                <BarChart3 className="w-3 h-3" /> Analytics
              </div>
              {/* 文字色を変更 */}
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                採用プロセスを可視化し、<br />
                ボトルネックを解消。
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                応募から内定までの歩留まりをリアルタイムで可視化。
                「どこで候補者が離脱しているか」を一目で把握し、採用フローの改善に役立てることができます。
              </p>
              {/* ボタンの色を調整 */}
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-full mt-4 transition-colors">
                分析機能について詳しく
              </Button>
            </div>
            <div className="flex-1 w-full">
              {/* 画像エリアの背景色を調整 */}
              <div className="aspect-video bg-white rounded-2xl border border-slate-200 relative overflow-hidden shadow-lg">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                  Dashboard UI
                </div>
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-50/50 to-transparent"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. 最後のCTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[40px] p-10 md:p-20 text-center text-white overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                理想のチーム作りを、<br />ここから始めよう。
              </h2>
              <p className="text-indigo-100 text-lg mb-10">
                14日間の無料トライアルで、AIマッチングの精度を体験してください。<br />
                クレジットカードの登録は不要です。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="h-14 px-10 bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-full text-lg">
                  無料でアカウント作成
                </Button>
              </div>
              <p className="mt-6 text-xs text-indigo-200 opacity-80">
                Already using HireFlow? <Link href="#" className="underline hover:text-white">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}