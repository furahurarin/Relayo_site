// app/demo/matching-service/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hexagon, Loader2, AlertCircle } from "lucide-react";

export default function ServiceLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // ログイン処理のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // 実際には遷移させず、アラートを出す
    setIsLoading(false);
    setError("デモサイトのため、実際のログインはできません。");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
        
        <div className="text-center mb-8">
          <Link href="/demo/matching-service" className="inline-flex items-center gap-2 mb-6 group">
            <Hexagon className="h-8 w-8 text-indigo-600 fill-indigo-600 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold text-slate-900">HireFlow</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900">おかえりなさい</h1>
          <p className="text-sm text-slate-500 mt-2">アカウントにログインしてください</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="name@company.com" required className="h-12" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">パスワード</Label>
              <Link href="#" className="text-xs text-indigo-600 hover:underline">パスワードを忘れた場合</Link>
            </div>
            <Input id="password" type="password" required className="h-12" />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "ログイン"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm">
          <span className="text-slate-500">アカウントをお持ちでないですか？</span>
          <Link href="/demo/matching-service/contact" className="text-indigo-600 font-bold hover:underline ml-2">
            無料で始める
          </Link>
        </div>
        
        <div className="mt-6 text-center">
           <Link href="/demo/matching-service" className="text-xs text-slate-400 hover:text-slate-600">
             ← トップページに戻る
           </Link>
        </div>

      </div>
    </div>
  );
}