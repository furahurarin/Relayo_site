// app/legal/tokusho/page.tsx
import type { Metadata } from "next";
import { BRAND, CONTACT, CAMPAIGN } from "@/lib/constants";

export const metadata: Metadata = {
  title: `特定商取引法に基づく表記 | ${BRAND.name}`,
  description: `${BRAND.name}の特定商取引法に基づく表記です。販売事業者、責任者、所在地、連絡先、役務提供条件、代金の支払時期・方法、返品・キャンセル等について記載します。`,
};

export default function TokushoPage() {
  const year = new Date().getFullYear();
  const UPDATED_AT = "2025-08-30";

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">特定商取引法に基づく表記</h1>
        <p className="text-sm text-gray-600">
          最終更新日：<time dateTime={UPDATED_AT}>{UPDATED_AT}</time>
        </p>
      </header>

      <div className="prose prose-zinc max-w-none">
        <dl className="not-prose divide-y divide-gray-100 rounded-md border border-gray-100">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">販売事業者</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">{BRAND.name}</dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">運営責任者</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">（責任者名を記載）</dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">所在地</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              自宅兼事務所のため、<strong>請求いただいた場合に遅滞なく開示</strong>いたします。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">電話番号</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              迷惑電話防止・記録性確保の観点から、<strong>請求いただいた場合に遅滞なく開示</strong>いたします。<br />
              お問い合わせは<strong>メール</strong>にてお願いします：{" "}
              <a
                href={CONTACT.mailto}
                className="underline"
                data-umami-event="email_click"
                data-umami-event-section="tokusho"
              >
                {BRAND.email}
              </a>
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">メールアドレス</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              <a
                href={CONTACT.mailto}
                className="underline"
                data-umami-event="email_click"
                data-umami-event-section="tokusho"
              >
                {BRAND.email}
              </a>
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">URL</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              <a href={BRAND.siteUrl} className="underline" rel="noopener noreferrer">
                {BRAND.siteUrl}
              </a>
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">販売価格・役務の対価</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              見積書・注文書に記載（税抜／税込の別を明記）。保守費用は別途SLAに基づきます。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">追加手数料等の必要料金</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              ドメイン・ホスティング等の実費、外部SaaS利用料、決済手数料、銀行振込手数料、出張費・交通費（必要な場合）等。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">支払方法</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              銀行振込（請求書払い）※他の方法は個別相談
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">支払時期</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              見積書・注文書に定める期日（例：着手時／中間／検収後 等）。保守は当月または翌月末支払。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">役務の提供時期</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              個別合意のスケジュールに従います。素材提出の遅延等がある場合は納期を再調整します。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">返品・キャンセル</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              役務提供の性質上、<strong>検収合格後の返品・返金には応じられません</strong>。検収前のキャンセルは、
              作業実費・発生費用をご負担いただきます。瑕疵がある場合は契約・SLAに基づき是正します。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">動作環境</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              対応ブラウザ・端末は提案書・仕様書に準拠（最新版の主要ブラウザを前提）。第三者サービスの仕様変更により動作が変わる場合があります。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">特典・キャンペーン</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              「{CAMPAIGN.name}」：先着{CAMPAIGN.seats}社。内容：制作費¥0（諸経費のみ）＋
              保守{CAMPAIGN.freeCareMonths}ヶ月¥0（Lite相当）／{CAMPAIGN.freeCancelNote}。
              対象範囲：{CAMPAIGN.scope}。状況により予告なく変更・終了する場合があります。
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 sm:px-6">
            <dt className="col-span-12 text-sm font-semibold text-gray-700 sm:col-span-4">営業時間</dt>
            <dd className="col-span-12 text-gray-800 sm:col-span-8">
              平日10:00–18:00（年末年始・当社指定日を除く）。お問い合わせは24時間受付、返信は営業時間内。
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-xs text-gray-500">
          ※ 本表記は役務（受託制作）に関するものです。個別契約・SLA・変更管理票等の条項が優先される場合があります。{year}年現在。
        </p>
      </div>
    </main>
  );
}
