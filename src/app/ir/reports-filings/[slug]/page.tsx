import { IRService } from '@/lib/ir-service';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await IRService.getDocumentBySlug(slug);
  if (!doc) return { title: 'Document Not Found' };
  
  return {
    title: `${doc.title} | Reports & Filings`,
    description: `View and download ${doc.title}. Category: ${doc.category}.`,
  };
}

export default async function DocumentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await IRService.getDocumentBySlug(slug);

  if (!doc) {
    notFound();
  }

  const currentVersion = doc.versions[0];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <a href="/ir/reports-filings" className="inline-flex items-center text-sm text-text-meta hover:text-graphite transition-colors mb-4 group">
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Document Library
        </a>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
           <div>
             <div className="flex items-center gap-3 mb-3">
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-platinum text-text-body border border-platinum-dark/20">
                  {doc.category}
               </span>
               {doc.visibility === 'private' && (
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted-amber/10 text-muted-amber border border-muted-amber/20">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Confidential
                 </span>
               )}
             </div>
             <h1 className="text-3xl md:text-4xl font-bold text-graphite tracking-tight leading-tight">{doc.title}</h1>
           </div>
           
           <div className="flex-shrink-0">
              <button className="bg-steel-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-steel-blue-hover transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download PDF
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: File Preview & Details */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-xl border border-platinum shadow-sm overflow-hidden">
              <div className="aspect-[4/3] bg-off-white flex flex-col items-center justify-center border-b border-platinum relative overflow-hidden group">
                 <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                 <svg className="w-24 h-24 text-platinum-dark group-hover:scale-105 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v5h5v11H6z" /></svg>
                 <p className="mt-4 text-sm font-medium text-text-meta z-10">Preview Unavailable</p>
                 <p className="text-xs text-text-disabled z-10">Please download to view full content.</p>
              </div>
              <div className="p-6">
                 <h3 className="text-sm font-bold text-graphite uppercase tracking-wide mb-4">Metadata</h3>
                 <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm">
                    <div>
                      <dt className="text-text-meta mb-1">Entity</dt>
                      <dd className="font-medium text-graphite">{doc.entity}</dd>
                    </div>
                    <div>
                      <dt className="text-text-meta mb-1">Published Date</dt>
                      <dd className="font-medium text-graphite">{new Date(currentVersion.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                    </div>
                    <div>
                      <dt className="text-text-meta mb-1">File Name</dt>
                      <dd className="font-mono text-xs text-graphite break-all">{currentVersion.file_name}</dd>
                    </div>
                    <div>
                      <dt className="text-text-meta mb-1">File Size</dt>
                      <dd className="font-mono text-xs text-graphite">{(currentVersion.size_bytes / 1024 / 1024).toFixed(2)} MB</dd>
                    </div>
                 </dl>
              </div>
           </div>

           <div className="bg-off-white rounded-xl border border-platinum p-6">
              <h3 className="text-xs font-bold text-text-meta uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Cryptographic Verification
              </h3>
              <p className="text-xs text-text-meta mb-3">
                This document's integrity is verified by the following SHA-256 hash. You can compare this against your local file after downloading.
              </p>
              <div className="bg-white border border-platinum rounded p-3 font-mono text-xs text-text-body break-all select-all">
                {currentVersion.sha256_checksum}
              </div>
           </div>
        </div>

        {/* Sidebar: Version History & Notes */}
        <div className="space-y-8">
           {currentVersion.notes && (
             <div>
               <h3 className="text-sm font-bold text-graphite uppercase tracking-wide mb-3">Release Notes</h3>
               <div className="text-sm text-text-body leading-relaxed bg-white p-4 rounded-lg border border-platinum">
                 {currentVersion.notes}
               </div>
             </div>
           )}

           {doc.versions.length > 1 && (
             <div>
               <h3 className="text-sm font-bold text-graphite uppercase tracking-wide mb-3">Version History</h3>
               <div className="relative border-l border-platinum ml-3 space-y-6 py-2">
                 {doc.versions.map((v: any, i: number) => (
                   <div key={v.id} className="ml-6 relative">
                     <span className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${i === 0 ? 'bg-steel-blue ring-2 ring-steel-blue/20' : 'bg-platinum'}`}></span>
                     <div className="flex flex-col">
                       <span className={`text-sm font-medium ${i === 0 ? 'text-graphite' : 'text-text-meta'}`}>v{v.version_number}.0</span>
                       <span className="text-xs text-text-disabled">{new Date(v.published_at).toLocaleDateString()}</span>
                       {i !== 0 && (
                         <a href={`/ir/reports-filings/${doc.slug}/v/${v.version_number}`} className="text-xs text-steel-blue hover:underline mt-1">View Archive</a>
                       )}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}