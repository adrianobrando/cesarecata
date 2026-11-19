import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./supabase-env";

export function getSupabase() {
  const { url, key } = getSupabaseConfig("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(url, key, {
    global: {
      fetch: fetch,
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
