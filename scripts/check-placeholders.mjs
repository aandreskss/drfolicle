/**
 * Falla si hay textos [entre corchetes] en el contenido publicable.
 * Regla: ningún placeholder llega a producción.
 */
import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';

const SCAN_DIRS = ['app', 'components', 'lib', 'messages', 'content'];
const EXTS = new Set(['.ts', '.tsx', '.json', '.md']);
const PLACEHOLDER_RE = /\[[A-Za-z][^\]]{2,}\]/g;

async function* walk(dir) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && !e.name.startsWith('.')) {
      yield* walk(full);
    } else if (e.isFile() && EXTS.has(extname(e.name))) {
      yield full;
    }
  }
}

let found = 0;
for (const dir of SCAN_DIRS) {
  for await (const file of walk(dir)) {
    const text = await readFile(file, 'utf8');
    const matches = [...text.matchAll(PLACEHOLDER_RE)];
    for (const m of matches) {
      console.error(`PLACEHOLDER: ${file} → ${m[0]}`);
      found++;
    }
  }
}

if (found > 0) {
  console.error(`\n${found} placeholder(s) encontrado(s). Corríjelos antes de publicar.`);
  process.exit(1);
}
console.log('✓ Sin placeholders.');
