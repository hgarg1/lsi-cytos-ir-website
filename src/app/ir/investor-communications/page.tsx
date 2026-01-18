export const metadata = {
  title: 'Investor Communications | LSI CytosAI',
  description: 'Contact our IR team and manage subscriptions.',
};

export default function CommunicationsPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-platinum pb-6">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Investor Communications</h1>
        <p className="text-lg text-text-meta max-w-3xl leading-relaxed">
          We are committed to responsive and open dialogue with the investment community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <section>
             <h2 className="text-xl font-bold text-graphite mb-4">IR Contacts</h2>
             <div className="bg-white border border-platinum rounded-xl p-6 space-y-6">
               <div>
                 <h4 className="font-bold text-graphite">Jennifer Wu</h4>
                 <p className="text-sm text-steel-blue font-medium mb-1">VP of Investor Relations</p>
                 <a href="mailto:jennifer.wu@lsi-cytos.bio" className="text-sm text-text-meta hover:underline">jennifer.wu@lsi-cytos.bio</a>
               </div>
               <div className="border-t border-platinum pt-4">
                 <h4 className="font-bold text-graphite">General Inquiries</h4>
                 <p className="text-sm text-text-meta mb-1">+1 (617) 555-0199</p>
                 <a href="mailto:ir@lsi-cytos.bio" className="text-sm text-text-meta hover:underline">ir@lsi-cytos.bio</a>
               </div>
             </div>
           </section>

           <section>
             <h2 className="text-xl font-bold text-graphite mb-4">Transfer Agent</h2>
             <div className="bg-off-white p-6 rounded-xl border border-platinum">
               <h4 className="font-bold text-graphite">Computershare</h4>
               <p className="text-sm text-text-meta mt-2">
                 For questions regarding stock certificates, change of address, or ownership transfer.
               </p>
               <div className="mt-4">
                 <a href="#" className="text-xs font-bold text-steel-blue uppercase tracking-wide hover:underline">Visit Portal &rarr;</a>
               </div>
             </div>
           </section>
        </div>

        <div className="bg-white border border-platinum rounded-xl p-8 shadow-sm h-fit">
           <h2 className="text-xl font-bold text-graphite mb-2">Email Alerts</h2>
           <p className="text-sm text-text-meta mb-6">
             Select the updates you wish to receive. You can unsubscribe at any time.
           </p>
           
           <form className="space-y-4">
             <div className="space-y-3">
               <label className="flex items-center gap-3 p-3 border border-platinum rounded cursor-pointer hover:bg-off-white">
                 <input type="checkbox" className="w-4 h-4 text-steel-blue rounded focus:ring-steel-blue" defaultChecked />
                 <span className="text-sm font-medium text-graphite">Press Releases</span>
               </label>
               <label className="flex items-center gap-3 p-3 border border-platinum rounded cursor-pointer hover:bg-off-white">
                 <input type="checkbox" className="w-4 h-4 text-steel-blue rounded focus:ring-steel-blue" defaultChecked />
                 <span className="text-sm font-medium text-graphite">SEC Filings (8-K, 10-Q, 10-K)</span>
               </label>
               <label className="flex items-center gap-3 p-3 border border-platinum rounded cursor-pointer hover:bg-off-white">
                 <input type="checkbox" className="w-4 h-4 text-steel-blue rounded focus:ring-steel-blue" defaultChecked />
                 <span className="text-sm font-medium text-graphite">Events & Presentations</span>
               </label>
             </div>
             
             <div className="pt-4">
               <label className="block text-xs font-bold text-text-meta uppercase mb-1">Email Address</label>
               <input type="email" className="w-full border border-platinum px-3 py-2 rounded focus:border-steel-blue outline-none" placeholder="investor@firm.com" />
             </div>

             <button type="submit" className="w-full bg-graphite text-white font-bold py-3 rounded hover:bg-black transition-colors">
               Subscribe
             </button>
           </form>
        </div>
      </div>
    </div>
  );
}
