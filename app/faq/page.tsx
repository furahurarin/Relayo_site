// app/faq/page.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactCTA from "@/components/cta/ContactCTA";
import { BRAND } from "@/lib/constants";

const description =
  "ホームページ制作や運用に関して、よくいただくご質問をまとめました。制作期間、スマホ対応・検索対策、原稿や写真の準備、料金や支払い方法、公開後の保守プランなどについてご案内します。";

export const metadata: Metadata = {
  title: "よくある質問",
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問",
    description,
    url: "/faq",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "よくある質問",
    description,
    images: ["/og.png"],
  },
};

export const dynamic = "force-static";

type QA = {
  id: string;
  category: "準備・進め方" | "料金・契約" | "運用・保守";
  question: string;
  answer: ReactNode;
};

const qas: QA[] = [
  // ==== トップページの3問（そのまま） ====
  {
    id: "period",
    category: "準備・進め方",
    question: "公開までどのくらいの期間がかかりますか？",
    answer: (
      <>
        サイトの規模にもよりますが、
        ランディングページであれば
        <span className="whitespace-nowrap">2週間前後</span>、
        一般的な企業サイトであれば
        <span className="whitespace-nowrap">2〜4週間前後</span>
        を目安としています。
        <br />
        <br />
        原稿や写真などのご用意状況、デザインや構成の修正回数、
        外部サービスとの連携の有無によって、前後する場合があります。
      </>
    ),
  },
  {
    id: "responsive-seo",
    category: "準備・進め方",
    question: "スマホ対応や検索対策は含まれますか？",
    answer: (
      <>
        はい、全プランに含まれます。
        スマホでの見やすさを前提に構築し、
        表示速度やタイトル・説明文などの基本的な検索対策もあわせて行います。
        <br />
        <br />
        なお、本格的なコンテンツSEO（記事量産やキーワード戦略を含む継続支援）は
        追加のご相談となります。
      </>
    ),
  },
  {
    id: "not-fixed",
    category: "準備・進め方",
    question: "まだ内容が固まっていないのですが、相談できますか？",
    answer: (
      <>
        可能です。現状の事業内容や今後の方針を伺いながら、
        「まず何ページから始めるか」「どこまで載せるか」
        といった整理からご一緒します。
        <br />
        <br />
        事業の変化に合わせてあとからページを増やしたり、
        レイアウトを見直したりしやすいよう、
        無理のないスモールスタートを前提に設計します。
      </>
    ),
  },

  // ==== 準備・進め方 ====
  {
    id: "text-photo",
    category: "準備・進め方",
    question: "文章や写真はこちらで用意する必要がありますか？",
    answer: (
      <>
        既にお持ちのパンフレットや資料、既存サイトの内容があれば、
        それらをベースにこちらで構成案を組み立てます。
        <br />
        <br />
        写真については、すでにお持ちの画像データを優先的に利用します。
        撮影が難しい場合は、商用利用可能な素材写真を組み合わせて、
        雰囲気を揃える形もご提案可能です。
      </>
    ),
  },
  {
    id: "renewal",
    category: "準備・進め方",
    question: "既存のホームページのリニューアルもお願いできますか？",
    answer: (
      <>
        既存サイトのリニューアルにも対応しています。
        現在のサイトの課題（見づらい・問い合わせにつながらない等）や、
        残したい要素・改善したい点をお伺いした上で、
        構成とデザインの見直しをご提案します。
        <br />
        <br />
        ドメインやメールアドレスはそのままに、
        サイトだけを入れ替えることも可能な場合があります。
      </>
    ),
  },
  {
    id: "domain-server",
    category: "準備・進め方",
    question: "ドメインやサーバーの契約がよく分からないのですが、大丈夫でしょうか？",
    answer: (
      <>
        大丈夫です。初めての方でも分かるように、
        ドメイン（住所）とサーバー（建物）のおおまかな役割から説明しながら、
        最適なサービスの選定と契約手続きをサポートします。
        <br />
        <br />
        原則として、ドメインやサーバーはお客様名義で契約いただき、
        運用権限のみをお預かりする形を基本としています。
      </>
    ),
  },

  // ==== 料金・契約 ====
  {
    id: "estimate-fee",
    category: "料金・契約",
    question: "見積もりに費用はかかりますか？",
    answer: (
      <>
        お見積もりは無料です。
        現在のご状況やご予算感を伺ったうえで、
        プランや構成のパターンをいくつかご提示することも可能です。
        <br />
        <br />
        見積もりを受け取ったあと、
        必ずしもご依頼いただく必要はありませんので、
        「まずは相場感だけ知りたい」という段階でもお気軽にご相談ください。
      </>
    ),
  },
  {
    id: "payment-timing",
    category: "料金・契約",
    question: "料金はどのタイミングで支払いますか？",
    answer: (
      <>
        お支払いのタイミングは案件規模によってご相談のうえ決定しますが、
        一般的には
        <span className="whitespace-nowrap">
          「着手金＋中間金＋納品時（検収時）」
        </span>
        のような分割を基本としています。
        <br />
        <br />
        具体的な割合や回数については、
        ご提案書・お見積書とあわせて事前にご説明し、
        双方合意のうえで進めます。
      </>
    ),
  },
  {
    id: "cancel",
    category: "料金・契約",
    question: "制作途中でキャンセルした場合はどうなりますか？",
    answer: (
      <>
        制作の進行状況に応じて、
        それまでに完了している作業分の費用を精算させていただく形となります。
        <br />
        <br />
        着手前にキャンセルポリシーの概要をご案内し、
        契約書（または発注書）の中で具体的な取り扱いを明示しますので、
        不明点があれば事前に遠慮なくお尋ねください。
      </>
    ),
  },
  {
    id: "invoice-issue",
    category: "料金・契約",
    question: "請求書や領収書の発行には対応していますか？",
    answer: (
      <>
        はい、メール添付での請求書発行に対応しています。
        領収書が必要な場合は、電子データにて発行いたします。
        <br />
        <br />
        インボイス制度への対応状況については、
        お見積もりの際にあわせてご案内いたします。
      </>
    ),
  },

  // ==== 運用・保守 ====
  {
    id: "after-support",
    category: "運用・保守",
    question: "公開後の軽微な修正や不具合対応もお願いできますか？",
    answer: (
      <>
        はい、公開後の軽微な修正や不具合対応にも対応しています。
        月額の運用・保守プランをご契約いただくと、
        稼働確認やシステム更新、小さな修正などをまとめてお任せいただけます。
        <br />
        <br />
        単発でのご依頼も可能ですが、
        更新頻度が高い場合は月額プランをおすすめしています。
      </>
    ),
  },
  {
    id: "monthly-cancel",
    category: "運用・保守",
    question: "月額の運用・保守プランは途中で解約できますか？",
    answer: (
      <>
        はい、原則としていつでも解約可能です。
        解約のタイミング（当月末／翌月末など）は、
        ご契約時に取り決めた条件に沿ってご案内します。
        <br />
        <br />
        解約後もサイト自体はそのままお使いいただけますが、
        定期的な点検・更新・不具合対応などはお客様側でご対応いただく形となります。
      </>
    ),
  },
  {
    id: "other-dev",
    category: "運用・保守",
    question: "ほかの制作会社で作ったサイトの保守だけをお願いできますか？",
    answer: (
      <>
        可能な場合もありますが、
        サーバー構成や利用しているツールによっては、
        対応範囲が限られることがあります。
        <br />
        <br />
        まずは現在の構成を確認させていただき、
        対応可能な範囲と想定されるリスクをご説明したうえで、
        お引き受けできるかどうかを判断いたします。
      </>
    ),
  },
];

