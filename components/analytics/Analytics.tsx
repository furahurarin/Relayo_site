// components/analytics/Analytics.tsx
"use client";

import Script from "next/script";
import { BRAND } from "@/lib/constants";

/**
 * Umami loader（クラウド or 自前エンドポイントの両対応）
 * - 環境変数が無い場合は何も出力しない
 * - 読み込み前の umami.track 呼び出しはキューで安全化
 * - data-domains をブランドのホスト名に自動設定
 *
 * 必要な環境変数（client側＝NEXT_PUBLIC_）
 * - NEXT_PUBLIC_UMAMI_WEBSITE_ID : Umami の Website ID（必須）
 * - NEXT_PUBLIC_UMAMI_SRC        : スクリプトURL（省略時 https://cloud.umami.is/script.js）
 * - NEXT_PUBLIC_UMAMI_DOMAINS    : 追跡対象ドメイン（カンマ区切り）。省略時 BRAND.siteUrl のホスト名
 * - NEXT_PUBLIC_UMAMI_DNT        : Do Not Track を尊重するか（"true"|"false"、省略時 "true"）
 */
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const SRC = process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js";
const DOMAINS =
  process.env.NEXT_PUBLIC_UMAMI_DOMAINS ??
  (() => {
    try {
      return new URL(BRAND.siteUrl).hostname;
    } catch {
      return undefined;
    }
  })();
const DNT = process.env.NEXT_PUBLIC_UMAMI_DNT ?? "true";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, any>) => void };
    __umamiQueue?: Array<[string, Record<string, any> | undefined]>;
  }
}

export default function Analytics() {
  // 必須が無ければ何も描画しない（ローカルやプレビューで無効にできる）
  if (!WEBSITE_ID) return null;

  return (
    <>
      {/* 読み込み前の track をキューに溜める簡易スタブ */}
      <Script id="umami-stub" strategy="beforeInteractive">
        {`
          (function(){
            var q = [];
            window.__umamiQueue = q;
            if (!window.umami) {
              window.umami = { track: function(name, data){ q.push([name, data]); } };
            }
            window.addEventListener("umami:loaded", function(){
              if (!window.__umamiQueue || !window.umami || typeof window.umami.track !== "function") return;
              var items = window.__umamiQueue.splice(0);
              for (var i=0; i<items.length; i++){
                try { window.umami.track(items[i][0], items[i][1]); } catch(e){}
              }
            });
          })();
        `}
      </Script>

      {/* 本体スクリプト */}
      <Script
        id="umami"
        src={SRC}
        defer
        strategy="afterInteractive"
        data-website-id={WEBSITE_ID}
        {...(DOMAINS ? { "data-domains": DOMAINS } : {})}
        {...(DNT ? { "data-do-not-track": DNT } : {})}
        onLoad={() => {
          // ロード完了通知（キューのフラッシュ用）
          window.dispatchEvent(new Event("umami:loaded"));
        }}
      />
    </>
  );
}
