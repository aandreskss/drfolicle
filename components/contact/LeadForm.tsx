'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/content/types';

const TREATMENTS = {
  es: [
    { value: 'Trasplante capilar', label: 'Trasplante capilar' },
    { value: 'Trasplante de barba', label: 'Trasplante de barba' },
    { value: 'Trasplante de cejas', label: 'Trasplante de cejas' },
    { value: 'Terapias capilares', label: 'Terapias capilares' },
    { value: 'Aún no lo sé', label: 'Aún no lo sé' },
  ],
  en: [
    { value: 'Hair transplant', label: 'Hair transplant' },
    { value: 'Beard transplant', label: 'Beard transplant' },
    { value: 'Eyebrow transplant', label: 'Eyebrow transplant' },
    { value: 'Hair therapies', label: 'Hair therapies' },
    { value: "Not sure yet", label: "Not sure yet" },
  ],
};

const T = {
  es: {
    name: 'Nombre completo', namePh: 'Tu nombre',
    email: 'Correo electrónico', emailPh: 'tu@correo.com',
    phone: 'Teléfono (opcional)', phonePh: '+57 300 000 0000',
    interest: 'Tratamiento de interés (opcional)',
    interestPh: 'Selecciona una opción',
    message: 'Mensaje (opcional)', messagePh: '¿Algo más que quieras comentarnos?',
    consent: 'Al enviar este formulario acepto que Dr Follicle Solutions almacene y use mis datos para contactarme. (Ley 1581 de 2012)',
    submit: 'Enviar solicitud',
    submitting: 'Enviando...',
    errorGeneric: 'Hubo un error al enviar. Por favor intenta de nuevo.',
    errorRate: 'Demasiadas solicitudes. Intenta de nuevo en una hora.',
    successTitle: '¡Solicitud enviada!',
    successText: 'Te contactaremos pronto para agendar tu valoración gratuita.',
    successBack: 'Enviar otra solicitud',
  },
  en: {
    name: 'Full name', namePh: 'Your name',
    email: 'Email address', emailPh: 'you@email.com',
    phone: 'Phone (optional)', phonePh: '+1 000 000 0000',
    interest: 'Treatment of interest (optional)',
    interestPh: 'Select an option',
    message: 'Message (optional)', messagePh: 'Anything else you want to tell us?',
    consent: 'By submitting this form I agree that Dr Follicle Solutions may store and use my data to contact me.',
    submit: 'Send request',
    submitting: 'Sending...',
    errorGeneric: 'Something went wrong. Please try again.',
    errorRate: 'Too many requests. Please try again in an hour.',
    successTitle: 'Request sent!',
    successText: 'We will contact you soon to schedule your free assessment.',
    successBack: 'Send another request',
  },
} as const;

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputCls = 'w-full rounded-[10px] border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:border-teal focus:shadow-[0_0_0_3px_#0196AD1A] transition-shadow duration-150';
const labelCls = 'block text-xs font-bold uppercase tracking-widest text-slate mb-1.5';

export function LeadForm({ lang, waPhone }: { lang: Lang; waPhone: string }) {
  const t = T[lang];
  const treats = TREATMENTS[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const waHref = `https://wa.me/${waPhone.replace(/\D/g, '')}?text=${encodeURIComponent(lang === 'en' ? 'Hi, I want to schedule a free assessment.' : 'Hola, quiero agendar una valoración gratuita.')}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const hp = (form.elements.namedItem('website') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          interests: interest ? [interest] : [],
          message: message || undefined,
          hp,
          locale: lang,
        }),
      });

      if (res.status === 429) {
        setErrorMsg(t.errorRate);
        setStatus('error');
        return;
      }
      if (!res.ok) {
        setErrorMsg(t.errorGeneric);
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg(t.errorGeneric);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-extrabold text-ink">{t.successTitle}</h3>
        <p className="mb-6 text-sm text-slate">{t.successText}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-teal-deep px-6 text-sm font-bold text-white hover:bg-teal-petroleo transition-colors duration-150"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z" />
            </svg>
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => { setStatus('idle'); setName(''); setEmail(''); setPhone(''); setInterest(''); setMessage(''); }}
            className="text-sm font-semibold text-teal-deep underline-offset-2 hover:underline"
          >
            {t.successBack}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[32px] border border-line bg-white p-8">
      {/* Honeypot — hidden from humans via CSS, not type="hidden" so bots fill it */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="lf-name" className={labelCls}>{t.name} <span className="text-teal" aria-hidden>*</span></label>
          <input
            id="lf-name"
            type="text"
            required
            autoComplete="name"
            placeholder={t.namePh}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="lf-email" className={labelCls}>{t.email} <span className="text-teal" aria-hidden>*</span></label>
          <input
            id="lf-email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPh}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="lf-phone" className={labelCls}>{t.phone}</label>
          <input
            id="lf-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t.phonePh}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="lf-interest" className={labelCls}>{t.interest}</label>
          <select
            id="lf-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={inputCls + ' cursor-pointer'}
          >
            <option value="">{t.interestPh}</option>
            {treats.map((tr) => (
              <option key={tr.value} value={tr.value}>{tr.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lf-message" className={labelCls}>{t.message}</label>
          <textarea
            id="lf-message"
            rows={4}
            placeholder={t.messagePh}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputCls + ' resize-none'}
          />
        </div>

        <p className="text-[11px] leading-relaxed text-slate">{t.consent}</p>

        {status === 'error' && (
          <p role="alert" className="rounded-[10px] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-teal-deep px-7 text-sm font-bold text-white hover:bg-teal-petroleo transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              {t.submitting}
            </>
          ) : t.submit}
        </button>
      </div>
    </form>
  );
}
