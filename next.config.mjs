/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://shopping.liyunfu.tech'
        : 'http://localhost:3000',
    MONGODB_URL:
      'mongodb+srv://liyunfu1998:lyf19980216@cluster0.cklgsyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    NEXT_PUBLIC_ACCESS_TOKEN_SECRET: '1233211234567890',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },
}

export default nextConfig
