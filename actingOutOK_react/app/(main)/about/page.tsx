import Link from "next/link";

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About Acting Out OK</h1>
      <p>
        I started this site because when I was first getting into acting in
        Oklahoma, I wished there was one place to find casting calls, figure out
        what gear or classes I needed, and see what was actually going on in the
        local film community. There wasn&apos;t—so I built it.
      </p>
      <p>
        My own journey started with community theatre and a few small film
        projects. I had no idea where to look for auditions, who to take classes
        from, or how to set up a basic voice over space. I spent a lot of time
        piecing things together from Facebook groups, random websites, and word
        of mouth. Acting Out OK is my attempt to put that in one spot for the
        next person.
      </p>
      <p>
        This site is for anyone who&apos;s new to acting in Oklahoma—whether
        you&apos;re in Oklahoma City, Tulsa, Norman, or somewhere else in the
        state. You&apos;ll find casting calls (sourced from around the web and
        some exclusives), resources like classes and coaches, a vendors section
        to support people who help new talent, and news about what&apos;s
        happening in the Oklahoma film scene.
      </p>
      <p>
        I&apos;m not a casting director or an agent—just someone who&apos;s been
        in your shoes and wanted to make the path a little clearer. If you have
        suggestions or want to share something that helped you, I&apos;d love to
        hear from you.
      </p>
      <p>
        <Link href="/">Back to home</Link> · <Link href="/casting-calls">Casting Calls</Link> ·{" "}
        <Link href="/resources">Resources</Link> · <Link href="/directory">Directory</Link> ·{" "}
        <a
          href="https://news.actingoutok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          News
        </a>
      </p>
    </article>
  );
}
