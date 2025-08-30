// app/not-found.tsx
import Link from "next/link";
import { CAMPAIGN } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-3xl font-bold">ページが見つかりません</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        URLが変わったか、削除された可能性があります。
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white"
          aria-label="ホームへ戻る"
        >
          ホームへ戻る
        </Link>

        <Link
          href="/pricing" // ← /#pricing から修正
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          aria-label="料金を見る"
          data-umami-event="cta_pricing"
          data-umami-event-section="not-found"
        >
          料金を見る
        </Link>

        <Link
          href={CAMPAIGN.sheetHref}
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          aria-label="診断シートを受け取る"
          data-umami-event="cta_sheet"
          data-umami-event-section="not-found"
        >
          {CAMPAIGN.labels.sheet}
        </Link>
      </div>
    </main>
  );
}
