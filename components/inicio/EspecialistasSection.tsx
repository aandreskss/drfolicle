import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
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

  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-mist-2">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[520px]">
            <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />
          </div>
          {text.cta && (
            <Link
              href={text.ctaLink ?? '/nosotros'}
              className="lnk inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep hover:underline underline-offset-2"
            >
              {text.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((member) => {
            const role = pick(member.role, lang);
            const photoSrc = member.photo_media_id ? mediaMap[member.photo_media_id] : null;

            return (
              <div key={member.id} className="rounded-[var(--radius-card)] bg-white border border-line overflow-hidden">
                <div className="relative aspect-[3/4] bg-mist">
                  {photoSrc ? (
                    <Image
                      src={photoSrc}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B9CDD2" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-extrabold text-ink">{member.name}</p>
                  <p className="mt-0.5 text-sm text-teal-deep font-semibold">{role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
