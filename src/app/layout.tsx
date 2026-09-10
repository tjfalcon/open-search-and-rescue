import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Search and Rescue | Community coordination",
  description:
    "An open-source, safety-first coordination tool for families and community search efforts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="shell">
          {children}
          <footer>
            <p>
              Open Search and Rescue supports coordination; it does not replace 911,
              law enforcement, emergency management, or professional search and rescue.
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
