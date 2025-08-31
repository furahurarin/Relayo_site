// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // API Routes / Inngest を使うため、静的エクスポートは不可
  // output: "export" は設定しないこと

  reactStrictMode: true,
  poweredByHeader: false,

  // ビルドは通し、ESLintはCIで実行推奨
  eslint: { ignoreDuringBuilds: true },

  // セキュリティ系ヘッダー（CSPは別途検討）
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
