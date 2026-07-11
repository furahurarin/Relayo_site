import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FileText,
  ScanText,
  Table2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { DOCUMENT_POC } from "@/lib/constants";

const assurances = [
  "1社1帳票から有料検証",
  "人による確認付き",
  "匿名化サンプルで相談可能",
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="overflow-hidden border-b border-gray-800 bg-gray-950 py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-sm font-semibold text-blue-200">
              {DOCUMENT_POC.name}
            </p>

            <h1
              id="hero-heading"
              className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
            >
              PDF・注文書を、
              <br />
              <span className="text-blue-300">Excel・CSVへ。</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              FAXやスキャンで届く帳票の手入力を減らすため、
              必要な項目を読み取り、確認しやすい表データに整えます。
              完全自動化ではなく、人が確認できる形から小さく始めます。
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {assurances.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-gray-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
              >
                <Link href={DOCUMENT_POC.contactHref}>
                  PoCを相談する
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Link
                href="/#process"
                className="inline-flex h-12 items-center justify-center px-3 text-sm font-semibold text-white hover:text-blue-200"
              >
                検証の流れを見る
              </Link>
            </div>

            <div className="mt-8 border-l-2 border-amber-400 pl-4">
              <p className="text-sm text-gray-300">初回PoC</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {DOCUMENT_POC.priceFrom}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">
                最終価格は帳票の種類・件数・出力形式を確認してご案内します。
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div
            className="mx-auto w-full max-w-xl rounded-lg border border-gray-700 bg-gray-900 p-5 shadow-2xl shadow-black/30 sm:p-7"
            aria-label="帳票をExcel・CSVへ変換する流れ"
          >
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
              <div>
                <p className="text-xs font-semibold text-blue-300">SAMPLE FLOW</p>
                <p className="mt-1 text-sm font-bold text-white">注文書のデータ化例</p>
              </div>
              <FileCheck2 className="h-6 w-6 text-emerald-400" aria-hidden="true" />
            </div>

            <div className="mt-5 grid gap-3">
              <div className="flex items-center gap-4 rounded-md border border-gray-700 bg-gray-950 p-4">
                <FileText className="h-7 w-7 shrink-0 text-amber-300" aria-hidden="true" />
                <div>
                  <p className="text-xs text-gray-400">INPUT</p>
                  <p className="mt-1 text-sm font-semibold">PDF・FAX・スキャン画像</p>
                </div>
              </div>

              <ArrowDown className="mx-auto h-5 w-5 text-gray-500" aria-hidden="true" />

              <div className="flex items-center gap-4 rounded-md border border-blue-400/30 bg-blue-400/10 p-4">
                <ScanText className="h-7 w-7 shrink-0 text-blue-300" aria-hidden="true" />
                <div>
                  <p className="text-xs text-blue-200">READ &amp; REVIEW</p>
                  <p className="mt-1 text-sm font-semibold">項目を読み取り、人が内容を確認</p>
                </div>
              </div>

              <ArrowDown className="mx-auto h-5 w-5 text-gray-500" aria-hidden="true" />

              <div className="flex items-center gap-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-4">
                <Table2 className="h-7 w-7 shrink-0 text-emerald-300" aria-hidden="true" />
                <div>
                  <p className="text-xs text-emerald-200">OUTPUT</p>
                  <p className="mt-1 text-sm font-semibold">指定列のExcel・CSVとして納品</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
