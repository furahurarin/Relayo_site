// components/sections/ServicesSection.tsx
import { AlertTriangle, LayoutTemplate, LifeBuoy, Target } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="services"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* こんなお悩みはありませんか？ */}
        <div className="mx-auto max-w-3xl text-center">
          
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            こんなお悩みはありませんか？
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-6 text-sm text-gray-900 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle
                className="h-5 w-5 text-amber-600"
                aria-hidden="true"
              />
              <p className="font-semibold text-amber-900">
                ホームページの「今」が事業に追いついていない
              </p>
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                自社のホームページが古く、今の事業内容や強みを反映できていない。
              </li>
              <li>
                スマホで見づらく、問い合わせや採用につながっている実感がない。
              </li>
              <li>
                ホームページを新しく作りたい／作り直したいが、どこにいくらで頼めばよいか分からない。
              </li>
              <li>
                事業は動き始めているのに、ホームページの方向性が決まらない。
              </li>
            </ul>
          </div>
        </div>

        {/* Relayo の説明 */}
        <div className="mx-auto mt-10 max-w-3xl space-y-3 text-sm leading-relaxed text-gray-800">
          <p>
            Relayo（リレイオ）は、こうした悩みをもつ中小企業・スタートアップ・個人事業主のためのホームページ制作・運用サービスです。
          </p>
          <p>
            必要なページだけに絞ったシンプルな構成で「まずは小さく立ち上げ」、事業の変化に合わせてあとから育てていけるサイトづくりを支援します。
          </p>
        </div>

        {/* Relayo の 3つの特徴 */}
        <div className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              Relayo の 3つの特徴
            </h3>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* 特徴1 */}
            <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                  1
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700/80">
                  Feature
                </p>
              </div>
              <div className="mb-3 flex items-center gap-2">
                <LayoutTemplate
                  className="h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
                <h4 className="text-sm font-semibold text-gray-900">
                  特徴1｜スモールスタートで、無理のない立ち上げを
                </h4>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-gray-800">
                最初から10ページ以上のサイトを作り込むのではなく、まずは成果に直結するページだけに絞って構成します。
              </p>
              <p className="text-sm leading-relaxed text-gray-800">
                ランディングページ1枚からでも対応し、あとからのページ追加や機能拡張を前提に設計します。
              </p>
            </div>

            {/* 特徴2 */}
            <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                  2
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700/80">
                  Feature
                </p>
              </div>
              <div className="mb-3 flex items-center gap-2">
                <LifeBuoy
                  className="h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
                <h4 className="text-sm font-semibold text-gray-900">
                  特徴2｜公開後も窓口はひとつ。保守・運用まで継続対応
                </h4>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-gray-800">
                公開して終わりではなく、不具合対応や軽微な修正、システム更新までを継続して対応します。
              </p>
              <p className="text-sm leading-relaxed text-gray-800">
                「誰に連絡すればいいのか分からない」という状態を避け、サイト運用の相談先を一本化します。
              </p>
            </div>

            {/* 特徴3 */}
            <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                  3
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700/80">
                  Feature
                </p>
              </div>
              <div className="mb-3 flex items-center gap-2">
                <Target
                  className="h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
                <h4 className="text-sm font-semibold text-gray-900">
                  特徴3｜目的から逆算した、中小企業・スタートアップ向けの設計
                </h4>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-gray-800">
                問い合わせを増やしたいのか、採用エントリーを取りたいのか、既存顧客への情報発信を整えたいのか。
              </p>
              <p className="text-sm leading-relaxed text-gray-800">
                目的に応じて、情報の構成や導線、ボタンの配置までを設計します。
              </p>
            </div>
          </div>
        </div>

        {/* サービス内容 */}
        <div className="mt-14 border-t border-gray-100 pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              サービス内容
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              設計・制作から公開後の運用・保守までを一貫して担当します。
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* 設計 */}
            <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900">
                設計｜役割とページ構成を決める
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                サイトにどんな役割を持たせたいか、想定している顧客像、現状の課題などを伺います。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-800">
                その内容をもとに、必要なページ構成と大まかなコンテンツ案をこちらで組み立てます。
              </p>
            </div>

            {/* 制作 */}
            <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900">
                制作｜スマホ対応と基本的な検索対策を含めて構築
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                スマホでの見やすさを前提に、デザインと実装を行います。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-800">
                表示速度やタイトル・説明文などの基本的な検索対策に加え、問い合わせ・採用・予約など、目的に合った導線を整えます。
              </p>
            </div>

            {/* 運用・保守 */}
            <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900">
                運用・保守｜公開後の更新とトラブルへの初動対応
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                公開後の軽微な修正やシステム更新、不具合時の初動対応などを継続して行い、長く使える状態を保ちます。
              </p>
            </div>
          </div>
        </div>

        {/* 小さめのお問い合わせ CTA */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-6 text-center shadow-sm">
            <p className="text-sm leading-relaxed text-gray-800">
              「自社の状況だと、どこから手を付けるべきか」を整理するところからご一緒します。
              まずは現在のホームページや事業の状況について、お気軽にご相談ください。
            </p>
            <div className="mt-4 flex justify-center">
              <ContactCTA />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
