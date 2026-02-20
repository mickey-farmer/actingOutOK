import Link from "next/link";

export default function ReportIssuePage() {
  return (
    <div className="form-page-main">
      <div className="page-header">
        <h1>Report an issue or suggest something</h1>
        <p>
          Found an error, want to suggest a resource or directory entry, or
          have feedback? Get in touch.
        </p>
      </div>
      <p>
        Email us at{" "}
        <a href="mailto:mickey@mickeyonstage.com">mickey@mickeyonstage.com</a>{" "}
        with the subject line &quot;Acting Out OK&quot; and a brief description.
      </p>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </div>
  );
}
