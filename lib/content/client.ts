import { createClient } from '@supabase/supabase-js';

// Cliente anon singleton — solo para lecturas públicas cacheadas del sitio.
// No usa cookies; es seguro en unstable_cache.
let _anon: ReturnType<typeof createClient> | null = null;

export function anonClient() {
  if (!_anon) {
    _anon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }
  return _anon;
}
