import type { Metadata } from "next";
import Link from "next/link";

import { BRAND, EC_INVENTORY_POC } from "@/lib/constants";

const description = `${EC_INVENTORY_POC.name}の価格、支払方法、提供時期、キャンセル・返金、事業者情報の開示方法等を表示します。`;
const disclosureSubject = "特定商取引法に基づく表示の開示請求";
const disclosureMailto = `mailto:${BRAND.email}?subject=${encodeURIComponent(
  disclosureSubject,
)}`;

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description,
  alternates: { canonical: "/legal/tokusho" },
  openGraph: {
    title: "特定商取引法に基づく表記",
    description,
    url: "/legal/tokusho",
    type: "website",
  },
};

export const dynamic = "force-static";

export default function TokushoPage() {
  return (
    <main className="py-12 sm:py-16">
      <article className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-2">
          <p className="text-sm font-bold tracking-wide text-blue-700">LEGAL NOTICE</p>
          <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">
            特定商取引法に基づく表記
          </h1>
          <p className="text-sm text-slate-600">屋号：{BRAND.name}</p>
        </header>

        <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24">
          <section
            aria-labelledby="operator-disclosure"
            className="not-prose rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8"
          >
            <h2 id="operator-disclosure" className="text-xl font-bold text-blue-950">
              事業者・役務提供事業者
            </h2>
            <p className="mt-4 text-sm leading-7 text-blue-950/90">
              事業者の氏名（個人事業者の場合は戸籍上の氏名）、現に活動している住所および確実に連絡が取れる電話番号は、請求があった場合、特定商取引法第11条ただし書に基づき、契約の申込みまたは支払いの前に、遅滞なく電子メールで開示します。
            </p>
            <p className="mt-3 text-sm leading-7 text-blue-950/90">
              開示請求に費用はかかりません。件名を「{disclosureSubject}」とし、
              <a
                href={disclosureMailto}
                className="font-bold underline underline-offset-4"
                data-umami-event="tokusho_disclosure_email_click"
              >
                {BRAND.email}
              </a>
              へご連絡ください。
            </p>
          </section>

          <h2 id="trade-name">屋号・サービス名</h2>
          <ul>
            <li>屋号：{BRAND.name}</li>
            <li>サービス名：{EC_INVENTORY_POC.name}</li>
          </ul>

          <h2 id="address-phone">所在地・電話番号</h2>
          <p>
            上記「事業者・役務提供事業者」に記載した方法により、事業者氏名と併せて開示します。
          </p>

          <h2 id="contact">連絡先</h2>
          <ul>
            <li>
              メール：
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </li>
            <li>
              問い合わせフォーム：<Link href="/contact">/contact</Link>
            </li>
            <li>
              問い合わせへの回答：原則1営業日以内。内容により3営業日程度を要する場合があります。
            </li>
          </ul>

          <h2 id="service">提供する役務</h2>
          <p>
            EC事業者から提供された匿名化済みの商品、販売、原価、手数料、送料、在庫等のデータを基に、赤字SKU、最終販売から一定期間経過した在庫、在庫原価、対応候補を整理したレポートを作成します。
          </p>
          <p>
            本サービスは意思決定の補助を目的とし、会計・税務・法務・投資・価格決定に関する専門的助言、売上・利益・在庫削減の保証を行うものではありません。
          </p>

          <h2 id="price">価格</h2>
          <ul>
            <li>正式PoC：{EC_INVENTORY_POC.price}</li>
            <li>対象：非PC商材、1〜2販路、最大300 SKU</li>
            <li>
              共同検証：対象と条件を確認後、個別に提示します。応募フォームの送信だけで費用は発生しません。
            </li>
          </ul>

          <h2 id="additional-costs">価格以外に顧客が負担する費用</h2>
          <ul>
            <li>銀行振込手数料</li>
            <li>顧客側でデータを出力、匿名化、共有するために必要となる費用</li>
            <li>個別条件で合意した追加作業の費用</li>
          </ul>
          <p>
            追加費用が生じる場合は、作業前に金額または算定方法を提示し、顧客の同意を得ます。
          </p>

          <h2 id="payment">支払方法・支払時期</h2>
          <ul>
            <li>支払方法：銀行振込</li>
            <li>支払時期：請求書発行日から3営業日以内の全額前払い</li>
            <li>
              振込期限までに入金が確認できない場合、Relayoは申込みを失効させることができます。
            </li>
          </ul>

          <h2 id="contract">契約の成立</h2>
          <p>共同検証応募フォームの送信だけでは契約は成立しません。</p>
          <p>
            対象範囲、価格、納期、データの取扱い等を記載した個別PoC条件に顧客が同意し、Relayoの承諾通知が電子メール等により顧客に到達した時点で契約が成立します。
          </p>

          <h2 id="delivery">役務の提供時期</h2>
          <p>
            契約成立、入金確認、必要な匿名化済みデータの受領が全て完了した日の翌営業日から、原則3営業日以内に納品します。
          </p>
          <p>
            データ不足、形式不備、顧客からの回答待ち、災害、外部サービス障害等がある場合は、理由と変更後の予定日を連絡します。個別PoC条件に別の納期を定めた場合は、その条件を優先します。
          </p>

          <h2 id="cancellation">申込みの撤回、キャンセル、返金</h2>
          <ul>
            <li>契約成立前の応募取消し：費用は発生しません。</li>
            <li>
              契約成立後、作業開始前の顧客都合キャンセル：受領済み金額を返金します。返金振込手数料は顧客負担となる場合があります。
            </li>
            <li>
              作業開始後の顧客都合キャンセル：進行済み作業および発生済み実費に相当する金額を控除し、残額がある場合に返金します。
            </li>
            <li>Relayo都合で完了できない場合：未提供部分に相当する金額を返金します。</li>
            <li>
              納品物に合意内容との不一致がある場合：利用規約および個別PoC条件に基づき、修正、再実施または未提供部分の返金を行います。
            </li>
          </ul>

          <h2 id="revision">納品後の修正</h2>
          <p>
            納品後5営業日以内に、入力データの訂正または計算誤りを具体的にご連絡ください。修正は原則1回です。分析条件、対象SKU、販路、列構成等の追加・変更は別途見積りとなります。
          </p>

          <h2 id="environment">動作環境</h2>
          <p>
            納品物の閲覧には、Excel互換の表計算ソフトまたはPDF閲覧ソフトが必要です。ソフトウェアの購入費用、通信費その他の利用環境は顧客の負担です。
          </p>

          <h2 id="data">個人情報・秘密情報</h2>
          <p>
            買主情報、本人確認情報、医療・人事情報、ログイン情報は受領しません。顧客は、これらを除去したデータを提供してください。詳細は
            <Link href="/legal/privacy">プライバシーポリシー</Link>
            および個別PoC条件に定めます。
          </p>

          <h2 id="results">表現・成果に関する注意</h2>
          <p>
            見本レポートは合成データによるものであり、実績、導入事例、売上改善結果ではありません。レポートの数値および推奨アクションは提供データと設定条件に依存し、成果を保証しません。
          </p>
        </div>

        <nav
          aria-label="関連する法務ページ"
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-6 text-sm"
        >
          <Link href="/legal/terms">利用規約</Link>
          <Link href="/legal/privacy">プライバシーポリシー</Link>
        </nav>
      </article>
    </main>
  );
}
