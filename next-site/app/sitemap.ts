import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yunaki.tech";
  return [
    { url: `${base}/` },
    { url: `${base}/how-it-works.html` },
    { url: `${base}/security.html` },
    { url: `${base}/case-files.html` },
    { url: `${base}/contact.html` },
  ];
}
