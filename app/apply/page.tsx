// app/apply/page.tsx
import ApplicationForm from "@/components/forms/ApplicationForm";

export const metadata = {
  title: "お申し込み｜Relayo",
  description: "RelayoのWeb制作・運用に関するお申し込みフォームです。",
};

export default function ApplyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">お申し込み</h1>
      <p className="text-gray-600 mb-10">
        下記フォームに必要事項をご入力ください。送信後すぐに自動返信メールが届きます。
      </p>
      <ApplicationForm />
    </main>
  );
}
