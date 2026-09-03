import type { Metadata } from "next";
import { ReviewComments } from "@/components/ReviewComments";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yunaki.tech"),
  title: "Yunaki — the operating system built for law firms",
  description:
    "Yunaki is the operating system built for law firms: it runs intake, reads the documents, checks every case, and drafts the follow-ups — so the work moves smoothly. You approve everything. Yunaki never files.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Yunaki",
    title: "Yunaki — the operating system built for law firms",
    description:
      "The operating system built for law firms. It never guesses your cases. Intake, document reading, case checks, and follow-ups for immigration firms. You approve everything — Yunaki never files.",
    url: "https://yunaki.tech/",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yunaki — the operating system built for law firms",
    description:
      "The operating system built for law firms. It never guesses your cases. You approve everything — Yunaki never files.",
    images: ["/assets/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ReviewComments />
      </body>
    </html>
  );
}
