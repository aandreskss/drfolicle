import { getSettings } from '@/lib/content/settings';

interface ButtonsSettings {
  waOn: boolean;
  waLabel: string;
  waMsg: string;
}

interface ContactSettings {
  wa: string;
}

function waUrl(phone: string, msg: string) {
  const num = phone.replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export async function WhatsAppButton() {
  const [buttons, contact] = await Promise.all([
    getSettings<ButtonsSettings>('buttons'),
    getSettings<ContactSettings>('contact'),
  ]);

  if (!buttons?.waOn) return null;

  const phone = contact?.wa ?? '19548535335';
  const href = waUrl(phone, buttons.waMsg ?? '');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={buttons.waLabel ?? 'WhatsApp'}
      className="fixed bottom-6 right-6 z-40 hidden md:flex h-14 items-center gap-2.5 rounded-pill bg-dark pl-4 pr-5 text-sm font-bold text-lime shadow-[0_8px_32px_rgba(10,39,48,0.28)] hover:bg-dark-2 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z" />
      </svg>
      {buttons.waLabel}
    </a>
  );
}
