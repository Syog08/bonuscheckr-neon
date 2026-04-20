import type { MetadataRoute } from "next";

// IMPORTANT: This file currently disallows all crawling because the site
// is deployed to a preview URL. When we cut DNS over to bonuscheckr.com,
// this must be replaced with production rules (Allow: /, + sitemap ref).
export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.NEXT_PUBLIC_SITE_URL === "https://bonuscheckr.com";

  if (isProduction) {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://bonuscheckr.com/sitemap.xml",
    };
  }

  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
