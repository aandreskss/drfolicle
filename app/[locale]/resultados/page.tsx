import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getCases, getTestimonials, getAllMedia, slotUrl } from '@/lib/content/collections';
import { ResultadosGaleriaClient } from '@/components/resultados/ResultadosGaleriaClient';
import { Link } from '@/i18n/navigation';
import type { Lang } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Resultados · antes y después',
  description: 'Galería de resultados de trasplante capilar, barba y cejas. Fotografías reales con autorización.',
};

const CAT_LABEL: Record<string, string> = {
  capilar: 'Capilar',
  barba: 'Barba',
  cejas: 'Cejas',
};
const CAT_LABEL_EN: Record<string, string> = {
  capilar: 'Hair',
  barba: 'Beard',
  cejas: 'Eyebrows',
};

export default async function ResultadosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, cases, testimonials, mediaMap] = await Promise.all([
    getPageSections('resultados'),
    getCases(),
    getTestimonials(),
    getAllMedia(),
  ]);

  const get = (key: string) => sections.find((s) => s.key === key);

  // --- GALERÍA ---
  const heroSection = get('hero');
  const heroText = heroSection ? pickText(heroSection.data.content, lang) : null;

  const visible = cases.filter((c) => c.visible && c.before_media_id && c.after_media_id && c.consent_verified);
  const caseItems = visible.map((c, i) => ({
    id: c.id,
    num: String(i + 1).padStart(2, '0'),
    cat: lang === 'en' ? (CAT_LABEL_EN[c.category] ?? c.category) : (CAT_LABEL[c.category] ?? c.category),
    title: pick(c.title, lang),
    tech: lang === 'en' ? 'FUE hair transplant' : 'Trasplante capilar FUE',
    units: c.units ? (lang === 'en' ? `${c.units} units` : `${c.units} unidades`) : '',
    months: c.months ?? '',
    origin: c.origin ?? '',
    beforeSrc: mediaMap[c.before_media_id!] ?? '',
    afterSrc: mediaMap[c.after_media_id!] ?? '',
    beforeAlt: `${lang === 'en' ? 'Before' : 'Antes'} — ${pick(c.title, lang)}`,
    afterAlt: `${lang === 'en' ? 'After' : 'Después'} — ${pick(c.title, lang)}`,
  })).filter((c) => c.beforeSrc && c.afterSrc);

  // --- TESTIMONIOS ---
  const testiSection = get('historias');
  const testiText = testiSection ? pickText(testiSection.data.content, lang) : null;
  const testiSlots = testiSection?.data.slots ?? [];
  const testiVideoSlot = testiSlots.find((s) => s.kind === 'video');

  const quotes = testimonials.filter((t) => t.authorization_confirmed && t.visible).slice(0, 4);

  // --- CTA ---
  const ctaSection = get('cta');
  const ctaText = ctaSection ? pickText(ctaSection.data.content, lang) : null;

  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      {/* ── HERO + GALERÍA ── */}
      <section className="dark" aria-labelledby="h-t" style={{ background: '#0A2730', color: '#FFFFFF', padding: 'clamp(40px,6vw,80px) 0 clamp(72px,9vw,128px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <nav aria-label="Ruta" style={{ fontSize: '13px', color: '#9BD3DC', display: 'flex', gap: '8px' }}>
            <Link href="/" style={{ color: '#9BD3DC', textDecoration: 'none' }}>{homeLabel}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" style={{ color: '#FFFFFF', fontWeight: 600 }}>
              {lang === 'en' ? 'Results' : 'Resultados'}
            </span>
          </nav>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
            <h1 id="h-t" style={{ margin: 0, fontSize: 'clamp(46px,6.4vw,96px)', lineHeight: 0.94, letterSpacing: '-0.045em', fontWeight: 800, maxWidth: '900px' }}>
              {heroText?.t1 ?? (lang === 'en' ? 'Results that tell' : 'Resultados que cuentan')}{' '}
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', color: '#5EC4D3' }}>
                {heroText?.t2 ?? (lang === 'en' ? 'real stories.' : 'historias reales.')}
              </span>
            </h1>
            <p style={{ margin: 0, maxWidth: '380px', fontSize: '17px', color: '#BFD6DB' }}>
              {heroText?.text ?? (lang === 'en'
                ? 'Real photos of Dr Follicle Solutions patients in Medellín, published with their consent. Each case is designed individually and results vary per patient.'
                : 'Fotografías reales de pacientes de Dr Follicle Solutions en Medellín, publicadas con su autorización. Cada caso se diseña a la medida y los resultados varían según cada paciente.')}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '40px', padding: '0 16px', borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.35)', fontSize: '14px', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5D300' }} />
              {lang === 'en' ? 'Hair transplant · real cases' : 'Trasplante capilar · casos reales'}
            </span>
            <span style={{ fontSize: '14px', color: '#BFD6DB' }}>
              {lang === 'en' ? 'Tap a case to compare before and after' : 'Toca un caso para comparar el antes y el después'}
            </span>
          </div>

          {caseItems.length > 0 ? (
            <ResultadosGaleriaClient cases={caseItems} lang={lang} ctaHref={lang === 'en' ? '/en/contacto' : '/es/contacto'} />
          ) : (
            <div style={{ border: '1.5px dashed rgba(255,255,255,0.25)', borderRadius: '28px', padding: '56px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
              <strong style={{ fontSize: '20px' }}>
                {lang === 'en' ? "We'll soon publish cases with this treatment" : 'Pronto publicaremos casos de este tratamiento'}
              </strong>
              <span style={{ fontSize: '15px', color: '#BFD6DB', maxWidth: '440px' }}>
                {lang === 'en'
                  ? 'We only show photos with written patient consent. In the meantime, ask us about similar cases in your assessment.'
                  : 'Solo mostramos fotografías con autorización escrita del paciente. Mientras tanto, pregúntanos por casos similares en tu valoración.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section aria-labelledby="t-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <h2 id="t-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {testiText?.t1 ?? (lang === 'en' ? 'Stories in' : 'Historias en')}{' '}
              <em className="accent">{testiText?.t2 ?? (lang === 'en' ? 'first person.' : 'primera persona.')}</em>
            </h2>
            <a href="https://www.youtube.com/@dr.folliclesolutions" target="_blank" rel="noopener" className="lnk" style={{ fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {lang === 'en' ? 'More videos on YouTube' : 'Más videos en YouTube'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
          <div className="g-testi" style={{ display: 'grid', gap: '24px', alignItems: 'stretch' }}>
            <figure style={{ margin: 0, position: 'relative', minHeight: '560px', borderRadius: '28px', overflow: 'hidden', background: '#0A2730' }}>
              {testiVideoSlot?.src ? (
                <>
                  <video controls playsInline preload="none" aria-label={pick(testiVideoSlot.alt, lang)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                    <source src={slotUrl(testiVideoSlot.src) ?? undefined} />
                  </video>
                  <figcaption style={{ position: 'absolute', left: '16px', top: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', height: '32px', padding: '0 12px', borderRadius: '999px', background: 'rgba(10,39,48,0.82)', color: '#FFFFFF', fontSize: '12px', fontWeight: 700, pointerEvents: 'none' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5D300' }} />
                    {lang === 'en' ? 'International patient · in English' : 'Paciente internacional · en inglés'}
                  </figcaption>
                </>
              ) : (
                <div className="ph-d" style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
              )}
            </figure>
            <div className="g-quotes" style={{ display: 'grid', gap: '16px' }}>
              {quotes.length > 0 ? quotes.map((q) => (
                <figure key={q.id} style={{ margin: 0, background: '#FFFFFF', borderRadius: '24px', padding: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                  <blockquote style={{ margin: 0, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '22px', lineHeight: 1.25 }}>
                    &ldquo;{pick(q.quote, lang)}&rdquo;
                  </blockquote>
                  <figcaption style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderTop: '1px solid #D5E3E6', paddingTop: '14px' }}>
                    <strong style={{ fontSize: '15px' }}>{q.author}</strong>
                    <span style={{ fontSize: '13px', color: '#4B5F66' }}>{[q.country, q.treatment].filter(Boolean).join(' · ')}</span>
                  </figcaption>
                </figure>
              )) : (
                [
                  { quote: lang === 'en' ? 'Exceptional care from airport pickup to procedure and aftercare.' : 'Atención excepcional desde la recogida en el aeropuerto hasta el procedimiento y el postoperatorio.', name: 'Hayxa Escobar', meta: '[País] · Trasplante capilar' },
                  { quote: lang === 'en' ? 'They took care of every detail, from reliable transportation to accommodation.' : 'Se encargaron de cada detalle, desde un transporte confiable hasta el alojamiento.', name: 'Tatiana Ortega', meta: '[País] · Trasplante capilar' },
                  { quote: lang === 'en' ? 'At six months post-op we already see a big difference, and they took care of us every step.' : 'A los seis meses de la operación ya vemos una gran diferencia, y nos cuidaron en cada momento.', name: 'Daniella G.', meta: '[País] · Acompañante de paciente' },
                  { quote: lang === 'en' ? 'From the initial consultation to the final results, the whole process was seamless.' : 'Desde la consulta inicial hasta los resultados finales, todo el proceso fue fluido.', name: 'John E.', meta: '[País] · Trasplante capilar' },
                ].map((q, i) => (
                  <figure key={i} style={{ margin: 0, background: '#FFFFFF', borderRadius: '24px', padding: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                    <blockquote style={{ margin: 0, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '22px', lineHeight: 1.25 }}>
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <figcaption style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderTop: '1px solid #D5E3E6', paddingTop: '14px' }}>
                      <strong style={{ fontSize: '15px' }}>{q.name}</strong>
                      <span style={{ fontSize: '13px', color: '#4B5F66' }}>{q.meta}</span>
                    </figcaption>
                  </figure>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-labelledby="cta-t" style={{ background: '#E3F2F4', padding: 'clamp(72px,9vw,120px) 0' }}>
        <div className="wrap g-two" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'end' }}>
          <h2 id="cta-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
            {ctaText?.t1 ?? (lang === 'en' ? '¿Ready to see' : '¿Listo para ver')}{' '}
            <em className="accent" style={{ color: '#007A8C' }}>{ctaText?.t2 ?? (lang === 'en' ? 'your own result?' : 'tu propio resultado?')}</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ margin: 0, fontSize: '18px', color: '#24414A' }}>
              {ctaText?.text ?? (lang === 'en'
                ? 'Request your free assessment: we discuss your case, show you more similar results, and explain how to get started.'
                : 'Pide tu valoración gratis: conversamos sobre tu caso, te mostramos más resultados similares y te explicamos cómo empezar.')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link href="/contacto" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', background: '#007A8C', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                {ctaText?.cta ?? (lang === 'en' ? 'Free assessment' : 'Valoración gratis')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <a href="https://wa.me/19548535335" target="_blank" rel="noopener" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', border: '1.5px solid #0A2730', color: '#0A2730', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                {lang === 'en' ? 'Message via WhatsApp' : 'Escribir por WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
