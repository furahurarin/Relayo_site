// app/demo/construction/_data/news.ts

export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  category: "お知らせ" | "実績" | "採用" | "プレスリリース";
  content: string;
};

export const constructionNews: NewsItem[] = [
  {
    slug: "office-relocation",
    date: "2025.04.01",
    title: "本社移転のお知らせ",
    category: "お知らせ",
    content: `
      <p>平素は格別のご高配を賜り厚く御礼申し上げます。</p>
      <p>さて、この度弊社は業務拡大に伴い、本社を下記に移転することになりましたのでお知らせ申し上げます。<br>
      これを機に社員一同、より一層業務に励み、皆様のご期待に添えるよう努めてまいる所存です。</p>
      <h3>新本社所在地</h3>
      <p>〒100-0001<br>東京都千代田区丸の内1-1-1 アークフィールドビル 8F</p>
      <h3>業務開始日</h3>
      <p>2025年4月1日（火）</p>
    `,
  },
  {
    slug: "award-2024",
    date: "2025.03.15",
    title: "「2024年度 優良工事表彰」を受賞いたしました",
    category: "実績",
    content: `
      <p>国土交通省より、弊社が施工を行いました「一般国道◯◯号線 道路改良工事」において、優良工事表彰を受賞いたしました。</p>
      <p>今回の受賞を励みに、今後も「安全第一」と「品質確保」を徹底し、社会インフラの整備に貢献してまいります。</p>
      <p>工事期間中、近隣住民の皆様および関係各所の皆様には多大なるご協力をいただき、心より感謝申し上げます。</p>
    `,
  },
  {
    slug: "recruit-2026",
    date: "2025.03.01",
    title: "2026年度 新卒採用のエントリー受付を開始しました",
    category: "採用",
    content: `
      <p>本日より、2026年度新卒採用（施工管理職・設計職）のエントリー受付を開始いたしました。</p>
      <p>「地図に残る仕事」に挑戦したい、情熱あふれる皆様のご応募をお待ちしております。</p>
      <p>会社説明会の日程や詳細につきましては、<a href="/demo/construction/recruit">採用情報ページ</a>をご確認ください。</p>
    `,
  },
  {
    slug: "iso-renewal",
    date: "2024.12.20",
    title: "ISO9001 / ISO14001 認証を更新いたしました",
    category: "プレスリリース",
    content: `
      <p>品質マネジメントシステム（ISO9001）および環境マネジメントシステム（ISO14001）の認証を更新いたしました。</p>
      <p>今後も国際規格に基づいたマネジメントシステムの継続的な改善を行い、顧客満足の向上と環境保全活動に取り組んでまいります。</p>
    `,
  },
];

export function getNewsBySlug(slug: string) {
  return constructionNews.find((item) => item.slug === slug);
}