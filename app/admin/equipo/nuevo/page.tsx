import type { Metadata } from 'next';
import Link from 'next/link';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { saveTeamMember } from '../actions';

export const metadata: Metadata = { title: 'Nuevo miembro' };

const IN = 'w-full rounded-[8px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/40';
const LB = 'block mb-1 text-sm font-semibold text-ink';

export default function NuevoMiembroPage() {
  return (
    <div className="max-w-[700px]">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/equipo" className="text-sm font-semibold text-slate hover:text-ink">← Equipo</Link>
        <span className="text-slate">/</span>
        <span className="text-sm font-semibold text-ink">Nuevo miembro</span>
      </div>
      <div className="rounded-[16px] border border-line bg-white p-6">
        <form action={saveTeamMember} className="flex flex-col gap-4">
          <input type="hidden" name="id" value="" />
          <div>
            <label className={LB}>Nombre completo *</label>
            <input name="name" required className={IN} placeholder="Dr. Juan Pérez" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LB}>Rol (español) *</label>
              <input name="role_es" required className={IN} placeholder="Cirugía de restauración capilar…" />
            </div>
            <div>
              <label className={LB}>Rol (inglés)</label>
              <input name="role_en" className={IN} placeholder="Hair restoration surgery…" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LB}>Credenciales (español)</label>
              <textarea name="cred_es" rows={3} className={IN} placeholder="Universidad, registro, años de experiencia…" />
            </div>
            <div>
              <label className={LB}>Credenciales (inglés)</label>
              <textarea name="cred_en" rows={3} className={IN} placeholder="University, registry, years of experience…" />
            </div>
          </div>
          <div>
            <label className={LB}>Ruta de la foto</label>
            <input name="photo_path" className={IN} placeholder="images/doctor.jpg" />
            <p className="mt-1 text-xs text-slate">Archivo en public/ (ej: images/doctor.jpg) o URL completa.</p>
          </div>
          <div>
            <label className={LB}>Posición</label>
            <input type="number" name="position" defaultValue={99} className={`${IN} w-24`} />
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" name="visible" defaultChecked className="peer sr-only" />
            <div className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-teal after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
            <span className="text-sm text-ink">Visible en el sitio</span>
          </label>
          <div className="flex gap-3 mt-2">
            <SubmitBtn label="Crear miembro" />
            <Link href="/admin/equipo" className="rounded-[8px] border border-line px-5 py-2 text-sm font-semibold text-slate hover:border-teal/40">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
