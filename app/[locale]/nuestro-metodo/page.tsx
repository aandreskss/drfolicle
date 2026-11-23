import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageSections } from '@/lib/content/sections';
import { slotUrl } from '@/lib/content/collections';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Link } from '@/i18n/navigation';
import { Accordion } from '@/components/ui/Accordion';
import type { Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === 'en'
    ? { title: 'Our Method · FUE Technique | Dr Follicle Solutions', description: 'Free consultation, personalized plan, FUE technique and full follow-up: how we work at Dr Follicle Solutions to deliver natural results.' }
    : { title: 'Nuestro método · Técnica FUE | Dr Follicle Solutions', description: 'Consulta gratuita, plan personalizado, técnica FUE y seguimiento completo: así trabajamos en Dr Follicle Solutions para garantizar resultados naturales.' };
}

/* ─── Tokens ─── */
const INK = '#0A2730';
const TEAL = '#0196AD';
const TEAL_D = '#007A8C';
const TEAL_BG = '#00566E';
const LIME = '#C5D300';
const MIST = '#E3F2F4';
const BORDER = '#D5E3E6';
const BODY = '#24414A';
const SLATE = '#4B5F66';

/* ─── Data ─── */
const STEPS_ES = [
  {
    num: '01',
    title: 'Consulta y evaluación',
    eyebrow: 'Primer contacto',
    text: 'Comenzamos con una valoración gratuita —presencial o por videollamada— en la que evaluamos tu cuero cabelludo, el patrón de pérdida y tus expectativas. Revisamos tu historial médico para sentar las bases de tu tratamiento.',
    bullets: ['Valoración sin costo, en clínica o a distancia', 'Análisis del cuero cabelludo y causa de la caída', 'Revisión de historial clínico'],
    we: 'Escuchamos, analizamos y te explicamos el diagnóstico con claridad.',
    you: 'Resuelves tus dudas sin compromiso de compra.',
  },
  {
    num: '02',
    title: 'Plan personalizado',
    eyebrow: 'Tu hoja de ruta',
    text: 'Una vez completada la evaluación, diseñamos un plan de tratamiento hecho a tu medida: opciones quirúrgicas y no quirúrgicas, tiempos estimados y recomendaciones. Te explicamos cada paso antes de tomar ninguna decisión.',
    bullets: ['Opciones quirúrgicas y no quirúrgicas', 'Tiempos y etapas estimados', 'Sin presión: decides con toda la información'],
    we: 'Presentamos el plan, los costos y respondemos todas tus preguntas.',
    you: 'Decides con total claridad cuál es el mejor camino para ti.',
  },
  {
    num: '03',
    title: 'El procedimiento FUE',
    eyebrow: 'El día del trasplante',
    text: 'Extraemos los folículos uno a uno desde la zona donante usando la técnica FUE y los implantamos con precisión en la zona receptora. El procedimiento se realiza bajo anestesia local y dura aproximadamente 3-4 horas.',
    bullets: ['Extracción folículo a folículo, sin cicatriz lineal', 'Anestesia local: sin dolor durante el procedimiento', 'Diseño de línea frontal personalizado', 'Duración aproximada 3-4 horas'],
    we: 'El equipo especialista realiza el procedimiento con tecnología de precisión.',
    you: 'Estás despierto pero sin dolor. Puedes escuchar música o ver contenido.',
  },
  {
    num: '04',
    title: 'Recuperación y seguimiento',
    eyebrow: 'El camino al resultado',
    text: 'El postoperatorio es parte del proceso. Recibes un protocolo detallado de cuidados, consultas fotográficas de seguimiento y acompañamiento continuo hasta ver el resultado final a los 8-12 meses.',
    bullets: ['Protocolo de cuidados incluido', 'Seguimiento fotográfico en cada etapa', 'Consultas de control sin costo adicional', 'Resultado final a los 8-12 meses'],
    we: 'Seguimiento activo con instrucciones claras en cada etapa.',
    you: 'Registras tu evolución y nos compartes las fotos para ajustar el cuidado.',
  },
];

