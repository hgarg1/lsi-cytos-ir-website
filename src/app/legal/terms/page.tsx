export const metadata = {
  title: 'Terms of Service | LSI Legal',
};

export default function TermsPage() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-graphite prose-p:text-text-body prose-a:text-steel-blue">
      <h1>Terms of Service</h1>
      <p className="lead">
        These Terms of Service ("Terms") govern your access to and use of the Living Systems Intelligence | CytosAI platform, including the Investor Relations portal, the "Cytos-V" simulation viewer, and the "Sentinel" authentication gateway.
      </p>

      <hr />

      <h3>1. Acceptance of Terms</h3>
      <p>
        By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you are accessing these Services on behalf of an institution (e.g., Venture Capital firm, Research Institute), you represent that you have the authority to bind that entity.
      </p>

      <h3>2. Nature of "In-Silico" Data</h3>
      <p>
        The platform may present data derived from our proprietary <strong>CytosAI Generative Protein Models</strong>. You acknowledge that:
      </p>
      <ul>
        <li><strong>Predictive Nature:</strong> "In-silico" trial results are probabilistic simulations based on our 500PB proteomic training set. They do not constitute FDA-cleared clinical evidence unless explicitly marked as "Phase III Verified".</li>
        <li><strong>No Medical Advice:</strong> The visualizations of LSI-Matrix™ interactions are for informational purposes only and should not be used for diagnostic decisions.</li>
      </ul>

      <h3>3. Institutional Access & Sentinel Security</h3>
      <p>
        Access to the "Financial Information" and "Risk Factors" sections is restricted to verified institutional partners via our <strong>Sentinel Identity Provider</strong>.
      </p>
      <ul>
        <li>You agree not to share your "Bio-Metric" or SSO credentials.</li>
        <li>You acknowledge that all actions within the Data Room are logged by our <strong>Forensic Audit Engine</strong>, including IP address, access duration, and document downloads.</li>
        <li>We reserve the right to revoke API keys or User sessions immediately upon detection of anomalous traffic patterns (e.g., bulk scraping).</li>
      </ul>

      <h3>4. Intellectual Property Rights</h3>
      <p>
        The underlying technology, including the <strong>LSI-Matrix™</strong> (hydrogel composition) and the <strong>CytosAI Transformer Architecture</strong>, is protected by international patent laws.
        <br/><br/>
        You are granted a limited, non-exclusive, non-transferable license to view and download reports for the sole purpose of investment evaluation. You may not reverse engineer the 3D visualizations or attempt to extract the underlying data mesh.
      </p>

      <h3>5. Forward-Looking Statements</h3>
      <p>
        This portal contains forward-looking statements regarding the commercialization timeline of the "Dual-Core" business model. Actual results may differ materially due to regulatory headwinds, GPU compute supply chain shortages, or failure of the "Heptagram Protocol" in clinical settings.
      </p>

      <h3>6. Limitation of Liability</h3>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, LIVING SYSTEMS INTELLIGENCE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
      </p>
    </article>
  );
}
