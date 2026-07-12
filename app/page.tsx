import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Download,
  FileSpreadsheet,
  PackageCheck,
  PackageSearch,
  ShieldCheck,
  Store,
  UserCheck,
  XCircle,
} from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { EC_INVENTORY_POC } from "@/lib/constants";

const siteDescription =
  "販売・在庫データから赤字SKUや60日・90日以上の滞留在庫、在庫原価を整理し、値下げ・再出品・仕入停止の候補をまとめるEC事業者向け共同検証サービスです。";

export const metadata: Metadata = {
  description: siteDescription,
  alternates: { canonical: "/" },
};

const problems = [
  {
    icon: BarChart3,
    title: "本当の利益が見えにくい",
    description:
      "売上はあっても、販売手数料や送料、変動広告費まで引いた利益をSKU単位で捉えにくい。",
  },
  {
    icon: Clock3,
    title: "滞留在庫が埋もれる",
    description:
      "長期間売れていない在庫と、動いている在庫が同じ一覧に混在し、資金の滞留を把握しにくい。",
  },
  {
    icon: CircleAlert,
    title: "次の一手を決めにくい",
    description:
      "値下げ、再出品、仕入停止のどれから着手するか、優先順位をつける材料が不足しやすい。",
  },
];

const deliverables = [
  "直近30日売上",
  "貢献利益",
  "貢献利益率",
  "赤字SKU",
  "最終販売から60日・90日以上のSKU",
  "優先アクション候補",
  "在庫原価の概算",
  "次に試す3つの行動",
];

const eligible = [
  "PC以外の商品を販売している",
  "販路が1〜2つ",
  "最大300 SKU",
  "在庫数、販売数、価格、原価等をCSVまたはExcelで出せる",
  "レポートを参考に、最終判断を事業者自身で行える",
];

const excluded = [
  "PC・デジタル機器商材",
  "300 SKU超または3販路以上",
  "医療、人事、本人確認、マイナンバー等の情報",
  "買主名、住所、電話、メール、注文番号",
  "ログインID、パスワード、APIキー",
  "会計・税務判断",
  "売上や利益の保証",
  "リアルタイム在庫同期",
];

const steps = [
  {
    title: "共同検証へ応募",
    description: "フォームでは事業者情報と現状だけを伺います。CSVや実データは送らないでください。",
  },
  {
    title: "対象条件を確認",
    description: "販路、SKU数、CSVまたはExcelの出力可否を確認します。",
  },
  {
    title: "匿名化済みデータを受領",
    description: "条件合意後、Relayoから項目と匿名化方法をご案内してから受領します。",
  },
  {
    title: "アクションレポートを作成",
    description: "粗利・滞留状況を整理し、次に試す行動の候補をまとめます。",
  },
  {
    title: "フィードバック",
    description: "15分程度で、見やすさや判断への使いやすさを伺います。",
  },
];

const operatorFacts = [
  "Relayo運営",
  "EC販売経験あり",
  "古物商許可保有",
  "オンライン対応",
];

