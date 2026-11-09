import { Link } from '@/i18n/navigation';
import { slotUrl } from '@/lib/content/collections';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

export function HeroSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);
  const slots = section.data.slots ?? [];

  const img1 = slotUrl(slots[0]?.src); // procedimiento (01)
  const img2 = slotUrl(slots[1]?.src); // crecimiento   (02)
  const img3 = slotUrl(slots[2]?.src); // resultado     (03)

  return (
    <section aria-labelledby="hero-t" style={{ padding: 'clamp(40px,6vw,88px) 0 clamp(56px,7vw,104px)' }}>
      <div className="wrap g-hero" style={{ display: 'grid', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>

        {/* ── Columna izquierda ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Eyebrow */}
          {text.eyebrow && (
            <span style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              height: '36px',
              padding: '0 14px 0 10px',
              borderRadius: '999px',
              background: '#E3F2F4',
              color: '#00566E',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 11h5v3a4 4 0 0 0 8 0v-3h5"/>
                <path d="M12 17c0-5 1.5-9 5.5-13"/>
                <circle cx="12" cy="16.6" r="1.3" fill="#0196AD"/>
              </svg>
              {text.eyebrow}
            </span>
          )}

          {/* Título */}
          <h1 id="hero-t" style={{
            margin: 0,
            fontSize: 'clamp(46px,6.4vw,96px)',
            lineHeight: 0.94,
            letterSpacing: '-0.045em',
            fontWeight: 800,
            textWrap: 'balance' as never,
          }}>
            {text.t1}
            {text.t2 && (
              <>
                {' '}
                <em className="accent">{text.t2}</em>
              </>
            )}
          </h1>

          {/* Párrafo */}
          {text.text && (
            <p style={{
              margin: 0,
              fontSize: 'clamp(18px,1.5vw,21px)',
              lineHeight: 1.55,
              color: '#24414A',
              maxWidth: '520px',
              textWrap: 'pretty' as never,
            }}>
              {text.text}
            </p>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {text.cta && (
              <Link
                href={text.ctaLink ?? '/contacto'}
                className="btn"
                style={{
                  height: '56px',
                  padding: '0 26px',
                  borderRadius: '14px',
                  background: '#007A8C',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {text.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </Link>
            )}
            {text.cta2 && (
              <a
                href={text.cta2Link ?? 'https://wa.me/19548535335'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  height: '56px',
                  padding: '0 26px',
                  borderRadius: '14px',
                  border: '1.5px solid #0A2730',
                  color: '#0A2730',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/>
                </svg>
                {text.cta2}
              </a>
            )}
          </div>

          {/* Stats bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 28px',
            paddingTop: '8px',
            borderTop: '1px solid #D5E3E6',
            fontSize: '14px',
            color: '#4B5F66',
          }}>
            {(['Primera valoración sin costo', 'Atención en español e inglés', 'Pacientes de Colombia y del exterior'] as const).map((item) => (
              <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0196AD', flexShrink: 0 }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Columna derecha — 3 círculos ── */}
        <div className="hero-vis hidden md:block" style={{ position: 'relative', height: '660px' }}>

          {/* Círculo grande — 03 Resultado */}
          <div style={{ position: 'absolute', right: '2%', top: '52px', width: 'min(430px,82%)', aspectRatio: '1' }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '8px solid #FFFFFF',
              boxShadow: '0 36px 72px rgba(10,39,48,0.30)',
              overflow: 'hidden',
              background: '#E3F2F4',
            }}>
              {img3 ? (
                <img src={img3} alt={slots[2]?.alt?.[lang] || slots[2]?.alt?.es || 'Resultado de trasplante capilar'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div className="ph" style={{ width: '100%', height: '100%' }} />
              )}
            </div>
            <span style={{
              position: 'absolute',
              left: '50%',
              bottom: '-16px',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              height: '36px',
              padding: '0 16px',
              borderRadius: '999px',
              background: '#C5D300',
              color: '#0A2730',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 24px rgba(10,39,48,0.18)',
            }}>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: '17px', letterSpacing: 0, textTransform: 'none' }}>03</span>
              Resultado
            </span>
          </div>

          {/* Línea punteada vertical */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '76px', top: '186px', height: '112px', borderLeft: '2px dashed #0196AD' }} />
          {/* Punto intermedio */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '71px', top: '252px', width: '12px', height: '12px', borderRadius: '50%', background: '#0196AD' }} />

          {/* Círculo pequeño — 01 Procedimiento */}
          <div style={{ position: 'absolute', left: 0, top: '18px', width: '154px', aspectRatio: '1' }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '6px solid #F7F8F5',
              boxShadow: '0 18px 36px rgba(10,39,48,0.20)',
              overflow: 'hidden',
            }}>
              {img1 ? (
                <img src={img1} alt={slots[0]?.alt?.[lang] || slots[0]?.alt?.es || 'Procedimiento'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div className="ph" style={{ width: '100%', height: '100%' }} />
              )}
            </div>
            <span style={{
              position: 'absolute',
              left: '50%',
              bottom: '-14px',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              height: '32px',
              padding: '0 12px',
              borderRadius: '999px',
              background: '#FFFFFF',
              color: '#0A2730',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 20px rgba(10,39,48,0.14)',
            }}>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: '15px', letterSpacing: 0, textTransform: 'none', color: '#0196AD' }}>01</span>
              Procedimiento
            </span>
          </div>

          {/* Círculo mediano — 02 Crecimiento */}
          <div style={{ position: 'absolute', left: 0, top: '302px', width: '190px', aspectRatio: '1' }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '6px solid #F7F8F5',
              boxShadow: '0 22px 44px rgba(10,39,48,0.24)',
              overflow: 'hidden',
            }}>
              {img2 ? (
                <img src={img2} alt={slots[1]?.alt?.[lang] || slots[1]?.alt?.es || 'Crecimiento'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div className="ph" style={{ width: '100%', height: '100%' }} />
              )}
            </div>
            <span style={{
              position: 'absolute',
              left: '50%',
              bottom: '-14px',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              height: '32px',
              padding: '0 12px',
              borderRadius: '999px',
              background: '#FFFFFF',
              color: '#0A2730',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 20px rgba(10,39,48,0.14)',
            }}>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: '15px', letterSpacing: 0, textTransform: 'none', color: '#0196AD' }}>02</span>
              Crecimiento
            </span>
          </div>

          {/* Tarjeta caso real */}
          <div style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            maxWidth: '300px',
            background: '#0A2730',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: '0 20px 40px rgba(10,39,48,0.22)',
          }}>
            <strong style={{ fontSize: '14px' }}>Caso real · Dr Follicle Solutions</strong>
            <span style={{ fontSize: '13px', lineHeight: 1.45, color: '#BFD6DB' }}>Resultados reales de pacientes. Los resultados varían según cada paciente.</span>
          </div>

          {/* Punto decorativo lima */}
          <div aria-hidden="true" style={{ position: 'absolute', right: '5%', top: '40px', width: '14px', height: '14px', borderRadius: '50%', background: '#C5D300' }} />
        </div>

      </div>
    </section>
  );
}
