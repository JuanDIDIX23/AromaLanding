import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'neutral' | 'clay' | 'forest' | 'live';

const tones: Record<Tone, string> = {
  neutral: 'bg-cream text-stone border border-line',
  clay: 'bg-clay-100 text-clay-600',
  forest: 'bg-forest/10 text-forest',
  live: 'bg-forest text-cream',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
