import { auth } from '@/auth';
import { Canvas } from '@react-three/fiber';
import { DataTerrain } from '@/components/3d/DataTerrain';
import FinancialDashboard from '@/components/ir/FinancialDashboard';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Financial Information | Living Systems Intelligence',
  description: 'Detailed financial statements and models.',
};

export default async function FinancialInfoPage() {
  const session = await auth();
  const hasAccess = session?.user && (
    (session.user as any).permissions?.includes('docs:read_private') || 
    (session.user as any).permissions?.includes('admin:full')
  );

  if (!hasAccess) {
    return (
      <div className="space-y-8 relative">
        <div className="border-b border-platinum pb-6 flex justify-between items-center relative z-10">
          <div>
             <h1 className="text-3xl font-semibold text-graphite mb-2">Financial Information</h1>
             <p className="text-text-meta">Detailed statements, balance sheets, and cash flow models.</p>
          </div>
          <div className="bg-muted-amber/10 text-muted-amber px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-2 border border-muted-amber/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Restricted Access
          </div>
        </div>

        <div className="relative bg-graphite border border-platinum rounded-xl overflow-hidden min-h-[400px] flex items-center justify-center">
           <div className="absolute inset-0 z-0 opacity-40">
              {/* Note: In a Server Component, we wrap client components that use Three.js */}
              <FinancialBackgroundFallback />
           </div>

           <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-10 text-center rounded-2xl max-w-md shadow-2xl lg:ml-auto lg:mr-24 mx-4">
               <h3 className="text-xl font-bold text-white mb-4">Investor Verification Required</h3>
               <p className="text-gray-300 mb-8 leading-relaxed text-sm">
                 This section contains sensitive financial models and detailed unit economics. 
                 Please log in with your verified investor account to proceed.
               </p>
               <Link 
                 href="/auth/signin"
                 className="inline-block bg-white text-graphite px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
               >
                 Log In via SSO
               </Link>
           </div>
        </div>
      </div>
    );
  }

  // If Unlocked - Show high-end financial dashboard
  return <FinancialDashboard />;
}

// Simple client-side fallback since we can't put <Canvas> directly in async server component without 'use client' boundary
function FinancialBackgroundFallback() {
    return <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-steel-blue/20 to-transparent"></div>
}
