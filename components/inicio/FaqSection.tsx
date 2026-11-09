import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import type { PageSection, Lang, Faq } from '@/lib/content/types';
import { pickText, pick } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
  faqs: Faq[];
}

export function FaqSection({ section, lang, faqs }: Props) {
  const text = pickText(section.data.content, lang);
  if (faqs.length === 0) return null;

  const items = faqs.map((f) => ({
    id: f.id,
    question: pick(f.question, lang),
    answer: pick(f.answer, lang),
  }));

  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-mist-2">
      <div className="wrap max-w-[800px]">
        <div className="mb-10">
          <SectionHeading
            t1={text.t1 ?? (lang === 'en' ? 'Frequently asked' : 'Preguntas')}
            t2={text.t2 ?? (lang === 'en' ? 'questions.' : 'frecuentes.')}
          />
        </div>
        <Accordion
          items={items}
          labelOpen={lang === 'en' ? 'View more' : 'Ver más'}
          labelClose={lang === 'en' ? 'View less' : 'Ver menos'}
        />
      </div>
    </section>
  );
}
