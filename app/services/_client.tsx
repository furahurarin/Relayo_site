// app/services/_client.tsx  ← クライアントコンポーネント（新規・改善版）
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Rocket, Wrench, Layers, Zap, Shield } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

const Feature = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-gray-200 p-5 bg-white">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <div className="mt-2 text-gray-600">{children}</div>
  </div>
);

export default function ServicesPageClient() {
  return (
    <main className="container mx-auto space-y-12 px-4 py-12" aria-labelledby="services-page-heading" role="main">
      {/* Hero */}
      <section className="space-y-4" aria-label="概要">
        <h1 id="services-page-heading" className="text-3xl font-bold text-gray-900">できること</h1>
        <p className="text-gray-600">
          ビジネス目標から逆算して、<span className="font-semibold">“早く出して、育てる”</span>
          を前提に設計・実装します。初期は最小機能で公開し、効果が出た部分に投資する方針です（オンライン〈メール中心〉対応）。
        </p>
        <div className="flex flex-wrap gap-3">
          {/* ✅ 入口はフォームに統一 */}
          <ContactCTA />
          <Button asChild size="lg" variant="secondary">
            <Link href="/pricing" aria-label="料金ページへ">料金を見る</Link>
          </Button>
        </div>
      </section>

      {/* 提供範囲 */}
      <section className="space-y-6" aria-label="提供範囲">
        <h2 className="text-2xl font-semibold text-gray-900">提供範囲</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Feature title="Webサイト制作（Next.js + Tailwind）">
            <ul className="list-disc space-y-1 pl-5">
              <li>LP／コーポレート／ブログ／フォーム／お知らせ</li>
              <li>高速表示・モバイル最適化・基本SEO・構造化データ</li>
              <li>計測（Umami / GA4）・タグ運用・OGP整備</li>
            </ul>
          </Feature>
          <Feature title="機能追加（必要に応じて）">
            <ul className="list-disc space-y-1 pl-5">
              <li>予約・会員・決済（Stripe など）</li>
              <li>LINE / Instagram 連携・自動返信・通知</li>
              <li>簡易CMS／求人・採用ページ／問い合わせ管理</li>
            </ul>
          </Feature>
          <Feature title="運用・保守">
            <ul className="list-disc space-y-1 pl-5">
              <li>月次レポート／軽微改修／依存パッケージ更新</li>
              <li>脆弱性対応・監視・SLA（プラン別）</li>
              <li>A/Bテスト／コピー最適化／速度改善</li>
            </ul>
          </Feature>
          <Feature title="制作物・成果物">
            <ul className="list-disc space-y-1 pl-5">
              <li>リポジトリ（GitHub）／デプロイ（Vercel）</li>
              <li>デザイン指針・コンポーネント（再利用前提）</li>
              <li>運用ガイド（更新手順・注意点）</li>
            </ul>
          </Feature>
        </div>
      </section>

      {/* プロセス */}
      <section className="space-y-4" aria-label="進め方">
        <h2 className="text-2xl font-semibold text-gray-900">進め方（最短で出す）</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-gray-200 p-5 bg-white">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Rocket className="h-5 w-5" aria-hidden="true" /> 1. 要件すり合わせ（1–2営業日）
            </div>
            <p className="mt-2 text-gray-600">診断シート → ヒアリング → 方針確定。KPIと最小機能を決定。</p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-5 bg-white">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Layers className="h-5 w-5" aria-hidden="true" /> 2. デザイン / 実装（1–2週間）
            </div>
            <p className="mt-2 text-gray-600">Next.js で並行実装。公開前に実機確認。</p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-5 bg-white">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Zap className="h-5 w-5" aria-hidden="true" /> 3. 公開・計測（以後継続）
            </div>
            <p className="mt-2 text-gray-600">Umami / GA4 で測り、コピー・導線を継続改善。</p>
          </li>
        </ol>
        <p className="text-xs text-gray-500">
          ※ 案件規模・素材の準備状況で前後します。まずは最小で出し、数字で改善します。
        </p>
      </section>

      {/* 強み・ポリシー */}
      <section className="space-y-4" aria-label="方針">
        <h2 className="text-2xl font-semibold text-gray-900">Relayoの方針</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-gray-700">短納期前提：スピード重視で“まず出す”。運用で勝つ。</span>
          </li>
          <li className="flex items-start gap-2">
            <Wrench className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-gray-700">保守しやすさ：コンポーネント設計と依存アップデートを標準化。</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-gray-700">法務・計測の整備：特定商取引法／規約／プライバシー、OGP／構造化データまで。</span>
          </li>
        </ul>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          キャンペーンの条件・対象・注意事項は{" "}
          <Link href="/campaign" className="underline underline-offset-4">
            キャンペーン案内
          </Link>
          をご確認ください。
        </div>
      </section>

      {/* CTA（入口は /contact に一本化） */}
      <section className="flex flex-wrap gap-3" aria-label="お問い合わせ">
        <ContactCTA />
        <Button asChild size="lg" variant="secondary">
          <Link href="/pricing" aria-label="料金ページへ">料金を見る</Link>
        </Button>
      </section>

      {/* 構造化データ（簡易） */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: BRAND.name,
            areaServed: "Japan",
            serviceType: ["Website Development", "Web App Development", "Maintenance"],
            url: "/services",
          }),
        }}
      />
    </main>
  );
}

