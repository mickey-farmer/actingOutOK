"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";

type DirectoryEntry = {
  id: string;
  name: string;
  pronouns?: string;
  description?: string;
  location?: string;
  link?: string;
  contactLink?: string;
  contactLabel?: string;
  pills?: string[];
  photoUrl?: string | null;
};

type DirectoryData = Record<string, DirectoryEntry[]>;

function mapCastRow(row: Record<string, unknown>): DirectoryEntry {
  return {
    id: row.id as string,
    name: row.name as string,
    pronouns: (row.pronouns as string) ?? undefined,
    description: (row.description as string) ?? undefined,
    location: (row.location as string) ?? undefined,
    link: (row.link as string) ?? undefined,
    contactLink: (row.contact_link as string) ?? undefined,
    contactLabel: (row.contact_label as string) ?? undefined,
    pills: Array.isArray(row.pills) ? (row.pills as string[]) : undefined,
    photoUrl: (row.photo_url as string | null) ?? null,
  };
}

export default function CastDirectoryPage() {
  const [data, setData] = useState<DirectoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [unionFilter, setUnionFilter] = useState("");

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setData({ Talent: [] });
      setLoading(false);
      return;
    }
    const q = supabase.from("cast").select("*").order("name");
    void Promise.resolve(q)
      .then(({ data: rows, error }) => {
        if (error) {
          setData({ Talent: [] });
          return;
        }
        setData({
          Talent: (rows ?? []).map((r) => mapCastRow(r as Record<string, unknown>)),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  const talent = data?.Talent ?? [];
  const unionOptions = Array.from(
    new Set(talent.flatMap((e) => e.pills ?? []))
  ).sort((a, b) => a.localeCompare(b));

  const castList = talent
    .filter((entry) => {
      const q = search.trim().toLowerCase();
      if (q) {
        const name = (entry.name || "").toLowerCase();
        const desc = (entry.description || "").toLowerCase();
        if (!name.includes(q) && !desc.includes(q)) return false;
      }
      if (unionFilter) {
        const pills = entry.pills ?? [];
        if (!pills.includes(unionFilter)) return false;
      }
      return true;
    })
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  return (
    <div className="resources-page">
      <div className="resources-content">
        <div className="page-header">
          <h1>Cast directory</h1>
          <p>
            Actors in Oklahoma. Alphabetical list.
          </p>
          <p className="resources-submit-cta">
            To suggest someone for the directory,{" "}
            <Link href="/report-issue">let us know</Link>.
          </p>
        </div>

        <details className="filters-details">
          <summary className="filters-summary">Filters</summary>
          <div className="filters-bar">
            <div className="filter-group">
              <label htmlFor="cast-search">Search by name or description</label>
              <input
                type="search"
                id="cast-search"
                placeholder="Name or description…"
                aria-label="Search cast by name or description"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="cast-union">Union status</label>
              <select
                id="cast-union"
                aria-label="Filter by union status"
                value={unionFilter}
                onChange={(e) => setUnionFilter(e.target.value)}
              >
                <option value="">All</option>
                {unionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="filter-reset"
              onClick={() => {
                setSearch("");
                setUnionFilter("");
              }}
            >
              Reset
            </button>
          </div>
        </details>

        <section className="resources-section" aria-label="Cast">
          <div className="resource-grid" id="cast-container">
            {castList.map((entry) => (
              <article
                key={entry.id}
                className="resource-card directory-card"
                data-id={entry.id}
              >
                <div className="directory-card-body">
                  <div className="directory-card-content">
                    <h3>{entry.name}</h3>
                    {entry.pronouns && (
                      <p className="directory-pronouns">{entry.pronouns}</p>
                    )}
                    {entry.pills?.length ? (
                      <div className="resource-pills">
                        {entry.pills.map((p) => (
                          <span key={p} className="resource-pill">
                            {p}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {entry.location && (
                      <p className="resource-desc">
                        <strong>Location: {entry.location}</strong>
                      </p>
                    )}
                    {entry.description && (
                      <p className="resource-desc">{entry.description}</p>
                    )}
                    <div className="directory-links">
                      <Link
                        href={`/directory/cast/${entry.id}`}
                        className="directory-view-profile-btn"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                  <div className="directory-card-thumb-wrap">
                    {entry.photoUrl ? (
                      <img
                        src={entry.photoUrl}
                        alt=""
                        className="directory-card-thumb"
                      />
                    ) : (
                      <div className="directory-card-thumb directory-card-thumb-placeholder" aria-hidden>
                        <span className="directory-card-thumb-initials">
                          {entry.name
                            .trim()
                            .split(/\s+/)
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {castList.length === 0 && (
          <p className="no-results">
            {search.trim()
              ? "No cast members match your search."
              : "No cast members in the directory yet."}
          </p>
        )}
      </div>
    </div>
  );
}
