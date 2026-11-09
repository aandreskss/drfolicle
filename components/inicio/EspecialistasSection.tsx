import { Link } from '@/i18n/navigation';
import type { PageSection, Lang, TeamMember } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  team: TeamMember[];
  mediaMap: Record<string, string>;
}

export function EspecialistasSection({ section, lang, team, mediaMap }: Props) {
  const text = pickText(section.data.content, lang);
  if (team.length === 0) return null;

  const photoMember = team.find((m) => m.photo_media_id);
  const photoSrc = photoMember?.photo_media_id ? (mediaMap[photoMember.photo_media_id] ?? null) : null;

  return (
    <section aria-labelledby="esp-t" style={{ padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap g-spec" style={{ display: 'grid', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}>

        {/* ── Foto ── */}
        <div className="card" style={{ position: 'relative', height: 'clamp(420px,44vw,620px)', borderRadius: '32px', background: '#E3F2F4', overflow: 'hidden' }}>
          {photoSrc ? (
            <img src={photoSrc} alt={`Especialista de Dr Follicle Solutions`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 20%', display: 'block' }} />
          ) : (
            <div className="ph" style={{ position: 'absolute', inset: 0 }} />
          )}
          <span style={{ position: 'absolute', left: '20px', top: '20px', background: 'rgba(10,39,48,0.78)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 10px', borderRadius: '999px' }}>
            En consulta · Medellín
          </span>
        </div>

        {/* ── Lista del equipo ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {text.eyebrow && (
              <span style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>
                {text.eyebrow}
              </span>
            )}
            <h2 id="esp-t" style={{ margin: 0, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800 }}>
              {text.t1}
              {text.t2 && <> <em className="accent">{text.t2}</em></>}
            </h2>
            {text.text && (
              <p style={{ margin: 0, fontSize: '17px', color: '#24414A' }}>{text.text}</p>
            )}
          </div>

          {/* Lista de miembros */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #0A2730' }}>
            {team.map((member) => {
              const role = pick(member.role, lang);
              return (
                <Link
                  key={member.id}
                  href={text.ctaLink ?? '/nosotros'}
                  className="lnk"
                  style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #D5E3E6', color: '#0A2730', textDecoration: 'none' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <strong style={{ fontSize: '20px' }}>{member.name}</strong>
                    <span style={{ fontSize: '14px', color: '#4B5F66' }}>{role}</span>
                  </div>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007A8C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </Link>
              );
            })}
          </div>

          {text.cta && (
            <Link
              href={text.ctaLink ?? '/nosotros'}
              className="lnk"
              style={{ fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              {text.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
