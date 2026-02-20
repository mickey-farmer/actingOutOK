import Link from "next/link";

export default function SubmitCastingPage() {
  return (
    <div className="form-page-main">
      <div className="page-header">
        <h1>Submit a casting call</h1>
        <p>
          To have your casting call listed on Acting Out OK, send the details
          (title, roles, deadline, location, pay, submission instructions) to{" "}
          <a href="mailto:mickey@mickeyonstage.com">mickey@mickeyonstage.com</a>
          .
        </p>
      </div>
      <p>
        <Link href="/casting-calls">Back to Casting Calls</Link>
      </p>
    </div>
  );
}
