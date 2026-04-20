import { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bonuscheckr-neon.vercel.app';

// Production domain where the site is allowed to be indexed.
// Any other host (preview URLs, the vercel.app default) stays noindexed.
const PRODUCTION_DOMAIN = 'https://bonuscheckr.com';
const isProduction = SITE_URL === PRODUCTION_DOMAIN;

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    // Preview environments and the default vercel.app domain:
    // block all crawlers entirely.
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  // Production: allow everything, point Google at the sitemap.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
