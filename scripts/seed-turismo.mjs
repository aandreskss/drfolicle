// seed-turismo.mjs — EN translations for turismo-medico viaje steps
// Run: node scripts/seed-turismo.mjs

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
  console.log('\n── turismo-medico · viaje etapas ──');
  for (const [esT, enData] of [
    ['Evaluación previa a distancia', {
      t: 'Remote pre-assessment',
      m: 'Before traveling',
      d: 'We talk by video call before you book your flight, to review your case and determine if you are a candidate.',
      w: 'We review your case and propose a plan.',
      u: 'You share your medical history and expectations.',
    }],
    ['Orientación para organizar el viaje', {
      t: 'Travel planning guidance',
      m: 'Before traveling',
      d: 'We recommend dates, the documents you need, and the suggested length of stay for your plan.',
      w: 'We send you a travel guide.',
      u: 'You purchase your flight on the agreed dates.',
    }],
    ['Alojamiento y traslados', {
      t: 'Accommodation and transfers',
      m: 'On arrival',
      d: 'We pick you up at the airport, arrange your hotel, and provide personalized support throughout your stay.',
      w: 'Airport pickup and hotel management.',
      u: 'You share your flight itinerary with us.',
    }],
    ['Tours por Medellín con nosotros', {
      t: 'Tours around Medellín',
      m: 'During your stay',
      d: 'Schedule city tours with our team and enjoy a premium medical tourism experience, tailored to you.',
      w: 'We build your tour itinerary together.',
      u: 'You tell us what you would like to explore.',
    }],
    ['Coordinación del procedimiento', {
      t: 'Procedure coordination',
      m: 'At the clinic',
      d: 'Pre-operative exams, medical consultation, and procedure on the same schedule — to make the most of your time in Medellín.',
      w: 'We organize your full medical schedule.',
      u: 'You follow the pre-operative instructions.',
    }],
    ['Indicaciones postoperatorias', {
      t: 'Post-operative care',
      m: 'Recovery',
      d: 'You receive your post-operative kit and a care guide for the first days before heading home.',
      w: 'Post-operative kit and clinic check-ins.',
      u: 'You rest and follow the care guide.',
    }],
    ['Seguimiento desde tu país', {
      t: 'Follow-up from your country',
      m: 'Back home',
      d: 'We do remote check-ins as your new hair grows, all the way to the final result.',
      w: 'Remote check-ins and answers to your questions.',
      u: 'You send us photos of your progress.',
    }],
  ]) await updateListItem('turismo-medico', 'viaje', 'etapas', esT, enData);

  console.log('\n✅ Seed turismo-medico complete.\n');
}

run().catch(console.error);
