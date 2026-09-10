import { NextResponse } from "next/server";

import { getPublishedStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getPublishedStatus(), {
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
