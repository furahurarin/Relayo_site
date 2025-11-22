// components/sections/ServicesSection.tsx
import Image from "next/image";
import { AlertTriangle, LayoutTemplate, LifeBuoy, Target } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="services"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ▼▼▼ 修正: お悩みセクションを 2カラムレイアウトに変更 ▼▼▼ */}
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                こんなお悩みはありませんか？
              </h2>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* 左側：イメージ画像 */}
            <FadeIn>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-square">
                {/* TODO: 適切な画像を public/images/concern.jpg として配置してください。
                  ない場合は仮画像が表示されます。
                */}
                <Image
                  src="/images/concern.jpg"
                  alt="Webサイトの運用について考えている様子"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  // 仮画像（プレースホルダー）
                  placeholder="empty" 
                />
                {/* 画像の上に薄いフィルターをかけると落ち着いた印象になります（任意） */}
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </FadeIn>

            {/* 右側：お悩みリスト */}
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-6 text-sm text-gray-900 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <AlertTriangle
                      className="h-5 w-5 text-amber-600"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-base font-bold text-amber-900">
                    ホームページの「今」が事業に追いついていない
                  </p>
                </div>
                <ul className="space-y-4 pl-2">
                  {[
                    "自社のホームページが古く、今の事業内容や強みを反映できていない。",
                    "スマホで見づらく、問い合わせや採用につながっている実感がない。",
                    "ホームページを新しく作りたい／作り直したいが、どこにいくらで頼めばよいか分からない。",
                    "事業は動き始めているのに、ホームページの方向性が決まらない。",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span className="leading-relaxed text-gray-800">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
        {/* ▲▲▲ 修正ここまで ▲▲▲ */}

        {/* Relayo の説明 */}
        <FadeIn>
          <div className="mx-auto mt-16 max-w-3xl space-y-4 text-center text-sm leading-relaxed text-gray-800">
            <p className="text-base font-semibold text-blue-700">
              Relayo（リレイオ）なら、その課題を解決できます。
            </p>
            <p>
              中小企業・スタートアップ・個人事業主のためのホームページ制作・運用サービスです。
              <br className="hidden sm:inline" />
              必要なページだけに絞ったシンプルな構成で「まずは小さく立ち上げ」、
              <br className="hidden sm:inline" />
              事業の変化に合わせてあとから育てていけるサイトづくりを支援します。
            </p>
          </div>
        </FadeIn>

        {/* Relayo の 3つの特徴 */}
        <div className="mt-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Relayo の 3つの特徴
              </h3>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* 特徴1 */}
            <FadeIn delay={0.1}>
              <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                    1
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700/80">
                    Small Start
                  </p>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <LayoutTemplate
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <h4 className="text-base font-bold text-gray-900">
                    スモールスタートで、無理のない立ち上げを
                  </h4>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-gray-800">
                  最初から10ページ以上のサイトを作り込むのではなく、まずは成果に直結するページだけに絞って構成します。
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  ランディングページ1枚からでも対応し、あとからのページ追加や機能拡張を前提に設計します。
                </p>
              </div>
            </FadeIn>

            {/* 特徴2 */}
            <FadeIn delay={0.2}>
              <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                    2
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700/80">
                    Support
                  </p>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <LifeBuoy
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <h4 className="text-base font-bold text-gray-900">
                    公開後も窓口はひとつ。保守・運用まで継続対応
                  </h4>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-gray-800">
                  公開して終わりではなく、不具合対応や軽微な修正、システム更新までを継続して対応します。
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  「誰に連絡すればいいのか分からない」という状態を避け、サイト運用の相談先を一本化します。
                </p>
              </div>
            </FadeIn>

            {/* 特徴3 */}
            <FadeIn delay={0.3}>
              <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                    3
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700/80">
                    Design
                  </p>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <Target
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <h4 className="text-base font-bold text-gray-900">
                    目的から逆算した、中小企業向け設計
                  </h4>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-gray-800">
                  問い合わせを増やしたいのか、採用エントリーを取りたいのか、既存顧客への情報発信を整えたいのか。
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  目的に応じて、情報の構成や導線、ボタンの配置までを設計します。
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* サービス内容 */}
        <div className="mt-20 border-t border-gray-100 pt-16">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                サービス内容
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                設計・制作から公開後の運用・保守までを一貫して担当します。
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* 設計 */}
            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900">
                  設計｜役割とページ構成を決める
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-gray-800">
                  サイトにどんな役割を持たせたいか、想定している顧客像、現状の課題などを伺います。
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  その内容をもとに、必要なページ構成と大まかなコンテンツ案をこちらで組み立てます。
                </p>
              </div>
            </FadeIn>

            {/* 制作 */}
            <FadeIn delay={0.2}>
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900">
                  制作｜スマホ対応と検索対策を含めて構築
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-gray-800">
                  スマホでの見やすさを前提に、デザインと実装を行います。
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  表示速度やタイトル・説明文などのGoogle検索対策（SEO）に加え、目的に合った導線を整えます。
                </p>
              </div>
            </FadeIn>

            {/* 運用・保守 */}
            <FadeIn delay={0.3}>
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900">
                  運用・保守｜公開後の更新と初動対応
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-gray-800">
                  公開後の軽微な修正やシステム更新、不具合時の初動対応などを継続して行い、長く使える状態を保ちます。
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 小さめのお問い合わせ CTA */}
        <div className="mx-auto mt-20 max-w-3xl">
          <FadeIn>
            <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-8 text-center shadow-sm">
              <p className="text-base font-medium leading-relaxed text-gray-900">
                「自社の状況だと、どこから手を付けるべきか」を整理するところからご一緒します。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                まずは現在のホームページや事業の状況について、お気軽にご相談ください。
              </p>
              <div className="mt-6 flex justify-center">
                <ContactCTA />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}