import type { Metadata } from "next";
import { ReviewComments } from "@/components/ReviewComments";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yunaki.tech"),
  title: "Yunaki — the operating system built for law firms",
  description:
    "Yunaki is the operating system built for law firms. Intake collected, documents read, mistakes caught, clients chased, forms filled. Your team just practices law.",
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
      "The operating system built for law firms. Intake, documents, checks, follow-ups and forms, handled. Your team just practices law.",
    url: "https://yunaki.tech/",
    images: ["/assets/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yunaki — the operating system built for law firms",
    description:
      "The operating system built for law firms. Your team just practices law.",
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
