import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

for (const [file, factory, keyName] of [
  ["supabase", "getSupabase", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
  ["supabase-admin", "getSupabaseAdmin", "SUPABASE_SERVICE_ROLE_KEY"],
]) {
  test(`${factory} uses the runtime fetch without persistent or refreshing sessions`, async () => {
    const calls = [];
    const runtimeFetch = async (url, options) => {
      calls.push({ url: String(url), options });
      return new Response("[]", { headers: { "content-type": "application/json" } });
    };
    const exports = {};
    const source = readFileSync(new URL(`../lib/${file}.ts`, import.meta.url), "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;

    runInNewContext(compiled, {
      exports,
      fetch: runtimeFetch,
      require(specifier) {
        if (specifier === "server-only") return {};
        if (specifier === "./supabase-env") {
          return {
            getSupabaseConfig(requestedKey) {
              assert.equal(requestedKey, keyName);
              return { url: "https://example.supabase.co", key: "test-key" };
            },
          };
        }
        return require(specifier);
      },
    });

    const client = exports[factory]();
    assert.equal(client.auth.persistSession, false);
    assert.equal(client.auth.autoRefreshToken, false);
    const { error } = await client.from("events").select("*");
    assert.equal(error, null);
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /^https:\/\/example\.supabase\.co\/rest\/v1\/events\?/);
    assert.equal(new Headers(calls[0].options.headers).get("apikey"), "test-key");
  });
}
