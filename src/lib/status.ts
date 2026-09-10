import demoStatus from "@/data/demo-status.json";

export type IncidentMode = "demo" | "live";
export type IncidentStatus = "draft" | "active" | "paused" | "resolved" | "archived";

export interface VerifiedUpdate {
  id: string;
  publishedAt: string;
  title: string;
  body: string;
}

export interface IncidentStatusDocument {
  schemaVersion: number;
  mode: IncidentMode;
  incidentId: string;
  incidentName: string;
  incidentStatus: IncidentStatus;
  updatedAt: string;
  expiresAt: string;
  leadOrganization: string;
  summary: string;
  volunteerGuidance: {
    state: "standby" | "approved" | "closed";
    message: string;
  };
  verifiedUpdates: VerifiedUpdate[];
  safetyNotes: string[];
}

const status = demoStatus as IncidentStatusDocument;

export function getPublishedStatus(now = new Date()): IncidentStatusDocument {
  if (status.mode === "live" && new Date(status.expiresAt) <= now) {
    return {
      ...status,
      incidentStatus: "paused",
      volunteerGuidance: {
        state: "closed",
        message: "This update expired and is awaiting coordinator verification. Do not self-deploy.",
      },
    };
  }

  return status;
}
