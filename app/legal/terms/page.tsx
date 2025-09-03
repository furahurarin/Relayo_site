// app/legal/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, CONTACT } from "@/lib/constants";
import { PRICING } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "利用規約",
  description: `${BRAND.name} が提供するWeb/アプリ制作および関連サービスの利用条件を定めます。申込み・着手、成果物・検収、知的財産、料金・支払、保守、秘密保持、責任制限、準拠法等。`,
  alternates: { canonical: "/legal/terms" },
  openGraph: {
    title: "利用規約",
    description: `${BRAND.name} のサービス利用条件（申込み・成果物・知的財産・料金・保守・秘密保持・責任制限等）。`,
    url: "/legal/terms",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "利用規約",
    description: `${BRAND.name} のサービス利用条件（申込み・成果物・知的財産・料金・保守・秘密保持・責任制限等）。`,
    images: ["/og.png"],
  },
};

export const dynamic = "force-static";

export default function TermsPage() {
  const EFFECTIVE_DATE = "2025-08-30"; // 施行日（必要に応じて更新）
  const { meta } = PRICING;

  return (
    // ※ bg-white を外し、サイト全体の背景トークンに従わせる
    <main className="py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* 固定色を撤去し、トークンに委ねる */}
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">利用規約</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          施行日：<time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time> ／ 事業者：{BRAND.name}
        </p>

        {/* prose の中でもトークンに従うよう、要素ごとに上書き */}
        <div className="
          prose max-w-none
          prose-headings:text-foreground
          prose-p:text-foreground
          prose-strong:text-foreground
          prose-li:text-foreground
          prose-hr:border-border
          prose-code:text-foreground
          prose-a:text-inherit prose-a:no-underline
        ">
          <p>
            この利用規約（以下「本規約」といいます。）は、{BRAND.name}
            （以下「当方」といいます。）が提供するウェブサイト制作・アプリ開発および関連サービス
            （以下「本サービス」といいます。）の利用条件を定めるものです。利用者（以下「お客様」といいます。）は、本サービスの利用に先立ち、本規約に同意するものとします。
          </p>

          <h2 id="scope" className="mt-10">1. 適用・個別契約</h2>
          <p>
            本規約は、本サービスの提供に関し当方とお客様との間に適用されます。発注書・見積書・注文書等（総称して「個別契約」）に別段の定めがある場合は、当該個別契約が優先します。
            本サービスの提供形態（準委任／請負）は、個別契約にて定めます。
          </p>

          <h2 id="application">2. 申込み・着手・素材の提供</h2>
          <ul>
            <li>お申込みは書面（電子含む）により確定します。</li>
            <li>
              当方は、お客様からの必要素材（文言・画像・ロゴ等）が提供されない場合、スケジュールに影響しうることを告知のうえ、作業を一時停止または代替案を提示できます。
            </li>
            <li>
              お客様は、第三者の権利を侵害しない素材を提供するものとし、権利処理はお客様の責任で行うものとします。
            </li>
          </ul>

          <h2 id="deliverables">3. 業務範囲・成果物・検収</h2>
          <p>
            業務範囲は個別契約に定めるとおりとし、軽微なテキスト修正等は範囲内とします。設計上の根本的変更・機能追加等は変更管理の対象となり、別途見積りとなります。
            納品後、個別契約で定める検収期間内にお客様から具体的な不適合指摘がない場合、当該成果物は検収合格とみなします。
          </p>

          <h2 id="ip">4. 知的財産権</h2>
          <ul>
            <li>
              成果物のうち、オリジナル部分の著作権は、個別契約の定めに従います（未記載の場合、納品・代金全額受領後に非独占的使用許諾を付与）。
            </li>
            <li>
              テンプレート、ライブラリ、生成AI、外部SaaS等の第三者コンポーネントの権利は各ライセンスに従い、当方は当該権利を譲渡しません。
            </li>
          </ul>

          <h2 id="fees">5. 料金・支払・経費</h2>
          <ul>
            <li>料金は見積書に基づき、支払条件は個別契約に従います。</li>
            <li>
              表示価格は<strong>{meta.tax}</strong>です。ドメイン・サーバ・有料SaaS・有料素材等の外部費用は実費で、お客様負担とします（個別契約で当方立替の場合を除く）。
            </li>
            <li>支払スケジュール（目安）：{meta.notes.payment}</li>
            <li>
              支払遅延がある場合、当方は作業・公開・権利付与を留保でき、遅延損害金を請求することがあります。
            </li>
          </ul>

          <h2 id="campaign">6. キャンペーン</h2>
          <p>
            当方が実施するキャンペーンの適用条件・対象・注意事項は、
            {/* 青指定を削除（グローバルのリンクスタイルに従う） */}
            <Link href="/campaign">キャンペーン案内</Link>
            に定めます。内容は予告なく変更・終了する場合があります。個別契約の定めがあるときは当該定めを優先します。
          </p>

          <h2 id="maintenance">7. 保守・運用</h2>
          <p>
            保守の範囲・SLA・工数上限等は、各保守プランおよび個別契約に従います。受付時間は原則
            <strong>{meta.businessHours}</strong>（日本時間・メール）です。第三者サービスの障害・仕様変更は免責とし、対応は別途見積りとなる場合があります。
          </p>

          {/* ▼▼▼ 追記：プラン定義 & SLA & キャンペーン特例 ▼▼▼ */}
          <h3>保守プラン（Lite / Standard / Growth）</h3>
          <ul>
            <li>
              <strong>Lite：</strong>
              稼働/フォームの簡易監視・バックアップ。<strong>月1回</strong>、<strong>テキスト1箇所 または 画像3点まで</strong>の軽微改修を行います。
            </li>
            <li>
              <strong>Standard：</strong>
              監視・バックアップ・依存関係の更新（月1回目安）に加え、<strong>月2回</strong>までの軽微改修（テキスト/画像/スタイル等）。簡易なA/Bテスト（小規模・低頻度）を実施可能。
            </li>
            <li>
              <strong>Growth：</strong>
              監視・バックアップ・依存関係の更新（随時）に加え、<strong>月4回</strong>までの軽微改修、A/Bテスト、月次レポートおよび改善提案。
            </li>
          </ul>

          <p>
            <strong>SLA：</strong>
            初動の目安は <strong>（P1＝4時間以内／P2＝翌営業日／P3＝週内）</strong> とします（プランや状況により異なる場合があります）。
          </p>

          <h3>キャンペーン適用時の特例</h3>
          <ul>
            <li>
              <strong>無料解約：</strong>
              キャンペーン期間中の解約は無料です（解約受付は毎月<strong>20日</strong>まで／末日解約）。詳細は
              <Link href="/campaign">キャンペーン案内</Link>に従います。
            </li>
            <li>
              <strong>移管：</strong>
              ドメイン・データ移管は原則として手数料と実費をご負担いただきますが、キャンペーン適用時は
              <strong>作業費2時間まで無償（実費はお客様負担）</strong>とします。2時間超過分は当社所定レートでご請求します（
              <Link href="/legal/tokusho">特定商取引法に基づく表示</Link> 参照）。
            </li>
          </ul>
          {/* ▲▲▲ 追記ここまで ▲▲▲ */}

          <h2 id="subcontract">8. 再委託</h2>
          <p>当方は、品質・秘密保持を担保したうえで、業務の一部を適切な第三者に再委託することがあります。</p>

          <h2 id="confidential">9. 秘密保持</h2>
          <p>
            双方は、契約上知り得た相手方の秘密情報を、契約期間中および終了後も第三者に開示・漏えいしないものとします（公知情報、受領前保有情報、法令等により開示義務がある場合を除く）。
          </p>

          <h2 id="privacy">10. 個人情報・データの取扱い</h2>
          <p>
            個人情報の取扱いは{" "}
            <Link href="/legal/privacy">プライバシーポリシー</Link>
            に従います。受託処理が生じる場合は、必要に応じて個人情報取扱い契約（DPA）を締結します。
          </p>

          <h2 id="ai">11. 生成AI等の利用</h2>
          <p>
            効率・品質向上のため生成AI等を補助的に利用することがあります。著作権・機密保持等に配慮し、ライセンス・利用規約に反しない範囲で運用します。機密素材を入力しないポリシーを遵守します。
          </p>

          <h2 id="warranty">12. 保証の否認・免責</h2>
          <ul>
            <li>本サービスは現状有姿で提供され、特定目的適合性・完全性・有用性等につき明示または黙示の保証を行いません。</li>
            <li>
              外部SaaS・ライブラリ・検索エンジン等の仕様変更や障害、OS/ブラウザのアップデート、広告・検索結果の変動等に起因する不具合・成果の変動について、当方は責任を負いません。
            </li>
          </ul>

          <h2 id="liability">13. 責任の限定</h2>
          <p>
            当方がお客様に負う損害賠償責任は、当方の故意または重過失による場合を除き、現実に発生した直接かつ通常の損害に限られ、その上限は、
            直近3か月間にお客様が当方に支払った対価の総額または10万円のいずれか低い額とします。
          </p>

          <h2 id="prohibited">14. 禁止行為</h2>
          <p>法令違反、公序良俗に反する行為、他者の権利侵害、当方の業務を妨害する行為等を禁止します。</p>

          <h2 id="antisocial">15. 反社会的勢力の排除</h2>
          <p>
            双方は、反社会的勢力に該当せず、またこれと関係を有しないことを表明・保証し、違反時には何らの催告なく契約解除できるものとします。
          </p>

          <h2 id="term">16. 契約期間・解除</h2>
          <ul>
            <li>契約期間は個別契約に従います。</li>
            <li>重大な債務不履行があり、相当期間を定めた催告後も是正されない場合、当方は契約を解除できます。</li>
            <li>解約・移管の手続・費用負担は、個別契約またはガイドラインに従います（外部サービス等の実費はお客様負担）。</li>
          </ul>

          <h2 id="changes">17. 規約の変更</h2>
          <p>本規約の変更が必要と当方が判断した場合、当方サイトでの掲示その他相当の方法により通知し、効力を生じます。</p>

          <h2 id="governinglaw">18. 準拠法・裁判管轄</h2>
          <p>
            本規約は日本法に準拠します。本サービスに関して紛争が生じた場合、当方の主たる営業所を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
          </p>

          <h2 id="contact">19. お問い合わせ窓口</h2>
          <p>
            本規約に関するお問い合わせは、以下までお願いいたします。
            <br />
            {/* a要素はグローバルのリンクスタイルに従わせる（色指定を外す） */}
            <a
              href={CONTACT.mailto}
              aria-label="規約に関する問い合わせメールを開く"
              data-umami-event="email_click"
              data-umami-event-section="legal-terms"
            >
              {BRAND.email}
            </a>
          </p>

          <hr className="my-10" />
        </div>

        <div className="mt-10 flex gap-4">
          {/* 末尾リンクも青指定を外す */}
          <Link href="/legal/privacy" className="text-sm">プライバシーポリシーへ</Link>
          <Link href="/legal/tokusho" className="text-sm">特定商取引法に基づく表記へ</Link>
          <Link href="/campaign" className="text-sm">キャンペーン案内へ</Link>
        </div>
      </div>
    </main>
  );
}
