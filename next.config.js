/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // basePath and images.unoptimized are automatically set by GitHub Actions
  // when using actions/configure-pages@v5 with static_site_generator: next
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber'],
  },
}

module.exports = nextConfig

