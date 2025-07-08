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
  // Excluir archivos de test del build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => ext !== 'test.tsx' && ext !== 'test.ts'),
  // Configuración adicional para evitar que Next.js procese archivos de test
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Excluir archivos de test del bundle
    config.module.rules.push({
      test: /\.test\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;
