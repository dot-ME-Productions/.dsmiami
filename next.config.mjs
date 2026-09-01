/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ds-miami.com',
        port: '',
        pathname: '/**',
      }
    ],
    // DeepSeek Flaw #1: Enforce next-gen formats (AVIF/WebP) automatically via Vercel Edge Image Optimization
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;