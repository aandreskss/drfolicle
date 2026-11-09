'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import type { Lang } from '@/lib/content/types';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverSrc: string | null;
  cat: string;
  date: string;
  author: string;
}

const CATS_ES = ['Todos', 'Trasplante capilar', 'Caída del cabello', 'Turismo médico'];
const CATS_EN = ['All', 'Hair transplant', 'Hair loss', 'Medical tourism'];

function formatDate(iso: string | null, lang: Lang): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

export function BlogClient({ posts, lang }: { posts: BlogPost[]; lang: Lang }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');

  const cats = lang === 'en' ? CATS_EN : CATS_ES;
  const catIds = ['all', 'trasplante', 'caida', 'turismo'];

  const ql = q.trim().toLowerCase();
  const visible = posts.filter((p) => {
    const matchCat = cat === 'all' || p.cat.toLowerCase().includes(cat === 'trasplante' ? 'trasplante' : cat === 'caida' ? 'caída' : cat === 'turismo' ? 'turismo' : cat === 'hair transplant' ? 'transplant' : cat === 'hair loss' ? 'loss' : cat === 'medical tourism' ? 'tourism' : '');
    const matchQ = !ql || (p.title + ' ' + p.excerpt).toLowerCase().includes(ql);
    return matchCat && matchQ;
  });

  const feat = visible[0];
  const rest = visible.slice(1);
  const empty = visible.length === 0;

  const searchLabel = lang === 'en' ? 'Search in the blog' : 'Buscar en el blog';
  const searchPh = lang === 'en' ? 'Search a topic, e.g. «recovery»' : 'Busca un tema, por ejemplo «recuperación»';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title + search */}
      <div className="g-two" style={{ display: 'grid', gap: '32px', alignItems: 'end' }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(46px,6vw,88px)', lineHeight: 0.94, letterSpacing: '-0.045em', fontWeight: 800 }}>
          {lang === 'en'
            ? <>Clear answers about <em className="accent">your hair.</em></>
            : <>Respuestas claras sobre <em className="accent">tu cabello.</em></>}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ margin: 0, fontSize: '18px', color: '#24414A' }}>
            {lang === 'en'
              ? 'Guides written with the Dr Follicle Solutions team so you arrive at your assessment with your questions answered.'
              : 'Guías escritas con el equipo de Dr Follicle Solutions para que llegues a tu valoración con tus dudas resueltas.'}
          </p>
          <div style={{ position: 'relative' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5F66" strokeWidth="1.8" strokeLinecap="round" aria-hidden style={{ position: 'absolute', left: '18px', top: '16px' }}>
              <circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>
            </svg>
            <label htmlFor="b-q" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clipPath: 'inset(50%)' }}>{searchLabel}</label>
            <input
              id="b-q"
              type="search"
              placeholder={searchPh}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ height: '52px', borderRadius: '999px', border: '1.5px solid #B9CDD2', background: '#FFFFFF', padding: '0 20px 0 48px', font: '400 16px Manrope, sans-serif', color: '#0A2730', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div role="group" aria-label={lang === 'en' ? 'Categories' : 'Categorías'} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '24px', borderTop: '1px solid #D5E3E6' }}>
        {cats.map((label, i) => {
          const id = catIds[i];
          const on = cat === id;
          return (
            <button
              key={id}
              type="button"
              className="chip"
              onClick={() => setCat(id)}
              aria-pressed={on}
              style={{ height: '42px', padding: '0 16px', borderRadius: '999px', border: `1.5px solid ${on ? '#0A2730' : '#B9CDD2'}`, background: on ? '#0A2730' : '#FFFFFF', color: on ? '#FFFFFF' : '#0A2730', font: '700 14px Manrope, sans-serif', cursor: 'pointer' }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Featured post */}
      {feat && (
        <Link
          href={`/blog/${feat.slug}`}
          className="post g-feat"
          style={{ display: 'grid', gap: 0, background: '#FFFFFF', borderRadius: '32px', overflow: 'hidden', textDecoration: 'none', color: '#0A2730' }}
        >
          <div style={{ position: 'relative', minHeight: '420px', overflow: 'hidden', background: '#E3F2F4' }}>
            {feat.coverSrc ? (
              <img src={feat.coverSrc} alt={feat.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div className="ph-d" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#BFD6DB', fontSize: '13px', fontWeight: 600 }}>
                [{lang === 'en' ? 'Article cover' : 'Portada del artículo'}]
              </div>
            )}
            <span style={{ position: 'absolute', left: '20px', top: '20px', height: '32px', padding: '0 12px', borderRadius: '999px', background: '#C5D300', color: '#0A2730', fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>
              {lang === 'en' ? 'Featured' : 'Destacado'}
            </span>
          </div>
          <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>{feat.cat}</span>
            <strong className="pt" style={{ fontSize: 'clamp(28px,2.8vw,40px)', lineHeight: 1.08, letterSpacing: '-0.03em', transition: 'color .18s' }}>{feat.title}</strong>
            <span style={{ fontSize: '17px', color: '#4B5F66' }}>{feat.excerpt}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#4B5F66', paddingTop: '12px', borderTop: '1px solid #D5E3E6' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0A2730', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>DF</span>
              {feat.author} · {feat.date}
            </span>
          </div>
        </Link>
      )}

      {/* Post grid */}
      {!empty && (
        <div className="g-grid" style={{ display: 'grid', gap: '24px' }}>
          {rest.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="post"
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none', color: '#0A2730' }}
            >
              <div style={{ height: '240px', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#E3F2F4' }}>
                {p.coverSrc ? (
                  <img src={p.coverSrc} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div className="ph-d" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#BFD6DB', fontSize: '13px', fontWeight: 600 }}>
                    [{lang === 'en' ? 'Article cover' : 'Portada del artículo'}]
                  </div>
                )}
              </div>
              <span style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#007A8C' }}>{p.cat}</span>
              <strong className="pt" style={{ fontSize: '22px', lineHeight: 1.2, letterSpacing: '-0.015em', transition: 'color .18s' }}>{p.title}</strong>
              <span style={{ fontSize: '15px', color: '#4B5F66' }}>{p.excerpt}</span>
              <span style={{ fontSize: '13px', color: '#4B5F66' }}>{p.date}</span>
            </Link>
          ))}

          {/* CTA WhatsApp card */}
          <div style={{ background: '#00566E', color: '#FFFFFF', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px', minHeight: '360px' }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#C5D300" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z"/><path d="M9 11h6M9 14h3.5"/></svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <strong style={{ fontSize: '24px', lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                {lang === 'en' ? "Your question isn't here?" : '¿Tu pregunta no está aquí?'}
              </strong>
              <span style={{ fontSize: '15px', color: '#DCEBEE' }}>
                {lang === 'en' ? 'Write to us and the medical team will answer.' : 'Escríbenos y te responde el equipo médico.'}
              </span>
            </div>
            <a
              href="https://wa.me/19548535335"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ alignSelf: 'flex-start', height: '52px', padding: '0 22px', borderRadius: '14px', background: '#C5D300', color: '#0A2730', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              {lang === 'en' ? 'Ask via WhatsApp' : 'Preguntar por WhatsApp'}
            </a>
          </div>
        </div>
      )}

      {/* Empty state */}
      {empty && (
        <div style={{ border: '1.5px dashed #B9CDD2', borderRadius: '28px', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
          <strong style={{ fontSize: '20px' }}>
            {lang === 'en' ? "We didn't find articles on that topic" : 'No encontramos artículos con ese tema'}
          </strong>
          <span style={{ fontSize: '15px', color: '#4B5F66' }}>
            {lang === 'en' ? 'Try another word or choose a different category.' : 'Prueba con otra palabra o elige otra categoría.'}
          </span>
        </div>
      )}
    </div>
  );
}
