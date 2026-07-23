import { ArrowUpRight, Store } from 'lucide-react';
import { useProductos } from '@/hooks/useProductos';
import type { ResolvedLinks } from '@/lib/env';
import { SectionHeading } from '../shared/SectionHeading';
import { Reveal } from '../shared/Reveal';
import { SmartImage } from '../shared/SmartImage';
import { Badge } from '../shared/Badge';
import { Button } from '../shared/Button';

const STORE_MSG =
  'Hola AromaticCol 🌿, quiero ver el catálogo completo de productos.';

export function Products({ links }: { links: ResolvedLinks }) {
  const { data, loading } = useProductos(true);

  return (
    <section id="productos" className="bg-gradient-to-b from-clay-50 to-clay-100 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Colección"
          title="Productos que cuidan tu bienestar"
          subtitle="Una selección de nuestros favoritos. Difusores, esencias y piezas que transforman la atmósfera de tu hogar o negocio."
        />

        {loading ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] animate-pulse rounded-2xl bg-clay-200"
              />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <p className="mt-16 text-center text-stone">
            Pronto compartiremos nuestra colección destacada.
          </p>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p, i) => (
              <Reveal
                key={p.id}
                delay={(i % 3) * 0.08}
                className="group overflow-hidden rounded-2xl border border-line bg-warm-white transition-all duration-500 ease-[var(--ease-silk)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgba(28,25,21,0.4)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SmartImage
                    src={p.imagen_url}
                    alt={p.nombre}
                    className="h-full w-full transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-105"
                    imgClassName="group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-silk)]"
                  />
                  {p.tag && (
                    <div className="absolute left-3 top-3">
                      <Badge tone="clay">{p.tag}</Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="tracking-eyebrow text-xs font-semibold uppercase text-clay-500">
                    {p.categoria}
                  </span>
                  <h3 className="mt-2 text-xl text-ink">{p.nombre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {p.descripcion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* CTA a la tienda completa (cae a WhatsApp si no hay tienda) */}
        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          {links.hasStore ? (
            <Button as="a" href={links.storeUrl} target="_blank" rel="noreferrer" size="lg">
              <Store className="h-5 w-5" />
              Explorar tienda completa
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          ) : links.hasWhatsapp ? (
            <Button
              as="a"
              href={links.whatsapp(STORE_MSG)}
              target="_blank"
              rel="noreferrer"
              size="lg"
            >
              <Store className="h-5 w-5" />
              Ver catálogo completo por WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          ) : null}
          <p className="text-sm text-stone">
            Más de 15 aromas disponibles: lavanda, sándalo, café, coco, frutos
            rojos y más.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
