import { auth } from '@/auth';
import { getLiveUser } from '@/lib/user-service';
import RiskDashboard from '@/components/ir/RiskDashboard';
import Link from 'next/link';

export const metadata = {
  title: 'Risk Factors | Living Systems Intelligence',
  description: 'Comprehensive risk assessment. Restricted access.',
};

export default async function RiskFactorsPage() {
  const user = await getLiveUser();
  const hasAccess = user && (
    user.permissions?.includes('docs:read_private') || 
    user.permissions?.includes('admin:full') ||
    user.role === 'admin' ||
    user.role === 'super_admin'
  );

  if (!hasAccess) {
    return (
      <div className="space-y-12 animate-in fade-in duration-500">
         <div className="border-b border-platinum pb-6 flex justify-between items-center">
          <div>
             <h1 className="text-3xl font-semibold text-graphite mb-2">Risk Factors</h1>
             <p className="text-lg text-text-meta">10-K Item 1A and Supplemental Disclosures.</p>
          </div>
          <div className="bg-muted-amber/10 text-muted-amber px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-2 border border-muted-amber/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Restricted Access
          </div>
        </div>

        <div className="bg-off-white border border-platinum rounded-xl p-12 text-center">
           <div className="mx-auto w-16 h-16 bg-platinum rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-text-disabled" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
           </div>
           <h3 className="text-xl font-bold text-graphite mb-3">Investor Verification Required</h3>
           <p className="text-text-meta max-w-md mx-auto mb-8">
             Access to detailed risk scenarios, litigation updates, and IP challenges is restricted to verified institutional investors in accordance with Regulation FD.
           </p>
           <Link href="/auth/signin" className="inline-block bg-graphite text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors shadow-lg">
             Log In with Institution ID
           </Link>
           <p className="mt-4 text-xs text-text-meta">
             Don't have access? <Link href="/ir/investor-communications" className="underline hover:text-graphite">Request authorization.</Link>
           </p>
        </div>

        {/* Public Summary Teaser */}
        <div className="opacity-50 pointer-events-none select-none blur-[2px]">
           <h4 className="font-bold mb-2">Market Risks</h4>
           <p className="text-sm mb-4">The biotech industry is characterized by rapid technological change and intense competition...</p>
           <h4 className="font-bold mb-2">Regulatory Risks</h4>
           <p className="text-sm mb-4">Our clinical trials are subject to extensive FDA oversight, and any delay in approval would...</p>
        </div>
      </div>
    );
  }

  // If Unlocked
  return <RiskDashboard />;
}