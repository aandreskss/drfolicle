import type { PageSection, Lang } from '@/lib/content/types';
import { pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

const ICONS = [
  <svg key="0" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/></svg>,
  <svg key="1" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M12 3l7 3v5c0 4.6-3 8.1-7 10-4-1.9-7-5.4-7-10V6z"/><path d="M12 9v6M9 12h6"/></svg>,
  <svg key="2" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M3 11h5v3a4 4 0 0 0 8 0v-3h5"/><path d="M12 17c0-5 1.5-9 5.5-13"/><circle cx="12" cy="16.6" r="1.3" fill="#0196AD"/></svg>,
  <svg key="3" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><circle cx="8.5" cy="8" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M3 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><path d="M15 14.2c2.6-.3 4.8 1.4 5.5 4.3"/></svg>,
];

export function ConfianzaSection({ section, lang }: Props) {
  const items = section.data.lists?.items?.items ?? [];
  const visible = items.filter((it) => it.visible);
  if (visible.length === 0) return null;

  return (
    <section aria-label="Por qué confiar en nosotros" style={{ background: '#FFFFFF', borderTop: '1px solid #D5E3E6', borderBottom: '1px solid #D5E3E6' }}>
      <div className="wrap g-trust" style={{ display: 'grid' }}>
        {visible.map((item, i) => {
          const d = pickItem(item, lang);
          const isFirst = i === 0;
          const isLast = i === visible.length - 1;
          return (
            <div
              key={i}
              style={{
                padding: isFirst ? '36px 28px 36px 0' : isLast ? '36px 0 36px 28px' : '36px 28px',
                borderLeft: i > 0 ? '1px solid #D5E3E6' : undefined,
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              {ICONS[i] ?? ICONS[0]}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <strong style={{ fontSize: '16px' }}>{d.t}</strong>
                <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#4B5F66' }}>{d.d}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