const STEPS_EN = [
  {
    num: '01',
    title: 'Consultation & Evaluation',
    eyebrow: 'First contact',
    text: 'We start with a free consultation — in-person or via video call — evaluating your scalp, hair loss pattern and expectations. We review your medical history to lay the foundation for your treatment.',
    bullets: ['Free assessment, in clinic or remotely', 'Scalp analysis and cause of hair loss', 'Medical history review'],
    we: 'We listen, analyze and explain your diagnosis clearly.',
    you: 'You resolve your doubts with no purchase commitment.',
  },
  {
    num: '02',
    title: 'Personalized Treatment Plan',
    eyebrow: 'Your roadmap',
    text: 'Once your evaluation is complete, we design a custom treatment plan: surgical and non-surgical options, estimated timelines and recommendations. We explain every step before you make any decision.',
    bullets: ['Surgical and non-surgical options', 'Estimated timelines and stages', 'No pressure: decide with full information'],
    we: 'We present the plan, costs and answer all your questions.',
    you: 'You decide with complete clarity which path is best for you.',
  },
  {
    num: '03',
    title: 'The FUE Procedure',
    eyebrow: 'The day of the transplant',
    text: 'We extract follicles one by one from the donor area using the FUE technique and implant them precisely in the recipient area. The procedure is performed under local anesthesia and takes approximately 3-4 hours.',
    bullets: ['Follicle-by-follicle extraction, no linear scar', 'Local anesthesia: no pain during the procedure', 'Personalized hairline design', 'Approx. 3-4 hours duration'],
    we: 'The specialist team performs the procedure with precision technology.',
    you: 'You are awake but pain-free. You can listen to music or watch content.',
  },
  {
    num: '04',
    title: 'Recovery & Follow-up',
    eyebrow: 'The path to results',
    text: 'Post-op care is part of the process. You receive a detailed care protocol, photographic follow-up appointments and continuous support until your final results at 8-12 months.',
    bullets: ['Care protocol included', 'Photographic follow-up at each stage', 'Control consultations at no extra cost', 'Final results at 8-12 months'],
    we: 'Active follow-up with clear instructions at each stage.',
    you: 'You track your evolution and share photos so we can adjust care.',
  },
];

const TIMELINE_ES = [
  { period: 'Días 1-10', title: 'Cicatrización inicial', desc: 'Enrojecimiento leve e inflamación son normales. Los costrones desaparecen progresivamente.' },
  { period: 'Mes 1', title: 'Fase de reposo', desc: 'El cabello trasplantado entra en caída fisiológica. Es parte del proceso, no una señal de alarma.' },
  { period: 'Meses 3-4', title: 'Primeros resultados', desc: 'Comienza el crecimiento visible. Los folículos emergen con cabello nuevo y definitivo.' },
  { period: 'Meses 8-12', title: 'Resultado final', desc: 'Densidad y aspecto natural completos. El resultado es permanente.' },
];

const TIMELINE_EN = [
  { period: 'Days 1-10', title: 'Initial healing', desc: 'Mild redness and swelling are normal. Scabs fade progressively.' },
  { period: 'Month 1', title: 'Resting phase', desc: 'Transplanted hair enters physiological shedding. This is normal, not a setback.' },
  { period: 'Months 3-4', title: 'First results', desc: 'Visible growth begins. Follicles emerge with new, permanent hair.' },
  { period: 'Months 8-12', title: 'Final result', desc: 'Full density and natural appearance. The result is permanent.' },
];

const OPTIONS_ES = [
  {
    eyebrow: 'No quirúrgico',
    title: 'Prevención y densificación',
    desc: 'Para los primeros síntomas de pérdida o para potenciar el crecimiento. Terapias capilares y tratamientos no quirúrgicos que complementan o anteceden al trasplante.',
    href: '/servicios/terapias-capilares',
  },
  {
    eyebrow: 'Trasplante principal',
    title: 'Trasplante capilar FUE',
    desc: 'Para restaurar la línea frontal, el vértice o las zonas con mayor pérdida. Resultado permanente con aspecto completamente natural, sin cicatriz lineal.',
    href: '/servicios/trasplante-capilar',
    featured: true,
  },
  {
    eyebrow: 'Especialidades',
    title: 'Barba y cejas',
    desc: 'El mismo método FUE aplicado a cejas, barba y bigote. Folículos extraídos de la zona donante e implantados con un diseño personalizado.',
    href: '/servicios',
  },
];

