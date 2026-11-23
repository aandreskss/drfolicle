// seed-contacto-metodo.mjs — EN translations for contacto avisos + nuestro-metodo etapas
// Run: node scripts/seed-contacto-metodo.mjs

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

async function updateListItem(pageSlug, sectionKey, listKey, esT, enData) {
  const { data, error } = await supabase
    .from('page_sections')
    .select('id, data_published')
    .eq('page_slug', pageSlug)
    .eq('key', sectionKey)
    .single();

  if (error || !data) {
    console.warn(`  ⚠ Not found: [${pageSlug}] ${sectionKey}`);
    return;
  }

  const list = data.data_published?.lists?.[listKey];
  if (!list) {
    console.warn(`  ⚠ List not found: [${pageSlug}] ${sectionKey}.lists.${listKey}`);
    return;
  }

  const updatedItems = list.items.map((item) =>
    item.es?.t === esT ? { ...item, en: { ...item.en, ...enData } } : item
  );

  const updatedData = {
    ...data.data_published,
    lists: { ...data.data_published.lists, [listKey]: { ...list, items: updatedItems } },
  };

  const { error: err } = await supabase
    .from('page_sections')
    .update({ data_draft: updatedData, data_published: updatedData })
    .eq('id', data.id);

  if (err) console.error(`  ✗ [${pageSlug}].${sectionKey}.${listKey}[${esT}]:`, err.message);
  else console.log(`  ✓ ${enData.t}`);
}

async function run() {
  console.log('\n── contacto · hero.avisos ──');
  for (const [esT, enData] of [
    ['No te pediremos fotografías en este paso', { t: "We won't ask for photos at this stage" }],
    ['Atención en español e inglés',              { t: 'Support in Spanish and English' }],
  ]) await updateListItem('contacto', 'hero', 'avisos', esT, enData);

  console.log('\n── nuestro-metodo · etapas.etapas ──');
  for (const [esT, enData] of [
    ['Valoración gratis', {
      t: 'Free consultation',
      d: 'Everything starts with a free consultation to understand your case: your medical history, the cause of hair loss, your donor area, and what you\'d like to change.',
    }],
    ['Plan de tratamiento personalizado', {
      t: 'Personalized treatment plan',
      d: 'We design a strategy tailored to your goals: procedure steps, estimated timelines, and the surgical or non-surgical options that apply to your case.',
    }],
    ['El procedimiento', {
      t: 'The procedure',
      d: 'We use the FUE technique, a minimally invasive method that extracts follicles one by one, under local anesthesia, with a team that supports you throughout the entire day.',
    }],
    ['Recuperación y acompañamiento', {
      t: 'Recovery & follow-up',
      d: 'We provide detailed instructions and ongoing support so you heal correctly — including if you return to your home country.',
    }],
  ]) await updateListItem('nuestro-metodo', 'etapas', 'etapas', esT, enData);

  console.log('\n✅ Seed contacto + nuestro-metodo complete.\n');
}

run().catch(console.error);
