// fix-nav-order.mjs — reorder nav_main: nuestro-metodo goes after servicios
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

const { data: row, error } = await supabase
  .from('settings')
  .select('published')
  .eq('key', 'nav_main')
  .single();

if (error || !row) { console.error('Not found', error); process.exit(1); }

const positionMap = {
  '/': 0,
  '/servicios': 1,
  '/nuestro-metodo': 2,
  '/turismo-medico': 3,
  '/resultados': 4,
  '/blog': 5,
  '/contacto': 6,
  '/nosotros': 7,
};

const updated = row.published.map((item) => ({
  ...item,
  position: positionMap[item.href] ?? item.position,
}));

const { error: err } = await supabase
  .from('settings')
  .update({ draft: updated, published: updated })
  .eq('key', 'nav_main');

if (err) { console.error('Update failed', err.message); process.exit(1); }
console.log('✅ nav_main positions updated');
updated.filter(i => i.visible).sort((a,b) => a.position - b.position)
  .forEach(i => console.log(`  ${i.position} ${i.href}`));
