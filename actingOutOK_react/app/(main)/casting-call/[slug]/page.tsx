"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";

type CastingCallDetail = {
  slug: string;
  title: string;
  date?: string;
  auditionDeadline?: string;
  location?: string;
  director?: string;
  filmingDates?: string;
  description?: string;
  submissionDetails?: string;
  sourceLink?: string;
  exclusive?: boolean;
  under18?: boolean;
  roles?: Array<{
    roleTitle?: string;
    description?: string;
    ageRange?: string;
    gender?: string;
    pay?: string;
    type?: string;
    union?: string;
  }>;
};

function rowToDetail(row: Record<string, unknown>): CastingCallDetail {
  return {
    slug: row.slug as string,
    title: row.title as string,
    date: row.date as string | undefined,
    auditionDeadline: row.audition_deadline as string | undefined,
    location: row.location as string | undefined,
    director: row.director as string | undefined,
    filmingDates: row.filming_dates as string | undefined,
    description: row.description as string | undefined,
    submissionDetails: row.submission_details as string | undefined,
    sourceLink: row.source_link as string | undefined,
    exclusive: (row.exclusive as boolean) ?? false,
    under18: (row.under18 as boolean) ?? false,
    roles: (row.roles as CastingCallDetail["roles"]) ?? [],
  };
}

function formatDate(iso: string | undefined) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CastingCallPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [entry, setEntry] = useState<CastingCallDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) {
      setEntry(null);
      setLoading(false);
      return;
    }
    const q = supabase
      .from("casting_calls")
      .select("*")
      .eq("slug", slug)
      .single();
    void Promise.resolve(q)
      .then(({ data, error }) => {
        if (error || !data) {
          setEntry(null);
          return;
        }
        setEntry(rowToDetail(data as Record<string, unknown>));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading…</p>;
  if (!entry) {
    return (
      <div className="page-header">
        <h1>Casting Call</h1>
        <p>Not found.</p>
        <Link href="/casting-calls">Back to Casting Calls</Link>
      </div>
    );
  }

  return (
    <article className="prose">
      <div className="page-header">
        <h1>{entry.title}</h1>
        {entry.auditionDeadline && (
          <p className="casting-deadline">
            <strong>Audition by:</strong>{" "}
            {formatDate(entry.auditionDeadline)}
          </p>
        )}
        {entry.date && (
          <p>
            <time dateTime={entry.date}>Posted {formatDate(entry.date)}</time>
          </p>
        )}
        {entry.location && <p>📍 {entry.location}</p>}
        {entry.filmingDates && (
          <p>
            <strong>Filming:</strong> {entry.filmingDates}
          </p>
        )}
      </div>
      {entry.description && (
        <div
          className="casting-description"
          dangerouslySetInnerHTML={{ __html: entry.description }}
        />
      )}
      {entry.roles && entry.roles.length > 0 && (
        <section aria-label="Roles">
          <h2>Roles</h2>
          <ul>
            {entry.roles.map((role, i) => (
              <li key={i}>
                <strong>{role.roleTitle}</strong>
                {role.ageRange && ` (${role.ageRange})`}
                {role.description && (
                  <p className="casting-role-desc">{role.description}</p>
                )}
                {role.pay && <span>Pay: {role.pay}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
      {entry.submissionDetails && (
        <section>
          <h2>Submission details</h2>
          <div
            dangerouslySetInnerHTML={{ __html: entry.submissionDetails }}
          />
        </section>
      )}
      {entry.sourceLink && (
        <p>
          <a
            href={entry.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            Source / Apply ↗
          </a>
        </p>
      )}
      <p>
        <Link href="/casting-calls">← Back to Casting Calls</Link>
      </p>
    </article>
  );
}
