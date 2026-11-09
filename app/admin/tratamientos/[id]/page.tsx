import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { serviceClient } from '@/lib/content/server-client';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { saveTreatment } from './actions';

export const metadata: Metadata = { title: 'Editar tratamiento' };

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

export default async function EditarTratamientoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: t } = await serviceClient().from('treatments').select('*').eq('id', id).single();
  if (!t) notFound();

  const name  = t.name  as { es: string; en: string };
  const short = t.short as { es: string; en: string };

  return (
    <div className="max-w-[700px]">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/tratamientos" className="text-sm font-semibold text-slate hover:text-ink">← Tratamientos</Link>
        <span className="text-slate">/</span>
        <span className="text-sm font-semibold text-ink">{name.es}</span>
      </div>

      <div className="rounded-[16px] border border-line bg-white p-6">
        <form action={saveTreatment} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LB}>Nombre (español) *</label>
              <input name="name_es" defaultValue={name.es} required className={IN} />
            </div>
            <div>
              <label className={LB}>Nombre (inglés)</label>
              <input name="name_en" defaultValue={name.en ?? ''} className={IN} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LB}>Descripción corta (español)</label>
              <textarea name="short_es" defaultValue={short.es ?? ''} rows={3} className={IN} />
            </div>
            <div>
              <label className={LB}>Descripción corta (inglés)</label>
              <textarea name="short_en" defaultValue={short.en ?? ''} rows={3} className={IN} />
            </div>
          </div>
          <div>
            <label className={LB}>Layout en inicio (0=sin imagen, 1-3=con imagen)</label>
            <select name="home_layout" defaultValue={String(t.home_layout)} className={`${IN} w-32`}>
              {[0,1,2,3].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={LB}>Posición</label>
            <input type="number" name="position" defaultValue={t.position} className={`${IN} w-24`} />
          </div>
          <div className="flex flex-col gap-2">
            <Toggle name="show_home"   label="Mostrar en inicio"       checked={t.show_home}   />
            <Toggle name="show_menu"   label="Mostrar en menú"         checked={t.show_menu}   />
            <Toggle name="show_footer" label="Mostrar en pie de página" checked={t.show_footer} />
            <Toggle name="visible"     label="Visible (publicado)"      checked={t.visible}     />
          </div>
          <div className="flex gap-3 mt-2">
            <SubmitBtn label="Guardar cambios" />
            <Link href="/admin/tratamientos" className="rounded-[8px] border border-line px-5 py-2 text-sm font-semibold text-slate hover:border-teal/40">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
