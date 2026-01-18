export const metadata = {
  title: 'Intellectual Property | LSI Legal',
};

export default function IPPage() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-graphite prose-p:text-text-body">
      <h1>Intellectual Property</h1>
      <p className="lead">
        Our competitive moat is built on a fortress of defensive patents covering both physical matter and digital methodology.
      </p>

      <hr />

      <h3>1. Patent Portfolio</h3>
      <div className="not-prose bg-off-white border border-platinum rounded-xl overflow-hidden my-8">
        <table className="w-full text-sm text-left">
          <thead className="bg-platinum text-text-meta font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Patent ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-platinum">
            <tr>
              <td className="px-6 py-4 font-mono">US-9,412,881</td>
              <td className="px-6 py-4">LSI-Matrix: Variable-Stiffness Hydrogel Composition</td>
              <td className="px-6 py-4 text-evergreen font-bold">GRANTED</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono">US-10,224,109</td>
              <td className="px-6 py-4">Cytos-V: Generative Folding via Transformer Attention</td>
              <td className="px-6 py-4 text-evergreen font-bold">GRANTED</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono">PCT/IB2025/044</td>
              <td className="px-6 py-4">Heptagram Protocol: Seven-Node Distributed Consensus for Bio-Data</td>
              <td className="px-6 py-4 text-steel-blue font-bold">PENDING</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2. Licensing Model</h3>
      <p>
        LSI operates on a "Hub-and-Spoke" licensing model.
      </p>
      <ul>
        <li><strong>Commercial License:</strong> Partners pay a flat fee + royalties for the right to manufacture the LSI-Matrix™.</li>
        <li><strong>Research License:</strong> Academic institutions are granted access to Cytos-V at cost, provided all generated training data feeds back into the central model (The "Data Flywheel" clause).</li>
      </ul>

      <h3>3. Brand Trademarks</h3>
      <p>
        "Living Systems Intelligence", "CytosAI", the "Dual-Core" icon, and the "Heptagram" logo are registered trademarks of LSI | CytosAI Inc.
      </p>
    </article>
  );
}
