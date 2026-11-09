import { slotUrl } from '@/lib/content/collections';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

export function CienciaSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);
  const beneficios = (section.data.lists?.beneficios?.items ?? []).filter((it) => it.visible);
  const pasos = (section.data.lists?.pasos?.items ?? []).filter((it) => it.visible);
  const slots = section.data.slots ?? [];
  const surgeryImg = slotUrl(slots[0]?.src);
  const videoSrc = slotUrl(slots[1]?.src);
  const videoPoster = slotUrl(slots[2]?.src);

  return (
    <section aria-labelledby="sci-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

        <h2 id="sci-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, maxWidth: '820px', textWrap: 'balance' as never }}>
          {text.t1}
          {text.t2 && <> <em className="accent">{text.t2}</em></>}
        </h2>

        <div className="g-sci" style={{ display: 'grid', gap: 'clamp(32px,4vw,64px)', alignItems: 'start' }}>

          {/* ── Columna izquierda ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Imagen cirugía con borde redondeado en cápsula */}
            <div className="card" style={{ height: 'clamp(300px,34vw,480px)', borderRadius: '28px 28px 400px 400px / 28px 28px 200px 200px', overflow: 'hidden', position: 'relative' }}>
              {surgeryImg
                ? <img src={surgeryImg} alt={slots[0]?.alt?.[lang] || slots[0]?.alt?.es || 'Equipo médico Dr Follicle Solutions'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '35% 40%', display: 'block' }} />
                : <div className="ph" style={{ position: 'absolute', inset: 0 }} />}
            </div>

            {/* Grid 2x2 de beneficios */}
            {beneficios.length > 0 && (
              <div className="g-two" style={{ display: 'grid', gap: '24px' }}>
                {beneficios.map((ben, i) => {
                  const d = pickItem(ben, lang);
                  return (
                    <div key={i} style={{ display: 'flex', gap: '14px' }}>
                      <span style={{ flexShrink: 0, width: '10px', height: '10px', marginTop: '8px', borderRadius: '50%', background: '#0196AD' }} />
                      <div>
                        <strong style={{ fontSize: '16px' }}>{d.t}</strong>
                        {d.d && <><br /><span style={{ fontSize: '15px', color: '#4B5F66' }}>{d.d}</span></>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Video card */}
            {(videoSrc || videoPoster) && (
              <div style={{ background: '#FFFFFF', border: '1px solid #D5E3E6', borderRadius: '24px', padding: '20px', display: 'flex', gap: '22px', alignItems: 'center' }}>
                <div style={{ flexShrink: 0, width: '132px', aspectRatio: '9 / 16', borderRadius: '16px', overflow: 'hidden', background: '#0A2730' }}>
                  {videoSrc
                    ? <video controls playsInline preload="none" poster={videoPoster ?? undefined} aria-label="Video: paciente cuenta cómo es el procedimiento" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}><source src={videoSrc} /></video>
                    : videoPoster
                      ? <img src={videoPoster} alt="Video placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : null}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>Lo cuentan nuestros pacientes</span>
                  <strong style={{ fontSize: '24px', letterSpacing: '-0.02em' }}>No duele.</strong>
                  <span style={{ fontSize: '15px', color: '#4B5F66' }}>Escucha a un paciente contar cómo vive el procedimiento.</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Columna derecha: técnica FUE ── */}
          <div style={{ background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(24px,3vw,40px)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
              <strong style={{ fontSize: '20px' }}>Cómo funciona la técnica FUE</strong>
              <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#4B5F66' }}>El proceso paso a paso</span>
            </div>

            {/* SVG diagrama */}
            <svg viewBox="0 0 520 360" width="100%" role="img" aria-label="Ilustración: extracción de unidades foliculares en la zona donante e implantación en la zona receptora" style={{ display: 'block' }}>
              <rect x="0" y="170" width="520" height="26" fill="#E3F2F4"/>
              <path d="M0 170H520" stroke="#0A2730" strokeWidth="1.5"/>
              <path d="M42 250V285A18 18 0 0 0 78 285V250" stroke="#0196AD" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
              <path d="M142 250V285A18 18 0 0 0 178 285V250" stroke="#0196AD" strokeWidth="1.5" fill="none"/>
              <path d="M160 288C160 220 168 150 196 70" stroke="#0A2730" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="160" cy="290" r="9" fill="#0196AD"/>
              <path d="M242 250V285A18 18 0 0 0 278 285V250" stroke="#0196AD" strokeWidth="1.5" fill="none"/>
              <path d="M260 288C260 220 268 150 296 70" stroke="#0A2730" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="260" cy="290" r="9" fill="#0196AD"/>
              <path d="M342 250V285A18 18 0 0 0 378 285V250" stroke="#0196AD" strokeWidth="1.5" fill="none"/>
              <path d="M360 288C360 220 368 150 396 70" stroke="#0A2730" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="360" cy="290" r="9" fill="#0196AD"/>
              <path d="M442 250V285A18 18 0 0 0 478 285V250" stroke="#0196AD" strokeWidth="1.5" fill="none"/>
              <path d="M460 288C460 220 468 150 496 70" stroke="#0A2730" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="460" cy="290" r="9" fill="#C5D300" stroke="#0A2730" strokeWidth="1.5"/>
              <path d="M60 60C160 6 360 6 456 54" stroke="#007A8C" strokeWidth="1.5" fill="none" strokeDasharray="6 6"/>
              <path d="M444 40L458 56L438 62" stroke="#007A8C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="20" y="345" fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="700" fill="#4B5F66">ZONA DONANTE</text>
              <text x="368" y="345" fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="700" fill="#4B5F66">ZONA RECEPTORA</text>
            </svg>

            {/* Pasos listados */}
            {pasos.length > 0 && (
              <div style={{ borderTop: '1px solid #D5E3E6', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {pasos.map((paso, i) => {
                  const d = pickItem(paso, lang);
                  return (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '20px', color: '#0196AD', lineHeight: 1.2 }}>0{i + 1}</span>
                      <div>
                        <strong style={{ fontSize: '16px' }}>{d.t}</strong>
                        {d.d && <><br /><span style={{ fontSize: '15px', color: '#24414A' }}>{d.d}</span></>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {text.cta && (
              <a
                href={text.ctaLink ?? 'https://wa.me/19548535335'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ alignSelf: 'flex-start', height: '52px', padding: '0 22px', borderRadius: '14px', border: '1.5px solid #0A2730', color: '#0A2730', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                {text.cta}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
