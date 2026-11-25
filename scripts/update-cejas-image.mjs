// update-cejas-image.mjs — Actualiza la ruta de la imagen de cejas en Supabase
// Ejecutar: node scripts/update-cejas-image.mjs

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

async function run() {
  // 1. Actualizar el path de la media principal de cejas
  const { data: media, error: fetchErr } = await supabase
    .from('media')
    .select('id, path')
    .eq('path', 'images/cejas.jpg')
    .single();

  if (fetchErr || !media) {
    console.error('No se encontró media con path images/cejas.jpg:', fetchErr?.message);
    process.exit(1);
  }

  console.log('Media encontrada:', media.id, media.path);

  const { error: updateErr } = await supabase
    .from('media')
    .update({
      path: 'images/cejas-resultado.png',
      name: 'cejas-resultado.png',
      alt: JSON.stringify({ es: 'Antes y después de trasplante de cejas', en: 'Before and after eyebrow transplant' }),
    })
    .eq('id', media.id);

  if (updateErr) {
    console.error('Error al actualizar media:', updateErr.message);
    process.exit(1);
  }

  console.log('✓ Media actualizada: images/cejas.jpg → images/cejas-resultado.png');

  // 2. Verificar
  const { data: check } = await supabase.from('media').select('id,path,name').eq('id', media.id).single();
  console.log('Estado final:', check);
}

run();
