export const instant = false;

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPageSections } from '@/lib/content/sections';
import { getTreatments, getCases, getFaqs, getAllMedia } from '@/lib/content/collections';
import { getSettings } from '@/lib/content/settings';
import { Accordion } from '@/components/ui/Accordion';
import { ZonasSelectorClient } from '@/components/servicios/ZonasSelectorClient';
import { TratamientoResultadosClient } from '@/components/servicios/TratamientoResultadosClient';
import type { Lang } from '@/lib/content/types';
import { pickText, pickItem, pick } from '@/lib/content/types';

interface ContactSettings {
  phone: string;
  wa: string;
  email: string;
}

type CaseCategory = 'capilar' | 'barba' | 'cejas';

const CASE_CATEGORY: Record<string, CaseCategory> = {
  'trasplante-capilar': 'capilar',
  'trasplante-de-barba': 'barba',
  'trasplante-de-cejas': 'cejas',
};

const EYEBROW: Record<string, { es: string; en: string }> = {
  'trasplante-capilar': { es: 'Para hombres y mujeres', en: 'For men and women' },
  'trasplante-de-barba': { es: 'Barba y bigote', en: 'Beard and mustache' },
  'trasplante-de-cejas': { es: 'Micrografts FUE', en: 'Micrografts FUE' },
  'terapias-capilares': { es: 'Sin cirugía', en: 'No surgery' },
};

const BADGE: Record<string, { es: string; en: string }> = {
  'trasplante-capilar': { es: 'Caso real', en: 'Real case' },
  'trasplante-de-barba': { es: 'Antes | Después · caso real', en: 'Before | After · real case' },
  'trasplante-de-cejas': { es: '3–4 horas · anestesia local', en: '3–4 hours · local anesthesia' },
  'terapias-capilares': { es: 'Prevención y regeneración', en: 'Prevention and regeneration' },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug, locale } = await params;
    const treatments = await getTreatments();
    const t = treatments.find((tr) => tr.page_slug === slug);
    if (!t) return {};
    const lang = locale as Lang;
    return { title: pick(t.name, lang), description: pick(t.short, lang) };
  } catch {
    return {};
  }
}

