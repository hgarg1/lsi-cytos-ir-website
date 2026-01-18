import { MetadataRoute } from 'next';
import { IRService } from '@/lib/ir-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lsi-cytos.bio';
  
  // Static pages
  const routes = [
    '/ir',
    '/ir/business-overview',
    '/ir/structure-entities',
    '/ir/reports-filings',
    '/ir/governance',
    '/ir/leadership',
    '/ir/ethics-safety-responsibility',
    '/ir/investor-communications',
    '/ir/legal-disclaimers',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic Public Docs
  try {
    const docs = await IRService.getDocuments('public');
    const docRoutes = docs.map((doc: any) => ({
      url: `${baseUrl}/ir/reports-filings/${doc.slug}`,
      lastModified: new Date(doc.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    
    return [...routes, ...docRoutes];
  } catch (e) {
    // Fallback if DB not ready
    return routes;
  }
}
