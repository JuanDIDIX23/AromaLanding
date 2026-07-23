import { useMemo, useState } from 'react';
import type { GaleriaCategoria, GaleriaItem } from '@/types';
import { cn } from '@/lib/utils';
import { SectionHeading } from '../shared/SectionHeading';
import { Reveal } from '../shared/Reveal';
import { Lightbox } from '../shared/Lightbox';

const FILTROS: { value: 'todos' | GaleriaCategoria; label: string }[] = [
  { value: 'todos', label: 'Todo' },
  { value: 'ambiente', label: 'Ambientes' },
  { value: 'producto', label: 'Productos' },
  { value: 'feria', label: 'Ferias' },
  { value: 'cliente', label: 'Clientes' },
];

export function Galeria({ items }: { items: GaleriaItem[] }) {
  const [filtro, setFiltro] = useState<'todos' | GaleriaCategoria>('todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtradas = useMemo(
    () =>
      filtro === 'todos'
        ? items
        : items.filter((i) => i.categoria === filtro),
    [items, filtro],
  );

  // Solo mostramos filtros que tienen contenido.
  const filtrosDisponibles = FILTROS.filter(
    (f) =>
      f.value === 'todos' || items.some((i) => i.categoria === f.value),
  );

  if (items.length === 0) return null;

  return (
    <section id="galeria" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Galería"
          title="Momentos que cuentan nuestra historia"
          subtitle="Ambientes, productos y experiencias reales de la comunidad AromaticCol."
        />

        {filtrosDisponibles.length > 2 && (
          <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
            {filtrosDisponibles.map((f) => (
              <button
                key={f.value}
                onClick={() => setFiltro(f.value)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  filtro === f.value
                    ? 'bg-ink text-cream'
                    : 'bg-warm-white text-stone hover:bg-sand',
                )}
              >
                {f.label}
              </button>
            ))}
          </Reveal>
        )}

        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {filtradas.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 4) * 0.05}
              className="break-inside-avoid"
            >
              <button
                onClick={() =>
                  setLightboxIndex(
                    filtradas.findIndex((x) => x.id === item.id),
                  )
                }
                className="group relative block w-full overflow-hidden rounded-xl"
                aria-label={`Ampliar ${item.titulo ?? 'imagen'}`}
              >
                <img
                  src={item.imagen_url}
                  alt={item.titulo ?? 'Imagen de la galería de AromaticCol'}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
                {item.titulo && (
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/70 to-transparent p-3 text-left text-sm text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.titulo}
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        items={filtradas}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
