import { createClient } from '@supabase/supabase-js';

// Cliente anon singleton — solo para lecturas públicas cacheadas del sitio.
// No usa cookies; es seguro en unstable_cache.
let _anon: ReturnType<typeof createClient> | null = null;

export function anonClient() {
  if (!_anon) {
    // Fallback placeholder prevents build crash when env vars are missing.
    // Actual requests will fail gracefully (each collection returns []).
    _anon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }
  return _anon;
}
