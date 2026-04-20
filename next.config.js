/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/guides/ukgc-2026-bonus-rules',
        destination: '/guides/casino-bonus-wagering-requirements',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
