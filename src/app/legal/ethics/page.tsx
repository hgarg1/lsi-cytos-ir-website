export const metadata = {
  title: 'AI Ethics Charter | LSI Legal',
};

export default function EthicsPage() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-graphite prose-p:text-text-body">
      <h1>AI Ethics Charter</h1>
      <p className="lead">
        The power to rewrite biological code demands absolute moral clarity. CytosAI operates under a strict "Constitution of Computation."
      </p>

      <hr />

      <h3>1. The "Human-in-the-Loop" Mandate</h3>
      <p>
        No generative protein structure designed by CytosAI is permitted to enter wet-lab synthesis without explicit review and cryptographic signing by a Level-4 Principal Investigator.
        <br/>
        This "Air-Gap" protocol ensures that hallucinatory or potentially hazardous molecular folding patterns are intercepted before physical manifestation.
      </p>

      <h3>2. Algorithmic Transparency</h3>
      <p>
        We reject "Black Box" biology.
      </p>
      <ul>
        <li><strong>Traceability:</strong> Every prediction made by Cytos-V includes a "Confidence Vector" and a citation map linking back to the 500PB training set.</li>
        <li><strong>Explainability:</strong> We prioritize model architectures (e.g., Attention Viz) that allow researchers to visualize <em>why</em> a specific ligand binding was suggested.</li>
      </ul>

      <h3>3. Non-Proliferation</h3>
      <p>
        CytosAI technology is licensed exclusively for therapeutic and restorative applications (Oncology, Tissue Regeneration).
        <br/>
        <strong>Zero Tolerance:</strong> We strictly prohibit the use of our models for gain-of-function viral research or weaponized biological agent design. Any breach of this clause results in immediate API termination and referral to international authorities.
      </p>

      <h3>4. Bias Mitigation in Proteomics</h3>
      <p>
        Biological datasets have historically over-indexed on specific populations. We actively counter-weight our training data to ensure LSI-Matrix™ efficacy across diverse genetic profiles, mitigating the risk of "Algorithmic Health Disparities."
      </p>
    </article>
  );
}
