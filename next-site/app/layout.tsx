import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Mono, Inter } from "next/font/google";
import { ReviewComments } from "@/components/ReviewComments";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yunaki.tech"),
  title: "Yunaki — the agentic OS for immigration law firms",
  description:
    "Yunaki is the agentic OS for immigration law firms: it runs intake, reads the documents, checks every case, and drafts the follow-ups — so the work moves smoothly. You approve everything. Yunaki never files.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Yunaki",
    title: "Yunaki — the agentic OS for immigration law firms",
    description:
      "The agentic OS that never guesses your cases. Intake, document reading, case checks, and follow-ups for immigration firms. You approve everything — Yunaki never files.",
    url: "https://yunaki.tech/",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yunaki — the agentic OS for immigration law firms",
    description:
      "The agentic OS that never guesses your cases. You approve everything — Yunaki never files.",
    images: ["/assets/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body>
        {children}
        <ReviewComments />
      </body>
    </html>
  );
}
