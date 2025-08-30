/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true }
  // experimental.tsconfigPaths は削除（警告の原因）
};

module.exports = nextConfig;
