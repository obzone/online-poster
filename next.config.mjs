/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'succi-posts.s3.us-east-1.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'succi-posts.s3.amazonaws.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;