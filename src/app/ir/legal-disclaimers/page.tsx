export const metadata = {
  title: 'Legal Disclaimers | LSI CytosAI',
  description: 'Forward-looking statements and terms of use.',
};

export default function LegalPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-platinum pb-6">
        <h1 className="text-3xl font-semibold text-graphite mb-3">Legal Disclaimers</h1>
        <p className="text-lg text-text-meta max-w-3xl leading-relaxed">
          Important information regarding forward-looking statements and site usage.
        </p>
      </div>

      <div className="prose prose-sm prose-slate max-w-none text-text-meta">
        <h3 className="text-graphite font-bold">Forward-Looking Statements</h3>
        <p>
          This website contains forward-looking statements within the meaning of the Private Securities Litigation Reform Act of 1995. All statements contained in this website that do not relate to matters of historical fact should be considered forward-looking statements, including, without limitation, statements regarding our product candidates, including Cytos-V and LSI-Matrix; the timing and results of our clinical trials and preclinical studies; the sufficiency of our cash and cash equivalents; and our future financial position or results of operations.
        </p>
        <p>
          These statements are neither promises nor guarantees, but involve known and unknown risks, uncertainties and other important factors that may cause our actual results, performance or achievements to be materially different from any future results, performance or achievements expressed or implied by the forward-looking statements, including, but not limited to, the following: our history of operating losses; our need for additional funding; our limited operating history; the lengthy and expensive process of clinical drug development; and the unpredictability of our future revenue.
        </p>

        <h3 className="text-graphite font-bold mt-8">No Offer to Sell</h3>
        <p>
          The information contained on this website does not constitute an offer to sell or the solicitation of an offer to buy any securities of LSI | CytosAI Inc. No reliance may be placed for any purpose whatsoever on the information contained in this website or on its completeness, accuracy or fairness.
        </p>
        
        <h3 className="text-graphite font-bold mt-8">Copyright & Trademark</h3>
        <p>
          © 2026 LSI | CytosAI Inc. All rights reserved. "LSI", "CytosAI", and the LSI logo are trademarks of LSI | CytosAI Inc. All other trademarks are the property of their respective owners.
        </p>
      </div>
    </div>
  );
}
