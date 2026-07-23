import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Imagen con lazy-loading, fundido al cargar y un placeholder elegante
 * (monograma de marca sobre degradado cálido) cuando no hay `src` o falla.
 * Evita imágenes rotas mientras el cliente aún no ha subido fotografía real.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-cream',
        className,
      )}
    >
      {showPlaceholder ? (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand via-cream to-clay-50"
          role="img"
          aria-label={alt}
        >
          <Leaf className="h-7 w-7 text-clay-300" strokeWidth={1.5} />
          <span className="font-serif text-sm italic text-clay-400">
            AromaticCol
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-silk)]',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
