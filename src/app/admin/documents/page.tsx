import { getDocuments, createDocument, deleteDocument } from './actions';

export default async function DocumentVault() {
  const docs = await getDocuments();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Document Vault</h1>
          <p className="text-gray-500 mt-2 font-mono text-xs">SECURE_FILE_MANAGEMENT // VERSION_CONTROLLED</p>
        </div>
        
        {/* Upload Action */}
        <form action={createDocument} className="flex gap-2">
           <input type="hidden" name="title" value="Q4 2025 Earnings Call" />
           <input type="hidden" name="category" value="Financials" />
           <input type="hidden" name="visibility" value="public" />
           <input type="hidden" name="entity" value="Corporate" />
           <button className="bg-white text-black px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-platinum transition-all shadow-lg shadow-white/5 active:scale-95 flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
             UPLOAD_NEW
           </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc: any) => (
          <div key={doc.id} className="bg-[#16191E] border border-white/[0.05] rounded-3xl p-6 hover:border-steel-blue/30 transition-all group relative overflow-hidden">
             {/* Status Dot */}
             <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${doc.status === 'published' ? 'bg-evergreen shadow-[0_0_10px_#2E6B4F]' : 'bg-yellow-500'}`}></div>
             
             <div className="mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 text-steel-blue group-hover:scale-110 transition-transform">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{doc.title}</h3>
                <p className="text-xs text-gray-500 font-mono">{doc.slug}.pdf</p>
             </div>

             <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mb-4">
                <div>
                   <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Access</p>
                   <p className="text-xs text-white capitalize">{doc.visibility}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Downloads</p>
                   <p className="text-xs text-white">{doc.download_count || 0}</p>
                </div>
             </div>

             <div className="flex gap-2">
                <form action={async () => { 'use server'; await deleteDocument(doc.id); }} className="w-full">
                   <button className="w-full py-2 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold hover:bg-red-500/20 transition-colors uppercase tracking-wider">
                     Revoke
                   </button>
                </form>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
