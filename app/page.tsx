import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Files,
  FileText,
  Keyboard,
  ScanText,
  ShieldCheck,
  Table2,
  UserCheck,
  XCircle,
} from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { DOCUMENT_POC } from "@/lib/constants";

const siteDescription =
  "PDF・FAX・スキャンされた注文書や帳票を、Excel・CSVへデータ化。1社1帳票から、人による確認付きで小さく有料検証します。";

export const metadata: Metadata = {
  title: "PDF・帳票をExcel・CSVへ",
  description: siteDescription,
};

const problems = [
  {
    icon: Keyboard,
    title: "転記に時間がかかる",
    description:
      "紙やPDFを見ながら、品番・数量・金額などを一件ずつ入力する作業が日常業務を圧迫します。",
  },
  {
    icon: CircleAlert,
    title: "入力ミスを見つけにくい",
    description:
      "桁間違い、行ずれ、読み飛ばしが起きやすく、入力後の確認にも時間が必要です。",
  },
  {
    icon: Files,
    title: "取引先ごとに形式が違う",
    description:
      "同じ注文書でも配置や項目名が異なり、一般的な一括処理では対応しづらいことがあります。",
  },
];

const documentTypes = [
  "注文書",
  "申込書",
  "請求書",
  "納品書",
  "点検表",
  "報告書",
];

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "匿名化サンプルを確認",
    description:
      "機密情報を伏せたサンプル帳票と、希望するExcel・CSVの列構成を共有いただきます。",
  },
  {
    number: "02",
    icon: ScanText,
    title: "1社1帳票で読み取り検証",
    description:
      "対象項目を読み取り、どこまで安定してデータ化できるかを小さな範囲で確認します。",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "人が確認して出力",
    description:
      "読み取り結果を確認し、指定された列順のExcel・CSVとしてお渡しします。",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <section id="overview" className="scroll-mt-24 bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-blue-700">WHY THIS POC</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                帳票の手入力が、業務のボトルネックになっていませんか
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                大きなシステム導入の前に、いま使っている帳票ひとつで
                データ化の精度と実用性を確かめます。
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {problems.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">{description}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="documents" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-bold text-blue-700">DOCUMENTS</p>
                <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                  日々届く、さまざまな帳票が対象です
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                  PDFだけでなく、FAXを保存した画像やスキャンデータも確認します。
                  帳票の状態やレイアウトによって読み取り方が変わるため、まずは実物に近いサンプルで判断します。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {documentTypes.map((document) => (
                  <div
                    key={document}
                    className="flex min-h-24 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <FileText className="h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                    <span className="text-sm font-bold text-gray-800">{document}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-gray-950 py-16 text-white sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-blue-300">SMALL START</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                最初は1社1帳票だけ。3ステップで有料検証
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
                いきなり全帳票を自動化せず、効果を判断できる最小単位から始めます。
              </p>
            </div>

            <ol className="mt-10 grid gap-6 lg:grid-cols-3">
              {steps.map(({ number, icon: Icon, title, description }) => (
                <li key={number} className="rounded-lg border border-gray-700 bg-gray-900 p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-300">STEP {number}</span>
                    <Icon className="h-7 w-7 text-emerald-300" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-300">{description}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      <section id="safety" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-blue-700">SCOPE &amp; SAFETY</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                PoCで行うこと、行わないことを明確にします
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                初回はデータ化と確認に範囲を限定し、意図しない業務処理は行いません。
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 text-emerald-700" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-gray-900">PoCで行うこと</h3>
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-gray-700">
                  {[
                    "匿名化した帳票サンプルでの事前確認",
                    "必要項目の読み取りとExcel・CSVへの整形",
                    "読み取り結果の人による確認",
                    "精度・件数・出力形式を踏まえた次段階の整理",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <XCircle className="h-7 w-7 text-amber-700" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-gray-900">初回PoCでは行わないこと</h3>
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-gray-700">
                  {[
                    "読み取り結果を使った自動発注",
                    "メールや帳票の自動送信",
                    "外部システムへの無断・自動連携",
                    "人の確認を省いた完全自動化",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 border-y border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-bold text-blue-700">INITIAL POC</p>
                <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                  初回PoC {DOCUMENT_POC.priceFrom}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                  1社1帳票を基本に、読み取り対象の項目と希望する出力形式を確認します。
                  最終価格は、帳票の種類・件数・画質・ExcelやCSVの列構成により個別にご案内します。
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="h-12 bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
              >
                <Link href={DOCUMENT_POC.contactHref}>
                  帳票サンプルについて相談する
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-5xl rounded-lg bg-gray-950 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
              <Table2 className="mx-auto h-9 w-9 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                まずは、いま手入力している帳票を1種類だけ
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                社名・金額・個人情報などを伏せたサンプルでも相談できます。
                データ化できそうか、どの列で出力するかを一緒に確認します。
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
              >
                <Link href={DOCUMENT_POC.contactHref}>
                  相談・PoC申込へ
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
