export const metadata = {
  title: 'Investor Overview | LSI CytosAI',
  description: 'Official Investor Relations for LSI and CytosAI. Financial reports, stock information, and corporate governance.',
};

export default function IROverviewPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-platinum pb-8">
        <div>
          <h1 className="text-4xl font-semibold text-graphite tracking-tight mb-3">Investor Overview</h1>
          <p className="text-lg text-text-meta max-w-2xl font-light">
            Living Systems Intelligence | CytosAI is dedicated to transparency, long-term value creation, and the ethical advancement of biotechnological solutions.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-graphite text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Latest Earnings Report
          </button>
        </div>
      </div>

      {/* Modern Dashboard Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stock Card - Spans 2 cols */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-xl border border-platinum p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <h3 className="text-xs font-bold text-text-meta uppercase tracking-wider mb-4">Stock Performance (NYSE: LCYT)</h3>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-5xl font-bold text-graphite tracking-tighter">$142.85</span>
            <span className="flex items-center text-sm font-medium text-evergreen bg-evergreen/10 px-2 py-1 rounded">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              1.24 (0.87%)
            </span>
          </div>
          <div className="h-16 flex items-end gap-1 mt-4">
             {/* Mock Chart Bars */}
             {[40, 60, 45, 70, 65, 80, 75, 90, 85, 100].map((h, i) => (
               <div key={i} className="flex-1 bg-graphite opacity-10 rounded-sm hover:opacity-100 transition-opacity cursor-crosshair" style={{ height: `${h}%` }}></div>
             ))}
          </div>
          <p className="text-[10px] text-text-meta mt-4 flex justify-between">
            <span>Open: 141.50</span>
            <span>High: 143.20</span>
            <span>Low: 141.10</span>
            <span>Vol: 1.2M</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-xl border border-platinum p-6 shadow-sm hover:border-steel-blue/30 transition-colors">
          <h3 className="text-xs font-bold text-text-meta uppercase tracking-wider mb-2">Market Cap</h3>
          <div className="text-3xl font-bold text-graphite tracking-tight mb-1">$42.8B</div>
          <p className="text-xs text-text-meta">Enterprise Value: $40.1B</p>
        </div>

        <div className="bg-white rounded-xl border border-platinum p-6 shadow-sm hover:border-steel-blue/30 transition-colors">
          <h3 className="text-xs font-bold text-text-meta uppercase tracking-wider mb-2">Next Earnings</h3>
          <div className="text-3xl font-bold text-graphite tracking-tight mb-1">Oct 24</div>
          <p className="text-xs text-text-meta">Q3 2025 Results & Webcast</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Material Updates Feed */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-semibold text-graphite">Material Updates</h2>
             <a href="#" className="text-sm text-steel-blue hover:underline">View Archive &rarr;</a>
          </div>
          
          <div className="bg-white rounded-xl border border-platinum shadow-sm overflow-hidden divide-y divide-platinum">
            {[
              { date: '2026-01-15', title: 'LSI Completes Phase III Trial for Cytos-V', desc: 'Clinical endpoints met with statistical significance. FDA filing submission scheduled for Q2.' },
              { date: '2026-01-04', title: 'Annual Shareholder Letter Published', desc: 'Reviewing 2025 performance and 2026 strategic outlook.' },
              { date: '2025-12-20', title: 'CytosAI Announces Strategic Partnership', desc: 'New collaboration with Major Pharma Inc. to accelerate drug discovery.' }
            ].map((item, i) => (
              <div key={i} className="p-6 hover:bg-off-white transition-colors group cursor-pointer">
                <div className="flex flex-col sm:flex-row gap-4">
                   <div className="w-32 flex-shrink-0">
                      <span className="text-xs font-mono text-text-meta bg-platinum/50 px-2 py-1 rounded">{item.date}</span>
                   </div>
                   <div>
                      <h4 className="font-medium text-graphite group-hover:text-steel-blue transition-colors mb-1">{item.title}</h4>
                      <p className="text-sm text-text-meta">{item.desc}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Promo */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-graphite to-gray-900 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Investor Presentation</h3>
              <p className="text-sm text-white/70 mb-4">Download the latest overview of our strategic roadmap and financial targets.</p>
              <button className="w-full bg-white text-graphite py-2 rounded text-sm font-medium hover:bg-platinum transition-colors">
                Download PDF
              </button>
           </div>

           <div className="bg-white rounded-xl border border-platinum p-6 shadow-sm">
              <h3 className="font-semibold text-graphite mb-2">Email Alerts</h3>
              <p className="text-xs text-text-meta mb-4">
                Receive SEC filings and press releases directly.
              </p>
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border border-platinum px-3 py-2 rounded text-sm focus:border-steel-blue focus:ring-1 focus:ring-steel-blue outline-none transition-all"
                />
                <button className="w-full bg-off-white border border-platinum text-graphite py-2 rounded text-sm font-medium hover:bg-platinum hover:border-platinum-dark transition-all">
                  Subscribe
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}