import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import type { Configuracion } from '@/types';
import type { ResolvedLinks } from '@/lib/env';
import { WHATSAPP_DEFAULT_MSG } from '@/lib/env';
import { BRAND } from '../constants';
import { formatStat } from '@/lib/utils';
import { Button } from '../shared/Button';

const KEN_BURNS_MS = 7000;

export function Hero({
  images,
  config,
  links,
}: {
  images: string[];
  config: Configuracion | null;
  links: ResolvedLinks;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      KEN_BURNS_MS,
    );
    return () => clearInterval(id);
  }, [images.length]);

  const stats = config
    ? [
        config.clientes_felices > 0 && {
          value: formatStat(config.clientes_felices),
          label: 'Clientes felices',
        },
        config.ciudades > 0 && {
          value: `${config.ciudades}`,
          label: 'Ciudades',
        },
        config.productos_vendidos > 0 && {
          value: formatStat(config.productos_vendidos),
          label: 'Productos vendidos',
        },
      ].filter(Boolean)
    : [];

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Fondo: carrusel con crossfade + Ken Burns */}
      <div className="absolute inset-0 bg-ink">
        <AnimatePresence>
          {images.length > 0 && (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <motion.img
                src={images[index]}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: KEN_BURNS_MS / 1000 + 2, ease: 'linear' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Overlay cálido para legibilidad sin perder luminosidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-16">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="tracking-eyebrow mb-6 inline-block text-xs font-semibold uppercase text-cream/70">
            {BRAND.tagline}
          </span>
          <h1 className="text-balance font-serif text-4xl leading-[1.05] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            El aroma que transforma cada espacio en un{' '}
            <em className="italic text-clay-200">refugio sensorial</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
            Difusores, esencias naturales y bienestar con diseño. Creamos
            atmósferas que conectan a las personas con sus entornos — desde 2018,
            hechas en Colombia.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button as="a" href="#productos" size="lg">
              Ver productos <ArrowRight className="h-4 w-4" />
            </Button>
            {links.hasWhatsapp && (
              <a
                href={links.whatsapp(WHATSAPP_DEFAULT_MSG)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-4 text-base font-medium text-cream backdrop-blur-sm transition-all duration-300 hover:bg-cream/20"
              >
                <MessageCircle className="h-4 w-4" />
                Escríbenos por WhatsApp
              </a>
            )}
          </div>

          {/* Stats — se omiten si aún no hay datos cargados */}
          {stats.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
              {stats.map(
                (s) =>
                  s && (
                    <div key={s.label}>
                      <p className="font-serif text-3xl text-cream">
                        {s.value}
                      </p>
                      <p className="text-sm text-cream/70">{s.label}</p>
                    </div>
                  ),
              )}
              {config && config.calificacion > 0 && (
                <div>
                  <p className="flex items-center gap-1 font-serif text-3xl text-cream">
                    {config.calificacion.toFixed(1)}
                    <Star className="h-5 w-5 fill-clay-300 text-clay-300" />
                  </p>
                  <p className="text-sm text-cream/70">Calificación</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
