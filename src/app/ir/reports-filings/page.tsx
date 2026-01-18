import { IRService } from '@/lib/ir-service';
import DocumentList from '@/components/ir/DocumentList';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Reports & Filings | LSI CytosAI IR',
  description: 'Access financial reports, governance documents, and regulatory filings.',
};

export default async function ReportsPage() {
  // Fetch public docs
  const docs = await IRService.getDocuments('public');

  // Map to serializable format for Client Component
  const serializableDocs = docs.map((d: any) => ({
    id: d.id,
    title: d.title,
    slug: d.slug,
    category: d.category,
    published_at: d.published_at?.toISOString() || new Date().toISOString(),
    file_name: d.file_name,
    size_bytes: parseInt(d.size_bytes || '0'),
  }));

  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-graphite mb-2">Reports & Filings</h1>
        <p className="text-text-meta">
          Official repository of financial results, governance charters, and regulatory disclosures.
        </p>
      </div>

      <DocumentList initialDocs={serializableDocs} />
    </div>
  );
}