const OPTIONS_EN = [
  {
    eyebrow: 'Non-surgical',
    title: 'Prevention & Regrowth',
    desc: 'For early signs of hair loss or to boost growth. Hair therapies and non-surgical treatments that complement or precede transplant.',
    href: '/servicios/terapias-capilares',
  },
  {
    eyebrow: 'Main transplant',
    title: 'FUE Hair Transplant',
    desc: 'To restore the hairline, crown or areas of greatest loss. Permanent results with a completely natural look, no linear scar.',
    href: '/servicios/trasplante-capilar',
    featured: true,
  },
  {
    eyebrow: 'Specialties',
    title: 'Beard & Eyebrows',
    desc: 'The same FUE method applied to eyebrows, beard and mustache. Follicles extracted from the donor area and implanted with a custom design.',
    href: '/servicios',
  },
];

const BENEFITS_ES = [
  { title: 'Densidad natural', desc: 'Línea frontal y distribución diseñadas a medida de tu anatomía.' },
  { title: 'Sin cicatriz lineal', desc: 'La técnica FUE extrae folículo a folículo. Sin corte, sin sutura visible.' },
  { title: 'Respaldo médico', desc: 'Protocolos seguros, anestesia local controlada y seguimiento clínico en cada etapa.' },
  { title: 'Resultado permanente', desc: 'Los folículos trasplantados mantienen su programa genético: crecen de por vida.' },
];

const BENEFITS_EN = [
  { title: 'Natural density', desc: 'Hairline and distribution designed to match your anatomy.' },
  { title: 'No linear scar', desc: 'FUE extracts follicle by follicle. No incision, no visible suture.' },
  { title: 'Medical-grade protocols', desc: 'Safe protocols, controlled local anesthesia and clinical follow-up at every stage.' },
  { title: 'Permanent results', desc: 'Transplanted follicles keep their genetic programming: they grow for life.' },
];

const FAQS_ES = [
  { q: '¿Cuánto dura la recuperación completa?', a: 'La cicatrización inicial es de 7 a 10 días. Durante ese período es normal el enrojecimiento leve. El crecimiento completo y el resultado final se observan entre los 8 y los 12 meses.' },
  { q: '¿Puedo hacer ejercicio después del trasplante?', a: 'Se recomienda evitar actividad física intensa durante las primeras 2 semanas. Las actividades ligeras pueden retomarse de forma gradual siguiendo las indicaciones del equipo médico.' },
  { q: '¿Cuándo empiezo a ver resultados?', a: 'Los primeros signos de crecimiento aparecen entre los 3 y 4 meses. Los resultados óptimos y el crecimiento final se observan entre los 8 y 12 meses después del trasplante.' },
];

const FAQS_EN = [
  { q: 'How long does full recovery take?', a: 'Initial healing takes 7-10 days, during which mild redness is normal. Full growth and final results are observed between 8 and 12 months.' },
  { q: 'Can I exercise after the transplant?', a: "We recommend avoiding intense physical activity for at least 2 weeks. Light activities can gradually resume following the medical team's instructions." },
  { q: 'When will I start seeing results?', a: 'The first signs of growth typically appear between 3 and 4 months. Optimal results and final growth are observed between 8 and 12 months after the transplant.' },
];

