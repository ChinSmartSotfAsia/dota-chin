/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  }, images: {
    domains: ['api.opendota.com'],
  },
  webpack: config => {
    config.resolve.preferRelative = true
    return config
  }

}


module.exports = nextConfig
