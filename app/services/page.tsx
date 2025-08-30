import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Rocket, Wrench, Layers, Zap, Shield } from "lucide-react";
import { CAMPAIGN } from "@/lib/constants";

export const metadata: Metadata = {
  title: "サービス | Relayo",
  description:
    "中小企業・個人事業主向けのWeb/アプリ制作。Next.js + Tailwindで高速・保守しやすいサイトを短納期で提供。予約/会員/決済、LINE連携、運用保守まで一気通貫。",
};

const Feature = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-gray-700/40 p-5">
    <h3 className="font-semibold text-lg">{title}</h3>
    <div className="mt-2 text-gray-300">{children}</div>
  </div>
);

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-12 space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">できること</h1>
        <p className="text-gray-300">
          ビジネス目標から逆算して、<span className="font-semibold">“早く出して、育てる”</span>
          を前提に設計・実装します。初期は最小機能、効果が出た部分に投資する方針です。
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link href="/contact#get-sheet" data-umami-event="services_cta_sheet">
              診断シートで相談する
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/pricing" data-umami-event="services_cta_pricing">
              料金を見る
            </Link>
          </Button>
        </div>
      </section>

      {/* 提供範囲 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">提供範囲</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Feature title="Webサイト制作（Next.js + Tailwind）">
            <ul className="list-disc pl-5 space-y-1">
              <li>LP／コーポレート／ブログ／フォーム／お知らせ</li>
              <li>高速表示・モバイル最適化・基本SEO・構造化データ</li>
              <li>計測（Umami/GA4）・タグ運用・OGP整備</li>
            </ul>
          </Feature>
          <Feature title="機能追加（必要に応じて）">
            <ul className="list-disc pl-5 space-y-1">
              <li>予約・会員・決済（Stripeなど）</li>
              <li>LINE/Instagram連携・自動返信・通知</li>
              <li>簡易CMS／求人・採用ページ／問い合わせ管理</li>
            </ul>
          </Feature>
          <Feature title="運用・保守">
            <ul className="list-disc pl-5 space-y-1">
              <li>月次レポート／軽微改修／依存パッケージ更新</li>
              <li>脆弱性対応・監視・SLA（プラン別）</li>
              <li>ABテスト／コピー最適化／速度改善</li>
            </ul>
          </Feature>
          <Feature title="制作物・成果物">
            <ul className="list-disc pl-5 space-y-1">
              <li>リポジトリ（GitHub）／デプロイ（Vercel）</li>
              <li>デザイン指針・コンポーネント（再利用前提）</li>
              <li>運用ガイド（更新手順・注意点）</li>
            </ul>
          </Feature>
        </div>
      </section>

      {/* プロセス */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">進め方（最短で出す）</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-gray-700/40 p-5">
            <div className="flex items-center gap-2 font-semibold">
              <Rocket className="h-5 w-5" /> 1. 要件すり合わせ（1–2日）
            </div>
            <p className="mt-2 text-gray-300">診断シート→ヒアリング→方針確定。KPIと最小機能を決定。</p>
          </li>
          <li className="rounded-2xl border border-gray-700/40 p-5">
            <div className="flex items-center gap-2 font-semibold">
              <Layers className="h-5 w-5" /> 2. デザイン/実装（〜1–2週）
            </div>
            <p className="mt-2 text-gray-300">Next.jsで並行実装。公開前に実機確認。</p>
          </li>
          <li className="rounded-2xl border border-gray-700/40 p-5">
            <div className="flex items-center gap-2 font-semibold">
              <Zap className="h-5 w-5" /> 3. 公開・計測（以後継続）
            </div>
            <p className="mt-2 text-gray-300">Umami/GA4で測り、コピー・導線を継続改善。</p>
          </li>
        </ol>
        <p className="text-xs text-gray-500">
          ※案件規模・素材の準備状況で前後します。まずは最小で出し、数字で改善します。
        </p>
      </section>

      {/* 強み・ポリシー */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Relayoの方針</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
            <span>短納期前提：スピード重視で“まず出す”。運用で勝つ。</span>
          </li>
          <li className="flex items-start gap-2">
            <Wrench className="mt-0.5 h-5 w-5 text-emerald-500" />
            <span>保守しやすさ：コンポーネント設計と依存アップデートを標準化。</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="mt-0.5 h-5 w-5 text-emerald-500" />
            <span>法務・計測の整備：特商法/規約/プライバシー、OGP/構造化データまで。</span>
          </li>
        </ul>
        <div className="rounded-xl border border-emerald-700/40 bg-emerald-900/20 p-4 text-emerald-200">
          <strong>{CAMPAIGN.name}</strong>：先着{CAMPAIGN.seats}社、制作費¥0 + 保守{CAMPAIGN.freeCareMonths}ヶ月¥0（Lite相当）
        </div>
      </section>

      {/* CTA */}
      <section className="flex gap-3">
        <Button asChild size="lg">
          <Link href="/contact#get-sheet" data-umami-event="services_bottom_cta_sheet">
            診断シートで相談する
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/pricing" data-umami-event="services_bottom_cta_pricing">
            料金を見る
          </Link>
        </Button>
      </section>

      {/* 構造化データ（簡易） */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Relayo",
            areaServed: "Japan",
            serviceType: ["Website Development", "Web App Development", "Maintenance"],
          }),
        }}
      />
    </main>
  );
}
