import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { toggleCaseVisible } from './actions';
import { mediaUrl } from '@/lib/content/collections';

export const metadata: Metadata = { title: 'Casos' };

const CAT_LABEL: Record<string, string> = {
  capilar: 'Capilar', barba: 'Barba', cejas: 'Cejas',
};

export default async function CasosPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const db = serviceClient();
  const { data: cases } = await db
    .from('cases')
    .select('id,position,title,category,before_media_id,after_media_id,months,units,origin,consent_verified,visible')
    .order('position');

  const mediaIds = [
    ...(cases?.map((c) => c.before_media_id).filter(Boolean) ?? []),
    ...(cases?.map((c) => c.after_media_id).filter(Boolean) ?? []),
  ];
  const { data: mediaRows } = await db.from('media').select('id,path').in('id', mediaIds);
  const mMap = Object.fromEntries(mediaRows?.map((m) => [m.id, mediaUrl(m.path)]) ?? []);

  return (
    <div className="max-w-[1100px]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Casos antes/después</h1>
          <p className="mt-0.5 text-sm text-slate">{cases?.length ?? 0} casos</p>
        </div>
        <Link href="/admin/casos/nuevo"
          className="rounded-[8px] bg-teal px-4 py-2 text-sm font-bold text-white hover:bg-teal-deep">
          + Nuevo caso
        </Link>
      </div>

      {saved && <div className="mb-4 rounded-[10px] border border-teal/20 bg-teal/5 px-4 py-3 text-sm font-semibold text-teal-deep">Guardado ✓</div>}
      {error && <div className="mb-4 rounded-[10px] border border-danger/20 bg-danger-bg px-4 py-3 text-sm text-danger">{decodeURIComponent(error)}</div>}

      {!cases || cases.length === 0 ? (
        <div className="rounded-[16px] border border-line bg-white px-6 py-12 text-center text-sm text-slate">No hay casos.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const title = (c.title as { es: string }).es;
            const beforeUrl = c.before_media_id ? mMap[c.before_media_id] : null;
            const afterUrl  = c.after_media_id  ? mMap[c.after_media_id]  : null;
            return (
              <div key={c.id} className="rounded-[16px] border border-line bg-white overflow-hidden">
                <div className="grid grid-cols-2 gap-px bg-line">
                  {[beforeUrl, afterUrl].map((url, i) => (
                    <div key={i} className="relative aspect-square bg-mist">
                      {url ? (
                        <Image src={url} alt={i === 0 ? 'Antes' : 'Después'} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-slate">
                          {i === 0 ? 'Sin imagen antes' : 'Sin imagen después'}
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                        {i === 0 ? 'Antes' : 'Después'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <p className="font-bold text-ink leading-tight">{title}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate">
                    <span>{CAT_LABEL[c.category] ?? c.category}</span>
                    {c.months && <span>{c.months}</span>}
                    {c.units  && <span>{c.units}</span>}
                    {c.origin && <span>{c.origin}</span>}
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {c.consent_verified && (
                      <span className="rounded-pill bg-teal/10 px-2 py-0.5 text-[10px] font-bold text-teal-deep">Consentimiento ✓</span>
                    )}
                    <span className={`rounded-pill px-2 py-0.5 text-[10px] font-bold ${c.visible ? 'bg-teal/10 text-teal-deep' : 'bg-danger-bg text-danger'}`}>
                      {c.visible ? 'Visible' : 'Oculto'}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <form action={toggleCaseVisible} className="flex-1">
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="visible" value={String(c.visible)} />
                      <SubmitBtn label={c.visible ? 'Ocultar' : 'Publicar'} variant={c.visible ? 'danger' : 'primary'} />
                    </form>
                    <Link href={`/admin/casos/${c.id}`}
                      className="rounded-[8px] border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-teal/40">
                      Editar
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
