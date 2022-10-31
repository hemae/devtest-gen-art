require('dotenv').config()
const path = require('path')


const host = process.env.NODE_ENV === 'production' ? process.env.BACKEND_API_PROD : process.env.BACKEND_API_DEV

const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_API: host,
    API_VERSION: process.env.API_VERSION,
    APPLICATION_TITLE: 'Gen-Art',
    ROBOKASSA_BASE_URL: process.env.ROBOKASSA_BASE_URL,
    ROBOKASSA_MERCHANT_LOGIN: process.env.ROBOKASSA_MERCHANT_LOGIN,
    ROBOKASSA_CRC_PASSWORD_1: process.env.ROBOKASSA_CRC_PASSWORD_1,
    ROBOKASSA_IS_TEST: process.env.ROBOKASSA_IS_TEST
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'assets')],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${host}${process.env.API_VERSION}/:path*` // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
