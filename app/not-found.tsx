// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-3xl font-bold">ページが見つかりません</h1>
      <p className="mb-6 text-gray-600">
        URLが変わったか、削除された可能性があります。
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          ホームへ戻る
        </Link>
        <Link
          href="/#pricing"
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
        >
          料金を見る
        </Link>
        <Link
          href="/contact?campaign=launch#get-sheet"
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
        >
          診断シートを受け取る
        </Link>
      </div>
    </main>
  );
}
