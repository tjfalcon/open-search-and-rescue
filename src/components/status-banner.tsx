"use client";

import { useEffect, useState } from "react";

import type { IncidentStatusDocument } from "@/lib/status";

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function StatusBanner() {
  const [data, setData] = useState<IncidentStatusDocument | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/status", { cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Status request failed: ${response.status}`);
        return response.json() as Promise<IncidentStatusDocument>;
      })
      .then(setData)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(true);
      });

    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <section className="card" role="alert">
        <span className="badge stopped">STATUS UNAVAILABLE</span>
        <h2>Do not rely on this page.</h2>
        <p>Contact the local agency of jurisdiction for current information.</p>
      </section>
    );
  }

  if (!data) {
    return <section className="card skeleton" aria-label="Loading incident status" />;
  }

  return (
    <section className="card status-card" aria-labelledby="incident-title">
      <div className="status-heading">
        <div>
          <p className="eyebrow">Incident status</p>
          <h2 id="incident-title">{data.incidentName}</h2>
        </div>
        <span className="badge demo">DEMO · {data.incidentStatus.toUpperCase()}</span>
      </div>

      <dl className="facts">
        <div>
          <dt>Last verified</dt>
          <dd>{formatTimestamp(data.updatedAt)}</dd>
        </div>
        <div>
          <dt>Coordinating organization</dt>
          <dd>{data.leadOrganization}</dd>
        </div>
        <div>
          <dt>Volunteer action</dt>
          <dd><strong>Closed</strong> — {data.volunteerGuidance.message}</dd>
        </div>
      </dl>

      <div className="summary">
        <h3>Current brief</h3>
        <p>{data.summary}</p>
      </div>

      <div className="updates">
        <h3>Verified update log</h3>
        {data.verifiedUpdates.map((update) => (
          <article key={update.id}>
            <time dateTime={update.publishedAt}>{formatTimestamp(update.publishedAt)}</time>
            <h4>{update.title}</h4>
            <p>{update.body}</p>
          </article>
        ))}
      </div>

      <div className="safety">
        <h3>Safety baseline</h3>
        <ul>
          {data.safetyNotes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </div>
    </section>
  );
}
