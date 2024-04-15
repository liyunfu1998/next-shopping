/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://shopping.liyunfu.tech'
        : 'http://localhost:3000',
    MONGODB_URL:
      'mongodb+srv://liyunfu1998:lyf19980216@cluster0.cklgsyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ACCESS_TOKEN_SECRET: '1233211234567890',
    REFRESH_TOKEN_SECRET: '987654321',
  },
}

export default nextConfig
