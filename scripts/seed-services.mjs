// seed-services.mjs — Traduce list items de las 4 páginas de servicios
// Ejecutar: node scripts/seed-services.mjs

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
    console.warn(`  ⚠ No encontrada: [${pageSlug}] ${sectionKey}`);
    return;
  }

  const list = data.data_published?.lists?.[listKey];
  if (!list) {
    console.warn(`  ⚠ Lista no encontrada: [${pageSlug}] ${sectionKey}.lists.${listKey}`);
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

// ─── FUE steps shared across pages ───────────────────────────────────────────
const FUE_PASOS = [
  ['Extracción', { t: 'Extraction', d: 'Follicular units are extracted one by one from the donor area, usually the nape, using micro-instruments.' }],
  ['Preparación', { t: 'Preparation', d: 'The units are selected and preserved while the recipient area is designed according to your natural form.' }],
  ['Implantación', { t: 'Implantation', d: 'Each unit is placed respecting the natural angle, direction, and density.' }],
];

async function run() {

  // ════════════════════════════════════════════════════════════════
  // TRASPLANTE CAPILAR
  // ════════════════════════════════════════════════════════════════
  console.log('\n── trasplante-capilar · datos ──');
  for (const [esT, enData] of [
    ['TÉCNICA',             { t: 'TECHNIQUE',         d: 'FUE, follicle by follicle' }],
    ['ANESTESIA',           { t: 'ANESTHESIA',         d: 'Local, with nerve blocks' }],
    ['RECUPERACIÓN INICIAL',{ t: 'INITIAL RECOVERY',   d: '7–10 days' }],
    ['RESULTADO FINAL',     { t: 'FINAL RESULT',       d: '8–12 months' }],
  ]) await updateListItem('trasplante-capilar', 'datos', 'items', esT, enData);

  console.log('\n── trasplante-capilar · zonas ──');
  for (const [esT, enData] of [
    ['Línea frontal',         { t: 'Hairline',          d: 'We design a hairline proportioned to your face so the result looks natural.' }],
    ['Entradas',              { t: 'Temples',           d: '' }],
    ['Coronilla',             { t: 'Crown',             d: '' }],
    ['Adelgazamiento general',{ t: 'General thinning',  d: '' }],
  ]) await updateListItem('trasplante-capilar', 'zonas', 'items', esT, enData);

  console.log('\n── trasplante-capilar · fue pasos ──');
  for (const [esT, enData] of FUE_PASOS)
    await updateListItem('trasplante-capilar', 'fue', 'pasos', esT, enData);

  console.log('\n── trasplante-capilar · fue beneficios ──');
  for (const [esT, enData] of [
    ['Minimiza el riesgo de cicatrices',          { t: 'Minimizes the risk of scarring' }],
    ['Respeta los patrones de crecimiento natural',{ t: 'Respects natural growth patterns' }],
    ['Se realiza con anestesia local',             { t: 'Performed under local anesthesia' }],
    ['Resultados predecibles y duraderos',         { t: 'Predictable and long-lasting results' }],
  ]) await updateListItem('trasplante-capilar', 'fue', 'beneficios', esT, enData);

  console.log('\n── trasplante-capilar · esperar ──');
  for (const [esT, enData] of [
    ['Técnica FUE con anestesia local', { t: 'FUE technique under local anesthesia', d: 'We are with you throughout the day and provide your post-operative kit.', m: 'PROCEDURE DAY' }],
    ['Recuperación inicial',            { t: 'Initial recovery',  d: 'Mild redness and swelling may occur; this is normal.', m: 'DAYS 1 TO 10' }],
    ['Sin actividad intensa',           { t: 'No intense activity', d: 'Avoid intense exercise for at least two weeks and gradually resume light activity.', m: 'WEEKS 1 AND 2' }],
    ['Crecimiento visible',             { t: 'Visible growth',    d: 'The first signs of new hair begin to appear.', m: 'MONTHS 3 TO 4' }],
    ['Resultado final',                 { t: 'Final result',      d: 'Hair reaches its definitive density and appearance.', m: 'MONTHS 8 TO 12' }],
  ]) await updateListItem('trasplante-capilar', 'esperar', 'items', esT, enData);

  // ════════════════════════════════════════════════════════════════
  // TRASPLANTE DE BARBA
  // ════════════════════════════════════════════════════════════════
  console.log('\n── trasplante-de-barba · datos ──');
  for (const [esT, enData] of [
    ['TÉCNICA',          { t: 'TECHNIQUE',           d: 'FUE' }],
    ['ZONA DONANTE',     { t: 'DONOR AREA',           d: 'Occipital (nape)' }],
    ['ANESTESIA',        { t: 'ANESTHESIA',           d: 'Local' }],
    ['VUELTA A TU RUTINA',{ t: 'BACK TO YOUR ROUTINE', d: 'Within a few days' }],
  ]) await updateListItem('trasplante-de-barba', 'datos', 'items', esT, enData);

  console.log('\n── trasplante-de-barba · zonas ──');
  for (const [esT, enData] of [
    ['Barba completa',         { t: 'Full beard',           d: 'Uniform density throughout the beard, with direction and angle designed according to your features.' }],
    ['Bigote',                 { t: 'Mustache',             d: '' }],
    ['Zonas con baja densidad',{ t: 'Low-density areas',    d: '' }],
    ['Cubrir cicatrices',      { t: 'Cover scars',          d: '' }],
  ]) await updateListItem('trasplante-de-barba', 'zonas', 'items', esT, enData);

  console.log('\n── trasplante-de-barba · fue pasos ──');
  for (const [esT, enData] of FUE_PASOS)
    await updateListItem('trasplante-de-barba', 'fue', 'pasos', esT, enData);

  console.log('\n── trasplante-de-barba · fue beneficios ──');
  for (const [esT, enData] of [
    ['Aspecto natural y crecimiento uniforme',  { t: 'Natural appearance and uniform growth' }],
    ['Mínimamente invasivo',                    { t: 'Minimally invasive' }],
    ['Vuelves a tu rutina en pocos días',       { t: 'Back to your routine within a few days' }],
    ['Mejora la densidad y cubre cicatrices',   { t: 'Improves density and covers scars' }],
  ]) await updateListItem('trasplante-de-barba', 'fue', 'beneficios', esT, enData);

  console.log('\n── trasplante-de-barba · esperar ──');
  for (const [esT, enData] of [
    ['Técnica FUE con anestesia local', { t: 'FUE technique under local anesthesia', d: 'We are with you throughout the day.', m: 'PROCEDURE DAY' }],
    ['Recuperación rápida',             { t: 'Quick recovery',  d: 'You return to your normal activities within a few days.', m: 'FIRST DAYS' }],
    ['Crecimiento de la barba',         { t: 'Beard growth',    d: 'Growth timeline confirmed at your follow-up with the specialist.', m: 'FOLLOWING MONTHS' }],
    ['Permanente y natural',            { t: 'Permanent and natural', d: 'The beard grows with the direction and density designed in your plan.', m: 'RESULT' }],
  ]) await updateListItem('trasplante-de-barba', 'esperar', 'items', esT, enData);

  // ════════════════════════════════════════════════════════════════
  // TRASPLANTE DE CEJAS
  // ════════════════════════════════════════════════════════════════
  console.log('\n── trasplante-de-cejas · datos ──');
  for (const [esT, enData] of [
    ['TÉCNICA',      { t: 'TECHNIQUE',    d: 'FUE Micrografts' }],
    ['ZONA DONANTE', { t: 'DONOR AREA',   d: 'Scalp' }],
    ['ANESTESIA',    { t: 'ANESTHESIA',   d: 'Local' }],
    ['DURACIÓN',     { t: 'DURATION',     d: 'Approx. 3–4 hours' }],
  ]) await updateListItem('trasplante-de-cejas', 'datos', 'items', esT, enData);

  console.log('\n── trasplante-de-cejas · zonas ──');
  for (const [esT, enData] of [
    ['Cejas densas y definidas',{ t: 'Thick, defined eyebrows', d: 'We place each follicle with precision to give density to the entire eyebrow.' }],
    ['Forma y contorno',         { t: 'Shape and contour',      d: '' }],
    ['Zonas despobladas',        { t: 'Sparse areas',           d: '' }],
  ]) await updateListItem('trasplante-de-cejas', 'zonas', 'items', esT, enData);

  console.log('\n── trasplante-de-cejas · fue pasos ──');
  for (const [esT, enData] of FUE_PASOS)
    await updateListItem('trasplante-de-cejas', 'fue', 'pasos', esT, enData);

  console.log('\n── trasplante-de-cejas · fue beneficios ──');
  for (const [esT, enData] of [
    ['Cejas densas y bien definidas',      { t: 'Thick, well-defined eyebrows' }],
    ['Resultado permanente y natural',      { t: 'Permanent and natural result' }],
    ['Procedimiento seguro y bien tolerado',{ t: 'Safe and well-tolerated procedure' }],
    ['Recuperación rápida',                 { t: 'Quick recovery' }],
  ]) await updateListItem('trasplante-de-cejas', 'fue', 'beneficios', esT, enData);

  console.log('\n── trasplante-de-cejas · esperar ──');
  for (const [esT, enData] of [
    ['Unas 3 a 4 horas', { t: 'Approx. 3 to 4 hours',  d: 'Under local anesthesia with support throughout the day.', m: 'PROCEDURE DAY' }],
    ['Recuperación rápida',  { t: 'Quick recovery',     d: 'You receive clear instructions for caring for the area.', m: 'FIRST DAYS' }],
    ['Crecimiento de las cejas', { t: 'Eyebrow growth', d: 'Growth timeline confirmed at your follow-up with the specialist.', m: 'FOLLOWING MONTHS' }],
    ['Permanente y natural', { t: 'Permanent and natural', d: 'The follicles follow the natural eyebrow growth cycle.', m: 'RESULT' }],
  ]) await updateListItem('trasplante-de-cejas', 'esperar', 'items', esT, enData);

  // ════════════════════════════════════════════════════════════════
  // TERAPIAS CAPILARES
  // ════════════════════════════════════════════════════════════════
  console.log('\n── terapias-capilares · datos ──');
  for (const [esT, enData] of [
    ['TIPO',      { t: 'TYPE',       d: 'Non-surgical' }],
    ['TERAPIA',   { t: 'THERAPY',    d: 'Hair plasma (PRP)' }],
    ['SESIONES',  { t: 'SESSIONS',   d: 'Confirmed at assessment' }],
    ['IDEAL PARA',{ t: 'IDEAL FOR',  d: 'Prevention and complement' }],
  ]) await updateListItem('terapias-capilares', 'datos', 'items', esT, enData);

  console.log('\n── terapias-capilares · zonas ──');
  for (const [esT, enData] of [
    ['Empiezas a notar la caída',  { t: 'Starting to notice hair loss', d: 'Preventive options and growth stimulation are the first line of defense.' }],
    ['Quieres proteger tu cabello', { t: 'You want to protect your hair', d: '' }],
    ['Acompañar tu trasplante',     { t: 'Complement your transplant',   d: '' }],
  ]) await updateListItem('terapias-capilares', 'zonas', 'items', esT, enData);

  console.log('\n── terapias-capilares · fue pasos ──');
  for (const [esT, enData] of [
    ['Valoración',    { t: 'Assessment',  d: 'The specialist evaluates your case and determines if the therapy is right for you.' }],
    ['Sesión de PRP', { t: 'PRP session', d: 'Procedure details confirmed at your specialist consultation.' }],
    ['Seguimiento',   { t: 'Follow-up',   d: 'We review your progress and adjust the plan. Frequency confirmed at assessment.' }],
  ]) await updateListItem('terapias-capilares', 'fue', 'pasos', esT, enData);

  console.log('\n── terapias-capilares · fue beneficios ──');
  for (const [esT, enData] of [
    ['Sin cirugía',                           { t: 'No surgery required' }],
    ['Ayuda a proteger el cabello que tienes', { t: 'Helps protect the hair you have' }],
    ['Estimula el crecimiento',                { t: 'Stimulates growth' }],
    ['Complementa tu trasplante',              { t: 'Complements your transplant' }],
  ]) await updateListItem('terapias-capilares', 'fue', 'beneficios', esT, enData);

  console.log('\n── terapias-capilares · esperar ──');
  for (const [esT, enData] of [
    ['Valoración sin costo',          { t: 'Free assessment',              d: 'We determine if the therapy is right for you and how many sessions you need.', m: 'FIRST VISIT' }],
    ['[Duración por confirmar]',      { t: 'Duration confirmed at assessment', d: 'Instructions confirmed with your specialist.', m: 'EACH SESSION' }],
    ['[N.º de sesiones por confirmar]',{ t: 'Sessions confirmed at assessment', d: 'Tracking your progress.', m: 'DURING THE PLAN' }],
  ]) await updateListItem('terapias-capilares', 'esperar', 'items', esT, enData);

  console.log('\n✅ Seed de páginas de servicios completo.\n');
}

run().catch(console.error);