const faqs = [
  {
    question: "どのデータが必要ですか？",
    answer:
      "在庫数、販売数、販売価格、原価、販売手数料、送料、変動広告費、最終販売日などを想定しています。応募時点で実データは不要です。条件合意後に、必要項目と匿名化方法を個別にご案内します。",
  },
  {
    question: "個人情報は必要ですか？",
    answer:
      "診断に買主の氏名、住所、電話番号、メールアドレス、注文番号は必要ありません。ログインID、パスワード、APIキーも送らないでください。",
  },
  {
    question: "CSVが出せない場合はどうなりますか？",
    answer:
      "Excelや管理画面からの別形式の出力が可能か確認します。必要項目を安全に用意できない場合は、今回の共同検証の対象外となることがあります。",
  },
  {
    question: "どのECモールに対応していますか？",
    answer:
      "自社EC、Amazon、楽天市場、Yahoo!ショッピング、BASE、STORES、メルカリShopsなどを想定しています。1〜2販路を対象に、出力データの項目を確認して個別に判断します。モールへのログインやAPI連携は行いません。",
  },
  {
    question: "結果は会計・税務判断に使えますか？",
    answer:
      "使えません。本レポートの貢献利益は事業上の優先順位を考えるための簡易指標であり、会計上・税務上の利益ではありません。必要に応じて税理士等の専門家へご相談ください。",
  },
  {
    question: "売上改善は保証されますか？",
    answer:
      "保証されません。レポートは値下げ・再出品・仕入停止などを検討するための候補を整理するもので、実施判断と結果は事業者ご自身の責任となります。",
  },
  {
    question: "共同検証への応募で料金が発生しますか？",
    answer:
      "応募した時点では、料金は発生せず、契約や有料サービスの購入も確定しません。共同検証の条件はヒアリング後に個別にご案内します。正式PoC予定価格は5,500円です。",
  },
  {
    question: "PC商品を対象にできますか？",
    answer:
      "できません。今回の共同検証は非PC商材に限定しています。PC・デジタル機器商材は対象外です。",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <HeroSection />

      <section id="overview" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold tracking-wide text-blue-700">SERVICE OVERVIEW</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
                売上表を眺めるだけでは、在庫の優先順位は決まりません
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                完成したSaaSではなく、実際の販売・在庫データでレポートの有用性を確かめる
                共同検証です。現在、匿名事例づくりに協力いただける1〜2社を募集しています。
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {problems.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="deliverables" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <p className="text-sm font-bold tracking-wide text-blue-700">DELIVERABLES</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
                  数字を、次に試す行動へ整理
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  合成データの見本では、売上・粗利・滞留在庫を横断して確認し、
                  値下げ・再出品・仕入停止の候補が追える形にまとめています。
                </p>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <p className="font-bold text-amber-950">「貢献利益」について</p>
                  <p className="mt-2 text-sm leading-7 text-amber-900/80">
                    販売価格から原価、販売手数料、送料、変動広告費を引いた簡易指標です。
                    会計上・税務上の利益ではありません。
                  </p>
                </div>
              </div>

              <ol className="grid gap-3 sm:grid-cols-2">
                {deliverables.map((item, index) => (
                  <li
                    key={item}
                    className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold leading-6 text-slate-800">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        id="sample-report"
        className="scroll-mt-24 border-y border-slate-800 bg-slate-950 py-16 text-white sm:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold tracking-wide text-blue-300">SAMPLE REPORT</p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                合成データによる見本レポート
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                実データを預ける前に、納品イメージと確認できる項目をご覧いただけます。
              </p>
            </div>

            <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">
              <figure className="min-w-0">
                <a
                  href={EC_INVENTORY_POC.sampleReportImage}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-2xl border border-slate-700 bg-white p-2 shadow-2xl shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
                  aria-label="見本レポート画像を新しいタブで拡大表示する"
                  data-umami-event="ec_sample_report_view"
                  data-umami-event-location="sample_report"
                >
                  <Image
                    src={EC_INVENTORY_POC.sampleReportImage}
                    alt="合成データで作成したEC在庫・粗利診断の見本レポート。売上、貢献利益、赤字SKU、滞留在庫、優先アクション候補を示している"
                    width={2656}
                    height={831}
                    className="h-auto w-full rounded-xl"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority={false}
                  />
                </a>
                <figcaption className="mt-3 text-center text-xs leading-5 text-slate-400">
                  合成データによる見本です。画像を選択すると拡大表示できます。
                </figcaption>
              </figure>

              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 text-emerald-400" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-white">見本について</h3>
                </div>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                  {[
                    "合成データによる見本",
                    "実在する店舗、商品、売上、顧客データは含まない",
                    "実績や導入事例ではない",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className="mt-7 h-auto min-h-12 w-full whitespace-normal bg-blue-600 px-5 py-3 text-center font-bold text-white hover:bg-blue-700"
                >
                  <a
                    href={EC_INVENTORY_POC.sampleReportHref}
                    download
                    data-umami-event="ec_sample_report_download"
                    data-umami-event-format="xlsx"
                  >
                    <Download className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                    見本レポートをダウンロード
                  </a>
                </Button>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Excel形式（.xlsx）の検証キットです。
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="eligibility" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold tracking-wide text-blue-700">SCOPE</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
                対象と対象外を、あらかじめ明確に
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                小さな範囲で安全に検証するため、商材・販路・データの条件を限定しています。
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <PackageCheck className="h-7 w-7 text-emerald-700" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-slate-950">対象</h3>
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                  {eligible.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <XCircle className="h-7 w-7 text-amber-700" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-slate-950">対象外</h3>
                </div>
                <ul className="mt-6 grid gap-4 text-sm leading-7 text-slate-700 sm:grid-cols-2">
                  {excluded.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <XCircle
                        className="mt-1 h-4 w-4 shrink-0 text-amber-700"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold tracking-wide text-blue-700">PROCESS</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
                応募からフィードバックまで
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                まず対象条件を確認し、合意後にはじめて匿名化済みデータをご案内します。
              </p>
            </div>

            <ol className="mt-10 grid gap-4 md:grid-cols-5">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="text-sm font-extrabold text-blue-700">
                    STEP {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>

            <div className="mx-auto mt-8 flex max-w-4xl items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-950">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <p>
                <strong>応募時点ではCSVや実データを送らないでください。</strong>
                共同検証への応募は、契約や有料サービスの購入を確定するものではありません。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 border-y border-blue-100 bg-blue-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="bg-blue-700 p-7 text-white sm:p-10">
                  <p className="text-sm font-bold tracking-wide text-blue-100">VALIDATION PARTNERS</p>
                  <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    共同検証枠 {EC_INVENTORY_POC.partnerSlots}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-blue-100">
                    条件はヒアリング後に個別にご案内します。
                  </p>
                </div>

                <div className="p-7 sm:p-10">
                  <p className="text-sm font-bold text-slate-500">正式PoC予定価格</p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">
                    {EC_INVENTORY_POC.plannedPrice}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    正式PoCは、非PC商材・1〜2販路・最大300 SKUを対象とする予定です。
                    共同検証の条件は応募後のヒアリングで確認します。
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 h-auto min-h-12 w-full whitespace-normal bg-blue-600 px-6 py-3 text-center font-bold text-white hover:bg-blue-700 sm:w-auto"
                  >
                    <Link
                      href={EC_INVENTORY_POC.contactHref}
                      data-umami-event="ec_design_partner_cta_click"
                      data-umami-event-location="pricing"
                    >
                      共同検証パートナーに応募する
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="operator" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold tracking-wide text-blue-700">OPERATOR</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">運営者情報</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                実務で使える判断材料にすることを重視し、オンラインで共同検証を進めます。
              </p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {operatorFacts.map((item, index) => {
                const icons = [Store, UserCheck, ShieldCheck, FileSpreadsheet];
                const Icon = icons[index];
                return (
                  <li
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                  >
                    <Icon className="mx-auto h-7 w-7 text-blue-600" aria-hidden="true" />
                    <p className="mt-3 text-sm font-bold text-slate-900">{item}</p>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold tracking-wide text-blue-700">FAQ</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">よくある質問</h2>
            </div>

            <div className="mx-auto mt-10 max-w-4xl space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm open:border-blue-200"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-bold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4">
                    <span>{faq.question}</span>
                    <span
                      className="mt-0.5 shrink-0 text-xl leading-none text-blue-600 transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-5xl rounded-2xl bg-slate-950 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
              <PackageSearch className="mx-auto h-10 w-10 text-emerald-400" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                滞留在庫を、次の一手に変えませんか
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                応募時に実データや買主情報を送る必要はありません。
                まずは販路・SKU規模・CSV出力可否を確認します。
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-auto min-h-12 whitespace-normal bg-blue-600 px-6 py-3 text-center font-bold text-white hover:bg-blue-700"
              >
                <Link
                  href={EC_INVENTORY_POC.contactHref}
                  data-umami-event="ec_design_partner_cta_click"
                  data-umami-event-location="final_cta"
                >
                  共同検証パートナーに応募する
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-4 text-xs leading-5 text-slate-400">
                応募は契約や有料サービスの購入を確定するものではありません。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
