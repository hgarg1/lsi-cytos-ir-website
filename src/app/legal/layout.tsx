import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const legalNav = [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'AI Ethics Charter', href: '/legal/ethics' },
    { label: 'Intellectual Property', href: '/legal/ip' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
  ];

  return (
    <div className="min-h-screen bg-off-white font-sans text-text-body flex flex-col">
      {/* Legal Header */}
      <header className="bg-graphite text-white py-6">
        <div className="ir-container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
             <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center text-graphite font-bold text-xs">LC</div>
             <span className="font-bold tracking-tight text-lg">LEGAL CENTER</span>
          </Link>
          <Link href="/ir" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
            Return to Investor Portal &rarr;
          </Link>
        </div>
      </header>

      <div className="flex-1 ir-container py-16 flex flex-col lg:flex-row gap-16">
        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
           <div className="sticky top-12 space-y-8">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {legalNav.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className="block px-4 py-2 text-sm text-text-meta hover:text-graphite hover:bg-white border-l-2 border-transparent hover:border-steel-blue transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="p-6 bg-white border border-platinum rounded-xl shadow-sm">
                 <p className="text-xs font-bold text-graphite mb-2">Legal Department</p>
                 <p className="text-xs text-text-meta mb-4">For specific inquiries regarding patent licensing or compliance.</p>
                 <a href="mailto:legal@lsi-cytos.bio" className="text-xs font-bold text-steel-blue hover:underline">legal@lsi-cytos.bio</a>
              </div>
           </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 max-w-3xl">
           <div className="bg-white border border-platinum p-12 shadow-sm rounded-none">
             {children}
           </div>
           <div className="mt-8 text-center text-xs text-text-meta">
             Last Updated: January 18, 2026 &bull; Global Jurisdiction: Delaware, USA
           </div>
        </main>
      </div>
    </div>
  );
}
