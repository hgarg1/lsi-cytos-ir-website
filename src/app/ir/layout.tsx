import IRSidebar from '@/components/ir/Sidebar';
import { auth } from '@/auth';
import Link from 'next/link';
import IRNavbar from '@/components/ir/Navbar';
import { getLiveUser } from '@/lib/user-service';

export default async function IRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const liveUser = await getLiveUser();
  const isAdmin = !!(liveUser && (liveUser.role === 'admin' || liveUser.role === 'super_admin'));

  return (
    <div className="min-h-screen bg-off-white flex flex-col font-sans text-text-body">
      <IRNavbar liveUser={liveUser} isAdmin={isAdmin} />

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
            <div className="flex gap-8 text-sm text-text-meta font-medium">
              <Link href="/legal/privacy" className="hover:text-graphite transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-graphite transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-graphite transition-colors">Contact</Link>
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