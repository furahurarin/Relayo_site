// lib/inngest.ts
import "server-only";
import { Inngest } from "inngest";

/**
 * Inngest client（本番対応）
 * - v3では name ではなく id を指定します。
 * - 本番では INNGEST_EVENT_KEY を要求します。
 */
const EVENT_KEY = process.env.INNGEST_EVENT_KEY?.trim();

if (process.env.NODE_ENV === "production" && !EVENT_KEY) {
  throw new Error("INNGEST_EVENT_KEY is required in production");
}

// Dev の HMR での再インスタンス化防止
const g = globalThis as unknown as { __relayoInngest?: Inngest };

export const inngest =
  g.__relayoInngest ??
  new Inngest({
    id: "relayo-site",      // ← お好みの一意なIDに変更可
    eventKey: EVENT_KEY,    // 環境変数でもOK（推奨）
  });

if (process.env.NODE_ENV !== "production") {
  g.__relayoInngest = inngest;
}
