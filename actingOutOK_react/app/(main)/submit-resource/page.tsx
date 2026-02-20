import Link from "next/link";

export default function SubmitResourcePage() {
  return (
    <div className="form-page-main">
      <div className="page-header">
        <h1>Suggest a resource</h1>
        <p>
          To suggest a resource (class, agency, photographer, etc.) or directory
          entry, email the details to{" "}
          <a href="mailto:mickey@mickeyonstage.com">mickey@mickeyonstage.com</a>.
          Directory entries require the person&apos;s consent to be listed. See
          our <Link href="/terms#directory-listings">Terms of Service</Link>.
        </p>
      </div>
      <p>
        <Link href="/resources">Back to Resources</Link>
      </p>
    </div>
  );
}
