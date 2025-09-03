// lib/inngest.ts
import { Inngest } from "inngest";

// import時にENVチェックしない！
export const inngest = new Inngest({
  id: "relayo-app", // 任意のID
  // イベント送信用のキー（INNGEST_EVENT_KEY）は「送信側」で使うものです。
  // ここでは不要・未設定でOK。
});