export default async function TratamientoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const caseCategory = CASE_CATEGORY[slug];

  const [sections, treatments, cases, faqs, mediaMap, contact] = await Promise.all([
    getPageSections(slug),
    getTreatments(),
    getCases(caseCategory),
    getFaqs(slug),
    getAllMedia(),
    getSettings<ContactSettings>('contact'),
  ]);

  if (sections.length === 0) notFound();

  const treatment = treatments.find((t) => t.page_slug === slug);
  const treatmentName = treatment ? pick(treatment.name, lang) : '';
  const posNum = treatment ? String(treatment.position + 1).padStart(2, '0') : '01';
  const heroImgUrl = treatment?.image_media_id ? (mediaMap[treatment.image_media_id] ?? null) : null;

  const get = (key: string) => sections.find((s) => s.key === key);
  const heroSection = get('hero');
  const datosSection = get('datos');
  const zonasSection = get('zonas');
  const fueSection = get('fue');
  const esperarSection = get('esperar');
  const resultadosSection = get('resultados');
  const faqSection = get('faq');
  const ctaSection = get('cta');

  const heroText = heroSection ? pickText(heroSection.data.content, lang) : {};
  const datosItems = datosSection ? (datosSection.data.lists?.items?.items ?? []).filter((it) => it.visible) : [];
  const zonasText = zonasSection ? pickText(zonasSection.data.content, lang) : {};
  const zonasItems = zonasSection ? (zonasSection.data.lists?.items?.items ?? []).filter((it) => it.visible) : [];
  const zonasList = zonasItems.map((it) => { const d = pickItem(it, lang); return { name: d.t ?? '', text: d.d ?? '' }; });
  const fueText = fueSection ? pickText(fueSection.data.content, lang) : {};
  const fueSteps = fueSection ? (fueSection.data.lists?.pasos?.items ?? []).filter((it) => it.visible) : [];
  const fueBenefits = fueSection ? (fueSection.data.lists?.beneficios?.items ?? []).filter((it) => it.visible) : [];
  const esperarText = esperarSection ? pickText(esperarSection.data.content, lang) : {};
  const esperarItems = esperarSection ? (esperarSection.data.lists?.items?.items ?? []).filter((it) => it.visible) : [];
  const tlCount = esperarItems.length;
  const resText = resultadosSection ? pickText(resultadosSection.data.content, lang) : {};
  const faqText = faqSection ? pickText(faqSection.data.content, lang) : {};
  const ctaText = ctaSection ? pickText(ctaSection.data.content, lang) : {};

  const casesData = cases.map((c) => ({
    id: c.id,
    title: pick(c.title, lang),
    beforeUrl: c.before_media_id ? (mediaMap[c.before_media_id] ?? null) : null,
    afterUrl: c.after_media_id ? (mediaMap[c.after_media_id] ?? null) : null,
    months: c.months,
    units: c.units,
    origin: c.origin,
  }));

  const faqItems = faqs.map((f) => ({ id: f.id, question: pick(f.question, lang), answer: pick(f.answer, lang) }));
  const related = treatments.filter((t) => t.page_slug !== slug && t.visible);

  const waNumber = contact?.wa ?? contact?.phone ?? '19548535335';
  const waClean = waNumber.replace(/\D/g, '');

  const eyebrow = (EYEBROW[slug] ?? { es: '', en: '' })[lang];
  const badge = (BADGE[slug] ?? { es: '', en: '' })[lang];

  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';
  const servicesLabel = lang === 'en' ? 'Services' : 'Servicios';

  return (
    <main>

      {/* ── HERO ── */}
      {heroSection && (
        <section aria-labelledby="h-t" style={{ padding: 'clamp(40px,6vw,80px) 0 clamp(56px,6vw,88px)' }}>
          <div className="wrap g-hero" style={{ display: 'grid', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>

            {/* Left */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <nav aria-label={lang === 'en' ? 'Breadcrumb' : 'Ruta'} style={{ fontSize: '13px', color: '#4B5F66', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Link href="/" style={{ color: '#4B5F66', textDecoration: 'none' }}>{homeLabel}</Link>
                <span aria-hidden="true">/</span>
                <Link href="/servicios" style={{ color: '#4B5F66', textDecoration: 'none' }}>{servicesLabel}</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" style={{ color: '#0A2730', fontWeight: 600 }}>{treatmentName}</span>
              </nav>

              <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '10px', height: '36px', padding: '0 14px 0 10px', borderRadius: '999px', background: '#E3F2F4', color: '#00566E', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em' }}>
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: '17px', color: '#0196AD' }}>{posNum}</span>
                {eyebrow}
              </span>

              <h1 id="h-t" style={{ margin: 0, fontSize: 'clamp(46px,6vw,90px)', lineHeight: 0.94, letterSpacing: '-0.045em', fontWeight: 800, textWrap: 'balance' as never }}>
                {heroText.t1}{' '}
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', color: '#0196AD' }}>{heroText.t2}</span>
              </h1>

              {heroText.text && (
                <p style={{ margin: 0, fontSize: 'clamp(18px,1.5vw,21px)', lineHeight: 1.55, color: '#24414A', maxWidth: '540px' }}>{heroText.text}</p>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link
                  href="/contacto"
                  className="btn"
                  style={{ height: '56px', padding: '0 26px', borderRadius: '14px', background: '#007A8C', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  {heroText.cta ?? (lang === 'en' ? 'Schedule your free consultation' : 'Agenda tu valoración gratis')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
                <a
                  href={`https://wa.me/${waClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ height: '56px', padding: '0 26px', borderRadius: '14px', border: '1.5px solid #0A2730', color: '#0A2730', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
                  {lang === 'en' ? 'Contact us' : 'Contáctanos'}
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            <div style={{ position: 'relative', height: 'clamp(440px,46vw,620px)' }}>
              {heroImgUrl ? (
                <div className="card" style={{ position: 'absolute', right: 0, top: 0, width: '84%', height: '100%', borderRadius: '28px 28px 999px 999px / 28px 28px 330px 330px', overflow: 'hidden', background: '#E3F2F4' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroImgUrl} alt={treatmentName} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', display: 'block' }} />
                </div>
              ) : (
                <div className="dark" style={{ position: 'absolute', right: 0, top: 0, width: '84%', height: '100%', borderRadius: '28px 28px 999px 999px / 28px 28px 330px 330px', overflow: 'hidden', background: '#00566E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="62%" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 11h5v3a4 4 0 0 0 8 0v-3h5"/><path d="M12 17c0-5 1.5-9 5.5-13"/><circle cx="12" cy="16.6" r="1.3" fill="#C5D300"/>
                  </svg>
                </div>
              )}
              {badge && (
                <span style={{ position: 'absolute', left: '34px', bottom: 'calc(10% - 14px)', height: '32px', padding: '0 12px', borderRadius: '999px', background: '#C5D300', color: '#0A2730', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>{badge}</span>
              )}
            </div>
          </div>

          {/* Facts bar */}
          {datosItems.length > 0 && (
            <div className="wrap" style={{ marginTop: 'clamp(40px,5vw,72px)' }}>
              <dl className="g-facts" style={{ margin: 0, display: 'grid', background: '#FFFFFF', border: '1px solid #D5E3E6', borderRadius: '24px', overflow: 'hidden' }}>
                {datosItems.map((item, i) => {
                  const d = pickItem(item, lang);
                  return (
                    <div key={i} style={{ padding: '24px 28px', borderLeft: `1px solid ${i === 0 ? 'transparent' : '#D5E3E6'}`, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <dt style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#4B5F66' }}>{d.t}</dt>
                      <dd style={{ margin: 0, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.01em' }}>{d.d}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}
        </section>
      )}

      {/* ── ZONAS ── */}
      {zonasList.length > 0 && (
        <ZonasSelectorClient
          zones={zonasList}
          slug={slug}
          lang={lang}
          sectionTitle={zonasText.t1 ?? (lang === 'en' ? 'Which area do you want to' : '¿Qué zona quieres')}
          sectionAccent={zonasText.t2 ?? (lang === 'en' ? 'restore?' : 'recuperar?')}
        />
      )}

      {/* ── CÓMO FUNCIONA ── */}
      {fueSteps.length > 0 && (
        <section aria-labelledby="f-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
              <h2 id="f-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, maxWidth: '760px', textWrap: 'balance' as never }}>
                {fueText.t1 ?? (lang === 'en' ? 'How it' : 'Cómo')}{' '}
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#0196AD' }}>{fueText.t2 ?? (lang === 'en' ? 'works.' : 'funciona.')}</span>
              </h2>
              {fueText.text && (
                <p style={{ margin: 0, maxWidth: '380px', fontSize: '16px', color: '#4B5F66' }}>{fueText.text}</p>
              )}
            </div>

            <div className="g-three" style={{ display: 'grid', gap: '24px' }}>
              {fueSteps.map((step, i) => {
                const d = pickItem(step, lang);
                const isLast = i === fueSteps.length - 1;
                const bg = isLast ? '#0A2730' : '#FFFFFF';
                const fg = isLast ? '#FFFFFF' : '#0A2730';
                const accent = isLast ? '#5EC4D3' : '#0196AD';
                const sub = isLast ? '#BFD6DB' : '#4B5F66';
                return (
                  <div key={i} style={{ background: bg, color: fg, borderRadius: '28px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '44px', lineHeight: 1, color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                    <strong style={{ fontSize: '24px', letterSpacing: '-0.015em' }}>{d.t}</strong>
                    <span style={{ fontSize: '16px', color: sub }}>{d.d}</span>
                  </div>
                );
              })}
            </div>

            {fueBenefits.length > 0 && (
              <ul className="g-two" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0 48px', borderTop: '1px solid #0A2730' }}>
                {fueBenefits.map((b, i) => {
                  const d = pickItem(b, lang);
                  return (
                    <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #D5E3E6', fontWeight: 600 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                        <path d="M5 12l4 4 10-10"/>
                      </svg>
                      {d.t}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ── QUÉ ESPERAR ── */}
      {esperarItems.length > 0 && (
        <section aria-labelledby="e-t" style={{ background: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <h2 id="e-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, maxWidth: '820px', textWrap: 'balance' as never }}>
              {esperarText.t1 ?? (lang === 'en' ? 'What to expect' : 'Qué esperar')}{' '}
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#0196AD' }}>{esperarText.t2 ?? (lang === 'en' ? 'after the procedure.' : 'después del procedimiento.')}</span>
            </h2>
            <ol className="g-tl" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: `repeat(${tlCount}, minmax(0, 1fr))`, gap: '16px' }}>
              {esperarItems.map((item, i) => {
                const d = pickItem(item, lang);
                const isLast = i === esperarItems.length - 1;
                const bg = isLast ? '#0A2730' : '#F7F8F5';
                const fg = isLast ? '#FFFFFF' : '#0A2730';
                const accent = isLast ? '#C5D300' : '#007A8C';
                return (
                  <li key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px', borderRadius: '24px', background: bg, color: fg }}>
                    <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: accent }}>{d.m}</span>
                    <strong style={{ fontSize: '20px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{d.t}</strong>
                    <span style={{ fontSize: '15px', lineHeight: 1.5, opacity: 0.85 }}>{d.d}</span>
                  </li>
                );
              })}
            </ol>
            {esperarText.text && (
              <span style={{ fontSize: '13px', color: '#4B5F66' }}>{esperarText.text}</span>
            )}
          </div>
        </section>
      )}

      {/* ── RESULTADOS ── */}
      {casesData.length > 0 && (
        <TratamientoResultadosClient
          cases={casesData}
          t1={resText.t1 ?? (lang === 'en' ? 'Results of' : 'Resultados de')}
          t2={resText.t2 ?? treatmentName}
          disclaimerText={resText.text ?? (lang === 'en' ? 'Results vary for each patient. We only publish real photos with express authorization.' : 'Los resultados varían según cada paciente. Solo publicamos fotografías reales con autorización expresa.')}
          lang={lang}
          resultadosPath="/resultados"
        />
      )}

      {/* ── FAQ ── */}
      {faqItems.length > 0 && faqSection && (
        <section aria-labelledby="q-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
          <div className="wrap g-faq" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 id="q-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,52px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
                {faqText.t1 ?? (lang === 'en' ? 'Questions about' : 'Preguntas sobre el')}{' '}
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#0196AD' }}>{faqText.t2 ?? treatmentName}</span>
              </h2>
              <p style={{ margin: 0, fontSize: '16px', color: '#4B5F66' }}>
                {lang === 'en' ? 'Have another question? Write to us and the medical team will answer.' : '¿Tienes otra pregunta? Escríbenos y te responde el equipo médico.'}
              </p>
              <a
                href={`https://wa.me/${waClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ alignSelf: 'flex-start', height: '52px', padding: '0 22px', borderRadius: '14px', border: '1.5px solid #0A2730', color: '#0A2730', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                {lang === 'en' ? 'Ask on WhatsApp' : 'Preguntar por WhatsApp'}
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #0A2730' }}>
              <Accordion items={faqItems} />
            </div>

          </div>
        </section>
      )}

      {/* ── OTROS SERVICIOS ── */}
      {related.length > 0 && (
        <section aria-labelledby="o-t" style={{ padding: '0 0 clamp(72px,9vw,128px)' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h2 id="o-t" style={{ margin: 0, fontSize: 'clamp(26px,2.6vw,36px)', letterSpacing: '-0.02em', fontWeight: 800 }}>
              {lang === 'en' ? 'Other services' : 'Otros servicios'}
            </h2>
            <div className="g-three" style={{ display: 'grid', gap: '24px' }}>
              {related.map((t) => {
                const imgUrl = t.image_media_id ? (mediaMap[t.image_media_id] ?? null) : null;
                return (
                  <Link
                    key={t.id}
                    href={`/servicios/${t.page_slug}`}
                    className="rel"
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', borderRadius: '28px', color: '#0A2730' }}
                  >
                    <div style={{ width: '100%', height: '240px', borderRadius: '28px', overflow: 'hidden', position: 'relative', background: '#00566E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {imgUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={imgUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', display: 'block' }} />
                      ) : (
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 11h5v3a4 4 0 0 0 8 0v-3h5"/><path d="M12 17c0-5 1.5-9 5.5-13"/><circle cx="12" cy="16.6" r="1.3" fill="#C5D300"/>
                        </svg>
                      )}
                    </div>
                    <strong style={{ fontSize: '22px', letterSpacing: '-0.015em', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'color .18s' }}>
                      {pick(t.name, lang)}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </strong>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      {ctaSection && (
        <section aria-labelledby="cta-t" style={{ background: '#E3F2F4', padding: 'clamp(72px,9vw,120px) 0' }}>
          <div className="wrap g-two" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'end' }}>
            <h2 id="cta-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {ctaText.t1 ?? (lang === 'en' ? 'The first step is' : 'El primer paso es')}{' '}
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#007A8C' }}>{ctaText.t2 ?? (lang === 'en' ? 'knowing your case.' : 'conocer tu caso.')}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {ctaText.text && (
                <p style={{ margin: 0, fontSize: '18px', color: '#24414A' }}>{ctaText.text}</p>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link
                  href={ctaText.ctaLink ?? '/contacto'}
                  className="btn"
                  style={{ height: '56px', padding: '0 26px', borderRadius: '14px', background: '#007A8C', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  {ctaText.cta ?? (lang === 'en' ? 'Free consultation' : 'Valoración gratis')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
                <a
                  href={`https://wa.me/${waClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ height: '56px', padding: '0 26px', borderRadius: '14px', border: '1.5px solid #0A2730', color: '#0A2730', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                >
                  {lang === 'en' ? 'Write on WhatsApp' : 'Escribir por WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
