type SupabaseKeyName = "NEXT_PUBLIC_SUPABASE_ANON_KEY" | "SUPABASE_SERVICE_ROLE_KEY";

type SupabaseEnv = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
};

export function resolveSupabaseConfig(
  env: SupabaseEnv,
  keyName: SupabaseKeyName,
  isBuild: boolean,
) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env[keyName];

  if ((!url || !key) && !isBuild) {
    throw new Error(`Configura NEXT_PUBLIC_SUPABASE_URL e ${keyName}.`);
  }

  return {
    url: url || "https://placeholder.supabase.co",
    key: key || "placeholder-key",
  };
}
