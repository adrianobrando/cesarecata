import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Rimosse per Next 15 / Cloudflare Edge:
  // cacheComponents: true,
  // partialPrefetching: true,
  // turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
};

export default nextConfig;
