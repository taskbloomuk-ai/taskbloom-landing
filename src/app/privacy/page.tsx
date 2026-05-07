import LegalLayout from '@/components/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="7 May 2026">
      <div className="legal-content">
      <p className="intro-highlight">
        TaskBloom takes your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us, as well as information generated through your use of the platform.</p>

      <h3>Account Information</h3>
      <ul>
        <li>Full name and email address</li>
        <li>Username and profile information</li>
        <li>Country, timezone, and language preferences</li>
        <li>Account credentials (password hashed and securely stored)</li>
        <li>Payment information (processed securely through our payment partners)</li>
      </ul>

      <h3>Usage Information</h3>
      <ul>
        <li>Task activity, submissions, and approval history</li>
        <li>Campaign creation and management data</li>
        <li>Wallet transactions and payout history</li>
        <li>Communication preferences and notification settings</li>
        <li>Support tickets and correspondence</li>
      </ul>

      <h3>Technical Information</h3>
      <ul>
        <li>IP address and device information</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Device fingerprinting data (for fraud prevention)</li>
        <li>Pages visited and interaction patterns</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>To operate, maintain, and improve the platform</li>
        <li>To process campaign creation, task submissions, and payments</li>
        <li>To detect, prevent, and investigate fraudulent or abusive activity</li>
        <li>To communicate with you about your account, campaigns, and platform updates</li>
        <li>To provide customer support and resolve disputes</li>
        <li>To comply with legal obligations and enforce our Terms of Service</li>
        <li>To analyse platform usage and improve user experience</li>
      </ul>

      <h2>3. Fraud Prevention & Security Monitoring</h2>
      <p>
        As part of our commitment to maintaining a trusted platform, we collect and analyse device fingerprints, IP addresses, behavioural patterns, and submission data to detect and prevent fraudulent activity. This is a legitimate interest of the platform and is necessary to protect all users.
      </p>
      <p>
        This data is used exclusively for security and fraud prevention purposes and is not shared with third parties for marketing or advertising.
      </p>

      <h2>4. Cookies & Tracking</h2>
      <p>
        We use cookies and similar tracking technologies to enhance your experience, analyse platform usage, and support our fraud detection systems. For detailed information, please see our <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>5. How We Share Your Information</h2>
      <p>We do not sell your personal information. We may share your data in the following circumstances:</p>
      <ul>
        <li><strong>Service Providers:</strong> With trusted third-party services that help us operate the platform (payment processing, hosting, analytics, email delivery)</li>
        <li><strong>Legal Compliance:</strong> When required by law, legal process, or governmental request</li>
        <li><strong>Fraud Prevention:</strong> To investigate and prevent fraudulent activity across the platform</li>
        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
      </ul>

      <h2>6. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your information, including:
      </p>
      <ul>
        <li>Encryption of data in transit (TLS/SSL) and at rest</li>
        <li>Secure password hashing using industry-standard algorithms</li>
        <li>Regular security audits and vulnerability assessments</li>
        <li>Access controls and authentication requirements</li>
        <li>Monitoring for unauthorised access attempts</li>
      </ul>

      <h2>7. Data Retention</h2>
      <p>
        We retain your information for as long as your account is active or as needed to provide you with services. After account deletion, we retain certain data for a reasonable period to comply with legal obligations, resolve disputes, and enforce our agreements.
      </p>
      <ul>
        <li>Account data: Retained until account deletion, plus 90 days for recovery purposes</li>
        <li>Financial records: Retained for 6 years as required by UK tax law</li>
        <li>Fraud prevention data: Retained for 3 years for security purposes</li>
      </ul>

      <h2>8. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
      <ul>
        <li>Right to access your personal data</li>
        <li>Right to rectify inaccurate data</li>
        <li>Right to erasure (right to be forgotten)</li>
        <li>Right to restrict processing</li>
        <li>Right to data portability</li>
        <li>Right to object to processing</li>
        <li>Rights related to automated decision-making</li>
      </ul>
      <p>
        For more information about your rights under UK GDPR, please see our <a href="/gdpr">GDPR Compliance page</a>.
      </p>

      <h2>9. Account Deletion</h2>
      <p>
        You may request account deletion at any time by contacting our support team. Upon verification, we will deactivate your account and initiate the data deletion process. Some data may be retained as required by law or for legitimate business purposes.
      </p>

      <h2>10. International Users</h2>
      <p>
        TaskBloom operates globally. Your information may be transferred to and processed in countries outside your country of residence. We ensure appropriate safeguards are in place for international data transfers, including Standard Contractual Clauses where required.
      </p>

      <h2>11. Third-Party Services</h2>
      <p>
        TaskBloom integrates with trusted third-party services for payment processing, analytics, and email communications. These providers have their own privacy policies governing the use of your information. We encourage you to review their policies.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be communicated via email or through a notice on the platform. Your continued use of TaskBloom after changes constitutes acceptance of the updated policy.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:
      </p>
      <ul>
        <li>Email: privacy@taskbloom.co.uk</li>
        <li>Response time: within 48 hours</li>
      </ul>

      <div className="section-divider" />
      <p className="text-sm text-[#64748b]">
        This Privacy Policy was last updated on 7 May 2026.
      </p>
      </div>
    </LegalLayout>
  );
}
