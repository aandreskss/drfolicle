'use client';

import { LeadForm } from '@/components/contact/LeadForm';
import type { Lang } from '@/lib/content/types';

export function ConsultaForm({ lang }: { lang: Lang }) {
  return <LeadForm lang={lang} waPhone="19548535335" />;
}
