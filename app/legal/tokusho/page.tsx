// app/(legal)/tokusho/page.tsx
export default function TokushoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">特定商取引法に基づく表記</h1>
      <p className="mb-6 text-sm text-gray-500">最終更新日：2025-08-28</p>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <dt className="font-medium text-gray-500">販売業者</dt>
        <dd className="sm:col-span-2 text-gray-800">Relayo（個人事業）</dd>

        <dt className="font-medium text-gray-500">運営責任者</dt>
        <dd className="sm:col-span-2 text-gray-800">代表者名を記載（または請求時に開示）</dd>

        <dt className="font-medium text-gray-500">所在地</dt>
        <dd className="sm:col-span-2 text-gray-800">請求を受けた場合、遅滞なく開示します。</dd>

        <dt className="font-medium text-gray-500">電話番号</dt>
        <dd className="sm:col-span-2 text-gray-800">請求を受けた場合、遅滞なく開示します。</dd>

        <dt className="font-medium text-gray-500">メール</dt>
        <dd className="sm:col-span-2 text-gray-800">
          contact.relayo@gmail.com
        </dd>

        <dt className="font-medium text-gray-500">販売価格</dt>
        <dd className="sm:col-span-2 text-gray-800">
          料金ページに表示（税抜）。個別見積の場合は見積書に記載。
        </dd>

        <dt className="font-medium text-gray-500">商品代金以外の必要料金</dt>
        <dd className="sm:col-span-2 text-gray-800">
          銀行振込手数料、ドメイン・ホスティング・外部SaaS費用 等（実費）。
        </dd>

        <dt className="font-medium text-gray-500">支払方法</dt>
        <dd className="sm:col-span-2 text-gray-800">銀行振込（請求書払い）等</dd>

        <dt className="font-medium text-gray-500">支払時期</dt>
        <dd className="sm:col-span-2 text-gray-800">
          制作：契約時/検収時など契約に従う。保守：当月末〆翌月◯日払い 等。
        </dd>

        <dt className="font-medium text-gray-500">提供時期</dt>
        <dd className="sm:col-span-2 text-gray-800">
          ヒアリング完了後に着手し、目安3〜5週間で公開（規模により前後）。
        </dd>

        <dt className="font-medium text-gray-500">返品・解約</dt>
        <dd className="sm:col-span-2 text-gray-800">
          デジタルサービスの性質上、納品後の返品は不可。キャンペーン適用の先着3社は
          無償保守期間中の解約は自由（Relayoへの費用請求なし）。以降は契約の解約条項に従う。
        </dd>

        <dt className="font-medium text-gray-500">動作環境</dt>
        <dd className="sm:col-span-2 text-gray-800">主要モダンブラウザ（最新2世代）</dd>
      </dl>
    </main>
  );
}
