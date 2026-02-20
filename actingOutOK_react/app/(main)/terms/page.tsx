import Link from "next/link";

export default function TermsPage() {
  return (
    <article className="prose">
      <h1>Terms of Service</h1>
      <p>
        <strong>Last updated:</strong> February 20, 2026
      </p>
      <p>
        Welcome to Acting Out OK. By using this website, submitting content, or
        requesting to be listed, you agree to these Terms of Service
        (&quot;Terms&quot;). If you do not agree, do not use the site or submit
        any information.
      </p>

      <h2>1. Nature of the Service</h2>
      <p>
        Acting Out OK is an informational listing site for the Oklahoma acting
        and film community. We provide casting calls, resources (classes,
        agencies, theaters, photographers, etc.), and news. All content is
        provided for information only. We do not employ, represent, endorse, or
        produce any project, employer, resource, or person listed. We do not
        verify the accuracy, legality, or quality of any listing or third-party
        content. Your use of any listing or opportunity is at your own risk.
      </p>

      <h2 id="directory-listings">3. Directory Listings</h2>
      <p>
        The Directory on Acting Out OK lists specific people (e.g., crew,
        specialists, intimacy coordinators) by name and specialty. We reserve
        the right to exclude from the Directory, or to remove any listing at any
        time without notice, any individual who we determine does not meet the
        values of Acting Out OK, or for any other reason at our sole
        discretion. We are not obligated to state a reason for removal.
      </p>

      <h2 id="news-story-submissions">6. News Story Submissions</h2>
      <p>
        You may suggest a news story via the site. We review at our discretion
        and have full editorial control.
      </p>

      <h2>14. Contact</h2>
      <p>
        For questions about these Terms or to request removal of a listing,
        contact us at{" "}
        <a href="mailto:mickey@mickeyonstage.com">mickey@mickeyonstage.com</a>.
      </p>

      <p>
        <Link href="/">Back to home</Link> · <Link href="/about">About</Link> ·{" "}
        <Link href="/privacy">Privacy</Link>
      </p>
    </article>
  );
}
