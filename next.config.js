/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === 'production';
const basePath = isGithubPages ? '/coffee-grounds-recycling' : '';
const assetPrefix = isGithubPages ? '/coffee-grounds-recycling' : '';

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

