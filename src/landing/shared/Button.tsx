import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-all duration-300 ease-[var(--ease-silk)] disabled:opacity-50 ' +
  'disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Terracota — CTA principal en toda la landing (según guía de estilo).
  primary:
    'bg-clay-500 text-cream hover:bg-clay-600 hover:-translate-y-0.5 ' +
    'shadow-[0_8px_30px_-12px_rgba(169,108,69,0.45)]',
  secondary:
    'bg-transparent text-ink border border-line hover:border-clay-400 ' +
    'hover:bg-clay-50',
  ghost: 'bg-transparent text-ink hover:text-clay-500',
  // Negro cálido — uso puntual, no como CTA por defecto.
  dark:
    'bg-ink text-cream hover:bg-ink-soft hover:-translate-y-0.5 ' +
    'shadow-[0_8px_30px_-12px_rgba(28,25,21,0.5)]',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsLink = CommonProps & {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === 'a') {
    const { href, target, rel } = props;
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
