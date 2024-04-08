/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGODB_URL: 'mongodb://root:123456@47.99.147.11:27017/next-shopping?authSource=admin',
    ACCESS_TOKEN_SECRET: '1233211234567890',
    REFRESH_TOKEN_SECRET: '987654321',
  },
}

export default nextConfig