// ReactNode → プレーンテキスト（構造化データ用）
const toPlainText = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join(" ");

  if (typeof node === "object" && "props" in (node as any)) {
    return toPlainText((node as any).props.children);
  }
  return "";
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qas.map((qa) => ({
    "@type": "Question",
    name: qa.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: toPlainText(qa.answer),
    },
  })),
};

export default function FAQPage() {
  const grouped = {
    "準備・進め方": qas.filter((q) => q.category === "準備・進め方"),
    "料金・契約": qas.filter((q) => q.category === "料金・契約"),
    "運用・保守": qas.filter((q) => q.category === "運用・保守"),
  } as const;

  return (
    <main className="container mx-auto space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* ヘッダー */}
      <section className="space-y-4">
        
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          ホームページ制作・運用に関するよくある質問
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base">
          制作の進め方やご準備いただくもの、料金やお支払い方法、
          公開後の運用・保守プランについて、よくいただくご質問をまとめました。
          ご不明な点があれば、こちらに載っていない内容でもお気軽にお問い合わせください。
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <ContactCTA />
          <Link
            href="/#pricing"
            className="text-xs font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
          >
            料金プランを確認する
          </Link>
        </div>
      </section>

      {/* Q&A（カテゴリ別） */}
      <section className="space-y-10" aria-label="よくある質問一覧">
        {/* 準備・進め方 */}
        <FaqGroup
          title="準備・進め方"
          description="制作期間や進め方、原稿・写真の準備、既存サイトとの関係などについてのご質問です。"
          items={grouped["準備・進め方"]}
        />

        {/* 料金・契約 */}
        <FaqGroup
          title="料金・契約"
          description="見積もりやお支払いタイミング、キャンセル時の取り扱いなど、料金や契約まわりのご質問です。"
          items={grouped["料金・契約"]}
        />

        {/* 運用・保守 */}
        <FaqGroup
          title="運用・保守"
          description="公開後の修正や不具合対応、月額の運用・保守プランに関するご質問です。"
          items={grouped["運用・保守"]}
        />
      </section>

      {/* 個別相談の案内 */}
      <section
        aria-label="個別のご質問・ご相談"
        className="space-y-4 pb-8 pt-2"
      >
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">
              個別のご質問・ご相談
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-gray-800">
            <p>
              契約や運用の体制、他社サービスとの兼ね合いなど、
              個別の状況によって回答が変わるご質問も多くあります。
            </p>
            <p>
              「少し気になる」「判断に迷っている」といった段階でも構いません。
              下記の窓口から、お気軽にお問い合わせください。
            </p>
            <p className="text-xs font-mono text-gray-800">{BRAND.email}</p>
            <ContactCTA />
          </CardContent>
        </Card>
      </section>

      {/* 構造化データ */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </main>
  );
}

// カテゴリ別のセクション
function FaqGroup(props: {
  title: string;
  description: string;
  items: QA[];
}) {
  const { title, description, items } = props;
  return (
    <section aria-labelledby={`faq-${title}`}>
      <div className="mb-4 space-y-1">
        <h2
          id={`faq-${title}`}
          className="text-xl font-semibold text-gray-900 sm:text-2xl"
        >
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-gray-700">
          {description}
        </p>
      </div>

      <Accordion
        type="multiple"
        className="space-y-3"
        aria-label={`${title} に関するよくある質問`}
      >
        {items.map((qa) => (
          <AccordionItem
            key={qa.id}
            value={qa.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <AccordionTrigger className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hover:no-underline sm:px-6">
              {qa.question}
            </AccordionTrigger>
            <AccordionContent className="border-t px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-800 sm:px-6">
              {qa.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
