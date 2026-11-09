import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { toggleTeamVisible } from './actions';
import { mediaUrl } from '@/lib/content/collections';

export const metadata: Metadata = { title: 'Equipo' };

export default async function EquipoPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const { data: members } = await serviceClient()
    .from('team_members')
    .select('id,position,name,role,photo_media_id,needs_info,visible')
    .order('position');

  // Resolve photo URLs
  const photoIds = members?.map((m) => m.photo_media_id).filter(Boolean) ?? [];
  const { data: mediaRows } = await serviceClient().from('media').select('id,path').in('id', photoIds);
  const photoMap = Object.fromEntries(mediaRows?.map((m) => [m.id, mediaUrl(m.path)]) ?? []);

  return (
    <div className="max-w-[900px]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Equipo</h1>
          <p className="mt-0.5 text-sm text-slate">{members?.length ?? 0} miembros</p>
        </div>
        <Link href="/admin/equipo/nuevo"
          className="rounded-[8px] bg-teal px-4 py-2 text-sm font-bold text-white hover:bg-teal-deep">
          + Nuevo miembro
        </Link>
      </div>

      {saved && (
        <div className="mb-4 rounded-[10px] border border-teal/20 bg-teal/5 px-4 py-3 text-sm font-semibold text-teal-deep">
          Guardado correctamente ✓
        </div>
      )}

      <div className="rounded-[16px] border border-line bg-white">
        {!members || members.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate">No hay miembros del equipo.</p>
        ) : (
          <ul className="divide-y divide-line">
            {members.map((m) => {
              const role = (m.role as { es: string }).es;
              const photoUrl = m.photo_media_id ? photoMap[m.photo_media_id] : null;
              return (
                <li key={m.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-mist">
                    {photoUrl ? (
                      <Image src={photoUrl} alt={m.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate text-lg font-bold">
                        {m.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ink truncate">{m.name}</p>
                    <p className="text-sm text-slate truncate">{role}</p>
                    {m.needs_info && (
                      <span className="mt-0.5 inline-block rounded-pill bg-warn-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warn">
                        Datos pendientes
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <form action={toggleTeamVisible}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="visible" value={String(m.visible)} />
                      <SubmitBtn
                        label={m.visible ? 'Visible' : 'Oculto'}
                        variant={m.visible ? 'primary' : 'danger'}
                      />
                    </form>
                    <Link href={`/admin/equipo/${m.id}`}
                      className="rounded-[8px] border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-teal/40">
                      Editar
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
