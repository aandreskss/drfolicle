// inspect-service-lists.mjs — Muestra los list items de las páginas de servicios
// Ejecutar: node scripts/inspect-service-lists.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => [l.split('=')[0].trim(), l.split('=').slice(1).join('=').trim()])
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const pages = ['trasplante-capilar', 'trasplante-de-barba', 'trasplante-de-cejas', 'terapias-capilares'];
const listSections = ['datos', 'zonas', 'fue', 'esperar'];

for (const page of pages) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`PAGE: ${page}`);
  console.log('═'.repeat(60));

  for (const key of listSections) {
    const { data, error } = await supabase
      .from('page_sections')
      .select('data_published')
      .eq('page_slug', page)
      .eq('key', key)
      .single();

    if (error || !data) continue;

    const lists = data.data_published?.lists;
    if (!lists) continue;

    for (const [listKey, list] of Object.entries(lists)) {
      const items = list?.items ?? [];
      if (!items.length) continue;

      console.log(`\n  [${key}].lists.${listKey}:`);
      for (const item of items) {
        if (!item.visible) continue;
        const es = item.es ?? {};
        const en = item.en ?? {};
        const hasEn = Object.values(en).some(v => v);
        console.log(`    es.t: "${es.t ?? ''}"`);
        if (es.d) console.log(`    es.d: "${es.d}"`);
        if (es.m) console.log(`    es.m: "${es.m}"`);
        console.log(`    en.t: "${en.t ?? ''}" ${hasEn ? '✓' : '⚠ MISSING'}`);
        if (en.d !== undefined) console.log(`    en.d: "${en.d}"`);
        if (en.m !== undefined) console.log(`    en.m: "${en.m}"`);
        console.log('    ---');
      }
    }
  }
}

console.log('\n✅ Inspección completa.\n');
