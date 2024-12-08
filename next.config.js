/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Remove custom webpack config since Next.js handles CSS loading
}

module.exports = nextConfig

