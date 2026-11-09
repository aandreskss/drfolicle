'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/content/types';

const INTERESTS_ES = ['Cabello', 'Barba', 'Cejas', 'Aún no lo sé'];
const INTERESTS_EN = ['Hair', 'Beard', 'Eyebrows', 'Not sure yet'];
const COUNTRIES = ['Colombia', 'Estados Unidos', 'España', 'México', 'Canadá', 'Otro país'];
const COUNTRIES_EN = ['Colombia', 'United States', 'Spain', 'Mexico', 'Canada', 'Other country'];
const CC_OPTIONS = ['+57', '+1', '+34', '+52', '+44'];

type Status = 'idle' | 'loading' | 'success' | 'error';

const fi: React.CSSProperties = { height: '52px', borderRadius: '8px', border: '1.5px solid #B9CDD2', background: '#FFFFFF', padding: '0 16px', font: '400 16px Manrope, sans-serif', color: '#0A2730', width: '100%', boxSizing: 'border-box' };

export function ContactFormClient({ lang, waPhone }: { lang: Lang; waPhone: string }) {
  const [name, setName] = useState('');
  const [cc, setCc] = useState('+57');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(lang === 'en' ? 'Colombia' : 'Colombia');
  const [interests, setInterests] = useState<string[]>([lang === 'en' ? 'Hair' : 'Cabello']);
  const [msg, setMsg] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [tried, setTried] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const intOpts = lang === 'en' ? INTERESTS_EN : INTERESTS_ES;
  const countries = lang === 'en' ? COUNTRIES_EN : COUNTRIES;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = lang === 'en' ? 'Enter your name.' : 'Escribe tu nombre.';
    if (phone.replace(/\D/g, '').length < 7) e.phone = lang === 'en' ? 'Enter a valid WhatsApp number.' : 'Escribe un número de WhatsApp válido.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = lang === 'en' ? 'Enter a valid email.' : 'Escribe un correo válido, por ejemplo nombre@correo.com.';
    if (!consent) e.consent = lang === 'en' ? 'We need your authorization to contact you.' : 'Necesitamos tu autorización para contactarte.';
    return e;
  };

  const toggleInterest = (label: string) => {
    const notSure = lang === 'en' ? 'Not sure yet' : 'Aún no lo sé';
    if (label === notSure) {
      setInterests([label]);
    } else {
      const filtered = interests.filter((x) => x !== notSure);
      if (filtered.includes(label)) {
        const next = filtered.filter((x) => x !== label);
        setInterests(next.length ? next : [label]);
      } else {
        setInterests([...filtered, label]);
      }
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setTried(true); return; }

    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const hp = (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '';

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: `${cc} ${phone}`,
          interests,
          message: msg || undefined,
          hp,
          locale: lang,
        }),
      });
      if (res.status === 429) {
        setErrorMsg(lang === 'en' ? 'Too many requests. Please try again in an hour.' : 'Demasiadas solicitudes. Intenta de nuevo en una hora.');
        setStatus('error');
        return;
      }
      if (!res.ok) {
        setErrorMsg(lang === 'en' ? 'Something went wrong. Please try again.' : 'Hubo un error al enviar. Por favor intenta de nuevo.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg(lang === 'en' ? 'Something went wrong. Please try again.' : 'Hubo un error al enviar. Por favor intenta de nuevo.');
      setStatus('error');
    }
  }

  const errs = tried ? validate() : {};

  if (status === 'success') {
    const firstName = name.trim().split(' ')[0] ?? '';
    const intMsg = `Hola, soy ${name.trim()}. Acabo de solicitar mi valoración en la web (${interests.join(', ')}, ${country}).`;
    const waHref = `https://wa.me/${waPhone.replace(/\D/g, '')}?text=${encodeURIComponent(intMsg)}`;
    return (
      <div role="status" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingTop: '16px' }}>
        <span style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#C5D300', color: '#0A2730', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>
        </span>
        <strong style={{ fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          {lang === 'en' ? `We received your request, ${firstName}.` : `Recibimos tu solicitud, ${firstName}.`}
        </strong>
        <p style={{ margin: 0, fontSize: '17px', color: '#24414A' }}>
          {lang === 'en'
            ? `A specialist will contact you via WhatsApp at ${cc} ${phone} to schedule your assessment. We also sent a copy to ${email}.`
            : `Un especialista te escribirá por WhatsApp al ${cc} ${phone} para agendar tu valoración. También te enviamos una copia a ${email}.`}
        </p>
        <div style={{ background: '#E3F2F4', borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <strong style={{ fontSize: '17px' }}>
            {lang === 'en' ? 'Want to start the conversation?' : '¿Quieres adelantar la conversación?'}
          </strong>
          <span style={{ fontSize: '15px', color: '#24414A' }}>
            {lang === 'en' ? 'Open WhatsApp with a message ready with your details.' : 'Abre WhatsApp con un mensaje listo con tus datos.'}
          </span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ alignSelf: 'flex-start', height: '52px', padding: '0 22px', borderRadius: '14px', background: '#007A8C', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
            {lang === 'en' ? 'Continue on WhatsApp' : 'Continuar en WhatsApp'}
          </a>
        </div>
        <button
          type="button"
          className="chip"
          onClick={() => { setStatus('idle'); setName(''); setPhone(''); setEmail(''); setMsg(''); setConsent(false); setTried(false); setInterests([lang === 'en' ? 'Hair' : 'Cabello']); }}
          style={{ alignSelf: 'flex-start', background: 'none', border: 0, padding: '4px 0', font: '700 15px Manrope, sans-serif', color: '#007A8C', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {lang === 'en' ? 'Send another request' : 'Enviar otra solicitud'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <strong style={{ fontSize: '24px', letterSpacing: '-0.015em', display: 'block' }}>
          {lang === 'en' ? 'Request your free assessment' : 'Solicita tu valoración gratuita'}
        </strong>
        <span style={{ fontSize: '14px', color: '#4B5F66' }}>
          {lang === 'en' ? 'Fields marked with * are required.' : 'Los campos marcados con * son obligatorios.'}
        </span>
      </div>

      <div className="g-two" style={{ display: 'grid', gap: '20px' }}>
        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="c-name" style={{ fontSize: '14px', fontWeight: 600 }}>
            {lang === 'en' ? 'Name' : 'Nombre'} *
          </label>
          <input id="c-name" style={{ ...fi, borderColor: errs.name ? '#B4232C' : '#B9CDD2' }} type="text" autoComplete="name" placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errs.name} aria-describedby={errs.name ? 'c-name-e' : undefined} />
          {errs.name && <span id="c-name-e" style={{ fontSize: '13px', fontWeight: 600, color: '#B4232C' }}>{errs.name}</span>}
        </div>

        {/* WhatsApp */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="c-wa" style={{ fontSize: '14px', fontWeight: 600 }}>WhatsApp *</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <label htmlFor="c-cc" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clipPath: 'inset(50%)' }}>
              {lang === 'en' ? 'Country code' : 'Código de país'}
            </label>
            <select id="c-cc" value={cc} onChange={(e) => setCc(e.target.value)} style={{ ...fi, width: '92px', padding: '0 8px', fontWeight: 600, flexShrink: 0 }}>
              {CC_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <input id="c-wa" style={{ ...fi, flex: 1, minWidth: 0, borderColor: errs.phone ? '#B4232C' : '#B9CDD2' }} type="tel" autoComplete="tel-national" placeholder="300 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errs.phone} aria-describedby={errs.phone ? 'c-wa-e' : undefined} />
          </div>
          {errs.phone && <span id="c-wa-e" style={{ fontSize: '13px', fontWeight: 600, color: '#B4232C' }}>{errs.phone}</span>}
        </div>

        {/* Email */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="c-mail" style={{ fontSize: '14px', fontWeight: 600 }}>
            {lang === 'en' ? 'Email address' : 'Correo electrónico'} *
          </label>
          <input id="c-mail" style={{ ...fi, borderColor: errs.email ? '#B4232C' : '#B9CDD2' }} type="email" autoComplete="email" placeholder="nombre@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errs.email} aria-describedby={errs.email ? 'c-mail-e' : undefined} />
          {errs.email && <span id="c-mail-e" style={{ fontSize: '13px', fontWeight: 600, color: '#B4232C' }}>{errs.email}</span>}
        </div>

        {/* Country */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="c-country" style={{ fontSize: '14px', fontWeight: 600 }}>
            {lang === 'en' ? 'Country of residence' : 'País de residencia'}
          </label>
          <select id="c-country" value={country} onChange={(e) => setCountry(e.target.value)} style={{ ...fi, cursor: 'pointer' }}>
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Interests */}
      <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <legend style={{ fontSize: '14px', fontWeight: 600, padding: 0, marginBottom: '10px' }}>
          {lang === 'en' ? 'What would you like to recover?' : '¿Qué te gustaría recuperar?'}
          {' '}
          <span style={{ fontWeight: 500, color: '#4B5F66' }}>
            {lang === 'en' ? 'You can choose several.' : 'Puedes elegir varias.'}
          </span>
        </legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {intOpts.map((label) => {
            const on = interests.includes(label);
            return (
              <button
                key={label}
                type="button"
                className="chip"
                onClick={() => toggleInterest(label)}
                aria-pressed={on}
                style={{ height: '44px', padding: '0 18px', borderRadius: '999px', border: `1.5px solid ${on ? '#0A2730' : '#B9CDD2'}`, background: on ? '#0A2730' : '#FFFFFF', color: on ? '#FFFFFF' : '#0A2730', font: '600 14px Manrope, sans-serif', cursor: 'pointer' }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Message */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="c-msg" style={{ fontSize: '14px', fontWeight: 600 }}>
          {lang === 'en' ? 'Tell us about your case' : 'Cuéntanos tu caso'}
          {' '}
          <span style={{ fontWeight: 500, color: '#4B5F66' }}>({lang === 'en' ? 'optional' : 'opcional'})</span>
        </label>
        <textarea
          id="c-msg"
          rows={4}
          placeholder={lang === 'en' ? 'E.g.: how long have you noticed hair loss or which area you\'d like to recover.' : 'Por ejemplo: desde cuándo notas la caída o qué zona te gustaría recuperar.'}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ ...fi, height: 'auto', minHeight: '110px', padding: '12px 16px', lineHeight: 1.55, resize: 'vertical' }}
        />
      </div>

      {/* Consent */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '13px', lineHeight: 1.55, color: '#24414A', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-describedby={errs.consent ? 'c-ok-e' : undefined}
            style={{ width: '22px', height: '22px', margin: 0, flexShrink: 0, accentColor: '#007A8C' }}
          />
          <span>
            {lang === 'en'
              ? <>I authorize Dr Follicle Solutions to process my personal data to contact me about my assessment, in accordance with their <a href="https://drfolliclesolutions.com/privacidad-seguridad-y-condiciones/" style={{ color: '#007A8C' }}>Data Treatment Policy</a>. *</>
              : <>Autorizo a Dr Follicle Solutions a tratar mis datos personales para contactarme sobre mi valoración, conforme a su <a href="https://drfolliclesolutions.com/privacidad-seguridad-y-condiciones/" style={{ color: '#007A8C' }}>Política de Tratamiento de Datos</a> y a la Ley 1581 de 2012. *</>}
          </span>
        </label>
        {errs.consent && <span id="c-ok-e" style={{ fontSize: '13px', fontWeight: 600, color: '#B4232C', paddingLeft: '34px' }}>{errs.consent}</span>}
      </div>

      {status === 'error' && (
        <p role="alert" style={{ margin: 0, background: '#FBEAEA', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', fontWeight: 600, color: '#B4232C' }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn"
        style={{ height: '58px', border: 0, borderRadius: '14px', background: '#007A8C', color: '#FFFFFF', font: '700 17px Manrope, sans-serif', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin" style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" strokeOpacity=".25" /><path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            {lang === 'en' ? 'Sending...' : 'Enviando...'}
          </>
        ) : (
          <>
            {lang === 'en' ? 'Request free assessment' : 'Solicitar valoración gratis'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </>
        )}
      </button>
    </form>
  );
}
