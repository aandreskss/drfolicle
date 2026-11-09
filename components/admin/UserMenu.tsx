'use client';
import { signOut } from '@/app/admin/login/actions';

export function UserMenu({ email }: { email: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/20 text-xs font-bold text-teal-deep">
          {email.charAt(0).toUpperCase()}
        </div>
        <span className="hidden text-sm text-slate sm:block">{email}</span>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-xs font-semibold text-slate transition-colors hover:border-ink hover:text-ink"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" />
          </svg>
          Salir
        </button>
      </form>
    </div>
  );
}
