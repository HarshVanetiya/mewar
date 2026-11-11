import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

// Allow indexing in production or when explicitly configured via ALLOW_INDEXING
const allow = process.env.ALLOW_INDEXING === 'true' || process.env.NODE_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allow
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
