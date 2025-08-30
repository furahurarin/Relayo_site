// lib/inngest.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "relayo",
  // 本番では Event Key を使って Inngest Cloud に安全にイベント送信
  eventKey: process.env.INNGEST_EVENT_KEY,
});
