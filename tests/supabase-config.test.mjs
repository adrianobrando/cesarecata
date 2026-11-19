import assert from "node:assert/strict";
import test from "node:test";
import { resolveSupabaseConfig } from "../lib/supabase-config.ts";

for (const keyName of ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]) {
  test(`${keyName}: build fallback and runtime validation`, () => {
    const config = { NEXT_PUBLIC_SUPABASE_URL: "https://real.supabase.co", [keyName]: "real-key" };

    assert.deepEqual(resolveSupabaseConfig({}, keyName, true), {
      url: "https://placeholder.supabase.co",
      key: "placeholder-key",
    });
    assert.deepEqual(resolveSupabaseConfig({ [keyName]: "real-key" }, keyName, true), {
      url: "https://placeholder.supabase.co",
      key: "real-key",
    });
    assert.deepEqual(resolveSupabaseConfig(config, keyName, true), {
      url: config.NEXT_PUBLIC_SUPABASE_URL,
      key: "real-key",
    });
    assert.deepEqual(resolveSupabaseConfig(config, keyName, false), {
      url: config.NEXT_PUBLIC_SUPABASE_URL,
      key: "real-key",
    });
    assert.throws(() => resolveSupabaseConfig({}, keyName, false), new RegExp(keyName));
    assert.throws(() => resolveSupabaseConfig({ [keyName]: "real-key" }, keyName, false));
    assert.throws(() => resolveSupabaseConfig({ NEXT_PUBLIC_SUPABASE_URL: config.NEXT_PUBLIC_SUPABASE_URL }, keyName, false));
  });
}
