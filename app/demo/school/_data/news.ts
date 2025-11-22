// app/demo/school/_data/news.ts

export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  category: "重要" | "お知らせ" | "イベント";
  content: string;
};

export const schoolNews: NewsItem[] = [
  {
    slug: "spring-course-2025",
    date: "2025.03.10",
    title: "【春期講習】受付を開始しました。満席になり次第終了となります。",
    category: "重要",
    content: `
      <p>未来進学塾では、3月25日より春期講習を実施いたします。</p>
      <p>新学年に向けて、前学年の総復習と新学期の予習を行う重要な期間です。特に新中学3年生、新高校3年生の受験生コースは例年すぐに満席となりますので、お早めにお申し込みください。</p>
      <h3>期間</h3>
      <p>3月25日(火) 〜 4月5日(土)</p>
      <h3>対象</h3>
      <p>新小学4年生 〜 新高校3年生</p>
      <p>時間割や料金の詳細は、教室までお問い合わせいただくか、<a href="/demo/school/courses">コース・料金ページ</a>をご確認ください。</p>
    `,
  },
  {
    slug: "achievement-update",
    date: "2025.03.01",
    title: "2025年度 合格実績を更新しました。",
    category: "お知らせ",
    content: `
      <p>2025年度入試の合格実績を公開いたしました。</p>
      <p>今年も多くの生徒が志望校合格を勝ち取りました。最後まで諦めずに努力した生徒のみなさん、本当におめでとうございます。</p>
      <p>詳細な実績は<a href="/demo/school/achievements">合格実績ページ</a>にてご覧いただけます。</p>
    `,
  },
  // ▼ 追加データ
  {
    slug: "exam-schedule",
    date: "2025.02.15",
    title: "学年末テスト対策講座のお知らせ",
    category: "イベント",
    content: `
      <p>近隣中学校の学年末テストに合わせて、無料の対策講座を実施します。</p>
      <p>学校のワーク持ち込みもOKです。内申点に関わる重要なテストですので、しっかり準備しましょう。</p>
      <ul>
        <li>日時：2月22日(土)、23日(日) 13:00〜18:00</li>
        <li>持ち物：学校の教科書、ワーク、筆記用具</li>
        <li>参加費：無料（塾生以外のお友達も参加可能です）</li>
      </ul>
    `,
  },
  {
    slug: "winter-holiday",
    date: "2024.12.20",
    title: "年末年始の休校期間について",
    category: "お知らせ",
    content: `
      <p>誠に勝手ながら、以下の期間を年末年始休校とさせていただきます。</p>
      <p><strong>2024年12月30日(月) 〜 2025年1月3日(金)</strong></p>
      <p>※受験生（中3・高3）の正月特訓は予定通り実施いたします。</p>
      <p>休校期間中のお問い合わせにつきましては、1月4日(土)以降に順次対応させていただきます。</p>
    `,
  },
  {
    slug: "math-class-open",
    date: "2024.11.01",
    title: "【小学生対象】算数パズル教室を開講しました",
    category: "お知らせ",
    content: `
      <p>「考える力」を楽しく伸ばす、低学年向けの算数パズル教室がスタートしました。</p>
      <p>計算ドリルとは違い、図形や論理クイズを通じて数学的な思考力を養います。体験授業も随時受け付けておりますので、お気軽にお問い合わせください。</p>
    `,
  },
];

export function getNewsBySlug(slug: string) {
  return schoolNews.find((item) => item.slug === slug);
}