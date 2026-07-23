import { useMemo } from 'react';
import { MapPin, Clock, Calendar, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../shared/icons';
import { useFerias } from '@/hooks/useFerias';
import type { Feria } from '@/types';
import type { ResolvedLinks } from '@/lib/env';
import { feriaEstado, formatRango } from '@/lib/utils';
import { SectionHeading } from '../shared/SectionHeading';
import { Reveal } from '../shared/Reveal';
import { Badge } from '../shared/Badge';
import { SmartImage } from '../shared/SmartImage';

const FERIA_MSG =
  'Hola AromaticCol 🌿, ¿en qué feria o centro comercial los puedo encontrar próximamente?';

export function Ferias({ links }: { links: ResolvedLinks }) {
  const { data, loading } = useFerias();

  const { vigentes, pasadas } = useMemo(() => {
    const all = data ?? [];
    const withEstado = all.map((f) => ({ f, estado: feriaEstado(f) }));
    return {
      vigentes: withEstado.filter(
        (x) => x.estado === 'activa' || x.estado === 'proxima' || x.estado === 'sin-fecha',
      ),
      pasadas: withEstado.filter((x) => x.estado === 'pasada').map((x) => x.f),
    };
  }, [data]);

  return (
    <section
      id="ferias"
      className="relative bg-gradient-to-b from-forest to-[#20291f] py-24 shadow-[inset_0_1px_0_rgba(230,199,151,0.25)] sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          invert
          eyebrow="Dónde encontrarnos"
          title="Vívelo en persona"
          subtitle="Llevamos la experiencia AromaticCol a ferias y centros comerciales de todo el país. Ven, huele y descubre tu aroma favorito."
        />

        {loading ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-cream/10" />
            ))}
          </div>
        ) : (
          <>
            {vigentes.length > 0 && (
              <div className="mt-16 grid gap-6 md:grid-cols-2">
                {vigentes.map(({ f, estado }, i) => (
                  <Reveal key={f.id} delay={i * 0.08}>
                    <FeriaCard feria={f} activa={estado === 'activa'} proxima={estado === 'proxima'} />
                  </Reveal>
                ))}
              </div>
            )}

            {vigentes.length === 0 && (
              <Reveal className="mt-16 rounded-2xl border border-dashed border-cream/25 bg-cream/5 p-10 text-center">
                <p className="text-cream/75">
                  No tenemos ferias programadas por ahora. Síguenos para enterarte
                  de la próxima cerca de ti.
                </p>
              </Reveal>
            )}

            {/* Timeline de ferias pasadas */}
            {pasadas.length > 0 && (
              <div className="mt-16">
                <h3 className="mb-6 text-center font-serif text-xl text-cream sm:text-left">
                  Hemos estado en
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
                  {pasadas.map((f) => (
                    <div
                      key={f.id}
                      className="w-56 shrink-0 overflow-hidden rounded-xl border border-line bg-warm-white"
                    >
                      <SmartImage
                        src={f.imagen_url}
                        alt={`${f.nombre} en ${f.ciudad}`}
                        className="aspect-[3/2] w-full"
                      />
                      <div className="p-4">
                        <p className="text-sm font-medium text-ink">
                          {f.centro_comercial}
                        </p>
                        <p className="text-xs text-stone">
                          {f.ciudad}
                          {f.fecha_inicio
                            ? ` · ${formatRango(f.fecha_inicio, f.fecha_fin)}`
                            : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <Reveal className="mt-16 flex flex-col items-center gap-5 rounded-2xl bg-clay-600 px-6 py-12 text-center">
          <p className="max-w-md font-serif text-2xl text-cream">
            Síguenos para enterarte de la próxima feria cerca de ti
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {links.hasInstagram && (
              <a
                href={links.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition hover:bg-clay-100"
              >
                <InstagramIcon className="h-4 w-4" />
                Síguenos en Instagram
              </a>
            )}
            {links.hasWhatsapp && (
              <a
                href={links.whatsapp(FERIA_MSG)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream/10"
              >
                <MessageCircle className="h-4 w-4" />
                Pregúntanos por WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeriaCard({
  feria,
  activa,
  proxima,
}: {
  feria: Feria;
  activa: boolean;
  proxima: boolean;
}) {
  return (
    <article className="flex h-full overflow-hidden rounded-2xl border border-line bg-warm-white transition-shadow duration-300 hover:shadow-[0_24px_44px_-28px_rgba(28,25,21,0.4)]">
      <div className="hidden w-40 shrink-0 sm:block">
        <SmartImage
          src={feria.imagen_url}
          alt={`${feria.nombre} en ${feria.ciudad}`}
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          {activa ? (
            <Badge tone="live" dot>
              Activa ahora
            </Badge>
          ) : proxima ? (
            <Badge tone="clay">Próximamente</Badge>
          ) : (
            <Badge tone="neutral">Evento</Badge>
          )}
        </div>
        <h3 className="text-xl text-ink">{feria.nombre}</h3>
        <div className="mt-3 space-y-1.5 text-sm text-stone">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-clay-500" />
            {feria.centro_comercial} · {feria.ciudad}
          </p>
          {feria.dias_horario && (
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-clay-500" />
              {feria.dias_horario}
            </p>
          )}
          {(feria.fecha_inicio || feria.fecha_fin) && (
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-clay-500" />
              {formatRango(feria.fecha_inicio, feria.fecha_fin)}
            </p>
          )}
        </div>
        {feria.descripcion && (
          <p className="mt-3 text-sm leading-relaxed text-stone">
            {feria.descripcion}
          </p>
        )}
      </div>
    </article>
  );
}
