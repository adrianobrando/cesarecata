import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./supabase-env";

export function getSupabaseAdmin() {
  const { url, key } = getSupabaseConfig("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
