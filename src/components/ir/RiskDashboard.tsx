'use client';

import { motion } from 'framer-motion';

export default function RiskDashboard() {
  const risks = [
    {
      category: 'Clinical & Regulatory',
      title: 'Cytos-V Phase III Setbacks',
      desc: 'Potential delays in FDA filing if proteomic markers show variance in broader population sets.',
      impact: 'High',
      mitigation: 'Aggressive data-redundancy modeling via internal CytosAI clusters.'
    },
    {
      category: 'Intellectual Property',
      title: 'Heptagram Protocol Challenge',
      desc: 'Third-party claim against the localized matrix patent in European jurisdictions.',
      impact: 'Medium',
      mitigation: 'Cross-licensing negotiation underway with LSI Therapeutics legal team.'
    },
    {
      category: 'Operational',
      title: 'GPU Compute Supply Chain',
      desc: 'Limited availability of H100 clusters may throttle model training velocity by 15%.',
      impact: 'Low',
      mitigation: 'Transitioning to proprietary LSI-Logic specialized ASICs by Q4.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="border-b border-platinum pb-6 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-semibold text-graphite mb-2">Internal Risk Assessment</h1>
           <p className="text-text-meta">Detailed supplemental Item 1A disclosures for Institutional Partners.</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] font-bold text-muted-amber uppercase tracking-widest bg-muted-amber/10 px-2 py-1 rounded border border-muted-amber/20">CONFIDENTIAL_DATA_ROOM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {risks.map((risk, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={risk.title}
            className="bg-white border border-platinum rounded-xl p-8 shadow-sm hover:border-muted-amber/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
               <div>
                  <span className="text-[10px] font-bold text-text-meta uppercase tracking-widest">{risk.category}</span>
                  <h3 className="text-xl font-bold text-graphite mt-1">{risk.title}</h3>
               </div>
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                 risk.impact === 'High' ? 'bg-red-500 text-white' : 
                 risk.impact === 'Medium' ? 'bg-muted-amber text-white' : 
                 'bg-steel-blue text-white'
               }`}>
                 Impact: {risk.impact}
               </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
               <div>
                  <h4 className="text-xs font-bold text-graphite uppercase mb-2">Exposure Description</h4>
                  <p className="text-sm text-text-meta leading-relaxed">{risk.desc}</p>
               </div>
               <div className="bg-off-white p-4 rounded-lg border border-platinum">
                  <h4 className="text-xs font-bold text-graphite uppercase mb-2">Mitigation Strategy</h4>
                  <p className="text-sm text-text-body italic">{risk.mitigation}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-graphite rounded-xl p-8 text-white">
         <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
               <h3 className="font-bold">Legal Disclaimer for Institutional Access</h3>
               <p className="text-xs text-gray-400">By viewing this page, you reaffirm your commitment to the Master Confidentiality Agreement signed during onboarding.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
