import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

/** Encabezado editorial: eyebrow (kicker) + título serif + subtítulo opcional. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  as = 'h2',
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  as?: 'h1' | 'h2';
  /** Usar sobre fondos oscuros (bg-ink / bg-forest / bg-clay-600). */
  invert?: boolean;
}) {
  const Title = as;
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'tracking-eyebrow mb-4 block text-xs font-semibold uppercase',
            invert ? 'text-clay-300' : 'text-clay-500',
          )}
        >
          {eyebrow}
        </span>
      )}
      <Title
        className={cn(
          'text-3xl leading-tight text-balance sm:text-4xl md:text-5xl',
          invert && 'text-cream',
        )}
      >
        {title}
      </Title>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            invert ? 'text-cream/75' : 'text-stone',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
