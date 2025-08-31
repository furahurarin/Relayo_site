// lib/inngest.ts
import { Inngest } from "inngest";

const id = "relayo-site"; // 任意のアプリ識別子

const eventKey = process.env.INNGEST_EVENT_KEY;
if (!eventKey) {
  // 開発中にキー未設定でもAPIを落とさないよう警告のみ
  console.warn("[inngest] INNGEST_EVENT_KEY is missing; events will be skipped");
}

export const inngest = new Inngest({
  id,
  eventKey: eventKey || undefined, // ここが重要。send() が自動でこのキーを使う
});
