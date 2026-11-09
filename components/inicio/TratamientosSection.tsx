import { Link } from '@/i18n/navigation';
import type { PageSection, Lang, Treatment } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  treatments: Treatment[];
  mediaMap: Record<string, string>;
}

const layoutClass: Record<number, string> = { 0: 't1', 1: 't2', 2: 't3', 3: 't4' };

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

function CardT1({ href, num, name, short, imgSrc }: { href: string; num: string; name: string; short: string; imgSrc: string | null }) {
  return (
    <Link href={href} className="card lnk t1" style={{ textDecoration: 'none', color: '#0A2730', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ flex: 1, minHeight: '520px', borderRadius: '28px 28px 999px 999px', overflow: 'hidden', position: 'relative' }}>
        {imgSrc
          ? <img src={imgSrc} alt={name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', display: 'block' }} />
          : <div className="ph" style={{ position: 'absolute', inset: 0 }} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '24px' }}>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '24px', color: '#0196AD' }}>{num}</span>
        <strong style={{ fontSize: '28px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{name}</strong>
        <span style={{ fontSize: '16px', color: '#4B5F66' }}>{short}</span>
        <span className="lnk" style={{ fontWeight: 700, fontSize: '15px', color: '#007A8C', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Conoce el tratamiento<ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function CardT2({ href, num, name, short, imgSrc }: { href: string; num: string; name: string; short: string; imgSrc: string | null }) {
  return (
    <Link href={href} className="card lnk t2" style={{ textDecoration: 'none', color: '#0A2730', background: '#FFFFFF', borderRadius: '28px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', minHeight: '320px' }}>
      <div style={{ flex: '1 1 260px', minHeight: '300px', position: 'relative', overflow: 'hidden', background: '#F2F1F3' }}>
        {imgSrc
          ? <img src={imgSrc} alt={name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', display: 'block' }} />
          : <div className="ph" style={{ position: 'absolute', inset: 0 }} />}
        <span style={{ position: 'absolute', left: '16px', bottom: '16px', display: 'inline-flex', gap: '8px', alignItems: 'center', height: '30px', padding: '0 12px', borderRadius: '999px', background: '#0A2730', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Antes <span style={{ opacity: 0.5 }}>|</span> Después
        </span>
      </div>
      <div style={{ flex: '1 1 280px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' }}>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '24px', color: '#0196AD' }}>{num}</span>
        <strong style={{ fontSize: '26px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{name}</strong>
        <span style={{ fontSize: '16px', color: '#4B5F66' }}>{short}</span>
        <span className="lnk" style={{ fontWeight: 700, fontSize: '15px', color: '#007A8C', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Conoce el tratamiento<ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function CardT3({ href, num, name, short, imgSrc }: { href: string; num: string; name: string; short: string; imgSrc: string | null }) {
  return (
    <Link href={href} className="card lnk t3" style={{ textDecoration: 'none', color: '#0A2730', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ height: '260px', borderRadius: '28px', overflow: 'hidden', position: 'relative' }}>
        {imgSrc
          ? <img src={imgSrc} alt={name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
          : <div className="ph" style={{ position: 'absolute', inset: 0 }} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '22px', color: '#0196AD' }}>{num}</span>
        <strong style={{ fontSize: '22px', letterSpacing: '-0.015em' }}>{name}</strong>
        <span style={{ fontSize: '15px', color: '#4B5F66' }}>{short}</span>
        <span className="lnk" style={{ fontWeight: 700, fontSize: '15px', color: '#007A8C', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Conoce el tratamiento<ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function CardT4({ href, num, name, short }: { href: string; num: string; name: string; short: string }) {
  return (
    <Link href={href} className="lnk t4" style={{ textDecoration: 'none', color: '#FFFFFF', background: '#00566E', borderRadius: '28px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '32px', minHeight: '360px' }}>
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11h5v3a4 4 0 0 0 8 0v-3h5"/>
        <path d="M12 17c0-5 1.5-9 5.5-13"/>
        <circle cx="12" cy="16.6" r="1.3" fill="#C5D300"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '22px', color: '#9BD3DC' }}>{num}</span>
        <strong style={{ fontSize: '24px', letterSpacing: '-0.015em', lineHeight: 1.15 }}>{name}</strong>
        <span style={{ fontSize: '15px', color: '#DCEBEE' }}>{short}</span>
        <span className="lnk" style={{ fontWeight: 700, fontSize: '15px', color: '#C5D300', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Conoce el tratamiento<ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export function TratamientosSection({ section, lang, treatments, mediaMap }: Props) {
  const text = pickText(section.data.content, lang);
  const homeItems = treatments.filter((t) => t.show_home).sort((a, b) => a.home_layout - b.home_layout);
  if (homeItems.length === 0) return null;

  return (
    <section aria-labelledby="trat-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

        {/* Cabecera */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
          <h2 id="trat-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, maxWidth: '780px', textWrap: 'balance' as never }}>
            {text.t1}
            {text.t2 && <> <em className="accent">{text.t2}</em></>}
          </h2>
          {text.text && (
            <p style={{ margin: 0, maxWidth: '360px', fontSize: '16px', color: '#4B5F66' }}>{text.text}</p>
          )}
        </div>

        {/* Grid de tratamientos */}
        <div className="g-treat" style={{ display: 'grid', gap: '24px' }}>
          {homeItems.map((t, idx) => {
            const name = pick(t.name, lang);
            const short = pick(t.short, lang);
            const imgSrc = t.image_media_id ? (mediaMap[t.image_media_id] ?? null) : null;
            const href = t.page_slug ? `/${t.page_slug}` : '/servicios';
            const layout = t.home_layout;
            const num = `0${idx + 1}`;

            if (layout === 0) return <CardT1 key={t.id} href={href} num={num} name={name} short={short} imgSrc={imgSrc} />;
            if (layout === 1) return <CardT2 key={t.id} href={href} num={num} name={name} short={short} imgSrc={imgSrc} />;
            if (layout === 2) return <CardT3 key={t.id} href={href} num={num} name={name} short={short} imgSrc={imgSrc} />;
            return <CardT4 key={t.id} href={href} num={num} name={name} short={short} />;
          })}
        </div>
      </div>
    </section>
  );
}
