import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  PackageSearch,
  RefreshCcw,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { EC_INVENTORY_POC } from "@/lib/constants";

const assurances = [
  "非PC商材限定",
  "1〜2販路・最大300 SKU",
  "買主情報やログイン情報は不要",
  `共同検証枠${EC_INVENTORY_POC.partnerSlots}`,
];

const actions = [
  { label: "値下げ", note: "赤字・滞留状況を確認", icon: TrendingDown },
  { label: "再出品", note: "販売停滞SKUを整理", icon: RefreshCcw },
  { label: "仕入停止", note: "追加仕入の候補を整理", icon: PackageSearch },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="overflow-hidden border-b border-slate-800 bg-slate-950 py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-sm font-semibold text-blue-200">
              {EC_INVENTORY_POC.name}
            </p>

            <h1
              id="hero-heading"
              className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              ECの粗利と滞留在庫を、
              <br />
              <span className="text-blue-300">次の3アクションに変える。</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              販売・在庫データから、赤字SKU、最終販売から60日・90日経過した在庫、
              在庫原価を整理し、値下げ・再出品・仕入停止の候補をレポートにまとめます。
            </p>

            <ul className="mt-7 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
              {assurances.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 bg-blue-600 px-6 font-bold text-white hover:bg-blue-700"
              >
                <Link
                  href={EC_INVENTORY_POC.contactHref}
                  data-umami-event="ec_design_partner_cta_click"
                  data-umami-event-location="hero"
                >
                  共同検証パートナーに応募する
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 border-slate-600 bg-transparent px-6 font-bold text-white hover:bg-slate-800 hover:text-white"
              >
                <Link
                  href="#sample-report"
                  data-umami-event="ec_sample_report_view"
                  data-umami-event-location="hero"
                >
                  見本レポートを見る
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-l-2 border-amber-400 pl-4">
              <div>
                <p className="text-xs text-slate-400">共同検証枠</p>
                <p className="mt-1 text-lg font-bold text-white">
                  {EC_INVENTORY_POC.partnerSlots}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">正式PoC予定価格</p>
                <p className="mt-1 text-lg font-bold text-white">
                  {EC_INVENTORY_POC.plannedPrice}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div
            className="mx-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/30 sm:p-7"
            aria-label="診断レポートで整理する3つのアクション"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-700 pb-5">
              <div>
                <p className="text-xs font-bold tracking-wider text-blue-300">
                  ACTION REPORT
                </p>
                <p className="mt-1 text-base font-bold text-white">
                  合成データによる表示イメージ
                </p>
              </div>
              <BarChart3 className="h-7 w-7 shrink-0 text-emerald-400" aria-hidden="true" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { label: "赤字SKU", icon: TrendingDown },
                { label: "60/90日", icon: Clock3 },
                { label: "在庫原価", icon: ShieldCheck },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="min-w-0 rounded-lg border border-slate-700 bg-slate-950 p-3 text-center"
                >
                  <Icon className="mx-auto h-5 w-5 text-blue-300" aria-hidden="true" />
                  <p className="mt-2 break-words text-xs font-semibold text-slate-200">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {actions.map(({ label, note, icon: Icon }, index) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-950 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">
                      ACTION {index + 1}
                    </p>
                    <p className="font-bold text-white">{label}</p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-400">{note}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-400">
              実績・導入事例ではありません。最終判断は事業者ご自身で行っていただきます。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
