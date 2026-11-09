export const instant = false;

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/admin/Sidebar';
import { UserMenu } from '@/components/admin/UserMenu';
import '../globals.css';

export const metadata: Metadata = {
  title: { default: 'Panel · Dr Follicle', template: '%s · Panel' },
  robots: { index: false, follow: false },
};

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email ?? '';

  return (
    <html lang="es" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex h-full overflow-hidden bg-[#F3F5F7] text-ink">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-white px-6">
            <span className="text-sm font-semibold text-slate">Panel de administración</span>
            <UserMenu email={email} />
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
