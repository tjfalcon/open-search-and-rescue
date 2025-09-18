// Make sure the import path is correct and the file exists.
// For example, if the file is at src/components/status-banner.tsx:

import StatusBanner from "@/components/status-banner";

export default function Page() {
  return (
    <>
      <div style={{ width: "100%", textAlign: "center", marginBottom: 16 }}>
        <a
          href="https://www.facebook.com/share/p/1FcXJoh3sU/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 600, color: "#1877f2", textDecoration: "underline", fontSize: 18 }}
        >
          View the Facebook Post
        </a>
      </div>
      <StatusBanner />
      <div className="card mt-4">
        <h2 className="h2">Share This Page</h2>
        <p>
          Pin this link at the top of social posts so people can quickly see if the
          search is active, how they can help, and where to go for coordination.
        </p>
      </div>
    </>
  );
}
