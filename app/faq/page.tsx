// app/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactCTA from "@/components/cta/ContactCTA";

const siteDescription =
  "制作スコープ、納期、費用、保守、名義・権利、SLA、アクセシビリティ、セキュリティなどのFAQ。";

export const metadata: Metadata = {
  // レイアウトの title テンプレート適用前提のためプレーン文言のみ
  title: "よくある質問",
  description: siteDescription,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問",
    description: siteDescription,
    url: "/faq",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "よくある質問",
    description: siteDescription,
    images: ["/og.png"],
  },
};

const QA = ({ q, a }: { q: string; a: React.ReactNode }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5">
    <h3 className="font-semibold text-gray-900">{q}</h3>
    <div className="mt-2 text-gray-600">{a}</div>
  </div>
);

// 本ページは静的生成（FAQの安定性重視）
export const dynamic = "force-static";

export default function FaqPage() {
  return (
    <main className="container mx-auto space-y-8 px-4 py-12" aria-labelledby="faq-title" role="main">
      <h1 id="faq-title" className="text-3xl font-bold text-gray-900">
        よくある質問
      </h1>

      <div className="grid gap-4">
        <QA
          q="公開までの目安は？"
          a={
            <>
              素材・要件確定後の目安は
              <strong> Starter 5–10営業日／Standard 3–4週間／Growth 4–6週間</strong>
              です。規模や外部連携で前後しますが、まずは最小で公開し、数字を見ながら拡張します。
            </>
          }
        />

        <QA
          q="保守は必須ですか？"
          a={
            <>
              任意です。<strong>セルフ ¥0／ライト ¥3,980／スタンダード ¥14,800／グロース ¥39,800〜</strong>
              （税込）から選べます。依存アップデートや軽微改修、レポート・改善提案を希望される場合は保守のご契約をおすすめします。
              くわしくは <Link href="/pricing" className="underline underline-offset-4">料金ページ</Link> をご覧ください。
            </>
          }
        />

        <QA
          q="ドメインやホスティングは？"
          a={
            <>
              <strong>お客様名義</strong>のドメインを推奨します。ホスティングは <strong>Vercel</strong> を想定（他サービスも可）。
              アクセス権限や課金主体は透明化し、当方は<strong>最小権限</strong>で運用します。
            </>
          }
        />

        <QA
          q="途中で仕様変更はできますか？"
          a={
            <>
              可能です。<strong>変更管理票</strong>で範囲・費用・納期への影響を明確化し、合意のうえで進行します。
              「小さく出して、効果の出た箇所に投資する」方針です。
            </>
          }
        />

        <QA
          q="所有権やアカウント名義は？"
          a={
            <>
              成果物の利用権や各種アカウントは<strong>原則お客様名義</strong>です（テンプレートや外部コンポーネントは各ライセンス準拠）。
              GitHub リポジトリ／Vercel プロジェクトも原則お客様側に帰属させます。
            </>
          }
        />

        <QA
          q="スマホ対応・SEO・計測は含まれますか？"
          a={
            <>
              はい。全案件で<strong>レスポンシブ対応・基本SEO（OGP／メタ／サイトマップ／robots）</strong>と
              <strong>計測（Umami または GA4）</strong>の初期設定を含みます。
            </>
          }
        />

        <QA
          q="品質やパフォーマンスの目安は？"
          a={
            <>
              公開時の目安としてモバイルで<strong>LCP ≤ 2.5s ／ CLS ≤ 0.1</strong>を狙います。
              主要導線でのキーボード操作・コントラスト・代替テキストなど基本的なアクセシビリティにも配慮します。
            </>
          }
        />

        <QA
          q="アクセシビリティは？"
          a={
            <>
              <strong>JIS X 8341-3（AA 目標）</strong>に配慮。見出し構造、フォーカス可視化、適切な代替テキスト、十分なコントラストを基本に設計します。
            </>
          }
        />

        <QA
          q="SLA・対応時間は？"
          a={
            <>
              目安は<strong>P1＝即時初動／P2＝翌営業日／P3＝週内</strong>（受付：平日10–19時・メール）。
              プランに応じて改善頻度やA/Bテスト支援が強化されます。詳細は
              <Link href="/pricing" className="underline underline-offset-4"> 料金ページ</Link> をご確認ください。
            </>
          }
        />

        <QA
          q="セキュリティ・個人情報の扱いは？"
          a={
            <>
              <strong>最小権限・2FA・変更履歴</strong>を徹底し、個人情報を扱う場合は
              <strong> DPA（受託処理契約）</strong>や社内ポリシーに沿って運用します。インシデント時は
              <strong>初動（24h）／詳細（72h）</strong>の報告体制です。
            </>
          }
        />

        <QA
          q="キャンペーンの条件は？"
          a={
            <>
              最新の適用条件・対象・注意事項は
              <Link href="/campaign" className="underline underline-offset-4"> キャンペーン案内</Link>
              に集約しています。解約・移管の取り扱いは
              <Link href="/legal/terms" className="underline underline-offset-4"> 利用規約</Link> に従い安全に対応します。
            </>
          }
        />
      </div>

      <p className="text-xs text-gray-500">
        ※ 価格は税込。ドメイン／サーバ等の実費は別。納期・SLAは目安で、要件・素材の準備状況・外部連携により変動します。
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <ContactCTA />
        <Button asChild variant="secondary" size="lg">
          <Link href="/pricing">料金を見る</Link>
        </Button>
      </div>
    </main>
  );
}
