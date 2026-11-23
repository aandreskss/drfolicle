import { createClient } from '@supabase/supabase-js';

let _anon: ReturnType<typeof createClient> | null = null;

export function anonClient() {
  if (!_anon) {
    _anon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
      {
        auth: { persistSession: false, autoRefreshToken: false },
        // Force no-store so Next.js Data Cache never persists Supabase responses
        // between builds. Without this, Railway's preserved .next/cache/ can serve
        // stale content after Supabase data is updated.
        global: {
          fetch: (url: RequestInfo | URL, options?: RequestInit) =>
            fetch(url, { ...options, cache: 'no-store' }),
        },
      }
    );
  }
  return _anon;
}
