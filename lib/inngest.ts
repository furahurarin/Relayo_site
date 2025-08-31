// lib/inngest.ts
import { Inngest } from "inngest";

/**
 * Inngest クライアント（イベント送信用）
 * - name: ダッシュボード表示名
 * - id:   プロジェクト識別子（任意）
 * - eventKey: Vercel の INNGEST_EVENT_KEY（未設定でもローカルは可）
 */
export const inngest = new Inngest({
  name: "Relayo",
  id: "relayo",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
