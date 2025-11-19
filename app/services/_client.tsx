// app/services/_client.tsx  
"use client";

import Link from "next/link";
import {
  Lightbulb,
  Rocket,
  Layers,
  FileText,
  Code2,
  Wrench,
} from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function FeatureCard({ icon, title, children }: FeatureProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
          {title}
        </h3>
      </div>
      <div className="text-xs leading-relaxed text-gray-800 sm:text-sm">
        {children}
      </div>
    </div>
  );
}

export default function ServicesPageClient() {
  return (
    <main className="min-h-[calc(100vh-6rem)] bg-gray-50 py-12">
      <div className="container mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
            サービス内容
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            中小企業・スタートアップのための
            <br className="hidden sm:inline" />
            ホームページ制作・運用サービス
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
            {BRAND.name}
            （リレイオ）は、ホームページの
            <span className="whitespace-nowrap">設計・制作</span>
            から公開後の<span className="whitespace-nowrap">運用・保守</span>
            までを一貫して担当します。
            必要なページだけに絞ったシンプルな構成で「まずは小さく立ち上げ」、
            事業の変化に合わせてあとから育てていけるサイトづくりを支援します。
          </p>

          <p className="max-w-3xl text-xs leading-relaxed text-gray-600 sm:text-sm">
            「自社のホームページが古く、今の事業内容や強みを反映できていない」、
            「スマホで見づらく、問い合わせや採用につながっている実感がない」、
            「ホームページを新しく作りたい／作り直したいが、どこにいくらで頼めばよいか分からない」…。
            こうしたお悩みをお持ちの中小企業・スタートアップ・個人事業主の方向けのサービスです。
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <ContactCTA />
            <Link
              href="/pricing"
              className="text-xs font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
            >
              料金プランを見る
            </Link>
          </div>
        </section>

        {/* Relayo の3つの特徴 */}
        <section
          aria-label="Relayo の3つの特徴"
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Relayo の 3つの特徴
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              「一度作って終わり」ではなく、
              事業と一緒に育てていくホームページであることを意識して設計します。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* 特徴1 */}
            <FeatureCard
              icon={<Lightbulb className="h-4 w-4" aria-hidden />}
              title="特徴1｜スモールスタートで、無理のない立ち上げを"
            >
              <p>
                最初から10ページ以上のサイトを作り込むのではなく、
                まずは成果に直結するページだけに絞って構成します。
              </p>
              <p className="mt-2">
                ランディングページ1枚からでも対応し、
                あとからのページ追加や機能拡張を前提に設計します。
              </p>
            </FeatureCard>

            {/* 特徴2 */}
            <FeatureCard
              icon={<Rocket className="h-4 w-4" aria-hidden />}
              title="特徴2｜公開後も窓口はひとつ。保守・運用まで継続対応"
            >
              <p>
                公開して終わりではなく、不具合対応や軽微な修正、
                システム更新までを継続して対応します。
              </p>
              <p className="mt-2">
                「誰に連絡すればいいのか分からない」という状態を避け、
                サイト運用の相談先を一本化します。
              </p>
            </FeatureCard>

            {/* 特徴3 */}
            <FeatureCard
              icon={<Layers className="h-4 w-4" aria-hidden />}
              title="特徴3｜目的から逆算した、中小企業・スタートアップ向けの設計"
            >
              <p>
                問い合わせを増やしたいのか、採用エントリーを取りたいのか、
                既存顧客への情報発信を整えたいのか。
              </p>
              <p className="mt-2">
                目的に応じて、情報の構成や導線、ボタンの配置までを設計します。
              </p>
            </FeatureCard>
          </div>
        </section>

        {/* サービス内容：設計・制作・運用/保守 */}
        <section
          aria-label="サービス内容の詳細"
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              設計・制作から公開後の運用・保守までを一貫して担当します。
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              役割や目的、必要なページ数、想定しているお客さま像をすり合わせた上で、
              ホームページの設計・制作から公開後の運用・保守までをまとめてお任せいただけます。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* 設計 */}
            <FeatureCard
              icon={<FileText className="h-4 w-4" aria-hidden />}
              title="設計｜役割とページ構成を決める"
            >
              <p>
                サイトにどんな役割を持たせたいか、想定している顧客像、
                現状の課題などを伺います。
              </p>
              <p className="mt-2">
                その内容をもとに、必要なページ構成と大まかなコンテンツ案をこちらで組み立てます。
              </p>
            </FeatureCard>

            {/* 制作 */}
            <FeatureCard
              icon={<Code2 className="h-4 w-4" aria-hidden />}
              title="制作｜スマホ対応と基本的な検索対策を含めて構築"
            >
              <p>
                スマホでの見やすさを前提に、デザインと実装を行います。
              </p>
              <p className="mt-2">
                表示速度やタイトル・説明文などの基本的な検索対策に加え、
                問い合わせ・採用・予約など、目的に合った導線を整えます。
              </p>
            </FeatureCard>

            {/* 運用・保守 */}
            <FeatureCard
              icon={<Wrench className="h-4 w-4" aria-hidden />}
              title="運用・保守｜公開後の更新とトラブルへの初動対応"
            >
              <p>
                公開後の軽微な修正やシステム更新、不具合時の初動対応などを継続して行い、
                長く使える状態を保ちます。
              </p>
              <p className="mt-2">
                月額の運用・保守プランと組み合わせることで、
                定期的な点検やバックアップもお任せいただけます。
              </p>
            </FeatureCard>
          </div>

          <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
            具体的なページ構成や機能、料金の目安については、
            お客様のご状況を伺いながら個別にご提案します。
            「まずはどこまでやるべきか」を整理するところからご相談いただけます。
          </p>
        </section>

        {/* 料金・制作例への導線 */}
        <section
          aria-label="料金・制作例への導線"
          className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
              料金や制作イメージについて
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              料金の詳細やプランごとの違いは、
              「料金」ページにて詳しくご案内しています。
              実際の画面イメージは、制作例（デモを含む）が整い次第、順次公開していきます。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:border-blue-500 hover:text-blue-700"
            >
              料金とプランを見る
            </Link>
            <Link
              href="/#portfolio"
              className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:border-blue-500 hover:text-blue-700"
            >
              制作例（準備中）を確認する
            </Link>
          </div>
        </section>

        {/* 最後のCTA */}
        <section
          aria-label="お問い合わせ"
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="max-w-xl space-y-1 text-sm leading-relaxed text-gray-800">
            <p>
              「自社の状況だと、どのような構成が良いのか分からない」という段階でも構いません。
            </p>
            <p>
              現在のホームページや事業の状況、ご予算感を共有いただきながら、
              無理のない立ち上げ・改善プランをご提案します。
            </p>
          </div>
          <div className="flex-shrink-0">
            <ContactCTA />
          </div>
        </section>
      </div>
    </main>
  );
}
