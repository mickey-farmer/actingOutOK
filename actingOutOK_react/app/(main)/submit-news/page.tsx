import Link from "next/link";

export default function SubmitNewsPage() {
  return (
    <div className="form-page-main">
      <div className="page-header">
        <h1>Suggest a news story</h1>
        <p>
          Have a tip or story idea for our news blog? Email{" "}
          <a href="mailto:mickey@mickeyonstage.com">mickey@mickeyonstage.com</a>{" "}
          with your suggestion. See our{" "}
          <Link href="/terms#news-story-submissions">Terms of Service</Link> for
          how we handle submissions.
        </p>
      </div>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </div>
  );
}
