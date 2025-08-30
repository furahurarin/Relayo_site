import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "よくある質問 | Relayo",
  description: "制作スコープ、納期、費用、保守、ドメイン/サーバー、解約などのFAQ。",
};

const QA = ({ q, a }: { q: string; a: React.ReactNode }) => (
  <div className="rounded-2xl border border-gray-700/40 p-5">
    <h3 className="font-semibold">{q}</h3>
    <div className="mt-2 text-gray-300">{a}</div>
  </div>
);

export default function FaqPage() {
  return (
    <main className="container mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold">よくある質問</h1>

      <div className="grid gap-4">
        <QA
          q="公開までの目安は？"
          a="最小構成で1–2週間。素材（ロゴ/写真/文言）が揃っているほど早く、機能が増えるほど時間が伸びます。まずは最小で出して効果検証します。"
        />
        <QA
          q="保守は必須ですか？"
          a="任意です。Lite/Std/Proから選べます。依存アップデートや小改修、レポートを希望される場合は保守をおすすめします。"
        />
        <QA
          q="ドメインやサーバーは？"
          a="お客様名義のドメインを推奨します。ホスティングはVercel想定（他サービスも可）。アクセス権限や課金主体は透明化します。"
        />
        <QA
          q="途中で仕様変更はできますか？"
          a="できます。変更管理票で範囲・費用・納期への影響を明確にし、合意形成のうえ進めます。"
        />
        <QA
          q="キャンペーンの条件は？"
          a="実績掲載/レビュー協力、素材提出=KO+7日などの条件があります。詳細はお問い合わせ時に個別にご案内します。"
        />
      </div>

      <div className="flex gap-3">
        <Button asChild size="lg">
          <Link href="/contact#get-sheet" data-umami-event="faq_cta_sheet">
            診断シートで相談
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/pricing" data-umami-event="faq_cta_pricing">
            料金を見る
          </Link>
        </Button>
      </div>
    </main>
  );
}