export default async function MetodoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const sections = await getPageSections('nuestro-metodo');

  const get = (key: string) => sections.find((s) => s.key === key);

  const heroSection = get('hero');
  const heroText = heroSection ? pickText(heroSection.data.content, lang) : null;
  const heroSlots = heroSection?.data.slots ?? [];
  const heroImg = slotUrl(heroSlots[0]?.src);

  const etapasSection = get('etapas');
  const etapasSlots = etapasSection?.data.slots ?? [];

  const STEPS = lang === 'en' ? STEPS_EN : STEPS_ES;
  const TIMELINE = lang === 'en' ? TIMELINE_EN : TIMELINE_ES;
  const OPTIONS = lang === 'en' ? OPTIONS_EN : OPTIONS_ES;
  const BENEFITS = lang === 'en' ? BENEFITS_EN : BENEFITS_ES;
  const FAQS = lang === 'en' ? FAQS_EN : FAQS_ES;

  /* ── Enrich steps with CMS slots and content ── */
  const etapasItems = (etapasSection?.data.lists?.etapas?.items ?? []).filter((it) => it.visible);
  const enrichedSteps = STEPS.map((s, i) => {
    const cmsItem = etapasItems[i];
    const d = cmsItem ? pickItem(cmsItem, lang) : null;
    return {
      ...s,
      title: d?.t ?? s.title,
      text: d?.d ?? s.text,
      imgSrc: slotUrl(etapasSlots[i]?.src),
    };
  });

  const ctaSection = get('cta');
  const ctaText = ctaSection ? pickText(ctaSection.data.content, lang) : null;

  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs crumbs={[{ label: lang === 'en' ? 'Our method' : 'Nuestro método' }]} homeLabel={homeLabel} />
      </div>

      {/* ── HERO ── */}
      <section className="dark" aria-labelledby="met-h" style={{ background: TEAL_BG, color: '#FFFFFF', padding: 'clamp(40px,6vw,80px) 0 clamp(72px,8vw,112px)', overflow: 'hidden' }}>
        <div className="wrap g-hero" style={{ display: 'grid', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: LIME }}>
              {lang === 'en' ? 'Our method · FUE technique' : 'Nuestro proceso · Técnica FUE'}
            </span>
            <h1 id="met-h" style={{ margin: 0, fontSize: 'clamp(42px,5vw,74px)', lineHeight: 0.96, letterSpacing: '-0.045em', fontWeight: 800 }}>
              {heroText?.t1 ?? (lang === 'en' ? 'A hair transplant' : 'Un trasplante capilar')}{' '}
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', color: '#9BD3DC' }}>
                {heroText?.t2 ?? (lang === 'en' ? 'designed for you.' : 'pensado para ti.')}
              </span>
            </h1>
            <p style={{ margin: 0, fontSize: 'clamp(18px,1.5vw,20px)', lineHeight: 1.55, color: '#DCEBEE', maxWidth: '540px' }}>
              {heroText?.text ?? (lang === 'en'
                ? 'Our method is built around the patient. We walk with you from your free consultation all the way through your final follow-up, with a transparent process and results that last.'
                : 'Nuestro método está centrado en el paciente: te acompañamos desde la primera valoración gratuita hasta el último control, con un proceso transparente y resultados que duran.')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href="https://wa.me/19548535335" target="_blank" rel="noopener" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', background: LIME, color: INK, fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
                {lang === 'en' ? 'Free consultation via WhatsApp' : 'Valoración gratis por WhatsApp'}
              </a>
              <Link href="/contacto" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', border: '1.5px solid #FFFFFF', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                {lang === 'en' ? 'Contact us' : 'Contáctanos'}
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div style={{ position: 'relative', height: 'clamp(400px,44vw,580px)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '80%', height: '90%', borderRadius: '28px 28px 999px 999px / 28px 28px 320px 320px', overflow: 'hidden', background: '#0C4A5E' }}>
              {heroImg
                ? <img src={heroImg} alt={lang === 'en' ? 'Dr Follicle Solutions clinic' : 'Clínica Dr Follicle Solutions'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
                : <div className="ph-d" style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />}
            </div>
            {/* Stats card */}
            <div style={{ position: 'absolute', right: 0, bottom: '10%', background: '#FFFFFF', borderRadius: '24px', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 24px 48px rgba(10,39,48,0.18)', minWidth: '180px' }}>
              {[
                { n: '3-4h', l: lang === 'en' ? 'Procedure' : 'Procedimiento' },
                { n: '3-4m', l: lang === 'en' ? 'First results' : 'Primeros resultados' },
                { n: '8-12m', l: lang === 'en' ? 'Final result' : 'Resultado final' },
              ].map(({ n, l }) => (
                <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '32px', color: TEAL, lineHeight: 1 }}>{n}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: SLATE }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LAS 4 ETAPAS ── */}
      <section aria-labelledby="steps-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px,8vw,100px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <h2 id="steps-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {lang === 'en' ? <>The method <em className="accent">in 4 stages.</em></> : <>El método <em className="accent">en 4 etapas.</em></>}
            </h2>
            <p style={{ margin: 0, fontSize: '16px', color: SLATE, maxWidth: '360px' }}>
              {lang === 'en' ? 'From your first contact to your final result, every step is designed for your comfort and safety.' : 'Desde el primer contacto hasta el resultado final, cada etapa está diseñada para tu comodidad y seguridad.'}
            </p>
          </div>

          {enrichedSteps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className="g-spec" style={{ display: 'grid', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', direction: isEven ? 'ltr' : 'rtl' }}>
                {/* Image */}
                <div style={{ direction: 'ltr', aspectRatio: '4/5', maxHeight: '540px', borderRadius: '28px', overflow: 'hidden', background: MIST, position: 'relative' }}>
                  {step.imgSrc
                    ? <img src={step.imgSrc} alt={step.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
                    : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${MIST} 0%, #9BD3DC 100%)` }} aria-hidden="true" />}
                  <span style={{ position: 'absolute', left: '20px', bottom: '20px', fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: 'clamp(72px,10vw,128px)', fontWeight: 400, color: 'rgba(10,39,48,0.12)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{step.num}</span>
                </div>

                {/* Text */}
                <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '48px', color: TEAL, lineHeight: 1 }}>{step.num}</span>
                      <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: TEAL_D }}>{step.eyebrow}</span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(26px,2.8vw,38px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 800 }}>{step.title}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '17px', color: BODY, lineHeight: 1.65 }}>{step.text}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {step.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, marginTop: '7px', width: '8px', height: '8px', borderRadius: '50%', background: TEAL, display: 'block' }} />
                        <span style={{ fontSize: '15px', color: BODY }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="g-two" style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ background: MIST, borderRadius: '16px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: TEAL_BG }}>{lang === 'en' ? 'Us' : 'Nosotros'}</span>
                      <span style={{ fontSize: '14px', color: INK }}>{step.we}</span>
                    </div>
                    <div style={{ background: '#F7F8F5', borderRadius: '16px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: SLATE }}>{lang === 'en' ? 'You' : 'Tú'}</span>
                      <span style={{ fontSize: '14px', color: INK }}>{step.you}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TÉCNICA FUE ── */}
      <section aria-labelledby="fue-t" style={{ background: INK, color: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap g-spec" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}>
          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: LIME }}>FUE · Follicular Unit Extraction</span>
              <h2 id="fue-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,52px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
                {lang === 'en' ? <>The technique behind <em className="accent" style={{ color: '#9BD3DC' }}>your result.</em></> : <>La técnica detrás <em className="accent" style={{ color: '#9BD3DC' }}>de tu resultado.</em></>}
              </h2>
              <p style={{ margin: 0, fontSize: '17px', color: '#DCEBEE', lineHeight: 1.65, maxWidth: '480px' }}>
                {lang === 'en'
                  ? 'FUE (Follicular Unit Extraction) extracts hair follicles one by one from the donor area and implants them precisely in the recipient area — without a linear scar, under local anesthesia.'
                  : 'La técnica FUE extrae los folículos capilares uno a uno desde la zona donante y los implanta con precisión en la zona receptora. Sin cicatriz lineal, bajo anestesia local.'}
              </p>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {(lang === 'en'
                ? ['Follicle-by-follicle extraction — no linear scar', 'Natural growth pattern in the recipient area', 'Local anesthesia: comfortable and controlled', 'Approx. 3-4 hours, outpatient procedure', 'Predictable and permanent results']
                : ['Extracción folículo a folículo — sin cicatriz lineal', 'Patrón de crecimiento natural en la zona receptora', 'Anestesia local: cómodo y controlado', 'Aprox. 3-4 horas, procedimiento ambulatorio', 'Resultados predecibles y permanentes']
              ).map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, marginTop: '7px', width: '8px', height: '8px', borderRadius: '50%', background: LIME }} />
                  <span style={{ fontSize: '16px', color: '#DCEBEE' }}>{item}</span>
                </li>
              ))}
            </ul>
            <a href="https://wa.me/19548535335" target="_blank" rel="noopener" className="btn" style={{ alignSelf: 'flex-start', height: '52px', padding: '0 22px', borderRadius: '14px', background: LIME, color: INK, fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
              {lang === 'en' ? 'Ask about FUE' : 'Consulta sobre FUE'}
            </a>
          </div>

          {/* FUE Diagram */}
          <div style={{ background: '#122C36', borderRadius: '28px', padding: 'clamp(24px,3vw,40px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#9BD3DC', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {lang === 'en' ? 'FUE technique — step by step' : 'Técnica FUE — paso a paso'}
            </span>
            <svg viewBox="0 0 520 360" width="100%" role="img" aria-label={lang === 'en' ? 'Illustration: follicular unit extraction from donor area and implantation in recipient area' : 'Ilustración: extracción de unidades foliculares en la zona donante e implantación en la zona receptora'} style={{ display: 'block' }}>
              <rect x="0" y="170" width="520" height="26" fill="#1A3D4A"/>
              <path d="M0 170H520" stroke="#0A2730" strokeWidth="1.5"/>
              <path d="M42 250V285A18 18 0 0 0 78 285V250" stroke={TEAL} strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
              <path d="M142 250V285A18 18 0 0 0 178 285V250" stroke={TEAL} strokeWidth="1.5" fill="none"/>
              <path d="M160 288C160 220 168 150 196 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="160" cy="290" r="9" fill={TEAL}/>
              <path d="M242 250V285A18 18 0 0 0 278 285V250" stroke={TEAL} strokeWidth="1.5" fill="none"/>
              <path d="M260 288C260 220 268 150 296 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="260" cy="290" r="9" fill={TEAL}/>
              <path d="M342 250V285A18 18 0 0 0 378 285V250" stroke={TEAL} strokeWidth="1.5" fill="none"/>
              <path d="M360 288C360 220 368 150 396 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="360" cy="290" r="9" fill={TEAL}/>
              <path d="M442 250V285A18 18 0 0 0 478 285V250" stroke={TEAL} strokeWidth="1.5" fill="none"/>
              <path d="M460 288C460 220 468 150 496 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="460" cy="290" r="9" fill={LIME} stroke={INK} strokeWidth="1.5"/>
              <path d="M60 60C160 6 360 6 456 54" stroke={TEAL_D} strokeWidth="1.5" fill="none" strokeDasharray="6 6"/>
              <path d="M444 40L458 56L438 62" stroke={TEAL_D} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="20" y="345" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="700" fill="#9BD3DC">{lang === 'en' ? 'DONOR AREA' : 'ZONA DONANTE'}</text>
              <text x="338" y="345" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="700" fill="#9BD3DC">{lang === 'en' ? 'RECIPIENT AREA' : 'ZONA RECEPTORA'}</text>
            </svg>
            <div style={{ display: 'flex', gap: '24px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: TEAL, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#9BD3DC' }}>{lang === 'en' ? 'Extracted follicle' : 'Folículo extraído'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: LIME, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#9BD3DC' }}>{lang === 'en' ? 'Implanted follicle' : 'Folículo implantado'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE DE RECUPERACIÓN ── */}
      <section aria-labelledby="time-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <h2 id="time-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {lang === 'en' ? <>Recovery <em className="accent">step by step.</em></> : <>Recuperación <em className="accent">paso a paso.</em></>}
            </h2>
            <p style={{ margin: 0, fontSize: '16px', color: SLATE, maxWidth: '360px' }}>
              {lang === 'en' ? 'Understanding each stage of recovery helps you feel confident throughout the process.' : 'Entender cada etapa de la recuperación te da tranquilidad durante todo el proceso.'}
            </p>
          </div>

          <div className="g-four" style={{ display: 'grid', gap: '16px', alignItems: 'stretch' }}>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ background: i === 3 ? INK : '#FFFFFF', border: `1px solid ${i === 3 ? 'transparent' : BORDER}`, borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '72px', fontWeight: 400, color: i === 3 ? 'rgba(197,211,0,0.15)' : 'rgba(1,150,173,0.1)', position: 'absolute', right: '12px', bottom: '-12px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{`0${i + 1}`}</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: i === 3 ? LIME : TEAL_D }}>{t.period}</span>
                <strong style={{ fontSize: '20px', letterSpacing: '-0.015em', color: i === 3 ? '#FFFFFF' : INK }}>{t.title}</strong>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: i === 3 ? '#BFD6DB' : SLATE }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPCIONES DE TRATAMIENTO ── */}
      <section aria-labelledby="opt-t" style={{ background: '#F7F8F5', padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: TEAL_D }}>
              {lang === 'en' ? 'Which treatment fits you?' : '¿Cuál tratamiento es para ti?'}
            </span>
            <h2 id="opt-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {lang === 'en' ? <>Personalized <em className="accent">for each case.</em></> : <>Personalizado <em className="accent">para cada caso.</em></>}
            </h2>
          </div>

          <div className="g-three" style={{ display: 'grid', gap: '20px', alignItems: 'stretch' }}>
            {OPTIONS.map((opt, i) => (
              <Link
                key={i}
                href={opt.href}
                style={{
                  textDecoration: 'none',
                  background: opt.featured ? INK : '#FFFFFF',
                  color: opt.featured ? '#FFFFFF' : INK,
                  borderRadius: '28px',
                  padding: 'clamp(28px,3vw,40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  border: opt.featured ? 'none' : `1px solid ${BORDER}`,
                  transition: 'transform 0.2s',
                }}
                className="card lnk"
              >
                <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: opt.featured ? LIME : TEAL_D }}>{opt.eyebrow}</span>
                <h3 style={{ margin: 0, fontSize: 'clamp(22px,2.4vw,30px)', letterSpacing: '-0.02em', fontWeight: 800 }}>{opt.title}</h3>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: opt.featured ? '#BFD6DB' : SLATE }}>{opt.desc}</p>
                <span style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: opt.featured ? LIME : TEAL_D }}>
                  {lang === 'en' ? 'Learn more' : 'Conocer más'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section aria-labelledby="ben-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ maxWidth: '640px' }}>
            <span style={{ display: 'block', marginBottom: '12px', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: TEAL_D }}>
              {lang === 'en' ? 'How this method helps you' : 'Cómo este método te beneficia'}
            </span>
            <h2 id="ben-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {lang === 'en' ? <>Safe, natural <em className="accent">and lasting outcomes.</em></> : <>Resultados seguros, <em className="accent">naturales y duraderos.</em></>}
            </h2>
          </div>

          <div className="g-four" style={{ display: 'grid', gap: '16px' }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: MIST, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '22px', color: TEAL, lineHeight: 1 }}>{`0${i + 1}`}</span>
                </div>
                <strong style={{ fontSize: '18px', letterSpacing: '-0.01em', color: INK }}>{b.title}</strong>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: SLATE }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-labelledby="faq-m-t" style={{ background: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
        <div className="wrap g-faq" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 id="faq-m-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,52px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {lang === 'en' ? <>Common <em className="accent">questions.</em></> : <>Preguntas <em className="accent">frecuentes.</em></>}
            </h2>
            <p style={{ margin: 0, fontSize: '16px', color: SLATE }}>
              {lang === 'en' ? "Can't find your question? Write to us — the medical team responds." : '¿No encuentras tu pregunta? Escríbenos y te responde el equipo médico.'}
            </p>
            <a href="https://wa.me/19548535335" target="_blank" rel="noopener" style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: TEAL_D, textDecoration: 'none', marginTop: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
              {lang === 'en' ? 'Ask via WhatsApp' : 'Preguntar por WhatsApp'}
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${INK}` }}>
            <Accordion
              items={FAQS.map((f, i) => ({ id: `mfaq-${i}`, question: f.q, answer: f.a }))}
              labelOpen={lang === 'en' ? 'Read more' : 'Ver más'}
              labelClose={lang === 'en' ? 'Read less' : 'Ver menos'}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="dark" aria-labelledby="cta-m-t" style={{ background: INK, color: '#FFFFFF', padding: 'clamp(72px,9vw,120px) 0' }}>
        <div className="wrap g-two" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'end' }}>
          <h2 id="cta-m-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
            {ctaText?.t1 ?? (lang === 'en' ? 'Ready to take the first step?' : '¿Listo para dar el primer paso?')}{' '}
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#5EC4D3' }}>
              {ctaText?.t2 ?? (lang === 'en' ? 'Your consultation is free.' : 'Tu valoración es sin costo.')}
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ margin: 0, fontSize: '18px', color: '#BFD6DB' }}>
              {ctaText?.text ?? (lang === 'en'
                ? 'From your first contact to your final result, your comfort and success are our priority. Schedule your free assessment and begin your hair restoration journey.'
                : 'Desde el primer contacto hasta tu resultado final, tu comodidad y éxito son nuestra prioridad. Agenda tu valoración sin costo y comienza tu camino.')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href="https://wa.me/19548535335" target="_blank" rel="noopener" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', background: LIME, color: INK, fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/></svg>
                {ctaText?.cta ?? (lang === 'en' ? 'Free assessment via WhatsApp' : 'Valoración gratis por WhatsApp')}
              </a>
              <Link href="/contacto" className="btn" style={{ height: '56px', padding: '0 26px', borderRadius: '14px', border: '1.5px solid #FFFFFF', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                {lang === 'en' ? 'Contact form' : 'Formulario de contacto'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
