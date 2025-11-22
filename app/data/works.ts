// app/data/works.ts

export type Work = {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  date: string;
  imageColor: string;
  thumbnail?: string;
  siteUrl?: string;
  content: string;
};

export const works: Work[] = [
  {
    id: "matching-service",
    title: "求人マッチングプラットフォーム（デモ）",
    description: "AIマッチング機能を搭載した求人サービスのUI/UXデザインおよび実装サンプル。",
    category: "Webサービス・プラットフォーム",
    features: ["サービスLP", "会員登録導線"],
    date: "2025.04",
    imageColor: "bg-indigo-50",
    thumbnail: "/images/demo/matching-service/hero.jpg",
    siteUrl: "/demo/matching-service",
    content: `
      <p>スタートアップ企業の新規事業立ち上げを想定して制作した、求人マッチングサービスのデモサイトです。サービスの信頼性を高め、会員登録数を最大化するためのLP（ランディングページ）を設計しました。</p>

      <h3>設計のテーマ</h3>
      <ul>
        <li><strong>信頼感と先進性：</strong>「AI活用」という先進的なイメージと、求職者・企業の双方に安心感を与える清潔感のあるデザインを両立。</li>
        <li><strong>コンバージョンへの導線：</strong>「まずは無料で試す」というアクションへ自然に誘導するよう、ボタン配置や配色を工夫しました。</li>
      </ul>

      <h3>実装のポイント</h3>
      <h4>1. 複雑な機能をシンプルに見せるUI</h4>
      <p>多機能なシステムであっても、ユーザーが直感的に使えるよう、管理画面や検索機能のUIをシンプルに整理して表現しています。</p>
      
      <h4>2. アニメーションによる演出</h4>
      <p>ファーストビューや機能紹介に動きを取り入れることで、静的なページでは伝わりにくい「ツールの操作感」や「先進性」を表現しました。</p>

      <h3>想定される効果</h3>
      <p>サービスのメリットを視覚的に分かりやすく伝えることで、LPでの離脱率を下げ、会員登録数の向上が期待できる構成としています。</p>
    `,
  },
  {
    id: "construction-demo",
    title: "建設会社 コーポレートサイト（デモ）",
    description: "信頼感と採用強化を両立させる、建設業界向けコーポレートサイトの構成例。",
    category: "建設・建築",
    features: ["施工実績ギャラリー", "採用エントリー"],
    date: "2025.02",
    imageColor: "bg-amber-50",
    thumbnail: "/images/demo/construction/hero.jpg",
    siteUrl: "/demo/construction",
    content: `
      <p>地域でインフラ工事を手掛ける建設会社を想定した、コーポレートサイトのデモです。「取引先への信頼性アピール」と「若手人材の採用強化」という、建設業界によくある2つの課題解決をテーマに制作しました。</p>

      <h3>設計のテーマ</h3>
      <h4>信頼感を醸成するデザイン</h4>
      <p>奇をてらわず、白とコーポレートカラーのネイビーを基調とした誠実なデザインに。トップページには現場の写真を大きく配置し、スケール感を演出しました。</p>

      <h4>「人が見える」採用ページ</h4>
      <p>建設業界の「怖い・きつい」という先入観を払拭するため、若手社員のインタビュー記事や「1日の流れ」コンテンツを充実させ、働くイメージが湧く構成にしています。</p>

      <h3>技術的なこだわり</h3>
      <p>施工実績写真は枚数が多くなりがちですが、Next.jsの画像最適化機能を使用することで、高画質な写真を多数掲載してもサクサク表示されるよう調整しています。</p>
    `,
  },
  {
    id: "school-demo",
    title: "個別指導塾 Webサイト（デモ）",
    description: "保護者の信頼を獲得し、体験授業への申し込みハードルを下げる学習塾サイトのサンプル。",
    category: "教育・学習塾",
    features: ["体験授業予約", "合格実績CMS"],
    date: "2025.03",
    imageColor: "bg-sky-50",
    thumbnail: "/images/demo/school/hero.jpg",
    siteUrl: "/demo/school",
    content: `
      <p>地域密着型の個別指導塾を想定した、集客用Webサイトのデモです。「チラシだけでなくWebからも集客したい」というニーズに応える構成をシミュレーションしました。</p>
      
      <h3>想定した課題</h3>
      <ul>
        <li>スマホで検索した保護者に情報が伝わりにくい。</li>
        <li>「合格実績」や「お知らせ」の更新が手間で、情報が古くなりがち。</li>
      </ul>

      <h3>設計のポイント</h3>
      <h4>1. 更新しやすい仕組み（CMS）</h4>
      <p>「合格実績」や「お知らせ」を、専門知識がなくてもブログ感覚で簡単に更新できる仕組みを想定して構築しています。</p>
      
      <h4>2. 無料体験へのハードルを下げる</h4>
      <p>「いきなり電話は緊張する」という保護者のために、24時間受付可能なWeb予約フォームへの導線を各所に配置。また、授業の様子がわかる写真を多用し、教室の明るい雰囲気を伝えました。</p>

      <h3>想定される効果</h3>
      <p>スマホ最適化とWeb予約の導入により、夜間や移動中の保護者からの問い合わせ取りこぼしを防ぎ、体験申し込み数の増加を目指す設計です。</p>
    `,
  },
];

export function getWorkById(id: string): Work | undefined {
  return works.find((work) => work.id === id);
}