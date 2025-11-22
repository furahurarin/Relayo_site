// app/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 必要に応じてエラーログ送信サービス等に通知
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-red-50 p-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-gray-900">
        予期せぬエラーが発生しました
      </h2>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        申し訳ありません。システム上で問題が発生したため、ページを表示できませんでした。
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => reset()} variant="outline">
          再読み込みする
        </Button>
        <Button onClick={() => (window.location.href = "/")}>
          トップページへ戻る
        </Button>
      </div>
    </div>
  );
}