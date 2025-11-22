// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-gray-100 p-4">
        <FileQuestion className="h-10 w-10 text-gray-400" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        ページが見つかりません
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
        お探しのページは移動したか、削除された可能性があります。
        URLをご確認いただくか、トップページから再度お探しください。
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">トップページに戻る</Link>
        </Button>
      </div>
    </main>
  );
}