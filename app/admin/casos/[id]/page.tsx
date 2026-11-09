import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { saveCase, deleteCase } from '../actions';
import { mediaUrl } from '@/lib/content/collections';

export const metadata: Metadata = { title: 'Editar caso' };

const IN = 'w-full rounded-[8px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/40';
const LB = 'block mb-1 text-sm font-semibold text-ink';

function Toggle({ name, label, checked }: { name: string; label: string; checked: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input type="checkbox" name={name} defaultChecked={checked} className="peer sr-only" />
      <div className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-teal after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

export default async function EditarCasoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = serviceClient();
  const { data: c } = await db.from('cases').select('*').eq('id', id).single();
  if (!c) notFound();

  const mediaIds = [c.before_media_id, c.after_media_id].filter(Boolean);
  const { data: mediaRows } = await db.from('media').select('id,path').in('id', mediaIds);
  const mMap = Object.fromEntries(mediaRows?.map((m) => [m.id, { url: mediaUrl(m.path), path: m.path }]) ?? []);

  const beforeData = c.before_media_id ? mMap[c.before_media_id] : null;
  const afterData  = c.after_media_id  ? mMap[c.after_media_id]  : null;
  const title = (c.title as { es: string }).es;

  return (
    <div className="max-w-[700px]">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/casos" className="text-sm font-semibold text-slate hover:text-ink">← Casos</Link>
        <span className="text-slate">/</span>
        <span className="text-sm font-semibold text-ink">{title}</span>
      </div>

      {/* Preview */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        {[beforeData, afterData].map((d, i) => (
          <div key={i} className="relative aspect-video overflow-hidden rounded-[12px] bg-mist">
            {d ? (
              <Image src={d.url} alt={i === 0 ? 'Antes' : 'Después'} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate">{i === 0 ? 'Sin antes' : 'Sin después'}</div>
            )}
            <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              {i === 0 ? 'Antes' : 'Después'}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-[16px] border border-line bg-white p-6">
        <form action={saveCase} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={id} />
          <div>
            <label className={LB}>Título (español) *</label>
            <input name="title_es" defaultValue={title} required className={IN} />
          </div>
          <div>
            <label className={LB}>Categoría</label>
            <select name="category" defaultValue={c.category} className={IN}>
              <option value="capilar">Trasplante capilar</option>
              <option value="barba">Trasplante de barba</option>
              <option value="cejas">Trasplante de cejas</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={LB}>Tiempo post-op</label>
              <input name="months" defaultValue={c.months ?? ''} className={IN} />
            </div>
            <div>
              <label className={LB}>Injertos</label>
              <input name="units" defaultValue={c.units ?? ''} className={IN} />
            </div>
            <div>
              <label className={LB}>País de origen</label>
              <input name="origin" defaultValue={c.origin ?? ''} className={IN} />
            </div>
          </div>
          <div>
            <label className={LB}>Imagen ANTES (ruta)</label>
            <input name="before_path" defaultValue={beforeData?.path ?? ''} className={IN} placeholder="images/caso1-antes.jpg" />
          </div>
          <div>
            <label className={LB}>Imagen DESPUÉS (ruta)</label>
            <input name="after_path" defaultValue={afterData?.path ?? ''} className={IN} placeholder="images/caso1-despues.jpg" />
          </div>
          <div>
            <label className={LB}>Posición</label>
            <input type="number" name="position" defaultValue={c.position} className={`${IN} w-24`} />
          </div>
          <div className="flex flex-col gap-2">
            <Toggle name="consent_verified" label="Consentimiento verificado" checked={c.consent_verified} />
            <Toggle name="visible"          label="Visible en el sitio"       checked={c.visible} />
          </div>
          <div className="flex gap-3 mt-2">
            <SubmitBtn label="Guardar cambios" />
            <Link href="/admin/casos" className="rounded-[8px] border border-line px-5 py-2 text-sm font-semibold text-slate hover:border-teal/40">
              Cancelar
            </Link>
          </div>
        </form>
      </div>

      <div className="mt-4 rounded-[16px] border border-danger/20 bg-danger-bg/30 p-6">
        <h2 className="mb-2 font-extrabold text-danger">Eliminar caso</h2>
        <p className="mb-4 text-sm text-slate">Esta acción no se puede deshacer.</p>
        <form action={deleteCase}>
          <input type="hidden" name="id" value={id} />
          <SubmitBtn label="Eliminar" variant="danger" />
        </form>
      </div>
    </div>
  );
}
