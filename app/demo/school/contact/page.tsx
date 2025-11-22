// app/demo/school/contact/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Loader2, Send, AlertTriangle } from "lucide-react"; // AlertTriangleを追加

export default function SchoolContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 送信遅延のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    alert("【デモ】送信動作を確認しました。\n※これはデモサイトのため、実際にメールは送信されません。");
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white pb-20">
      <div className="relative h-[300px] w-full bg-sky-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sky-900/10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">無料体験・お問い合わせ</h1>
          <p className="mt-4 text-slate-600">Contact</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-100">
          
          {/* ▼ 追加: デモ用のアラート表示 */}
          <div className="mb-10 rounded-lg bg-yellow-50 border border-yellow-200 p-4 flex gap-3 text-sm text-yellow-800">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-yellow-600" />
            <div>
              <p className="font-bold mb-1">【ご確認ください】これは制作実績のデモページです</p>
              <p>
                このフォームは動作確認用です。送信ボタンを押しても<strong>実際にお問い合わせが送信されることはありません。</strong><br />
                また、入力された個人情報が保存されることもありません。
              </p>
            </div>
          </div>

          <p className="text-center text-slate-600 mb-10">
            体験授業のお申し込み、学習に関するご相談など、<br />
            お気軽にお問い合わせください。
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* お問い合わせ種別 */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-slate-900">ご用件 <span className="text-red-500">*</span></Label>
              <RadioGroup defaultValue="experience" className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="experience" id="r1" />
                  <Label htmlFor="r1">無料体験授業の申し込み</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consultation" id="r2" />
                  <Label htmlFor="r2">学習相談・その他</Label>
                </div>
              </RadioGroup>
            </div>

            {/* お子様のお名前 */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-bold text-slate-900">お子様のお名前 <span className="text-red-500">*</span></Label>
              <Input id="name" placeholder="例：山田 太郎（デモ入力）" required className="bg-slate-50 border-slate-200 h-12" />
            </div>

            {/* 学年 */}
            <div className="space-y-2">
              <Label htmlFor="grade" className="text-base font-bold text-slate-900">学年 <span className="text-red-500">*</span></Label>
              <select id="grade" className="flex h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required>
                <option value="">選択してください</option>
                <option value="e1">小学1年生</option>
                <option value="e2">小学2年生</option>
                <option value="e3">小学3年生</option>
                <option value="e4">小学4年生</option>
                <option value="e5">小学5年生</option>
                <option value="e6">小学6年生</option>
                <option value="j1">中学1年生</option>
                <option value="j2">中学2年生</option>
                <option value="j3">中学3年生</option>
                <option value="h1">高校1年生</option>
                <option value="h2">高校2年生</option>
                <option value="h3">高校3年生</option>
              </select>
            </div>

            {/* メールアドレス */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-bold text-slate-900">保護者様 メールアドレス <span className="text-red-500">*</span></Label>
              <Input id="email" type="email" placeholder="dummy@example.com" required className="bg-slate-50 border-slate-200 h-12" />
            </div>

            {/* 内容 */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-bold text-slate-900">ご質問・ご要望</Label>
              <Textarea id="message" placeholder="デモサイトのため、個人情報の入力はお控えください。" className="min-h-[150px] bg-slate-50 border-slate-200" />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-14 text-lg font-bold bg-sky-600 hover:bg-sky-700 rounded-full shadow-md" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    送信動作中（デモ）...
                  </>
                ) : (
                  <>
                    上記の内容で送信する
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-slate-500 mt-4">
                ※デモサイトのため、実際の送信は行われません。
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}