'use client';

import { useState } from 'react';

type Doc = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published_at: string;
  file_name: string;
  size_bytes: number;
};

export default function DocumentList({ initialDocs }: { initialDocs: Doc[] }) {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('All');

  const filteredDocs = initialDocs.filter(doc => {
    const matchesText = doc.title.toLowerCase().includes(filter.toLowerCase());
    const matchesCat = category === 'All' || doc.category === category;
    return matchesText && matchesCat;
  });

  const categories = ['All', 'Financials', 'Governance', 'Risk', 'Policies'];

  function formatBytes(bytes: number) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-meta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search documents by keyword..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-platinum text-sm focus:border-steel-blue focus:ring-1 focus:ring-steel-blue outline-none transition-all shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
           <select 
            className="w-full px-4 py-2.5 rounded-lg border border-platinum text-sm focus:border-steel-blue focus:ring-1 focus:ring-steel-blue outline-none bg-white shadow-sm cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-platinum shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-off-white border-b border-platinum text-xs font-semibold text-text-meta uppercase tracking-wider">
          <div className="col-span-6 md:col-span-5">Document Name</div>
          <div className="col-span-3 md:col-span-2">Category</div>
          <div className="col-span-3 md:col-span-2">Date</div>
          <div className="hidden md:block col-span-2 text-right">Size</div>
          <div className="col-span-1 text-right"></div>
        </div>
        
        <div className="divide-y divide-platinum">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <div key={doc.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-off-white/50 transition-colors group">
                  <div className="col-span-6 md:col-span-5 pr-4">
                    <a href={`/ir/reports-filings/${doc.slug}`} className="flex items-start gap-3 group-hover:opacity-80 transition-opacity">
                      <div className="mt-0.5 w-8 h-8 flex-shrink-0 bg-red-50 text-red-600 rounded flex items-center justify-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v5h5v11H6z" /></svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-graphite group-hover:text-steel-blue transition-colors line-clamp-1">{doc.title}</div>
                        <div className="text-xs text-text-meta mt-0.5 md:hidden">{new Date(doc.published_at).toLocaleDateString()}</div>
                      </div>
                    </a>
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-platinum text-text-body">
                      {doc.category}
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-2 text-sm text-text-meta font-mono">
                    {new Date(doc.published_at).toLocaleDateString()}
                  </div>
                  <div className="hidden md:block col-span-2 text-right text-sm text-text-meta font-mono">
                    {formatBytes(doc.size_bytes)}
                  </div>
                  <div className="col-span-1 text-right">
                    <a 
                      href={`/ir/reports-filings/${doc.slug}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-platinum transition-colors text-text-disabled hover:text-graphite"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto w-12 h-12 bg-platinum rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-text-meta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-sm font-medium text-graphite">No documents found</h3>
                <p className="text-xs text-text-meta mt-1">Try adjusting your search or filter.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}