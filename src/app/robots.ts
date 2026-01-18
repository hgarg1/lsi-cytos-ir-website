import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/ir/'],
      disallow: ['/admin/', '/api/', '/ir/financial-information', '/ir/risk-factors'],
    },
    sitemap: 'https://lsi-cytos.bio/sitemap.xml',
  };
}
