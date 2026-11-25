// add-case5.mjs — Inserta el caso #5 en Supabase usando las imágenes del hero
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

// IDs de media ya existentes en Supabase
const BEFORE_MEDIA_ID = '1d7ef51e-a4a6-4af3-8549-403c208abafa'; // res-1-postop.webp
const AFTER_MEDIA_ID  = '35648316-d044-4cfd-8644-c09d4e8e01b8'; // res-3-resultado.webp

const { data, error } = await supabase.from('cases').insert({
  position: 4,
  title: { es: 'Línea frontal y densidad', en: 'Frontal hairline and density' },
  category: 'capilar',
  before_media_id: BEFORE_MEDIA_ID,
  after_media_id: AFTER_MEDIA_ID,
  consent_verified: true,
  visible: true,
}).select('id, position, title').single();

if (error) {
  console.error('Error al insertar caso:', error.message);
  process.exit(1);
}

console.log('✓ Caso #5 insertado:', data);
