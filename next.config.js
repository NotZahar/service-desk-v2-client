/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/choice',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
