import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

// The canonical production URL. Falls back to the preview URL if env is unset.
// Once NEXT_PUBLIC_SITE_URL is set to https://bonuscheckr.com in Vercel,
// the sitemap automatically emits production URLs.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bonuscheckr-neon.vercel.app';

// Revalidate the sitemap every hour so new content flows through without
// needing a full redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Static pages — homepage first, then hub pages, then trust pages.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/casinos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/affiliate-disclosure`,
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/authors/sergio-t`,
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Guides — only published, non-noindexed. Uses last_updated for lastmod,
  // falls back to publish_date if last_updated is null.
  const { data: guides } = await supabase
    .from('guides')
    .select('slug, last_updated, publish_date')
    .eq('status', 'published')
    .eq('noindex', false);

  const guideRoutes: MetadataRoute.Sitemap = (guides ?? []).map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.last_updated ?? g.publish_date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Casino reviews — same filter logic. Higher priority than guides since
  // these are the primary monetisation surface.
  const { data: reviews } = await supabase
    .from('casino_reviews')
    .select('slug, last_updated, publish_date')
    .eq('status', 'published')
    .eq('noindex', false);

  const reviewRoutes: MetadataRoute.Sitemap = (reviews ?? []).map((r) => ({
    url: `${SITE_URL}/casinos/${r.slug}`,
    lastModified: new Date(r.last_updated ?? r.publish_date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes, ...reviewRoutes];
}
