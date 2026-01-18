import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import UserAvatarTrigger from '@/components/ir/UserAvatarTrigger';
import { getLiveUser } from '@/lib/user-service';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const liveUser = await getLiveUser();
  const role = liveUser?.role;

  if (!liveUser || (role !== 'admin' && role !== 'super_admin')) {
    redirect('/auth/signin');
  }

  const navItems = [
    { label: 'Executive Dashboard', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Filings & Reports', href: '/admin/documents', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { label: 'Stakeholder Registry', href: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Access Control', href: '/admin/security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { label: 'Compliance Log', href: '/admin/logs', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="min-h-screen bg-[#0F1216] text-platinum flex flex-col font-sans selection:bg-steel-blue/30">
      {/* Sleek Top Bar */}
      <header className="h-16 border-b border-white/[0.03] bg-[#0F1216]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/ir" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-white/5 group-hover:scale-105 transition-transform">LC</div>
            <span className="text-sm font-bold tracking-tight text-white/90">GOVERNANCE PORTAL</span>
          </Link>
          <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">
             <div className="w-1.5 h-1.5 rounded-full bg-evergreen"></div>
             <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Operational</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <Link 
             href="/ir" 
             className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
           >
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
             View IR Site
           </Link>
           <div className="h-8 w-px bg-white/5 hidden md:block"></div>
           <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-white/90">{liveUser?.name}</span>
              <span className="text-[10px] text-steel-blue font-mono uppercase tracking-tighter">{role?.replace('_', ' ')}</span>
           </div>
           <UserAvatarTrigger session={{ user: liveUser }} />
           <div className="h-8 w-px bg-white/5 hidden md:block"></div>
           <form action={async () => { 'use server'; await signOut(); }}>
             <button className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
               <span>Sign Out</span>
               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             </button>
           </form>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-72 flex flex-col p-6 bg-[#0F1216]">
          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.03] transition-all duration-200 group"
              >
                <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto p-5 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/[0.05]">
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Kernel Details</p>
             <div className="space-y-2 font-mono text-[10px] text-gray-400/80">
                <div className="flex justify-between"><span>Version</span><span className="text-gray-300">1.2.4-P</span></div>
                <div className="flex justify-between"><span>Latency</span><span className="text-evergreen">8ms</span></div>
                <div className="flex justify-between"><span>Node</span><span className="text-gray-300">GCP-EAST1</span></div>
             </div>
          </div>
        </aside>

        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#0A0C10] rounded-tl-[2.5rem] border-t border-l border-white/[0.03] shadow-[inset_0_2px_40px_rgba(0,0,0,0.3)]">
          <div className="max-w-6xl mx-auto py-12 px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}