'use client';
import { useFormStatus } from 'react-dom';

export function SubmitBtn({ label = 'Guardar', variant = 'primary' }: { label?: string; variant?: 'primary' | 'danger' }) {
  const { pending } = useFormStatus();
  const cls =
    variant === 'danger'
      ? 'bg-danger text-white hover:opacity-90'
      : 'bg-teal text-white hover:bg-teal-deep';
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-[8px] px-5 py-2 text-sm font-bold transition-opacity disabled:opacity-50 ${cls}`}
    >
      {pending ? 'Guardando…' : label}
    </button>
  );
}
