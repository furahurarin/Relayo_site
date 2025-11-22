// app/demo/school/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Users, 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  ChevronRight,
  MapPin,
  Phone
} from "lucide-react";
import { schoolNews } from "./_data/news";

export default function SchoolDemoPage() {
  const latestNews = schoolNews.slice(0, 2);

  return (
    <>
      {/* 1. ヒーローセクション */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/demo/school/hero.jpg"
            alt="勉強する生徒"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/60 z-10 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-sky-600/10 text-sky-700 text-sm font-bold mb-6 border border-sky-200 backdrop-blur-sm">
              地域密着・完全個別指導
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
              「わかった！」が増える。<br />
              <span className="text-sky-600">勉強がもっと好きになる。</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 mb-10 leading-relaxed font-medium">
              未来進学塾は、一人ひとりのペースに合わせた1:2の個別指導。<br className="hidden sm:inline" />
              苦手な単元を克服し、志望校合格への最短ルートを一緒に描きます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-10 py-6 text-lg shadow-xl shadow-sky-200/50 h-auto">
                <Link href="/demo/school/contact">無料体験授業に申し込む</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/80 border-sky-200 text-sky-700 hover:bg-white hover:text-sky-800 rounded-full px-10 py-6 text-lg h-auto backdrop-blur">
                <Link href="/demo/school/about">教室の様子を見る</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせセクション */}
      <section className="py-12 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-xl font-bold text-slate-900 flex-shrink-0">NEWS</div>
            <div className="flex-1 space-y-3">
              {latestNews.map((news) => (
                <Link 
                  key={news.slug} 
                  href={`/demo/school/news/${news.slug}`} 
                  className="flex items-start sm:items-center gap-3 group"
                >
                  <time className="text-sm text-slate-400 font-mono flex-shrink-0">
                    {news.date}
                  </time>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                    news.category === "重要" ? "bg-red-100 text-red-600" :
                    news.category === "イベント" ? "bg-green-100 text-green-600" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-sm text-slate-700 group-hover:text-sky-600 underline-offset-4 group-hover:underline line-clamp-1">
                    {news.title}
                  </span>
                </Link>
              ))}
            </div>
            <div className="hidden md:block">
              <Link href="/demo/school/news" className="text-xs font-bold text-sky-600 hover:underline flex items-center">
                一覧を見る <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3つの特徴 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">未来進学塾が選ばれる理由</h2>
            <p className="text-slate-600">
              ただ成績を上げるだけでなく、「自ら学ぶ力」を育てます。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-full h-40 mb-6 bg-sky-100 rounded-xl overflow-hidden relative flex items-center justify-center text-sky-300">
                 <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">完全1:2の個別指導</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                講師1名につき生徒2名まで。解説と演習をバランスよく行い、質問しやすい環境を作ります。
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-full h-40 mb-6 bg-sky-100 rounded-xl overflow-hidden relative flex items-center justify-center text-sky-300">
                 <BookOpen className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">オーダーメイドカリキュラム</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                学校の授業進度や志望校、苦手科目に合わせて、あなただけの学習プランを作成します。
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-full h-40 mb-6 bg-sky-100 rounded-xl overflow-hidden relative flex items-center justify-center text-sky-300">
                 <Calendar className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">部活と両立できる自由予約</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Webから24時間いつでも授業予約・振替が可能。忙しい中学生・高校生も無理なく通えます。
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-sky-600 font-bold text-base">
              <Link href="/demo/school/courses">コース・料金について詳しく見る <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. 合格実績 */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">2025年度 合格実績</h2>
              <p className="text-slate-600">生徒たちの努力の結晶です。今年も多くの桜が咲きました。</p>
            </div>
            <Button asChild variant="ghost" className="text-sky-600 font-bold hover:text-sky-700 hover:bg-sky-50">
              <Link href="/demo/school/achievements">
                全ての実績を見る <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1 font-medium">県立高校 一般入試</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">〇〇高等学校 合格</h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  「先生のおかげで苦手な数学が好きになりました！最後まで諦めなくて本当によかったです。」
                </p>
                <div className="mt-3 text-xs font-bold text-sky-600">M.Kさん（中学3年生）</div>
              </div>
            </div>
            
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1 font-medium">大学入試 推薦</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">△△大学 文学部 合格</h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  「小論文の添削を何度も丁寧にしていただきました。面接練習も自信になりました。」
                </p>
                <div className="mt-3 text-xs font-bold text-sky-600">S.Yさん（高校3年生）</div>
              </div>
            </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1 font-medium">私立高校 一般入試</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">□□大学付属高校 合格</h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  「英語の長文読解が速くなりました。自習室が使いやすくて毎日通いました。」
                </p>
                <div className="mt-3 text-xs font-bold text-sky-600">T.Rさん（中学3年生）</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* アクセスセクション */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6">教室へのアクセス</h2>
               <p className="text-slate-600 mb-8">
                 駅前商店街を抜けてすぐ、通いやすい立地です。<br />
                 夜でも明るい道なので、安心して通塾いただけます。
               </p>
               <div className="space-y-4">
                 <div className="flex items-start gap-4">
                   <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 text-sky-600">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-900">住所</h3>
                     <p className="text-slate-600">〒100-0001 東京都千代田区〇〇 1-2-3 駅前ビル 2F</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 text-sky-600">
                     <Phone className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-900">お電話</h3>
                     <p className="text-slate-600">03-1234-5678（受付 14:00〜21:00）</p>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Google Map */}
             <div className="h-[400px] bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative group">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d139.7645498767765!3d35.68123617258713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1732372000000!5m2!1sja!2sjp"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="grayscale group-hover:grayscale-0 transition-all duration-500"
                 title="Google Maps"
               />
               <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 text-xs text-slate-500 rounded backdrop-blur">
                 ※デモ用に東京駅を表示しています
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-24 bg-sky-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-sky-600 rounded-3xl p-8 sm:p-16 text-center text-white overflow-hidden relative shadow-xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">まずは無料体験授業へお越しください</h2>
              <p className="text-sky-100 mb-8 text-lg">
                教室の雰囲気や授業の進め方を実際に体験していただけます。<br />
                学習相談も同時に承っております。
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-sky-600 hover:bg-sky-50 rounded-full px-10 py-6 text-lg font-bold shadow-md border-none h-auto">
                <Link href="/demo/school/contact">体験授業を予約する（無料）</Link>
              </Button>
              <p className="mt-6 text-sm opacity-80">
                お電話でも受付中：03-1234-5678（14:00〜21:00）
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}