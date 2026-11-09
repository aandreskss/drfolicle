import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcesoStepper } from './ProcesoStepper';
import { slotUrl } from '@/lib/content/collections';
import type { PageSection, Lang } from '@/lib/content/types';
import { pickText, pickItem } from '@/lib/content/types';

interface Props {
  section: PageSection;
  lang: Lang;
}

export async function ProcesoSection({ section, lang }: Props) {
  const text = pickText(section.data.content, lang);
  const rawSteps = (section.data.lists?.etapas?.items ?? []).filter((it) => it.visible);
  const slots = section.data.slots ?? [];
  const t = await getTranslations('ui');

  const steps = rawSteps.map((step, i) => {
    const d = pickItem(step, lang);
    const slot = slots[i];
    return {
      t: d.t ?? '',
      d: d.d ?? '',
      m: d.m,
      imgSrc: slotUrl(slot?.src),
      imgAlt: slot?.alt?.[lang] || slot?.alt?.es || d.t,
    };
  });

  if (steps.length === 0) return null;

  return (
    <section className="py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="mb-10 max-w-[580px]">
          <SectionHeading t1={text.t1 ?? ''} t2={text.t2} text={text.text} />
        </div>
        <ProcesoStepper steps={steps} stepLabel={t('step')} />
      </div>
    </section>
  );
}
