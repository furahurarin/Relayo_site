// app/demo/construction/_data/works.ts

export type WorkItem = {
  id: string;
  title: string;
  category: "建築" | "土木" | "住宅" | "リニューアル";
  location: string;
  date: string;
  client?: string;
  description: string;
};

export const constructionWorks: WorkItem[] = [
  {
    id: "office-tower-a",
    title: "アークヒルズ千代田 オフィス棟",
    category: "建築",
    location: "東京都千代田区",
    date: "2024.12",
    client: "◯◯不動産株式会社",
    description: "地上20階建ての最新鋭スマートオフィスビル。環境性能評価CASBEE Sランクを取得し、省エネと快適性を両立した次世代のワークプレイスを実現しました。",
  },
  {
    id: "river-bridge-b",
    title: "一般国道◯◯号線 ◯◯大橋 架替工事",
    category: "土木",
    location: "埼玉県◯◯市",
    date: "2024.08",
    client: "国土交通省",
    description: "老朽化した橋梁の撤去および新設工事。交通量の多い幹線道路であるため、仮橋の設置や夜間工事を駆使し、交通への影響を最小限に抑えて完遂しました。",
  },
  {
    id: "library-c",
    title: "◯◯市立中央図書館 新築工事",
    category: "建築",
    location: "千葉県◯◯市",
    date: "2023.03",
    client: "◯◯市",
    description: "地域産材をふんだんに使用した温かみのある公共施設。大空間を実現するための特殊な木造トラス構造を採用しています。",
  },
  {
    id: "mansion-d",
    title: "グランドレジデンス◯◯",
    category: "住宅",
    location: "神奈川県横浜市",
    date: "2023.11",
    client: "◯◯デベロップメント",
    description: "全150戸の大規模分譲マンション。免震構造を採用し、高い安全性を確保。エントランスには重厚感のある天然石を使用しました。",
  },
  {
    id: "factory-renovation",
    title: "◯◯精密工業 第2工場 耐震改修工事",
    category: "リニューアル",
    location: "群馬県◯◯市",
    date: "2024.05",
    client: "◯◯精密工業株式会社",
    description: "稼働中の工場を止めずに施工する「居ながら改修」を実施。制震ブレースの設置により、生産ラインへの振動影響を抑えつつ耐震性を向上させました。",
  },
];

export function getWorkById(id: string) {
  return constructionWorks.find((item) => item.id === id);
}