/**
 * Sube public/images/ y public/videos/ al bucket "media" de Supabase
 * y verifica que cada media.path en la BD exista en el bucket.
 *
 * Uso: npx tsx scripts/upload-media.ts [--verify-only]
 */
import { createClient } from '@supabase/supabase-js';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const BUCKET = 'media';
const PUBLIC_DIR = join(process.cwd(), 'public');
const VERIFY_ONLY = process.argv.includes('--verify-only');

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm',
};

async function* walk(dir: string, prefix = ''): AsyncGenerator<{ fullPath: string; bucketPath: string }> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) yield* walk(full, rel);
    else if (MIME[extname(e.name).toLowerCase()]) yield { fullPath: full, bucketPath: rel };
  }
}

async function upload() {
  let uploaded = 0, skipped = 0, errors = 0;

  for (const folder of ['images', 'videos']) {
    const dir = join(PUBLIC_DIR, folder);
    try { await stat(dir); } catch { console.log(`⚠ No existe ${dir}, omitiendo`); continue; }

    for await (const { fullPath, bucketPath } of walk(dir, folder)) {
      if (VERIFY_ONLY) { skipped++; continue; }

      const { data: existing } = await supabase.storage.from(BUCKET).list(folder, { search: bucketPath.split('/').pop() });
      if (existing?.length) { skipped++; continue; }

      const bytes = await readFile(fullPath);
      const mime = MIME[extname(fullPath).toLowerCase()] ?? 'application/octet-stream';
      const { error } = await supabase.storage.from(BUCKET).upload(bucketPath, bytes, { contentType: mime, upsert: false });

      if (error) { console.error(`✗ ${bucketPath}:`, error.message); errors++; }
      else { console.log(`✓ ${bucketPath}`); uploaded++; }
    }
  }

  console.log(`\nSubidos: ${uploaded} | Omitidos: ${skipped} | Errores: ${errors}`);

  // Verificar que cada media.path exista en el bucket
  console.log('\nVerificando media.path en la BD…');
  const { data: rows } = await supabase.from('media').select('path');
  let missing = 0;
  for (const row of rows ?? []) {
    const { data } = await supabase.storage.from(BUCKET).list(
      row.path.split('/').slice(0, -1).join('/'),
      { search: row.path.split('/').pop() }
    );
    if (!data?.length) { console.error(`FALTA en bucket: ${row.path}`); missing++; }
  }
  if (missing === 0) console.log('✓ Todos los archivos de media están en el bucket.');
  else console.error(`\n${missing} archivo(s) faltante(s) en el bucket.`);
}

upload().catch(console.error);
