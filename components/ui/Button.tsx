import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'lime';
type Size = 'hero' | 'default' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2.5 font-bold whitespace-nowrap rounded-[14px] transition-[background-color,color,transform,box-shadow] duration-[180ms] [transition-timing-function:cubic-bezier(.2,.7,.2,1)] cursor-pointer select-none focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_#F7F8F5,0_0_0_6px_#0196AD] hover:-translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-teal-deep text-white hover:bg-teal-petroleo',
  secondary:
    'border-[1.5px] border-ink text-ink bg-transparent hover:bg-ink hover:text-white',
  lime: 'bg-lime text-dark hover:bg-lime-hover focus-visible:shadow-[0_0_0_3px_#0A2730,0_0_0_6px_#C5D300]',
};

const sizes: Record<Size, string> = {
  hero: 'h-14 px-7 text-base',
  default: 'h-12 px-5 text-[15px]',
  sm: 'h-11 px-4 text-sm',
};

type AnchorProps = { href: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>;
type ButtonProps = { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = (AnchorProps | ButtonProps) & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as AnchorProps;
    return (
      <a href={href} className={cls} {...anchor}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
