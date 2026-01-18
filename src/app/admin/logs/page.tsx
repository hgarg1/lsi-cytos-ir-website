import { getDetailedLogs } from './actions';

export default async function AuditEngine() {
  const logs = await getDetailedLogs();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Audit Engine</h1>
          <p className="text-gray-500 mt-2 font-mono text-xs">FORENSIC_ACCESS_LOGS // IMMUTABLE_LEDGER</p>
        </div>
        <button className="bg-[#16191E] border border-white/10 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-white/5 transition-all">
          EXPORT_CSV
        </button>
      </div>

      <div className="bg-[#16191E] border border-white/[0.05] rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/20 text-[9px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Identity</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Resource</th>
              <th className="px-6 py-4 text-right">Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-mono">
            {logs.map((log: any) => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-white font-bold">{log.user_identifier}</div>
                  {log.user_role && <div className="text-[9px] text-steel-blue mt-0.5">{log.user_role}</div>}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                    log.action === 'download' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {log.doc_title || 'Unknown Resource'}
                </td>
                <td className="px-6 py-4 text-right text-gray-500">
                  IP: {log.ip_address || '::1'}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-600">
                  NO_EVENTS_DETECTED
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
