interface SectionHeadingProps {
  t1: string;
  t2?: string;
  text?: string;
  center?: boolean;
  dark?: boolean;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  t1,
  t2,
  text,
  center = false,
  dark = false,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <Tag
        className={`text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-wrap-balance ${dark ? 'text-white' : 'text-ink'}`}
      >
        {t1}
        {t2 && (
          <>
            {' '}
            <em className={`accent not-italic ${dark ? '[color:#9BD3DC]' : ''}`}>{t2}</em>
          </>
        )}
      </Tag>
      {text && (
        <p
          className={`mt-4 text-[clamp(16px,1.8vw,18px)] leading-relaxed max-w-[52ch] ${center ? 'mx-auto' : ''} ${dark ? 'text-[#BFD6DB]' : 'text-slate'}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
