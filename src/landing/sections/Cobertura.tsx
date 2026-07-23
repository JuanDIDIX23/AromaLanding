import { MapPin } from 'lucide-react';
import { useCobertura } from '@/hooks/useCobertura';
import { SectionHeading } from '../shared/SectionHeading';
import { Reveal } from '../shared/Reveal';

export function Cobertura() {
  const { data, loading } = useCobertura();

  return (
    <section id="cobertura" className="bg-clay-100 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Cobertura"
          title="Presencia en todo el país"
          subtitle="Llevamos bienestar y aroma a hogares y negocios en las principales ciudades de Colombia."
        />

        {loading ? (
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-warm-white" />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <p className="mt-16 text-center text-stone">
            Pronto anunciaremos nuestras ciudades de cobertura.
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((c, i) => (
              <Reveal
                key={c.id}
                delay={(i % 4) * 0.06}
                className="group flex items-center gap-3 rounded-xl border border-line bg-warm-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-clay-300 hover:shadow-[0_18px_36px_-24px_rgba(28,25,21,0.35)]"
              >
                <span
                  className={
                    i % 3 === 2
                      ? 'grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-forest/10 text-forest transition-colors group-hover:bg-forest/20'
                      : 'grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-clay-50 text-clay-500 transition-colors group-hover:bg-clay-100'
                  }
                >
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{c.ciudad}</p>
                  {c.departamento && (
                    <p className="truncate text-xs text-stone">
                      {c.departamento}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
