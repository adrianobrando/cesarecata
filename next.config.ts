import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  /* config options here */
  // Rimosse per Next 15 / Cloudflare Edge:
  // cacheComponents: true,
  // partialPrefetching: true,
  // turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
});

export default nextConfig;
