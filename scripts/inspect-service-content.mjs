// inspect-service-content.mjs — Verifica qué campos content.en faltan en service pages
// Ejecutar: node scripts/inspect-service-content.mjs

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

for (const page of pages) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`PAGE: ${page}`);
  console.log('═'.repeat(60));

  const { data: sections } = await supabase
    .from('page_sections')
    .select('key, data_published')
    .eq('page_slug', page)
    .order('position');

  for (const section of (sections ?? [])) {
    const es = section.data_published?.content?.es ?? {};
    const en = section.data_published?.content?.en ?? {};

    const fields = ['t1', 't2', 'text', 'cta', 'ctaLink', 'eyebrow'];
    const missing = fields.filter(f => es[f] && !en[f]);
    const ok = fields.filter(f => es[f] && en[f]);

    if (missing.length > 0) {
      console.log(`\n  [${section.key}] ⚠ MISSING EN fields:`);
      for (const f of missing) {
        console.log(`    ${f}: es="${es[f]}" → en MISSING`);
      }
    } else if (ok.length > 0) {
      console.log(`  [${section.key}] ✓ ${ok.map(f => `${f}="${en[f]}"`).join(' | ')}`);
    }
  }
}

console.log('\n✅ Inspección de section content completa.\n');
