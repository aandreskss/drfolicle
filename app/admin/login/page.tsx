'use client';
import { useActionState } from 'react';
import { signIn } from './actions';

export default function LoginPage() {
  const [state, action, isPending] = useActionState(signIn, null);

  return (
    <html lang="es" className="h-full">
      <body className="h-full bg-dark flex items-center justify-center p-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div className="w-full max-w-[400px]">
          <div className="mb-8 text-center">
            <p className="text-2xl font-extrabold text-white tracking-tight">Dr Follicle</p>
            <p className="text-sm text-[#BFD6DB] mt-1">Panel de administración</p>
          </div>

          <form
            action={action}
            className="rounded-[20px] bg-white p-8 shadow-2xl"
          >
            <h1 className="mb-6 text-lg font-extrabold text-[#0A2730]">Iniciar sesión</h1>

            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#4B5F66]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-[10px] border border-[#D5E3E6] px-4 py-3 text-sm text-[#0A2730] outline-none focus:border-[#0196AD] focus:shadow-[0_0_0_3px_#0196AD1A]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#4B5F66]"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-[10px] border border-[#D5E3E6] px-4 py-3 text-sm text-[#0A2730] outline-none focus:border-[#0196AD] focus:shadow-[0_0_0_3px_#0196AD1A]"
                />
              </div>

              {state?.error && (
                <p
                  role="alert"
                  className="rounded-[10px] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                >
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 h-12 w-full rounded-[12px] bg-[#007A8C] font-bold text-white transition-colors hover:bg-[#00566E] disabled:opacity-60"
              >
                {isPending ? 'Entrando…' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </body>
    </html>
  );
}
