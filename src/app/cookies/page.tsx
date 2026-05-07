import LegalLayout from '@/components/LegalLayout';

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="7 May 2026">
      <p>
        TaskBloom uses cookies and similar tracking technologies to enhance your experience, analyse platform usage, and support our security and fraud detection systems. This policy explains what cookies are, how we use them, and how you can control them.
      </p>

      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device by your web browser when you visit a website. They help the website remember your preferences, login status, and other information to improve your experience. Cookies can be &ldquo;persistent&rdquo; (remaining on your device) or &ldquo;session&rdquo; (deleted when you close your browser).
      </p>

      <h2>2. Essential Cookies</h2>
      <p>
        These cookies are necessary for the platform to function properly. They enable core features such as authentication, session management, and security protections.
      </p>
      <ul>
        <li><strong>Session cookie:</strong> Maintains your logged-in session across page loads</li>
        <li><strong>CSRF token:</strong> Protects against cross-site request forgery attacks</li>
        <li><strong>Security cookies:</strong> Help detect and prevent fraudulent access attempts</li>
      </ul>

      <h2>3. Analytics Cookies</h2>
      <p>
        We use analytics cookies to understand how users interact with the platform, which pages are most frequently visited, and how we can improve the user experience. This data is anonymised and aggregated.
      </p>
      <ul>
        <li>Page visit frequency and duration</li>
        <li>Feature usage patterns</li>
        <li>Navigation paths and drop-off points</li>
        <li>Device and browser information</li>
      </ul>

      <h2>4. Performance Cookies</h2>
      <p>
        Performance cookies help us monitor and optimise platform performance by tracking error rates, load times, and server responsiveness.
      </p>

      <h2>5. Fraud Prevention Cookies</h2>
      <p>
        TaskBloom uses cookies and browser fingerprinting techniques as part of our fraud detection system. These help us verify that interactions on our platform come from genuine human users and not automated scripts or bots.
      </p>
      <p>
        This data is used exclusively for security purposes and is not shared with third parties for advertising or marketing.
      </p>

      <h2>6. Third-Party Cookies</h2>
      <p>
        We utilise limited third-party services that may place cookies on your device:
      </p>
      <ul>
        <li><strong>Cloudflare:</strong> Security and performance optimisation</li>
        <li><strong>Payment processors:</strong> Secure transaction handling</li>
        <li><strong>Analytics providers:</strong> Anonymised usage analysis</li>
      </ul>
      <p>
        These third parties have their own cookie policies governing the data they collect.
      </p>

      <h2>7. Managing Cookies</h2>
      <p>
        You can control and manage cookies in your browser settings. Most browsers allow you to:
      </p>
      <ul>
        <li>View all cookies stored on your device</li>
        <li>Delete individual or all cookies</li>
        <li>Block cookies from specific websites</li>
        <li>Block third-party cookies</li>
        <li>Set preferences for cookie notifications</li>
      </ul>
      <p>
        Please note that disabling essential cookies may affect the functionality of the TaskBloom platform and may prevent you from accessing certain features.
      </p>

      <h2>8. Cookie Retention</h2>
      <p>
        Except where noted, session cookies expire when you close your browser. Persistent cookies have varying lifespans based on their purpose, typically ranging from 24 hours to 12 months.
      </p>

      <h2>9. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy to reflect changes in technology, legislation, or our data practices. We encourage you to review this page periodically.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions about our use of cookies, please contact us at privacy@taskbloom.co.uk.
      </p>

      <p className="mt-10 text-sm text-[#64748b] border-t border-[#1e1e2e] pt-6">
        This Cookie Policy was last updated on 7 May 2026.
      </p>
    </LegalLayout>
  );
}
