import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { getTestimonials, getFaqs, slotUrl } from '@/lib/content/collections';
import { Accordion } from '@/components/ui/Accordion';
import { ViajeStepperClient } from '@/components/turismo/ViajeStepperClient';
import { Link } from '@/i18n/navigation';
import type { Lang } from '@/lib/content/types';
import { pickText, pickItem, pick } from '@/lib/content/types';

export const metadata: Metadata = {
  title: 'Turismo médico capilar en Medellín',
  description: 'Restauración capilar en Medellín con acompañamiento completo para pacientes internacionales.',
};

export default async function TurismoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const [sections, testimonials, faqs] = await Promise.all([
    getPageSections('turismo-medico'),
    getTestimonials(),
    getFaqs('turismo'),
  ]);

  const get = (key: string) => sections.find((s) => s.key === key);

  // --- HERO ---
  const heroSection = get('hero');
  const heroText = heroSection ? pickText(heroSection.data.content, lang) : null;
  const heroSlots = heroSection?.data.slots ?? [];
  const heroImgSlot = heroSlots.find((s) => s.kind === 'img');
  const heroOverlaySlot = heroSlots.filter((s) => s.kind === 'img')[1];

  // --- VIAJE ---
  const viajeSection = get('viaje');
  const viajeSteps = (() => {
    if (!viajeSection) return [];
    const items = (viajeSection.data.lists?.etapas?.items ?? []).filter((it) => it.visible);
    const slots = viajeSection.data.slots ?? [];
    return items.map((item, i) => {
      const d = pickItem(item, lang);
      const slot = slots[i];
      return {
        when: d.m ?? '',
        title: d.t ?? '',
        text: d.d ?? '',
        we: d.we ?? '',
        you: d.you ?? '',
        imgSrc: slot ? slotUrl(slot.src) : '',
        imgAlt: slot ? pick(slot.alt, lang) : '',
      };
    });
  })();

  // --- ESTADÍA ---
  const estadiaSection = get('estadia');
  const estadiaSlots = estadiaSection?.data.slots ?? [];
  const estadiaVideoSlot = estadiaSlots.find((s) => s.kind === 'video');
  const estadiaImgSlots = estadiaSlots.filter((s) => s.kind === 'img');
  const estadiaLabels = lang === 'en'
    ? ['Hotel', 'Rooms', 'The clinic', 'Tourist tours']
    : ['Hotel', 'Habitaciones', 'La clínica', 'Salidas turísticas'];

  // --- INCLUYE ---
  const incluyeSection = get('incluye');
  const incluyeText = incluyeSection ? pickText(incluyeSection.data.content, lang) : null;
  const incluyeItems = (incluyeSection?.data.lists?.items?.items ?? []).filter((it) => it.visible);

  // --- TESTIMONIO ---
  const testimonioSection = get('testimonio');
  const testimonioSlots = testimonioSection?.data.slots ?? [];
  const testimonioVideoSlot = testimonioSlots.find((s) => s.kind === 'video');
  const testi = testimonials.find((t) => t.authorization_confirmed && t.visible);

  // --- CTA ---
  const ctaSection = get('cta');
  const ctaText = ctaSection ? pickText(ctaSection.data.content, lang) : null;

  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      {/* ── HERO ── */}
      <section className="dark" aria-labelledby="h-t" style={{ background: '#00566E', color: '#FFFFFF', padding: 'clamp(40px,6vw,80px) 0 clamp(72px,8vw,112px)', overflow: 'hidden' }}>
        <div className="wrap g-hero" style={{ display: 'grid', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <nav aria-label="Ruta" style={{ fontSize: '13px', color: '#9BD3DC', display: 'flex', gap: '8px' }}>
              <Link href="/" style={{ color: '#9BD3DC', textDecoration: 'none' }}>{homeLabel}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                {lang === 'en' ? 'Medical tourism' : 'Turismo médico'}
              </span>
            </nav>
            <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#C5D300' }}>
              {heroText?.eyebrow ?? (lang === 'en' ? 'Medical tourism in Colombia' : 'Turismo médico en Colombia')}
            </span>
            <h1 id="h-t" style={{ margin: 0, fontSize: 'clamp(42px,5vw,74px)', lineHeight: 0.96, letterSpacing: '-0.045em', fontWeight: 800 }}>
              {heroText?.t1 ?? (lang === 'en' ? 'Your hair transplant in Medellín,' : 'Tu trasplante capilar en Medellín,')}{' '}
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', color: '#9BD3DC' }}>
                {heroText?.t2 ?? (lang === 'en' ? 'with support at every stage.' : 'con acompañamiento en cada etapa.')}
              </span>
            </h1>
            <p style={{ margin: 0, fontSize: 'clamp(18px,1.5vw,20px)', lineHeight: 1.55, color: '#DCEBEE', maxWidth: '540px' }}>
              {heroText?.text ?? (lang === 'en'
                ? 'Medellín is a growing medical tourism destination and many of our patients come from the United States. We coordinate every step so you can focus on your recovery.'
                : 'Medellín es un destino de turismo médico en crecimiento y muchos de nuestros pacientes llegan desde Estados Unidos. Coordinamos contigo cada paso para que solo te ocupes de tu recuperación.')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href="https://wa.me/19548535335" target="_blank" rel="noopener" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
                {lang === 'en' ? 'Plan your trip via WhatsApp' : 'Planifica tu viaje por WhatsApp'}
              </a>
              <Link href="/contacto" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', border: '1.5px solid #FFFFFF', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                {lang === 'en' ? 'Free remote assessment' : 'Valoración gratis a distancia'}
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative', height: 'clamp(440px,46vw,600px)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '80%', height: '88%', borderRadius: '28px 28px 999px 999px / 28px 28px 320px 320px', overflow: 'hidden', background: '#0C4A5E' }}>
              {heroImgSlot?.src
                ? <img src={slotUrl(heroImgSlot.src) ?? undefined} alt={pick(heroImgSlot.alt, lang)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 50%', display: 'block' }} />
                : <div className="ph-d" style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />}
            </div>
            {heroOverlaySlot?.src && (
              <div style={{ position: 'absolute', right: 0, bottom: 0, width: '42%', height: '52%', borderRadius: '24px', overflow: 'hidden', border: '6px solid #00566E' }}>
                <img src={slotUrl(heroOverlaySlot.src) ?? undefined} alt={pick(heroOverlaySlot.alt, lang)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 40%', display: 'block' }} />
              </div>
            )}
            <span style={{ position: 'absolute', left: '24px', top: '24px', height: '32px', padding: '0 12px', borderRadius: '999px', background: 'rgba(10,39,48,0.8)', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>
              Medellín, Antioquia
            </span>
          </div>
        </div>
      </section>

      {/* ── VIAJE PASO A PASO ── */}
      {viajeSteps.length > 0 && (
        <section aria-labelledby="v-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
              <h2 id="v-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
                {lang === 'en' ? <>Your journey, <em className="accent">step by step.</em></> : <>Tu viaje, <em className="accent">paso a paso.</em></>}
              </h2>
              <span style={{ fontSize: '15px', color: '#4B5F66' }}>
                {lang === 'en' ? 'Tap each stage' : 'Toca cada etapa'}
              </span>
            </div>
            <ViajeStepperClient steps={viajeSteps} lang={lang} />
          </div>
        </section>
      )}

      {/* ── ESTADÍA ── */}
      <section aria-labelledby="g-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>
              {lang === 'en' ? 'Discover your stay' : 'Conoce tu estadía'}
            </span>
            <h2 id="g-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {lang === 'en'
                ? <>This is how you&apos;ll spend your time <em className="accent">in Medellín.</em></>
                : <>Así vivirás tu tiempo <em className="accent">en Medellín.</em></>}
            </h2>
            <p style={{ margin: 0, fontSize: '18px', color: '#24414A', maxWidth: '640px' }}>
              {lang === 'en'
                ? 'The hotel, rooms, clinic and tourist excursions we can arrange for you, for a premium medical tourism experience.'
                : 'El hotel, las habitaciones, la clínica y las salidas turísticas que se pueden programar con nosotros, para un turismo médico premium.'}
            </p>
          </div>
          <div className="g-stay" style={{ display: 'grid', gap: '20px', alignItems: 'stretch' }}>
            <div style={{ position: 'relative', minHeight: '360px', borderRadius: '28px', overflow: 'hidden', background: '#0C4A5E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center', padding: '24px' }}>
              {estadiaVideoSlot?.src ? (
                <video controls playsInline preload="none" aria-label={pick(estadiaVideoSlot.alt, lang)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src={slotUrl(estadiaVideoSlot.src) ?? undefined} />
                </video>
              ) : (
                <>
                  <span style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#C5D300', color: '#0A2730', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>
                  </span>
                  <strong style={{ fontSize: '20px', color: '#FFFFFF' }}>[{lang === 'en' ? 'Video: hotel, clinic and city' : 'Video: hotel, clínica y ciudad'}]</strong>
                  <span style={{ fontSize: '14px', color: '#BFD6DB', maxWidth: '360px' }}>
                    {lang === 'en' ? 'Stay video will appear here, with consent from those featured.' : 'Aquí va el video de la estadía, con la autorización de quienes aparecen.'}
                  </span>
                </>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {estadiaLabels.map((label, i) => {
                const slot = estadiaImgSlots[i];
                return (
                  <figure key={i} style={{ margin: 0, position: 'relative', aspectRatio: '1/1', borderRadius: '20px', overflow: 'hidden', background: slot?.src ? '#0C4A5E' : '#E3F2F4', border: slot?.src ? undefined : '1px dashed #9BB9C0' }}>
                    {slot?.src ? (
                      <img src={slotUrl(slot.src) ?? undefined} alt={pick(slot.alt, lang)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px', fontSize: '13px', color: '#4B5F66' }}>[{label}]</span>
                    )}
                    <figcaption style={{ position: 'absolute', left: '12px', bottom: '12px', height: '32px', padding: '0 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.94)', color: '#0A2730', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>
                      {slot?.label || label}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── INCLUYE ── */}
      <section aria-labelledby="i-t" style={{ background: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <h2 id="i-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
            {incluyeText?.t1 ?? (lang === 'en' ? 'Plan your stay' : 'Planifica tu estadía')}{' '}
            <em className="accent">{incluyeText?.t2 ?? (lang === 'en' ? 'with peace of mind.' : 'con tranquilidad.')}</em>
          </h2>
          <div className="g-four" style={{ display: 'grid', gap: '16px' }}>
            {incluyeItems.length > 0 ? incluyeItems.slice(0, 4).map((item, i) => {
              const d = pickItem(item, lang);
              return (
                <div key={i} style={{ background: i === 3 ? '#0A2730' : '#F7F8F5', color: i === 3 ? '#FFFFFF' : '#0A2730', borderRadius: '24px', padding: '26px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <strong style={{ fontSize: '18px' }}>{d.t}</strong>
                  <span style={{ fontSize: '15px', color: i === 3 ? '#BFD6DB' : '#4B5F66' }}>{d.d}</span>
                </div>
              );
            }) : (
              <>
                <div style={{ background: '#F7F8F5', borderRadius: '24px', padding: '26px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.5 13.5L3 10l18-7-7 18-3.5-7.5z"/><path d="M10.5 13.5L21 3"/></svg>
                  <strong style={{ fontSize: '18px' }}>{lang === 'en' ? 'Airport pickup' : 'Recogida en el aeropuerto'}</strong>
                  <span style={{ fontSize: '15px', color: '#4B5F66' }}>{lang === 'en' ? 'We pick you up at Medellín airport.' : 'Te esperamos a tu llegada a Medellín.'}</span>
                </div>
                <div style={{ background: '#F7F8F5', borderRadius: '24px', padding: '26px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V9l8-5 8 5v11"/><path d="M9.5 20v-5h5v5"/></svg>
                  <strong style={{ fontSize: '18px' }}>{lang === 'en' ? 'Hotel management' : 'Gestión del hotel'}</strong>
                  <span style={{ fontSize: '15px', color: '#4B5F66' }}>{lang === 'en' ? 'We help coordinate your accommodation.' : 'Te ayudamos a coordinar tu alojamiento.'}</span>
                </div>
                <div style={{ background: '#F7F8F5', borderRadius: '24px', padding: '26px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/><path d="M9 11h6M9 14h3.5"/></svg>
                  <strong style={{ fontSize: '18px' }}>{lang === 'en' ? 'Spanish & English support' : 'Atención en español e inglés'}</strong>
                  <span style={{ fontSize: '15px', color: '#4B5F66' }}>{lang === 'en' ? 'Before, during and after your trip.' : 'Antes, durante y después del viaje.'}</span>
                </div>
                <div style={{ background: '#0A2730', color: '#FFFFFF', borderRadius: '24px', padding: '26px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>
                  <strong style={{ fontSize: '18px' }}>{lang === 'en' ? 'Suggested stay' : 'Estadía sugerida'}</strong>
                  <span style={{ fontSize: '15px', color: '#BFD6DB' }}>
                    {lang === 'en' ? '[Number of days to confirm with the clinic per your plan]' : '[N.º de días por confirmar con la clínica según tu plan]'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIO ── */}
      <section aria-labelledby="q-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap g-two" style={{ display: 'grid', gap: '24px', alignItems: 'stretch' }}>
          <figure style={{ margin: 0, position: 'relative', minHeight: '520px', borderRadius: '28px', overflow: 'hidden', background: '#0A2730' }}>
            {testimonioVideoSlot?.src ? (
              <>
                <video controls playsInline preload="none" aria-label={pick(testimonioVideoSlot.alt, lang)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src={slotUrl(testimonioVideoSlot.src) ?? undefined} />
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
          <figure style={{ margin: 0, background: '#E3F2F4', borderRadius: '28px', padding: 'clamp(28px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '32px' }}>
            <h2 id="q-t" style={{ margin: 0, fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>
              {lang === 'en' ? 'What those who traveled say' : 'Lo que dicen quienes viajaron'}
            </h2>
            {testi ? (
              <>
                <blockquote style={{ margin: 0, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px,2.8vw,40px)', lineHeight: 1.2 }}>
                  &ldquo;{pick(testi.quote, lang)}&rdquo;
                </blockquote>
                <figcaption style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderTop: '1px solid #9BD3DC', paddingTop: '20px' }}>
                  <strong style={{ fontSize: '17px' }}>{testi.author}</strong>
                  <span style={{ fontSize: '14px', color: '#4B5F66' }}>{[testi.country, testi.treatment].filter(Boolean).join(' · ')}</span>
                </figcaption>
              </>
            ) : (
              <blockquote style={{ margin: 0, fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(28px,2.8vw,40px)', lineHeight: 1.2 }}>
                &ldquo;{lang === 'en'
                  ? 'Exceptional care from airport pickup to procedure and aftercare. Very happy with the results.'
                  : 'Atención excepcional desde la recogida en el aeropuerto hasta el procedimiento y el postoperatorio. Estoy muy contenta con los resultados.'}&rdquo;
              </blockquote>
            )}
          </figure>
        </div>
      </section>

      {/* ── FAQ VIAJEROS ── */}
      {faqs.length > 0 && (
        <section aria-labelledby="f-t" style={{ background: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
          <div className="wrap g-faq" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
            <h2 id="f-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,52px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {lang === 'en'
                ? <>Questions from <em className="accent">those who travel</em></>
                : <>Preguntas de <em className="accent">quienes viajan</em></>}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #0A2730' }}>
              <Accordion items={faqs.map((f) => ({ id: f.id, question: pick(f.question, lang), answer: pick(f.answer, lang) }))} />
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="dark" aria-labelledby="cta-t" style={{ background: '#0A2730', color: '#FFFFFF', padding: 'clamp(72px,9vw,120px) 0' }}>
        <div className="wrap g-two" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'end' }}>
          <h2 id="cta-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
            {ctaText?.t1 ?? (lang === 'en' ? 'Start from your country,' : 'Empieza desde tu país,')}{' '}
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#5EC4D3' }}>
              {ctaText?.t2 ?? (lang === 'en' ? 'without buying the ticket.' : 'sin comprar el vuelo.')}
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ margin: 0, fontSize: '18px', color: '#BFD6DB' }}>
              {ctaText?.text ?? (lang === 'en'
                ? 'Get your free remote assessment. When you have your plan, we help organize your trip.'
                : 'Haz tu valoración a distancia, sin costo. Cuando tengas tu plan, te ayudamos a organizar el viaje.')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link href="/contacto" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                {ctaText?.cta ?? (lang === 'en' ? 'Free remote assessment' : 'Valoración gratis a distancia')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <a href="https://wa.me/19548535335" target="_blank" rel="noopener" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', border: '1.5px solid #FFFFFF', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                {lang === 'en' ? 'Message via WhatsApp' : 'Escribir por WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
