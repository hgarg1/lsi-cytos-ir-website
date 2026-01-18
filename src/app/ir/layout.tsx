import IRSidebar from '@/components/ir/Sidebar';
import { auth, signOut } from '@/auth';
import Link from 'next/link';
import UserAvatarTrigger from '@/components/ir/UserAvatarTrigger';
import { getLiveUser } from '@/lib/user-service';

export default async function IRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const liveUser = await getLiveUser();
  const isAdmin = liveUser && (liveUser.role === 'admin' || liveUser.role === 'super_admin');

  return (
    <div className="min-h-screen bg-off-white flex flex-col font-sans text-text-body">
      {/* Modern Header - sleek, minimal */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-platinum shadow-sm">
        <div className="ir-container h-16 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
               <div className="w-8 h-8 bg-graphite rounded-sm flex items-center justify-center text-white font-bold text-xs tracking-tighter group-hover:scale-105 transition-transform">LC</div>
               <div className="font-semibold text-lg tracking-tight text-graphite">Living Systems Intelligence | CytosAI</div>
            </Link>
            <div className="h-4 w-px bg-platinum mx-2 hidden md:block"></div>
            <div className="text-sm font-medium text-text-meta hidden md:block">Investor Relations</div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs font-mono text-evergreen font-medium">LCYT ▲ 142.85</span>
                <span className="text-[10px] text-text-meta">NYSE &bull; Delayed 15m</span>
             </div>

             {liveUser ? (
               <div className="flex items-center gap-3">
                 {isAdmin && (
                   <Link 
                     href="/admin/ir" 
                     className="text-xs font-bold text-steel-blue uppercase tracking-widest hover:text-graphite transition-colors border border-steel-blue/20 px-3 py-1.5 rounded"
                   >
                     Management
                   </Link>
                 )}
                 <div className="flex items-center gap-2 pl-4 border-l border-platinum">
                    <UserAvatarTrigger session={{ user: liveUser }} />
                    <form action={async () => { 'use server'; await signOut(); }}>
                      <button className="text-xs font-medium text-text-meta hover:text-red-600 transition-colors">
                        Sign Out
                      </button>
                    </form>
                 </div>
               </div>
             ) : (
               <Link href="/auth/signin" className="text-sm font-medium text-text-body hover:text-steel-blue transition-colors px-3 py-1.5 rounded-md hover:bg-off-white border border-transparent hover:border-platinum">
                 Log In
               </Link>
             )}
          </div>
        </div>
      </header>

      <div className="flex-1 ir-container pt-16 pb-16 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Wrapper: Rigid width to prevent shifting */}
        <div className="w-full lg:w-64 flex-shrink-0 mb-12">
          <IRSidebar session={session} />
        </div>
        
        {/* Main Content: Grow to fill, with guaranteed bottom spacing */}
        <main className="flex-1 min-w-0 min-h-[60vh] mb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
      </div>

      <footer className="bg-white border-t border-platinum py-12">
        <div className="ir-container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
               <div className="font-bold text-graphite mb-2">Living Systems Intelligence | CytosAI</div>
               <p className="text-sm text-text-meta max-w-sm">
                 Pioneering the intersection of Living Systems Intelligence and computational biology.
               </p>
            </div>
            <div className="flex gap-8 text-sm text-text-meta">
              <a href="#" className="hover:text-graphite">Privacy Policy</a>
              <a href="#" className="hover:text-graphite">Terms of Use</a>
              <a href="#" className="hover:text-graphite">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-platinum text-xs text-text-disabled flex justify-between">
            <p>&copy; {new Date().getFullYear()} LSI | CytosAI. All Rights Reserved.</p>
            <p>Market Data provided by Xignite.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}