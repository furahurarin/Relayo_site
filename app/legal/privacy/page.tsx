// app/(legal)/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">プライバシーポリシー</h1>
      <p className="mb-6 text-sm text-gray-500">最終更新日：2025-08-28</p>

      <h2 className="mt-8 text-xl font-semibold">1. 収集する情報</h2>
      <p className="mt-2 text-gray-700">
        当方は、お問い合わせメールに含まれる氏名・メールアドレス・会社名・ご相談内容等を取得します。
        サイト利用状況の把握のため、アクセス解析（Umami または Google Analytics 4）を利用する場合があります。
      </p>

      <h2 className="mt-8 text-xl font-semibold">2. 利用目的</h2>
      <ul className="ml-5 mt-2 list-disc text-gray-700">
        <li>お問い合わせへの対応、見積・契約・保守の連絡</li>
        <li>サービス品質向上のための分析</li>
        <li>法令遵守および不正防止</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">3. 第三者提供・委託</h2>
      <p className="mt-2 text-gray-700">
        法令で認められる場合を除き、本人の同意なく第三者に提供しません。
        開発・保守に必要な範囲で業務委託する場合は、適切な契約と監督を行います。
      </p>

      <h2 className="mt-8 text-xl font-semibold">4. 安全管理</h2>
      <p className="mt-2 text-gray-700">
        アカウント権限の最小化、アクセス制御、通信の暗号化等の措置を講じます。
      </p>

      <h2 className="mt-8 text-xl font-semibold">5. 開示・訂正・削除等の請求</h2>
      <p className="mt-2 text-gray-700">
        ご本人からの請求に誠実に対応します。連絡先：contact.relayo@gmail.com
      </p>

      <h2 className="mt-8 text-xl font-semibold">6. 改定</h2>
      <p className="mt-2 text-gray-700">
        本ポリシーを改定する場合、本ページで告知します。
      </p>
    </main>
  );
}
