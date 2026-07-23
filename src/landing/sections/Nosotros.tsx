import { Leaf, MessageCircle, MapPin } from 'lucide-react';
import { BRAND, PILARES } from '../constants';
import { SectionHeading } from '../shared/SectionHeading';
import { Reveal } from '../shared/Reveal';
import { SmartImage } from '../shared/SmartImage';

const TRUST = [
  { icon: Leaf, label: 'Esencias naturales' },
  { icon: MessageCircle, label: 'Atención directa por WhatsApp' },
  { icon: MapPin, label: 'Presencia en varias ciudades' },
];

export function Nosotros({ imagen }: { imagen?: string | null }) {
  return (
    <section id="nosotros" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Nuestra historia"
          title="Un refugio sensorial nacido de la fe y el esfuerzo"
          subtitle="AromaticCol nació del deseo de un joven emprendedor colombiano de apoyar a su familia y financiar sus estudios. Hoy es un compromiso con el bienestar y con generar oportunidades para más familias en Colombia."
        />

        {/* Imagen + Misión/Visión */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SmartImage
              src={imagen}
              alt="Ambiente cálido y sereno con productos de AromaticCol"
              className="aspect-[4/5] w-full rounded-2xl"
            />
          </Reveal>

          <div className="space-y-8">
            <Reveal
              className="border-l-2 border-clay-300 pl-6"
              delay={0.05}
            >
              <p className="tracking-eyebrow mb-2 text-xs font-semibold uppercase text-clay-500">
                Misión
              </p>
              <p className="font-serif text-xl italic leading-relaxed text-ink sm:text-2xl">
                “{BRAND.mision}”
              </p>
            </Reveal>
            <Reveal
              className="border-l-2 border-clay-300 pl-6"
              delay={0.1}
            >
              <p className="tracking-eyebrow mb-2 text-xs font-semibold uppercase text-clay-500">
                Visión
              </p>
              <p className="font-serif text-xl italic leading-relaxed text-ink sm:text-2xl">
                “{BRAND.vision}”
              </p>
            </Reveal>
          </div>
        </div>

        {/* Pilares */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((pilar, i) => (
            <Reveal
              key={pilar.titulo}
              delay={i * 0.08}
              className="rounded-2xl border border-line bg-warm-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(28,25,21,0.35)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-clay-50 text-clay-500">
                <pilar.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-lg text-ink">{pilar.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                {pilar.texto}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Badges de confianza */}
        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {TRUST.map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-2 text-sm font-medium text-stone"
            >
              <t.icon className="h-4 w-4 text-clay-500" />
              {t.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
