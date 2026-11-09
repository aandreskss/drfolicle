import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { saveTeamMember, deleteTeamMember } from '../actions';
import { mediaUrl } from '@/lib/content/collections';

export const metadata: Metadata = { title: 'Editar miembro' };

const IN = 'w-full rounded-[8px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/40';
const LB = 'block mb-1 text-sm font-semibold text-ink';

export default async function EditarMiembroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = serviceClient();
  const { data: m } = await db
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();
  if (!m) notFound();

  // Resolve photo
  let photoUrl: string | null = null;
  let photoPath = '';
  if (m.photo_media_id) {
    const { data: media } = await db.from('media').select('path').eq('id', m.photo_media_id).single();
    if (media) { photoPath = media.path; photoUrl = mediaUrl(media.path); }
  }

  const role = m.role as { es: string; en: string };
  const cred = m.credentials as { es: string; en: string };

  return (
    <div className="max-w-[700px]">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/equipo" className="text-sm font-semibold text-slate hover:text-ink">← Equipo</Link>
        <span className="text-slate">/</span>
        <span className="text-sm font-semibold text-ink">{m.name}</span>
      </div>

      <div className="rounded-[16px] border border-line bg-white p-6">
        {photoUrl && (
          <div className="mb-6 flex justify-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-line">
              <Image src={photoUrl} alt={m.name} fill className="object-cover" />
            </div>
          </div>
        )}

        <form action={saveTeamMember} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={id} />
          <div>
            <label className={LB}>Nombre completo *</label>
            <input name="name" defaultValue={m.name} required className={IN} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LB}>Rol (español) *</label>
              <input name="role_es" defaultValue={role.es} required className={IN} />
            </div>
            <div>
              <label className={LB}>Rol (inglés)</label>
              <input name="role_en" defaultValue={role.en ?? ''} className={IN} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LB}>Credenciales (español)</label>
              <textarea name="cred_es" defaultValue={cred.es ?? ''} rows={3} className={IN} />
            </div>
            <div>
              <label className={LB}>Credenciales (inglés)</label>
              <textarea name="cred_en" defaultValue={cred.en ?? ''} rows={3} className={IN} />
            </div>
          </div>
          <div>
            <label className={LB}>Ruta de la foto</label>
            <input name="photo_path" defaultValue={photoPath} className={IN} placeholder="images/doctor.jpg" />
            <p className="mt-1 text-xs text-slate">Archivo en public/ (ej: images/doctor.jpg) o URL completa.</p>
          </div>
          <div>
            <label className={LB}>Posición</label>
            <input type="number" name="position" defaultValue={m.position} className={`${IN} w-24`} />
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" name="visible" defaultChecked={m.visible} className="peer sr-only" />
            <div className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-teal after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
            <span className="text-sm text-ink">Visible en el sitio</span>
          </label>
          <div className="flex gap-3 mt-2">
            <SubmitBtn label="Guardar cambios" />
            <Link href="/admin/equipo" className="rounded-[8px] border border-line px-5 py-2 text-sm font-semibold text-slate hover:border-teal/40">
              Cancelar
            </Link>
          </div>
        </form>
      </div>

      <div className="mt-4 rounded-[16px] border border-danger/20 bg-danger-bg/30 p-6">
        <h2 className="mb-2 font-extrabold text-danger">Eliminar miembro</h2>
        <p className="mb-4 text-sm text-slate">Esta acción no se puede deshacer.</p>
        <form action={deleteTeamMember}>
          <input type="hidden" name="id" value={id} />
          <SubmitBtn label="Eliminar" variant="danger" />
        </form>
      </div>
    </div>
  );
}
