// app/demo/construction/company/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export const metadata = {
  title: "会社案内 | アークフィールド建設（デモ）",
};

export default function ConstructionCompanyPage() {
  return (
    <div className="bg-white pb-20">
      <div className="bg-slate-900 py-20 text-center text-white">
        <h1 className="text-3xl font-bold tracking-widest mb-2">COMPANY</h1>
        <p className="text-xs text-gray-400 font-mono">会社案内</p>
      </div>

      {/* 社長挨拶 */}
      <div className="container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/4] bg-slate-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                CEO Image
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-relaxed">
                誠実な施工で、<br />
                安心できる社会基盤を<br />
                次世代へ繋ぐ。
              </h2>
              <div className="space-y-6 text-slate-600 leading-loose">
                <p>
                  アークフィールド建設は、創業以来50年にわたり、地域のインフラ整備と都市開発に携わってまいりました。
                </p>
                <p>
                  建設業は、地図に残る仕事であり、人々の生活を支える責任ある仕事です。私たちは常に「安全・品質・環境」を最優先し、技術の研鑽に努めてきました。
                </p>
                <p>
                  近年、自然災害の激甚化やインフラの老朽化など、建設業を取り巻く課題は変化しています。私たちはこれらの課題に対し、最新の技術と長年培ったノウハウで応え、安心・安全な社会づくりに貢献してまいります。
                </p>
                <div className="pt-4">
                  <p className="font-bold text-slate-900">代表取締役社長</p>
                  <p className="text-2xl font-serif text-slate-900 mt-2">山田 建設</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 会社概要 */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">会社概要</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                <dt className="font-bold text-slate-900">会社名</dt>
                <dd className="sm:col-span-2 text-slate-600">株式会社 アークフィールド建設</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                <dt className="font-bold text-slate-900">創業</dt>
                <dd className="sm:col-span-2 text-slate-600">1975年（昭和50年）4月</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                <dt className="font-bold text-slate-900">資本金</dt>
                <dd className="sm:col-span-2 text-slate-600">5,000万円</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                <dt className="font-bold text-slate-900">代表者</dt>
                <dd className="sm:col-span-2 text-slate-600">代表取締役社長　山田 建設</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                <dt className="font-bold text-slate-900">従業員数</dt>
                <dd className="sm:col-span-2 text-slate-600">120名（2025年4月現在）</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                <dt className="font-bold text-slate-900">事業内容</dt>
                <dd className="sm:col-span-2 text-slate-600">
                  土木工事、建築工事、舗装工事、解体工事、<br />
                  不動産の売買・賃貸・管理
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-4">
                <dt className="font-bold text-slate-900">所在地</dt>
                <dd className="sm:col-span-2 text-slate-600">
                  〒100-0001 東京都千代田区丸の内1-1-1 アークフィールドビル 8F
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* アクセス */}
      <div className="container mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">アクセス</h2>
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video w-full bg-slate-100 mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828030525806!2d139.76454987570036!3d35.68123617258703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1708584000000!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-900 mb-1">本社</p>
                <p className="text-slate-600">
                  JR「東京駅」丸の内北口より徒歩5分<br />
                  東京メトロ「大手町駅」直結
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-900 mb-1">お問い合わせ</p>
                <p className="text-slate-600">03-9999-9999（代表）</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}