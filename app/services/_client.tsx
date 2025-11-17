// app/services/_client.tsx  
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Rocket, Wrench, Layers, Zap, Shield } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

const Feature = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <div className="mt-2 text-gray-700">{children}</div>
  </div>
);

export default function ServicesPageClient() {
  return (
    <main
      className="container mx-auto space-y-12 px-4 py-12"
      aria-labelledby="services-page-heading"
      role="main"
    >
      {/* Hero */}
      <section className="space-y-4" aria-label="概要">
        <h1 id="services-page-heading" className="text-3xl font-bold text-gray-900">
          提供サービス
        </h1>
        <p className="text-gray-700">
          目的から逆算し、必要な範囲を明確にして短期間で公開します。公開後は、計画に沿って継続的に見直し・改善を行います
          （オンライン〈メール中心〉対応）。
        </p>
        <div className="flex flex-wrap gap-3">
          {/* ✅ 入口はフォームに統一 */}
          <ContactCTA />
          <Button asChild size="lg" variant="secondary">
            <Link href="/pricing" aria-label="料金ページへ">
              料金を見る
            </Link>
          </Button>
        </div>
      </section>

      {/* 提供範囲 */}
      <section className="space-y-6" aria-label="提供範囲">
        <h2 className="text-2xl font-semibold text-gray-900">提供範囲</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Feature title="Webサイト制作（スマホ対応・高速表示）">
            <ul className="list-disc space-y-1 pl-5">
              <li>LP／コーポレートサイト／ブログ／フォーム／お知らせ</li>
              <li>スマホ最適化・表示速度の調整・基本的な検索対策・必要な構造化データ</li>
              <li>アクセス計測の初期設定・SNSでの見え方（OGP）の整備</li>
            </ul>
          </Feature>

          <Feature title="機能追加（ご要望に応じて）">
            <ul className="list-disc space-y-1 pl-5">
              <li>予約・会員・オンライン決済（主要サービスとの連携に対応）</li>
              <li>LINE／Instagram 連携・自動返信・通知</li>
              <li>簡易CMS・求人／採用ページ・お問い合わせ管理</li>
            </ul>
          </Feature>

          <Feature title="運用・保守">
            <ul className="list-disc space-y-1 pl-5">
              <li>監視・バックアップ・定期レポート・軽微な改修</li>
              <li>ソフトウェア更新・脆弱性対応・対応目安（プラン別）</li>
              <li>比較検証（A/B）や文言の見直し・表示速度の改善</li>
            </ul>
          </Feature>

          <Feature title="納品物・引き継ぎ">
            <ul className="list-disc space-y-1 pl-5">
              <li>ソースコードのリポジトリ共有・公開環境の設定</li>
              <li>再利用しやすいコンポーネント指針</li>
              <li>運用ガイド（更新手順・留意点）</li>
            </ul>
          </Feature>
        </div>
      </section>

      {/* プロセス */}
      <section className="space-y-4" aria-label="進め方">
        <h2 className="text-2xl font-semibold text-gray-900">進め方</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Rocket className="h-5 w-5" aria-hidden="true" /> 1. 要件の確認（1〜2営業日）
            </div>
            <p className="mt-2 text-gray-700">
              簡単なヒアリングフォームとメールで課題と目標を確認し、公開までの計画を確定します。
            </p>
          </li>

          <li className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Layers className="h-5 w-5" aria-hidden="true" /> 2. 設計・制作（1〜2週間）
            </div>
            <p className="mt-2 text-gray-700">
              必要なページから順に実装し、公開前に実機での動作・表示を確認します。
            </p>
          </li>

          <li className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Zap className="h-5 w-5" aria-hidden="true" /> 3. 公開・計測（以後、継続）
            </div>
            <p className="mt-2 text-gray-700">
              公開後はアクセス状況を確認し、導線や表現を計画に沿って改善します。
            </p>
          </li>
        </ol>
        <p className="text-xs text-gray-600">
          ※ 期間は案件規模や素材のご準備状況により前後します。必要最低限の範囲から公開し、計測結果に基づいて調整します。
        </p>
      </section>

      {/* 強み・ポリシー */}
      <section className="space-y-4" aria-label="方針">
        <h2 className="text-2xl font-semibold text-gray-900">運用方針</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-gray-700">
              短納期：合意した範囲から公開し、運用で成果を高めます。
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Wrench className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-gray-700">
              保守性：共通部品化と定期アップデートを標準化し、将来の拡張に備えます。
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-gray-700">
              法令・表示：特定商取引法・規約・プライバシー表記に配慮し、SNSでの見え方や構造化データまで整えます。
            </span>
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
          <Link href="/pricing" aria-label="料金ページへ">
            料金を見る
          </Link>
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
