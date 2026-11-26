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
      {
        // Old URL still reported as 404 in Search Console.
        source: '/guides/uk-10x-wagering-cap-2025',
        destination: '/guides/casino-bonus-wagering-requirements',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
