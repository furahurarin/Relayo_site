// lib/ratelimit.ts
/**
 * レート制限ユーティリティ
 * - 本番: Upstash Redis を使用
 * - ローカル/未設定: NOOP（常に許可）にフォールバック
 *
 * これにより、環境変数が無くても build / dev が落ちません。
 */

type LimitResult = {
  success: boolean;
  remaining: number;
  reset: number; // epoch millis
};

const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let limitImpl:
  | ((key: string) => Promise<LimitResult>)
  | null = null;

if (URL && TOKEN) {
  // 本番: Upstash を使う実装
  // パッケージ未導入なら: npm i @upstash/ratelimit @upstash/redis
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Ratelimit } = require("@upstash/ratelimit");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Redis } = require("@upstash/redis");

  const redis = new Redis({ url: URL, token: TOKEN });

  // 例: 10秒間に5リクエストまで（必要に応じて調整）
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    prefix: "rl",
  });

  limitImpl = async (key: string): Promise<LimitResult> => {
    const r = await rl.limit(key);
    return { success: r.success, remaining: r.remaining, reset: r.reset };
  };
} else {
  // 開発/未設定: 何もしない（常に通す）
  limitImpl = async (_key: string): Promise<LimitResult> => {
    return { success: true, remaining: 999, reset: Date.now() + 1000 };
  };
}

/**
 * リクエストごとに呼び出す関数
 * @param ip クライアントIP（取得できない場合は "unknown" でOK）
 * @param path パスを混ぜるとキー競合が減る
 */
export async function applyRatelimit(ip: string | null | undefined, path = "") {
  const key = `${path}:${ip ?? "unknown"}`;
  return limitImpl!(key);
}
