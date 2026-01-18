export const metadata = {
  title: 'Corporate Governance | LSI CytosAI',
  description: 'Board of directors, committees, and bylaws.',
};

export default function GovernancePage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-platinum pb-6">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Corporate Governance</h1>
        <p className="text-lg text-text-meta max-w-3xl leading-relaxed">
          We are committed to the highest standards of corporate governance to ensure the long-term success of the company and to promote the interests of our shareholders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Documents Side */}
        <div className="md:col-span-1 space-y-6">
          <h3 className="text-xs font-bold text-text-meta uppercase tracking-wider">Governing Documents</h3>
          <ul className="space-y-3">
             {['Articles of Incorporation', 'Bylaws', 'Code of Conduct', 'Audit Committee Charter', 'Compensation Committee Charter', 'Nominating Committee Charter'].map(doc => (
               <li key={doc}>
                 <a href="#" className="flex items-center justify-between p-3 bg-white border border-platinum rounded hover:border-steel-blue transition-colors group">
                   <span className="text-sm font-medium text-graphite">{doc}</span>
                   <svg className="w-4 h-4 text-text-disabled group-hover:text-steel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 </a>
               </li>
             ))}
          </ul>
        </div>

        {/* Board Composition */}
        <div className="md:col-span-2">
           <h3 className="text-xs font-bold text-text-meta uppercase tracking-wider mb-6">Board of Directors</h3>
           <div className="bg-white border border-platinum rounded-xl overflow-hidden divide-y divide-platinum">
             {[
               { name: 'Dr. Evelyn Vance', role: 'Chairperson', bio: 'Former FDA Commissioner. Expert in regulatory strategy.' },
               { name: 'Marcus Thorne', role: 'Lead Independent Director', bio: '30 years in Investment Banking (BioTech M&A).' },
               { name: 'Sarah Jin', role: 'CEO & Director', bio: 'Founder. PhD in Computational Biology from MIT.' },
               { name: 'Robert Chen', role: 'Director', bio: 'Managing Partner at Sequoia Capital.' },
               { name: 'Elena Rodriguez', role: 'Independent Director', bio: 'Professor of Structural Engineering, ETH Zurich.' }
             ].map(dir => (
               <div key={dir.name} className="p-6 hover:bg-off-white transition-colors">
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-graphite">{dir.name}</h4>
                   <span className="text-xs font-medium bg-platinum px-2 py-1 rounded text-text-meta">{dir.role}</span>
                 </div>
                 <p className="text-sm text-text-meta">{dir.bio}</p>
               </div>
             ))}
           </div>
           
           <div className="mt-8 bg-off-white p-6 rounded-lg border border-platinum">
             <h4 className="font-bold text-graphite mb-2">Founder Transition</h4>
             <p className="text-sm text-text-meta">
               Per the 2024 Shareholder Agreement, Founder voting rights (Class B) will sunset automatically upon the earlier of (i) 2030 or (ii) the reduction of ownership below 10%.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
