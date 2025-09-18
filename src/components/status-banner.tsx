"use client";
import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type StatusData = any;

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  for (const [unit, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return rtf.format(-value, unit);
  }
  return "just now";
}

function copy(text: string) {
  try { navigator.clipboard.writeText(text); } catch {}
}

export default function StatusBanner() {
  const [data, setData] = useState<StatusData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/status-data.json", { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(setData)
      .catch((e) => setError(e.message || "Unknown error"));
  }, []);

  if (error) {
    return (
      <div className="card">
        <div className="badge stop">Status Error</div>
        <p>Unable to load status from <code>/data/status-data.json</code>.</p>
        <ul className="list-disc pl-6">
          <li>File exists at <code>public/data/status-data.json</code></li>
          <li>JSON is valid (no trailing commas)</li>
        </ul>
        <p className="mt-3"><a href="/data/status-data.json" target="_blank" className="btn">Open the JSON</a></p>
      </div>
    );
  }
  if (!data) return (<div className="card"><small className="muted">Loading status…</small></div>);

  const active = !!data["is-active"];
  const helpState = (data["volunteer-guidance"]?.state ?? "standby") as string;
  // Use the app's build time as the last updated time
  const buildTime = typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_BUILD_TIME
    ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME)
    : new Date();
  const google = data["map-links"]?.google;
  const apple  = data["map-links"]?.apple;
  const people = (data["missing-persons"] ?? []) as any[];
  const lkl = data["last-known-location"];

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="h1">Search and Rescue Status</h1>
          <span className={`badge ${active ? "ok" : "stop"}`}>{active ? "ACTIVE" : "INACTIVE"}</span>
        </div>

        <div className="hr" />

        <div className="kv">
          <div>Last Updated</div>
          <div>
            {buildTime.toLocaleString()} <small className="muted">({timeAgo(buildTime)})</small>
          </div>

          <div>Can I Help?</div>
          <div>
            {helpState === "go" && <span className="pill">YES — Report to Coordination Point</span>}
            {helpState === "standby" && <span className="pill warn">STAND BY — Check back soon</span>}
            {helpState === "no" && <span className="pill stop">PLEASE DO NOT SELF-DEPLOY</span>}
          </div>

          <div>Coordination Point</div>
          <div>
            <strong>{data["coordination-point-name"]}</strong><br />
            <span>{data["coordination-point-address"]}</span>
            <div className="mt-3 flex gap-2 flex-wrap">
              {google && <a className="btn" href={google} target="_blank">Directions in Google Maps</a>}
              {apple  && <a className="btn" href={apple} target="_blank">Open in Apple Maps</a>}
              <a className="btn" href="/qr" target="_blank">Quick Response (QR) Code</a>
            </div>
          </div>

          <div>Lead Agency</div>
          <div>{data["lead-agency"]}</div>

          <div>Incident Name</div>
          <div>{data["incident-name"]}</div>
        </div>

        <div className="hr" />

        <h2 className="h2">Today’s Brief</h2>
        <p>{data["today-brief"]}</p>

        <h2 className="h2">Volunteer Guidance</h2>
        <p>{data["volunteer-guidance"]?.message}</p>

        <h2 className="h2">Assets Deployed</h2>
        <ul className="list-disc pl-6">
          {Array.isArray(data["assets-deployed"]) && data["assets-deployed"].map((x: string, i: number) => <li key={i}>{x}</li>)}
        </ul>

        <h2 className="h2">Areas Covered</h2>
        <p>{data["areas-covered-summary"]}</p>

        <h2 className="h2">Safety Notes</h2>
        <ul className="list-disc pl-6">
          {Array.isArray(data["safety-notes"]) && data["safety-notes"].map((x: string, i: number) => <li key={i}>{x}</li>)}
        </ul>

        {/* NEW — Identity and Background */}
        {people.length > 0 && (
          <>
            <div className="hr" />
            <h2 className="h2">Identity and Background</h2>
            <div className="people-grid">
              {people.map((p, i) => (
                <div className="person" key={i}>
                  {p["photo-url"] ? (
                    <img className="avatar" src={p["photo-url"]} alt={`${p["name"]} photo`} />
                  ) : null}
                  <div>
                    <div style={{fontWeight:800}}>{p["name"]}</div>
                    <div className="muted">
                      Age {p["age"]} • {p["height"]} • {p["build"]} • {p["hair"]}
                    </div>
                    {Array.isArray(p["skills-experience"]) && (
                      <ul className="list-disc pl-6 mt-2">
                        {p["skills-experience"].map((s: string, j: number) => <li key={j}>{s}</li>)}
                      </ul>
                    )}
                    {p["notes"] && <div className="mt-2"><strong>Notes:</strong> {p["notes"]}</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* NEW — Last Known Location */}
        {lkl && (
          <>
            <div className="hr" />
            <h2 className="h2">Last Known Location</h2>
            <p>{lkl["description"]}</p>
            <div className="kv">
              <div>Time</div>
              <div>
                {lkl["time-iso"] ? (
                  <>
                    {new Date(lkl["time-iso"]).toLocaleString()}{" "}
                    <small className="muted">({timeAgo(new Date(lkl["time-iso"]))})</small>
                  </>
                ) : "Unknown"}
              </div>
              <div>Coordinates</div>
              <div>
                {lkl["coordinates"]
                  ? `${lkl["coordinates"].lat}, ${lkl["coordinates"].lng}`
                  : "Unknown"}{" "}
                {lkl["coordinates"] && (
                  <button className="btn ml-2" onClick={() => copy(`${lkl["coordinates"].lat}, ${lkl["coordinates"].lng}`)}>
                    Copy
                  </button>
                )}
              </div>
              <div>Source</div>
              <div>{lkl["source"] || "Unknown"}{lkl["confidence"] ? ` · Confidence: ${lkl["confidence"]}` : ""}</div>
              <div>Open Map</div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {lkl["map-links"]?.google && <a className="btn" href={lkl["map-links"].google} target="_blank">Open in Google Maps</a>}
                {lkl["map-links"]?.apple && <a className="btn" href={lkl["map-links"].apple} target="_blank">Open in Apple Maps</a>}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky primary actions */}
      <div className="sticky-bar">
        <div className="sticky-inner">
          {google && <a className="btn" href={google} target="_blank">Directions to Coordination Point</a>}
          <a className="btn" href="/qr" target="_blank">Quick Response (QR) Code</a>
        </div>
      </div>
    </>
  );
}
