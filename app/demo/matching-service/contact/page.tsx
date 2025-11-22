// app/demo/matching-service/contact/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Send, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ServiceContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // 送信遅延のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">お申し込み完了</h1>
          <p className="text-slate-600 mb-8">
            お問い合わせありがとうございます。<br />
            担当者より、1営業日以内にご案内メールをお送りいたします。
          </p>
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => window.location.href = "/demo/matching-service"}
          >
            トップページに戻る
          </Button>
          <p className="mt-4 text-xs text-slate-400">※これはデモサイトの演出です</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">お問い合わせ・無料トライアル</h1>
            <p className="text-slate-600">
              14日間の無料トライアル、または資料請求を承っております。<br />
              まずはお気軽にご連絡ください。
            </p>
          </div>

          {/* デモ用アラート */}
          <div className="mb-8 rounded-lg bg-indigo-50 border border-indigo-100 p-4 flex gap-3 text-sm text-indigo-900">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-indigo-600" />
            <div>
              <p className="font-bold mb-1">【デモページ】フォーム動作確認用</p>
              <p>
                実際には送信されません。個人情報の入力はお控えください。
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-4">
                <Label className="text-base font-bold text-slate-900">ご希望の内容 <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue="trial" className="grid sm:grid-cols-2 gap-4">
                  <div className="relative flex items-start space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-slate-50 hover:border-indigo-200 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 transition-all">
                    <RadioGroupItem value="trial" id="r1" className="mt-1" />
                    <Label htmlFor="r1" className="cursor-pointer font-normal">
                      <span className="block font-bold text-slate-900 mb-1">無料トライアル</span>
                      <span className="text-xs text-slate-500">全機能を14日間無料でお試し。クレジットカード不要。</span>
                    </Label>
                  </div>
                  <div className="relative flex items-start space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-slate-50 hover:border-indigo-200 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 transition-all">
                    <RadioGroupItem value="document" id="r2" className="mt-1" />
                    <Label htmlFor="r2" className="cursor-pointer font-normal">
                      <span className="block font-bold text-slate-900 mb-1">資料請求・相談</span>
                      <span className="text-xs text-slate-500">サービス概要資料の送付や、導入に関するご相談。</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">会社名 <span className="text-red-500">*</span></Label>
                  <Input id="company" required placeholder="株式会社HireFlow" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">お名前 <span className="text-red-500">*</span></Label>
                  <Input id="name" required placeholder="山田 太郎" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス <span className="text-red-500">*</span></Label>
                <Input id="email" type="email" required placeholder="taro@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tel">電話番号</Label>
                <Input id="tel" type="tel" placeholder="03-1234-5678" />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    この内容で申し込む
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}