/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber'],
  },
}

module.exports = nextConfig

