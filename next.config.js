/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Otimizações básicas
  poweredByHeader: false,
  
  // Compressão de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['images.tcdn.com.br', 'via.placeholder.com'],
  },
  
  // Headers básicos para cache
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
