// Make sure the import path is correct and the file exists.
// For example, if the file is at src/components/status-banner.tsx:
import StatusBanner from "@/components/status-banner";

export default function Page() {
  return (
    <>
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
