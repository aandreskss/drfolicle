import type { Lang } from '@/lib/content/types';
import { VideoAutoplay } from '@/components/ui/VideoAutoplay';

interface Props {
  lang: Lang;
}

const ITEMS = [
  {
    title: 'Valoración sin costo',
    desc: 'Primera consulta gratis, en clínica o por videollamada. Sin compromiso.',
  },
  {
    title: 'Técnica FUE especializada',
    desc: 'Sin cicatriz lineal. Extracción folículo a folículo con diseño de línea frontal personalizado.',
  },
  {
    title: 'Atención bilingüe',
    desc: 'Hablamos español e inglés para atender a pacientes nacionales e internacionales.',
  },
  {
    title: 'Seguimiento post-operatorio',
    desc: 'Protocolo de cuidados, consultas de seguimiento y acompañamiento fotográfico incluidos.',
  },
  {
    title: 'Turismo médico',
    desc: 'Coordinamos la logística del viaje a Medellín para pacientes que vienen desde el exterior.',
  },
  {
    title: 'Resultados documentados',
    desc: 'Solo publicamos casos reales con autorización expresa del paciente. Sin edición.',
  },
];

export function GarantiasSection({ lang: _ }: Props) {
  return (
    <section aria-labelledby="gar-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap g-spec" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>

        {/* ── Columna izquierda — video ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div className="card" style={{ borderRadius: '28px', overflow: 'hidden', background: '#0A2730', aspectRatio: '9 / 16', maxHeight: '580px', position: 'relative' }}>
            <VideoAutoplay
              src="/videos/when-does-it-grow.mp4"
              controls
              playsInline
              aria-label="Video: ¿cuándo vuelve a crecer el cabello?"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '4px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>
              Lo cuentan nuestros pacientes
            </span>
            <strong style={{ fontSize: '18px', letterSpacing: '-0.01em' }}>¿Cuándo vuelve a crecer?</strong>
          </div>
        </div>

        {/* ── Columna derecha — diferenciadores ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '8px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>
              Por qué Dr Follicle Solutions
            </span>
            <h2 id="gar-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              Comprometidos{' '}
              <em className="accent">con tu resultado.</em>
            </h2>
            <p style={{ margin: 0, fontSize: '17px', color: '#24414A', maxWidth: '460px' }}>
              Cada decisión en Dr Follicle Solutions está tomada pensando en tu experiencia y en el resultado que mereces.
            </p>
          </div>

          <div className="g-two" style={{ display: 'grid', gap: '24px' }}>
            {ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #D5E3E6' }}>
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '20px', color: '#0196AD', lineHeight: 1 }}>
                  0{i + 1}
                </span>
                <strong style={{ fontSize: '15px', letterSpacing: '-0.01em' }}>{item.title}</strong>
                <span style={{ fontSize: '14px', color: '#4B5F66', lineHeight: 1.5 }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
