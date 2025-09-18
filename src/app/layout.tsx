import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Search and Rescue Status",
  description:
    "Simple live status page for community-supported Search and Rescue (SAR).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-[880px] mx-auto px-5 py-8 md:py-12">
          {children}
          <footer className="mt-6 opacity-70">
            <small className="muted">
              For safety: do not self-deploy. Always check in at the coordination
              point for assignment and a safety briefing.
            </small>
          </footer>
        </main>
      </body>
    </html>
  );
}
