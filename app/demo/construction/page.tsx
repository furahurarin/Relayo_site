// app/demo/construction/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Building, ShieldCheck } from "lucide-react";
import { constructionNews } from "./_data/news";

export default function ConstructionDemoPage() {
  const latestNews = constructionNews.slice(0, 2);

  return (
    <>
      {/* 1. ヒーローセクション（明るい画像対応版） */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-50">
        {/* 背景画像エリア */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/demo/construction/hero.jpg"
            alt="建設現場の風景"
            fill
            className="object-cover" // 画像はそのままの明るさで表示
            priority
          />
          {/* ▼ 変更: 白いグラデーションをかけて文字を読みやすくする */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="max-w-4xl">
            {/* 見出し */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              {/* ▼ 変更: 濃いオレンジに変更 */}
              <span className="block text-amber-600 text-2xl md:text-3xl font-bold mb-4 tracking-widest">
                Building the Future
              </span>
              {/* ▼ 変更: 濃いネイビー（黒に近い）に変更 */}
              <span className="text-slate-900">
                地図に残る仕事。<br />
                未来を創る技術。
              </span>
            </h1>
            
            {/* 本文 */}
            {/* ▼ 変更: 濃いグレーに変更 */}
            <p className="text-lg md:text-xl text-slate-700 mb-10 max-w-2xl leading-relaxed border-l-4 border-amber-500 pl-6">
              創業50年。私たちは確かな技術力と誠実な施工で、<br className="hidden sm:inline" />
              地域のインフラと人々の暮らしを支え続けています。
            </p>
            
            {/* ボタン */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-sm px-10 py-7 text-lg font-bold tracking-wide shadow-lg border-none">
                <Link href="/demo/construction/works">
                  施工実績を見る <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {/* ▼ 変更: 白背景に合わせて枠線を濃く変更 */}
              <Button asChild size="lg" variant="outline" className="bg-transparent border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-sm px-10 py-7 text-lg font-bold tracking-wide">
                <Link href="/demo/construction/company">
                  企業情報 <Building className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* スクロールダウン指示（色変更） */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
          <span className="text-slate-900 text-xs tracking-widest mb-2 font-bold">SCROLL</span>
          <div className="w-[1px] h-12 bg-slate-900"></div>
        </div>
      </section>

      {/* 2. News（データ連動） */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 tracking-wide">NEWS</h2>
              <span className="text-xs text-amber-600 font-bold tracking-widest">お知らせ</span>
            </div>
            <div className="flex-1 space-y-4 border-l border-gray-200 md:pl-8">
              {latestNews.map((news) => (
                <Link 
                  key={news.slug} 
                  href={`/demo/construction/news/${news.slug}`} 
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 group"
                >
                  <time className="text-sm text-gray-400 font-mono">{news.date}</time>
                  <span className="text-sm text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {news.title}
                  </span>
                </Link>
              ))}
            </div>
            <div className="hidden md:block">
              <Button asChild variant="ghost" className="text-slate-500 hover:text-amber-600">
                <Link href="/demo/construction/news">一覧を見る <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 事業紹介（Business） */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-bold tracking-widest text-sm block mb-2">OUR BUSINESS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">事業内容</h2>
            <p className="text-slate-600 leading-relaxed">
              道路・橋梁などの土木工事から、オフィスビル・マンションの建築工事まで。<br />
              総合建設業として、幅広い分野で社会に貢献しています。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 土木事業 */}
            <div className="bg-white group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors"></div>
                <div className="flex items-center justify-center h-full text-slate-400 font-bold">Image Area</div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 text-amber-600">
                  <Truck className="h-6 w-6" />
                  <h3 className="text-xl font-bold text-slate-900">土木事業</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  道路、河川、橋梁、上下水道など、人々の生活に欠かせない社会インフラの整備を行っています。
                </p>
                <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                  詳細を見る <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>

            {/* 建築事業 */}
            <div className="bg-white group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors"></div>
                <div className="flex items-center justify-center h-full text-slate-400 font-bold">Image Area</div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 text-amber-600">
                  <Building className="h-6 w-6" />
                  <h3 className="text-xl font-bold text-slate-900">建築事業</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  公共施設、オフィスビル、マンション、工場など、安全性と機能性を追求した建物を建設しています。
                </p>
                <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                  詳細を見る <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>

            {/* リニューアル・保全 */}
            <div className="bg-white group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors"></div>
                <div className="flex items-center justify-center h-full text-slate-400 font-bold">Image Area</div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 text-amber-600">
                  <ShieldCheck className="h-6 w-6" />
                  <h3 className="text-xl font-bold text-slate-900">維持・修繕事業</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  既存のインフラや建物の点検、補修、耐震補強を行い、建物の長寿命化と資産価値の向上を実現します。
                </p>
                <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                  詳細を見る <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 採用情報（画像適用） */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/demo/construction/recruit-bg.jpg"
            alt="働く社員たち"
            fill
            className="object-cover opacity-20 grayscale"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-500 font-bold tracking-widest text-sm block mb-4">RECRUIT</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                つくるのは、<br />
                100年先の景色。
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                アークフィールド建設では、共に未来の街づくりに挑戦する仲間を募集しています。<br />
                未経験からの挑戦も歓迎します。あなたの情熱を、形に残る仕事に変えてみませんか。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-gray-100 rounded-sm px-8 py-6 font-bold">
                  <Link href="/demo/construction/recruit">採用情報を見る</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-sm px-8 py-6 font-bold">
                  <Link href="/demo/construction/recruit/interview">先輩社員の声</Link>
                </Button>
              </div>
            </div>
            {/* 右側：数字で見る */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur p-6 rounded border border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-2">創業</p>
                <p className="text-3xl font-bold text-white">50<span className="text-sm ml-1 font-normal">年</span></p>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded border border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-2">施工実績</p>
                <p className="text-3xl font-bold text-white">5,000<span className="text-sm ml-1 font-normal">件超</span></p>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded border border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-2">平均勤続年数</p>
                <p className="text-3xl font-bold text-white">15.8<span className="text-sm ml-1 font-normal">年</span></p>
              </div>
              <div className="bg-white/10 backdrop-blur p-6 rounded border border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-2">有休取得率</p>
                <p className="text-3xl font-bold text-white">80<span className="text-sm ml-1 font-normal">%</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}