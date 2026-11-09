import { SectionHeading } from '@/components/ui/SectionHeading';
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
  const videoSlot = section.data.slots?.[0];
  const posterSrc = slotUrl(videoSlot?.src);

  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-mist-2">
      <div className="wrap">
        <div className="grid gap-12 items-start lg:grid-cols-2">
          {/* Left — content + benefits */}
          <div className="flex flex-col gap-8">
            <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />

            {/* 3 FUE steps */}
            {pasos.length > 0 && (
              <div className="flex flex-col gap-3">
                {pasos.map((paso, i) => {
                  const d = pickItem(paso, lang);
                  return (
                    <div key={i} className="flex gap-4 rounded-[16px] bg-white border border-line p-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-extrabold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-ink">{d.t}</p>
                        {d.d && <p className="mt-1 text-sm text-slate leading-relaxed">{d.d}</p>}
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
                className="btn self-start inline-flex h-12 items-center gap-2 rounded-[14px] border-[1.5px] border-ink px-5 text-[15px] font-bold text-ink hover:bg-ink hover:text-white transition-all duration-[180ms] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5l1.2-3.7A8 8 0 1 1 8.4 19z" />
                </svg>
                {text.cta}
              </a>
            )}
          </div>

          {/* Right — video + benefits */}
          <div className="flex flex-col gap-5">
            {/* Video placeholder / poster */}
            {posterSrc && (
              <div className="relative overflow-hidden rounded-[var(--radius-card)] aspect-video bg-dark">
                <img src={posterSrc} alt={videoSlot?.alt?.[lang] || videoSlot?.alt?.es || ''} className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#007A8C" aria-hidden="true">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits */}
            {beneficios.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {beneficios.map((ben, i) => {
                  const d = pickItem(ben, lang);
                  return (
                    <div key={i} className="rounded-[16px] bg-white border border-line p-4">
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-mist">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0196AD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="font-bold text-ink text-sm">{d.t}</p>
                      {d.d && <p className="mt-1 text-xs text-slate leading-relaxed">{d.d}</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
