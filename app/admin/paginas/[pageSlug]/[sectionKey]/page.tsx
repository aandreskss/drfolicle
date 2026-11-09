import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { saveSection } from './actions';
import type { SectionData, SectionText } from '@/lib/content/types';

export const metadata: Metadata = { title: 'Editar sección' };

const IN = 'w-full rounded-[8px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/40';
const LB = 'block mb-1 text-sm font-semibold text-ink';

const TEXT_FIELDS: { key: keyof SectionText; label: string; multiline?: boolean }[] = [
  { key: 'eyebrow',  label: 'Eyebrow / etiqueta' },
  { key: 't1',       label: 'Título línea 1' },
  { key: 't2',       label: 'Título línea 2 / acento' },
  { key: 'text',     label: 'Texto / descripción', multiline: true },
  { key: 'cta',      label: 'Texto del CTA' },
  { key: 'ctaLink',  label: 'Destino del CTA' },
  { key: 'cta2',     label: 'Texto del CTA 2 (si aplica)' },
  { key: 'cta2Link', label: 'Destino del CTA 2' },
];

export default async function EditarSeccionPage({
  params,
}: {
  params: Promise<{ pageSlug: string; sectionKey: string }>;
}) {
  const { pageSlug, sectionKey } = await params;
  const db = serviceClient();

  const { data: s } = await db
    .from('page_sections')
    .select('key,name,position,visible,data_draft,source_collection')
    .eq('page_slug', pageSlug)
    .eq('key', sectionKey)
    .single();
  if (!s) notFound();

  const { data: page } = await db.from('pages').select('title').eq('slug', pageSlug).single();
  const pageTitle = page ? (page.title as { es: string }).es : pageSlug;

  const data = (s.data_draft ?? {}) as SectionData;
  const es   = data?.content?.es ?? {};
  const en   = data?.content?.en ?? {};

  return (
    <div className="max-w-[800px]">
      <div className="mb-6 flex items-center gap-2 flex-wrap text-sm">
        <Link href="/admin/paginas" className="font-semibold text-slate hover:text-ink">← Páginas</Link>
        <span className="text-slate">/</span>
        <Link href={`/admin/paginas/${pageSlug}`} className="font-semibold text-slate hover:text-ink">{pageTitle}</Link>
        <span className="text-slate">/</span>
        <span className="font-semibold text-ink">{s.name}</span>
      </div>

      {s.source_collection && (
        <div className="mb-4 rounded-[10px] border border-warn/30 bg-warn-bg px-4 py-3 text-sm text-warn">
          Esta sección muestra datos de <strong>{s.source_collection}</strong>. El contenido dinámico se gestiona desde su colección correspondiente.
        </div>
      )}

      <div className="rounded-[16px] border border-line bg-white p-6">
        <form action={saveSection} className="flex flex-col gap-6">
          <input type="hidden" name="page_slug"   value={pageSlug} />
          <input type="hidden" name="section_key" value={sectionKey} />

          {/* Español */}
          <div>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-teal-deep">Español</h3>
            <div className="flex flex-col gap-3">
              {TEXT_FIELDS.map(({ key, label, multiline }) => (
                <div key={key}>
                  <label className={LB}>{label}</label>
                  {multiline ? (
                    <textarea name={`es_${key}`} defaultValue={es[key] ?? ''} rows={3} className={IN} />
                  ) : (
                    <input name={`es_${key}`} defaultValue={es[key] ?? ''} className={IN} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inglés */}
          <div>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-slate">Inglés (opcional)</h3>
            <div className="flex flex-col gap-3">
              {TEXT_FIELDS.filter((f) => !['eyebrow'].includes(f.key as string)).map(({ key, label, multiline }) => (
                <div key={key}>
                  <label className={LB}>{label} (EN)</label>
                  {multiline ? (
                    <textarea name={`en_${key}`} defaultValue={en[key] ?? ''} rows={3} className={IN} />
                  ) : (
                    <input name={`en_${key}`} defaultValue={en[key] ?? ''} className={IN} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Visible */}
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" name="visible" defaultChecked={s.visible} className="peer sr-only" />
            <div className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-teal after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
            <span className="text-sm text-ink">Sección visible</span>
          </label>

          <div className="flex gap-3">
            <SubmitBtn label="Guardar y publicar" />
            <Link href={`/admin/paginas/${pageSlug}`}
              className="rounded-[8px] border border-line px-5 py-2 text-sm font-semibold text-slate hover:border-teal/40">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
