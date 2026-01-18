export const metadata = {
  title: 'Cookie Policy | LSI Legal',
};

export default function CookiePage() {
  return (
    <article className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-graphite prose-p:text-text-body">
      <h1>Cookie Policy</h1>
      <p className="lead">
        We prioritize privacy over tracking. Our cookie footprint is minimal.
      </p>

      <hr />

      <h3>1. Strictly Necessary Cookies</h3>
      <p>
        These are essential for the "Sentinel" authentication system to function. They cannot be disabled.
      </p>
      <ul>
        <li><strong>__Secure-next-auth.session-token:</strong> Maintains your encrypted login session.</li>
        <li><strong>__Secure-next-auth.callback-url:</strong> Ensures you are redirected to the correct page after login.</li>
        <li><strong>__Host-next-auth.csrf-token:</strong> Prevents Cross-Site Request Forgery attacks against your account.</li>
      </ul>

      <h3>2. Performance Cookies</h3>
      <p>
        We use anonymous telemetry to gauge the load time of our 3D assets (Three.js/WebGL). This helps us optimize the "Data Terrain" for lower-bandwidth connections. We do not use advertising pixels or cross-site trackers.
      </p>

      <h3>3. Consent Management</h3>
      <p>
        By using the Investor Portal, you consent to the strictly necessary cookies required for security. You may disable performance cookies via your browser settings, though this may degrade the visual experience of the "Dual-Core" simulation.
      </p>
    </article>
  );
}
