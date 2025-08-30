// app/legal/tokusho/page.tsx
import Link from "next/link";

export const metadata = {
  title: "特定商取引法に基づく表示｜Relayo",
  description: "Relayoの特定商取引法に基づく表示ページです。",
};

export default function TokushoPage() {
  return (
    <main className="container mx-auto px-4 py-12 prose prose-neutral">
      <h1>特定商取引法に基づく表示</h1>

      <h2>事業者情報</h2>
      <ul>
        <li>屋号：Relayo（リレイオ）</li>
        <li>運営責任者：<strong>高橋 輝</strong></li>
        <li>所在地：請求があった場合に遅滞なく開示します</li>
        <li>電話番号：請求があった場合に遅滞なく開示します</li>
        <li>
          請求方法：件名「特商法開示請求」で{" "}
          <a href="mailto:contact.relayo@gmail.com">contact.relayo@gmail.com</a>{" "}
          へご連絡ください。1営業日以内にご案内します。
        </li>
      </ul>

      <h2>営業時間</h2>
      <p>平日 9:00–18:00（年末年始・当社指定日を除く）</p>

      <h2>提供サービス</h2>
      <p>Webサイト制作・運用、デジタル活用支援 ほか</p>

      <h2>対価の支払時期・方法</h2>
      <ul>
        <li>支払方法：銀行振込（請求書払い）</li>
        <li>請求サイクル：初期費用は検収時、月額費用は毎月末締め翌月末支払</li>
      </ul>

      <h2>役務の提供時期</h2>
      <p>契約締結後、個別見積・合意スケジュールに従い提供します。</p>

      <h2>キャンセル・解約・移管</h2>
      <ul>
        <li>制作開始前のキャンセル：実費精算（要見積）</li>
        <li>制作開始後のキャンセル：着手金＋進捗相当額を精算</li>
        <li>解約：毎月末締め、翌月末日解約（解約受付は当月20日まで）</li>
        <li>
          ドメイン・データ移管：手数料と実費を申し受けます。詳細は{" "}
          <Link href="/legal/terms">利用規約</Link> 第16条をご確認ください。
        </li>
      </ul>

      <h2>返品・返金</h2>
      <p>役務の性質上、提供後の返品・返金はお受けしていません。瑕疵がある場合は契約に基づき対応します。</p>

      <p className="text-sm text-gray-500">
        ※詳細は <Link href="/legal/terms">利用規約</Link> および{" "}
        <Link href="/legal/privacy">プライバシーポリシー</Link> をご確認ください。
      </p>
    </main>
  );
}
