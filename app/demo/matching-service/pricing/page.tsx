// app/demo/matching-service/pricing/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, HelpCircle } from "lucide-react";

export const metadata = {
  title: "料金プラン | HireFlow（デモ）",
};

export default function ServicePricingPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <section className="text-center py-16 px-4 bg-slate-50">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          シンプルで、透明な料金体系
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          初期費用なし。成功報酬なし。<br />
          月額定額制で、すべての機能をご利用いただけます。
        </p>
      </section>

      <div className="container mx-auto px-4 sm:px-6 -mt-10">
        {/* 料金カード */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 relative z-10">
          {/* Free */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900">Free</h3>
              <p className="text-xs text-slate-500 mt-1">まずは機能を試したい方に</p>
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mb-6">¥0</div>
            <Button asChild variant="outline" className="w-full rounded-full border-slate-300 mb-8">
              <Link href="#">無料で始める</Link>
            </Button>
            <ul className="space-y-4 text-sm text-slate-600 flex-1">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-slate-400 shrink-0" /> 候補者検索（閲覧のみ）</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-slate-400 shrink-0" /> 求人票作成（3件まで）</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-slate-400 shrink-0" /> スカウト送信（月10通）</li>
            </ul>
          </div>
          
          {/* Pro */}
          <div className="bg-white border-2 border-indigo-600 rounded-2xl p-8 relative shadow-2xl flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-full tracking-wider">
              POPULAR
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-indigo-600">Pro</h3>
              <p className="text-xs text-slate-500 mt-1">本格的に採用を行いたい企業向け</p>
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mb-6">
              ¥50,000<span className="text-sm font-normal text-slate-500 ml-1">/月</span>
            </div>
            <Button asChild className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 mb-8 shadow-lg shadow-indigo-200">
              <Link href="#">14日間無料で試す</Link>
            </Button>
            <ul className="space-y-4 text-sm text-slate-700 font-medium flex-1">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-600 shrink-0" /> <strong>求人票作成 無制限</strong></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-600 shrink-0" /> <strong>スカウト送信 500通/月</strong></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-600 shrink-0" /> AIマッチング・レコメンド</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-600 shrink-0" /> 日程調整カレンダー連携</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-indigo-600 shrink-0" /> 優先チャットサポート</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1">大規模採用・セキュリティ重視</p>
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mb-6">ASK</div>
            <Button asChild variant="outline" className="w-full rounded-full bg-white border-slate-300 mb-8">
              <Link href="#">営業担当に相談</Link>
            </Button>
            <ul className="space-y-4 text-sm text-slate-600 flex-1">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-slate-400 shrink-0" /> スカウト送信 無制限</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-slate-400 shrink-0" /> API連携 / SSO</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-slate-400 shrink-0" /> 専任カスタマーサクセス</li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-slate-400 shrink-0" /> 請求書払い対応</li>
            </ul>
          </div>
        </div>

        {/* 機能比較表 */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">機能比較</h2>
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 font-medium text-slate-500 w-1/3">機能</th>
                  <th className="py-4 px-6 font-bold text-slate-900 text-center w-1/6">Free</th>
                  <th className="py-4 px-6 font-bold text-indigo-600 text-center w-1/6 bg-indigo-50/50">Pro</th>
                  <th className="py-4 px-6 font-bold text-slate-900 text-center w-1/6">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-900 font-medium">求人票公開数</td>
                  <td className="py-4 px-6 text-center text-slate-600">3件</td>
                  <td className="py-4 px-6 text-center font-bold text-indigo-600 bg-indigo-50/30">無制限</td>
                  <td className="py-4 px-6 text-center text-slate-600">無制限</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-900 font-medium">スカウト送信数</td>
                  <td className="py-4 px-6 text-center text-slate-600">10通/月</td>
                  <td className="py-4 px-6 text-center font-bold text-indigo-600 bg-indigo-50/30">500通/月</td>
                  <td className="py-4 px-6 text-center text-slate-600">カスタム</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-900 font-medium">AIマッチング</td>
                  <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-slate-200" /></td>
                  <td className="py-4 px-6 text-center bg-indigo-50/30"><Check className="w-5 h-5 mx-auto text-indigo-600" /></td>
                  <td className="py-4 px-6 text-center"><Check className="w-5 h-5 mx-auto text-slate-900" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-900 font-medium">日程調整ツール</td>
                  <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-slate-200" /></td>
                  <td className="py-4 px-6 text-center bg-indigo-50/30"><Check className="w-5 h-5 mx-auto text-indigo-600" /></td>
                  <td className="py-4 px-6 text-center"><Check className="w-5 h-5 mx-auto text-slate-900" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-900 font-medium">チームメンバー招待</td>
                  <td className="py-4 px-6 text-center text-slate-600">1名まで</td>
                  <td className="py-4 px-6 text-center font-bold text-indigo-600 bg-indigo-50/30">10名まで</td>
                  <td className="py-4 px-6 text-center text-slate-600">無制限</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-900 font-medium">API連携</td>
                  <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-slate-200" /></td>
                  <td className="py-4 px-6 text-center bg-indigo-50/30"><X className="w-5 h-5 mx-auto text-slate-200" /></td>
                  <td className="py-4 px-6 text-center"><Check className="w-5 h-5 mx-auto text-slate-900" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-slate-900 font-medium">専任サポート</td>
                  <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-slate-200" /></td>
                  <td className="py-4 px-6 text-center bg-indigo-50/30"><X className="w-5 h-5 mx-auto text-slate-200" /></td>
                  <td className="py-4 px-6 text-center"><Check className="w-5 h-5 mx-auto text-slate-900" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}