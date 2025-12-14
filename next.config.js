/** @type {import('next').NextConfig} */
// GitHub Actions 환경에서만 basePath 적용
const isGithubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true';
const basePath = isGithubPages ? '/coffee-grounds-recycling' : '';
const assetPrefix = isGithubPages ? '/coffee-grounds-recycling' : '';

// 디버깅용 로그 (빌드 시에만 출력)
if (process.env.NODE_ENV === 'production') {
  console.log('Next.js Config:', {
    isGithubPages,
    basePath,
    assetPrefix,
    GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
    CI: process.env.CI,
  });
}

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber'],
  },
}

module.exports = nextConfig

