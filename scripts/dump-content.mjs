// dump-content.mjs — Muestra el contenido actual de Supabase para revisión
// Ejecutar: node scripts/dump-content.mjs

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

async function dump() {
  // Secciones de páginas
  const { data: sections } = await supabase
    .from('v_page_sections')
    .select('page_slug, key, position, data')
    .order('page_slug').order('position');

  console.log('\n====== PAGE SECTIONS ======\n');
  for (const s of sections ?? []) {
    console.log(`\n--- [${s.page_slug}] ${s.key} ---`);
    console.log('ES:', JSON.stringify(s.data?.content?.es, null, 2));
    console.log('EN:', JSON.stringify(s.data?.content?.en, null, 2));
  }

  // Tratamientos
  const { data: treatments } = await supabase
    .from('treatments')
    .select('id, name, short')
    .order('position');

  console.log('\n\n====== TREATMENTS ======\n');
  for (const t of treatments ?? []) {
    console.log(`\n[${t.id}]`);
    console.log('name ES:', t.name?.es, '| EN:', t.name?.en);
    console.log('short ES:', t.short?.es);
    console.log('short EN:', t.short?.en);
  }

  // FAQs
  const { data: faqs } = await supabase
    .from('faqs')
    .select('id, question, answer, scopes')
    .order('position');

  console.log('\n\n====== FAQS ======\n');
  for (const f of faqs ?? []) {
    console.log(`\n[scopes: ${f.scopes?.join(', ')}]`);
    console.log('Q ES:', f.question?.es);
    console.log('Q EN:', f.question?.en);
    console.log('A ES:', f.answer?.es);
    console.log('A EN:', f.answer?.en);
  }

  // Testimonios
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('id, author, country, quote')
    .order('position');

  console.log('\n\n====== TESTIMONIALS ======\n');
  for (const t of testimonials ?? []) {
    console.log(`\n[${t.author} - ${t.country}]`);
    console.log('ES:', t.quote?.es);
    console.log('EN:', t.quote?.en);
  }
}

dump().catch(console.error);
