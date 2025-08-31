// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // API Routes / Inngest を使うため、静的エクスポートは禁止
  // ※ output: "export" は絶対に入れない

  reactStrictMode: true,
  poweredByHeader: false,

  // ビルドは通し、ESLint は CI 側で実行推奨
  eslint: { ignoreDuringBuilds: true },

  // セキュリティ系ヘッダー（CSP は別途検討）
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // HSTS（https 配信が前提。全サブドメインにも適用）
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
