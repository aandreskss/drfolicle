import { getSettings } from '@/lib/content/settings';

interface ButtonsSettings {
  barOn: boolean;
  cta: string;
  waOn: boolean;
  waMsg: string;
}

interface ContactSettings {
  wa: string;
}

function waUrl(phone: string, msg: string) {
  const num = phone.replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export async function MobileBar() {
  const [buttons, contact] = await Promise.all([
    getSettings<ButtonsSettings>('buttons'),
    getSettings<ContactSettings>('contact'),
  ]);

  if (!buttons?.barOn) return null;

  const phone = contact?.wa ?? '19548535335';
  const href = waUrl(phone, buttons.waMsg ?? '');

  return (
    <div
      className="md:hidden sticky bottom-0 z-30 flex gap-2 px-3 pb-4 pt-2.5"
      style={{
        background: 'linear-gradient(rgba(247,248,245,0), rgba(247,248,245,0.96) 30%)',
      }}
    >
      <a
        href="/contacto"
        className="flex flex-1 h-14 items-center justify-center rounded-[14px] bg-teal-deep text-base font-bold text-white shadow-[0_10px_24px_rgba(10,39,48,0.2)] hover:bg-teal-petroleo transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD]"
      >
        {buttons.cta}
      </a>
      {buttons.waOn && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-dark text-lime shadow-[0_10px_24px_rgba(10,39,48,0.2)] hover:bg-dark-2 transition-colors duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]"
        >
          <svg
            width="24"
            height="24"
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
        </a>
      )}
    </div>
  );
}
