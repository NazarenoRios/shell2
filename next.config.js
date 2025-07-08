/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/shell',
  assetPrefix: '/shell',
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  experimental: {
    largePageDataBytes: 128 * 1000,
  },
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
