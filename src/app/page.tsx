import StatusBanner from "@/components/status-banner";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/">Open Search and Rescue</Link>
        <nav aria-label="Primary navigation">
          <a href="https://github.com/tjfalcon/open-search-and-rescue">Source code</a>
          <a href="/api/health">System health</a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">Community coordination · safety first</p>
        <h1>One verified source of truth when every minute matters.</h1>
        <p className="lede">
          An open-source incident coordination tool designed for families and community
          organizers working alongside the agency of jurisdiction.
        </p>
      </section>

      <div className="demo-callout" role="note">
        <strong>Synthetic demonstration.</strong> This page does not describe an active
        incident, real people, or a real location.
      </div>

      <StatusBanner />

      <section className="card project-note">
        <p className="eyebrow">What is being built</p>
        <h2>Lightweight in the field, scalable when needed</h2>
        <p>
          The first deployment target is one containerized instance for one family-led
          coordination effort. The same application is being designed to scale behind an
          edge network with managed data services or Kubernetes for larger organizations.
        </p>
        <div className="actions">
          <a className="btn primary" href="https://github.com/tjfalcon/open-search-and-rescue#deployment-paths">
            Review the architecture
          </a>
          <a className="btn" href="/qr">Share demo QR</a>
        </div>
      </section>
    </>
  );
}
