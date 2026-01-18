import { getSecurityConfig, rotateApiKey } from './actions';

export default async function ApiCredentials() {
  const { keys } = await getSecurityConfig();

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">API Credentials</h1>
          <p className="text-gray-500 mt-2 font-mono text-xs">MACHINE_TO_MACHINE_ACCESS // OAUTH_SCOPE_MANAGEMENT</p>
        </div>
        <div className="flex gap-2">
           <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded border border-white/5">
             ENV: PRODUCTION
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Key List */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-[#16191E] border border-white/[0.05] rounded-3xl overflow-hidden">
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
                 <h3 className="text-sm font-bold text-white uppercase tracking-widest">Active Keys</h3>
                 <span className="text-[10px] font-mono text-gray-500">{keys.length} KEYS PROVISIONED</span>
              </div>
              
              <table className="w-full text-left text-sm">
                <thead className="bg-black/20 text-[9px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-8 py-4">Name / Prefix</th>
                    <th className="px-8 py-4">Permissions</th>
                    <th className="px-8 py-4">Created</th>
                    <th className="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {keys.map((key: any) => (
                    <tr key={key.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="px-8 py-5">
                          <p className="text-white font-bold mb-1">{key.name}</p>
                          <p className="font-mono text-[10px] text-steel-blue">{key.prefix}•••••••••••••</p>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex gap-2 flex-wrap">
                             {key.permissions.map((perm: string) => (
                               <span key={perm} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-gray-400 font-mono">
                                 {perm}
                               </span>
                             ))}
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <p className="text-gray-400 text-xs">{new Date(key.created_at).toLocaleDateString()}</p>
                          <p className="text-[9px] text-gray-600 mt-0.5">Last used: {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}</p>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <span className={`px-2 py-1 text-[9px] font-bold uppercase rounded ${key.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {key.is_active ? 'Active' : 'Revoked'}
                          </span>
                       </td>
                    </tr>
                  ))}
                  {keys.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-12 text-center text-gray-600">
                        No active credentials found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
           </div>
        </div>

        {/* Generate New Key Sidebar */}
        <div className="space-y-6">
           <div className="bg-[#16191E] border border-white/[0.05] rounded-3xl p-8">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4 text-steel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Provision New Key
              </h3>
              
              <form 
                action={async (formData) => {
                  'use server';
                  await rotateApiKey(formData);
                }} 
                className="space-y-6"
              >
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Service Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="e.g. CI/CD Pipeline" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-steel-blue transition-all text-sm"
                      required
                    />
                 </div>

                 <div className="p-4 bg-steel-blue/10 border border-steel-blue/20 rounded-xl">
                    <p className="text-[10px] text-steel-blue font-bold uppercase mb-2">Scope: Full Access</p>
                    <p className="text-[10px] text-steel-blue/70 leading-relaxed">
                      This key will have write access to the Document Vault and User Registry. Treat it as a root credential.
                    </p>
                 </div>

                 <button className="w-full py-3 bg-white text-black font-bold rounded-xl text-xs hover:bg-platinum transition-all shadow-lg shadow-white/5">
                   GENERATE_SECRET
                 </button>
              </form>
           </div>

           <div className="p-6 rounded-2xl border border-white/5 bg-black/20">
              <h4 className="text-white text-xs font-bold mb-2">Security Policy</h4>
              <ul className="space-y-2 text-[10px] text-gray-500 list-disc pl-4">
                 <li>Keys must be rotated every 90 days.</li>
                 <li>Inactive keys (30d) are auto-revoked.</li>
                 <li>Audit logs are immutable and retained for 7 years.</li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
}
