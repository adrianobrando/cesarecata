import "server-only";

import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import { resolveSupabaseConfig } from "./supabase-config";

declare global {
  interface CloudflareEnv {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;
  }
}

export function getSupabaseConfig(
  keyName: "NEXT_PUBLIC_SUPABASE_ANON_KEY" | "SUPABASE_SERVICE_ROLE_KEY",
) {
  const context = process.env.NEXT_RUNTIME === "edge"
    ? getOptionalRequestContext()
    : undefined;
  const env = process.env;
  const isBuild = !context && env.NEXT_PHASE === "phase-production-build";
  return resolveSupabaseConfig(context?.env ?? {
    NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY,
  }, keyName, isBuild);
}
