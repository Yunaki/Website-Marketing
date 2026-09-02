import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The legacy static pages in public/ link to "index.html".
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
