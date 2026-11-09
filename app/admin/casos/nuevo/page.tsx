import type { Metadata } from 'next';
import Link from 'next/link';
import { SubmitBtn } from '@/components/admin/SubmitBtn';
import { saveCase } from '../actions';

export const metadata: Metadata = { title: 'Nuevo caso' };

const IN = 'w-full rounded-[8px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal/40';
const LB = 'block mb-1 text-sm font-semibold text-ink';

export default function NuevoCasoPage() {
  return (
    <div className="max-w-[700px]">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/casos" className="text-sm font-semibold text-slate hover:text-ink">← Casos</Link>
        <span className="text-slate">/</span>
        <span className="text-sm font-semibold text-ink">Nuevo caso</span>
      </div>
      <div className="rounded-[16px] border border-line bg-white p-6">
        <form action={saveCase} className="flex flex-col gap-4">
          <input type="hidden" name="id" value="" />
          <div>
            <label className={LB}>Título (español) *</label>
            <input name="title_es" required className={IN} placeholder="Ej: Línea frontal y entradas" />
          </div>
          <div>
            <label className={LB}>Categoría *</label>
            <select name="category" className={IN}>
              <option value="capilar">Trasplante capilar</option>
              <option value="barba">Trasplante de barba</option>
              <option value="cejas">Trasplante de cejas</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={LB}>Tiempo post-op</label>
              <input name="months" className={IN} placeholder="12 meses" />
            </div>
            <div>
              <label className={LB}>Injertos</label>
              <input name="units" className={IN} placeholder="2.800 unidades" />
            </div>
            <div>
              <label className={LB}>País de origen</label>
              <input name="origin" className={IN} placeholder="Colombia" />
            </div>
          </div>
          <div>
            <label className={LB}>Imagen ANTES (ruta)</label>
            <input name="before_path" className={IN} placeholder="images/caso1-antes.jpg" />
          </div>
          <div>
            <label className={LB}>Imagen DESPUÉS (ruta)</label>
            <input name="after_path" className={IN} placeholder="images/caso1-despues.jpg" />
          </div>
          <div>
            <label className={LB}>Posición</label>
            <input type="number" name="position" defaultValue={99} className={`${IN} w-24`} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="consent_verified" className="peer sr-only" />
              <div className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-teal after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
              <span className="text-sm text-ink">Consentimiento verificado</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="visible" defaultChecked className="peer sr-only" />
              <div className="relative h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-teal after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
              <span className="text-sm text-ink">Visible en el sitio</span>
            </label>
          </div>
          <div className="flex gap-3 mt-2">
            <SubmitBtn label="Crear caso" />
            <Link href="/admin/casos" className="rounded-[8px] border border-line px-5 py-2 text-sm font-semibold text-slate hover:border-teal/40">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
