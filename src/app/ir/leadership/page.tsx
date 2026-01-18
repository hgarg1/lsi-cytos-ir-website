export const metadata = {
  title: 'Executive Leadership | LSI CytosAI',
  description: 'Meet the management team driving our vision.',
};

export default function LeadershipPage() {
  const team = [
    { name: 'Sarah Jin, PhD', title: 'Chief Executive Officer', image: 'bg-slate-300' },
    { name: 'David Okafor', title: 'Chief Financial Officer', image: 'bg-slate-400' },
    { name: 'Dr. Aris Vlahos', title: 'Chief Scientific Officer (LSI)', image: 'bg-slate-500' },
    { name: 'Priya Patel', title: 'Chief Technology Officer (CytosAI)', image: 'bg-slate-600' },
    { name: 'Michael Ross', title: 'General Counsel', image: 'bg-slate-400' },
    { name: 'Jennifer Wu', title: 'VP of Investor Relations', image: 'bg-slate-300' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-platinum pb-6">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Executive Leadership</h1>
        <p className="text-lg text-text-meta max-w-3xl leading-relaxed">
          A balanced team comprising deep scientific expertise and seasoned public market leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((exec) => (
          <div key={exec.name} className="group bg-white border border-platinum rounded-xl overflow-hidden hover:shadow-md transition-all">
             {/* Placeholder Image */}
             <div className={`aspect-square ${exec.image} relative flex items-center justify-center`}>
                <span className="text-white/20 text-6xl font-bold">{exec.name.charAt(0)}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                   <p className="text-white text-xs leading-relaxed">
                     View Biography &rarr;
                   </p>
                </div>
             </div>
             <div className="p-6">
               <h3 className="font-bold text-lg text-graphite">{exec.name}</h3>
               <p className="text-sm text-text-meta text-steel-blue font-medium">{exec.title}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
