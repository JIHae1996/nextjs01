/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// next.config.js
const debug = process.env.NODE_ENV !== 'production'
const name = 'nextjs01'

module.exports = {
  assetPrefix: !debug ? `/${name}` : '',
  basePath: '/nextjs01',
}
