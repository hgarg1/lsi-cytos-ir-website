export const metadata = {
  title: 'ESG & Ethics | LSI CytosAI',
  description: 'Our commitment to ethical AI and clinical safety.',
};

export default function EthicsPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-platinum pb-6">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Ethics & Responsibility</h1>
        <p className="text-lg text-text-meta max-w-3xl leading-relaxed">
          We believe that the power of Computational Biology demands an equally powerful ethical framework. Our ESG strategy is integrated directly into our product lifecycle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Pillars */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-platinum rounded-xl p-8">
             <h2 className="text-xl font-bold text-graphite mb-4">Ethical AI Charter</h2>
             <p className="text-text-body mb-4">
               CytosAI adheres to a strict "Human-in-the-Loop" validation protocol for all generative protein models. We do not license our tech for non-therapeutic biological modifications.
             </p>
             <div className="flex gap-4">
               <span className="bg-off-white text-xs font-bold px-3 py-1 rounded text-text-meta border border-platinum">Algorithmic Transparency</span>
               <span className="bg-off-white text-xs font-bold px-3 py-1 rounded text-text-meta border border-platinum">Bias Mitigation</span>
             </div>
          </section>

          <section className="bg-white border border-platinum rounded-xl p-8">
             <h2 className="text-xl font-bold text-graphite mb-4">Clinical Safety</h2>
             <p className="text-text-body mb-4">
               LSI Therapeutics maintains a zero-compromise approach to patient safety, exceeding FDA Phase III monitoring requirements by 40% in data granularity.
             </p>
          </section>
        </div>

        {/* ESG Stats */}
        <div className="space-y-6">
           <div className="bg-evergreen/5 border border-evergreen/20 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-evergreen uppercase tracking-wide mb-2">Sustainability</h3>
              <div className="text-3xl font-bold text-graphite mb-1">Carbon Neutral</div>
              <p className="text-xs text-text-meta">Operations certified by 2025.</p>
           </div>
           
           <div className="bg-steel-blue/5 border border-steel-blue/20 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-steel-blue uppercase tracking-wide mb-2">Governance</h3>
              <div className="text-3xl font-bold text-graphite mb-1">45%</div>
              <p className="text-xs text-text-meta">Board Diversity (Gender & Ethnicity).</p>
           </div>
        </div>

      </div>
    </div>
  );
}
