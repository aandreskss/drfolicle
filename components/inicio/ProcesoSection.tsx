import { getTranslations } from 'next-intl/server';
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
    <section aria-labelledby="pro-t" style={{ background: '#FFFFFF', padding: 'clamp(72px,9vw,128px) 0' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

        {/* Cabecera */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
          <h2 id="pro-t" style={{ margin: 0, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 800, maxWidth: '760px', textWrap: 'balance' as never }}>
            {text.t1}
            {text.t2 && <> <em className="accent">{text.t2}</em></>}
          </h2>
          {text.text && (
            <span style={{ fontSize: '15px', color: '#4B5F66' }}>{text.text}</span>
          )}
        </div>

        <ProcesoStepper steps={steps} stepLabel={t('step')} />
      </div>
    </section>
  );
}
