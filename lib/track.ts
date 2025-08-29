// lib/track.ts
// Umami（必要なら将来のGA4）へイベントを送る極小ヘルパー

export type TrackData = Record<string, any>;

/**
 * 任意イベントを送信（例：track('sheet_copy', { section: 'contact' })）
 * - SSR環境では何もしません
 * - Umami が優先、存在しなければ何もしません（将来GA4併用時はフォールバック）
 */
export const track = (name: string, data?: TrackData): void => {
  if (typeof window === "undefined") return;
  try {
    // Umami
    (window as any)?.umami?.track?.(name, data);
    // 将来GA4を併用する場合のフォールバック（入れておくと後が楽）
    (window as any)?.gtag?.("event", name, data || {});
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[track] failed:", e);
    }
  }
};

/**
 * よく使うイベント名の定数（タイポ防止）
 */
export const EVENTS = {
  EMAIL_CLICK: "email_click",
  SHEET_COPY: "sheet_copy",
  CTA_SHEET: "cta_sheet",
  CTA_PRICING: "cta_pricing",
  CTA_FAQ: "cta_faq",
  WAITLIST_CLICK: "waitlist_click",
} as const;

/**
 * data-umami-event 属性をまとめて付与したい時のユーティリティ（任意）
 * 使い方： <a {...umami("email_click", { section: "nav" })} ...>
 */
export const umami = (event: string, data?: TrackData) => {
  const attrs: Record<string, string> = { "data-umami-event": event };
  if (data) {
    for (const [k, v] of Object.entries(data)) {
      attrs[`data-umami-event-${k}`] = String(v);
    }
  }
  return attrs;
};
