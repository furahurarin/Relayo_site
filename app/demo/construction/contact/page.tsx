// app/demo/construction/contact/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Loader2, Send, AlertTriangle } from "lucide-react";

export default function ConstructionContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("【デモ】送信動作を確認しました。\n※これはデモサイトのため、実際にメールは送信されません。");
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white pb-20">
      <div className="bg-slate-900 py-20 text-center text-white">
        <h1 className="text-3xl font-bold tracking-widest mb-2">CONTACT</h1>
        <p className="text-xs text-gray-400 font-mono">お問い合わせ</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          
          {/* デモ用アラート */}
          <div className="mb-10 rounded bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm text-amber-900">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="font-bold mb-1">【ご確認ください】これは制作実績のデモページです</p>
              <p>
                このフォームは動作確認用です。送信ボタンを押しても<strong>実際にお問い合わせが送信されることはありません。</strong>
              </p>
            </div>
          </div>

          <p className="text-center text-slate-600 mb-10">
            工事のご依頼、お見積り、採用に関するご質問など、<br />
            下記フォームよりお気軽にお問い合わせください。
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label className="text-sm font-bold text-slate-900">お問い合わせ種別 <span className="text-red-500">*</span></Label>
              <RadioGroup defaultValue="business" className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded hover:bg-slate-50">
                  <RadioGroupItem value="business" id="r1" />
                  <Label htmlFor="r1" className="cursor-pointer">工事のご相談・お見積り</Label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded hover:bg-slate-50">
                  <RadioGroupItem value="recruit" id="r2" />
                  <Label htmlFor="r2" className="cursor-pointer">採用について</Label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded hover:bg-slate-50">
                  <RadioGroupItem value="partner" id="r3" />
                  <Label htmlFor="r3" className="cursor-pointer">協力会社募集について</Label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-200 p-3 rounded hover:bg-slate-50">
                  <RadioGroupItem value="other" id="r4" />
                  <Label htmlFor="r4" className="cursor-pointer">その他</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-bold text-slate-900">貴社名</Label>
                <Input id="company" placeholder="株式会社〇〇" className="h-12 rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold text-slate-900">お名前 <span className="text-red-500">*</span></Label>
                <Input id="name" placeholder="山田 太郎" required className="h-12 rounded-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-slate-900">メールアドレス <span className="text-red-500">*</span></Label>
              <Input id="email" type="email" placeholder="example@co.jp" required className="h-12 rounded-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-bold text-slate-900">お問い合わせ内容 <span className="text-red-500">*</span></Label>
              <Textarea id="message" required placeholder="ご用件を詳しくご記入ください。" className="min-h-[150px] rounded-sm" />
            </div>

            <div className="pt-4 text-center">
              <Button type="submit" className="w-full sm:w-auto min-w-[240px] h-14 text-lg font-bold bg-amber-600 hover:bg-amber-700 rounded-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    確認画面へ進む
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}