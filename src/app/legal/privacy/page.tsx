export const metadata = {
  title: 'Privacy Policy | LSI Legal',
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-graphite prose-p:text-text-body">
      <h1>Privacy Policy</h1>
      <p className="lead">
        At Living Systems Intelligence, we treat data with the same rigor as we treat biological containment. This policy outlines how we handle your digital footprint within our ecosystem.
      </p>

      <hr />

      <h3>1. Data Collection</h3>
      <p>We collect the following categories of information:</p>
      <ul>
        <li><strong>Institutional Identity:</strong> Corporate email, Role, and Firm affiliation provided via SSO.</li>
        <li><strong>Telemetry:</strong> Interaction data with 3D models (e.g., dwell time on the "Dual-Core" visual), captured to optimize our rendering engine.</li>
        <li><strong>Forensic Logs:</strong> Immutable records of document access, mandated by SEC Regulation FD for fair disclosure tracking.</li>
      </ul>

      <h3>2. Biometric & Genetic Data</h3>
      <p>
        While our platform discusses biological technologies, the Investor Portal <strong>does not</strong> collect or process your personal genetic or biometric information.
        <br/>
        <em>Note:</em> The "Biometric Interface" referred to in the user profile section is a stylistic design language, not a literal retina/fingerprint scanner.
      </p>

      <h3>3. Data Usage</h3>
      <p>We use your data strictly for:</p>
      <ul>
        <li><strong>Access Control:</strong> Verifying your eligibility to view "Restricted" financial models.</li>
        <li><strong>Compliance:</strong> Generating audit reports for internal governance reviews.</li>
        <li><strong>Security:</strong> Detecting "brute-force" attacks against our API credentials system.</li>
      </ul>

      <h3>4. Data Sovereignty</h3>
      <p>
        Your data is stored in <strong>Google Cloud Platform (GCP)</strong> regions designated as Tier-1 secure zones (US-EAST1). We utilize localized sharding to ensure compliance with GDPR (for EU investors) and CCPA (for California residents).
      </p>

      <h3>5. Third-Party Sharing</h3>
      <p>
        We do not sell data. We share access logs only with:
      </p>
      <ul>
        <li><strong>Regulators:</strong> SEC, FINRA, or EMA upon lawful request.</li>
        <li><strong>Transfer Agent:</strong> Computershare (for stock ownership verification).</li>
      </ul>
    </article>
  );
}
