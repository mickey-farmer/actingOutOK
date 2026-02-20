import Link from "next/link";

export default function PrivacyPage() {
  return (
    <article className="prose">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last updated:</strong> February 15, 2026
      </p>
      <p>
        Acting Out OK (&quot;we,&quot; &quot;our,&quot; or &quot;the site&quot;)
        is committed to protecting your privacy. This policy describes what
        information we collect, how we use it, and your choices.
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect:</p>
      <ul>
        <li>
          <strong>Usage data</strong> such as pages visited, time on site, and
          referring URLs, which may be collected by our hosting or analytics
          provider.
        </li>
        <li>
          <strong>Cookies or similar technologies</strong> if we use analytics
          or third-party tools; we will describe those below if applicable.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Improve the site and understand how visitors use it.</li>
        <li>Comply with legal obligations where required.</li>
      </ul>

      <h2>Casting Listings &amp; Third-Party Content</h2>
      <p>
        Casting calls, resources, and other listings on this site are provided
        for information only. Acting Out OK does not employ, represent,
        endorse, or produce any listed project or employer. We do not verify
        compliance with labor laws (including child labor laws) or the accuracy
        of listing details. Your use of any listing or opportunity is at your
        own risk.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services (e.g., analytics or hosting). Those
        services have their own privacy policies governing how they collect and
        use data. We encourage you to review their policies.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain usage and other data only as long as needed to operate the
        site or as required by law.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        data. To do so, contact us using the method provided on the site.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. The &quot;Last
        updated&quot; date at the top will reflect the most recent change.
        Continued use of the site after changes constitutes acceptance of the
        updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this privacy policy or your data, please
        contact us at{" "}
        <a href="mailto:mickey@mickeyonstage.com">mickey@mickeyonstage.com</a>.
      </p>

      <p>
        <Link href="/">Back to home</Link> · <Link href="/about">About</Link>
      </p>
    </article>
  );
}
