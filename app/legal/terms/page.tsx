// app/(legal)/terms/page.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">利用規約</h1>
      <p className="mb-6 text-sm text-gray-500">最終更新日：2025-08-28</p>

      <h2 className="mt-8 text-xl font-semibold">1. 適用</h2>
      <p className="mt-2 text-gray-700">
        本規約は、Relayo（以下「当方」）が提供する制作・保守サービスに適用されます。
      </p>

      <h2 className="mt-8 text-xl font-semibold">2. 申込・契約</h2>
      <p className="mt-2 text-gray-700">
        申込はメールで行い、当方の承諾および契約書（特約含む）により成立します。
      </p>

      <h2 className="mt-8 text-xl font-semibold">3. 料金・支払</h2>
      <p className="mt-2 text-gray-700">
        料金表に定める金額を、請求書記載の期限までにお支払いください。外部サービス費用は顧客実費です。
      </p>

      <h2 className="mt-8 text-xl font-semibold">4. 知的財産</h2>
      <p className="mt-2 text-gray-700">
        納品物の権利帰属は契約に従います。テンプレート・ノウハウ等は当方に帰属し、顧客には利用許諾を付与します。
      </p>

      <h2 className="mt-8 text-xl font-semibold">5. 禁止事項</h2>
      <ul className="ml-5 mt-2 list-disc text-gray-700">
        <li>法令や公序良俗に反する利用</li>
        <li>第三者の権利侵害</li>
        <li>サービス運営を妨害する行為</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">6. 免責</h2>
      <p className="mt-2 text-gray-700">
        不可抗力（天災・回線障害・外部SaaSの障害等）による損害について、当方は責を負いません。
      </p>

      <h2 className="mt-8 text-xl font-semibold">7. 契約の解除</h2>
      <p className="mt-2 text-gray-700">
        重大な債務不履行等がある場合、催告のうえ解除できるものとします。
        キャンペーンの早期解約条件は特約に従います。
      </p>

      <h2 className="mt-8 text-xl font-semibold">8. 準拠法・裁判管轄</h2>
      <p className="mt-2 text-gray-700">
        日本法を準拠法とし、当方所在地を管轄する裁判所を第一審の専属的合意管轄とします。
      </p>

      <p className="mt-10 text-sm text-gray-600">
        お問い合わせ：<Link href="mailto:contact.relayo@gmail.com" className="text-blue-600 underline-offset-2 hover:underline">contact.relayo@gmail.com</Link>
      </p>
    </main>
  );
}
