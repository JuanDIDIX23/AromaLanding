import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageCircle, CircleCheck, Send } from 'lucide-react';
import { InstagramIcon } from '../shared/icons';
import { enviarProspecto } from '@/hooks/useProspectos';
import type { ResolvedLinks } from '@/lib/env';
import { WHATSAPP_DEFAULT_MSG } from '@/lib/env';
import { Reveal } from '../shared/Reveal';
import { Button } from '../shared/Button';

const schema = z.object({
  nombre: z.string().min(2, 'Cuéntanos tu nombre'),
  telefono: z
    .string()
    .min(7, 'Ingresa un teléfono válido')
    .regex(/^[\d\s+()-]+$/, 'Solo números y símbolos telefónicos'),
  correo: z
    .string()
    .email('Correo no válido')
    .optional()
    .or(z.literal('')),
  interes: z.string().optional(),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const INTERESES = [
  'Difusores de aroma',
  'Esencias de aromaterapia',
  'Humidificadores',
  'Pebeteros',
  'Productos para mi negocio',
  'Otro',
];

const inputClass =
  'w-full rounded-xl border border-line bg-warm-white px-4 py-3 text-sm text-espresso placeholder:text-stone-light focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-200';

export function Contacto({ links }: { links: ResolvedLinks }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      await enviarProspecto({
        nombre: data.nombre,
        telefono: data.telefono,
        correo: data.correo || null,
        interes: data.interes || null,
        mensaje: data.mensaje || null,
      });
      setSent(true);
      reset();
    } catch {
      alert(
        'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.',
      );
    }
  }

  return (
    <section
      id="contacto"
      className="relative bg-gradient-to-b from-ink to-ink-soft py-24 text-cream shadow-[inset_0_1px_0_rgba(230,199,151,0.2)] sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Lado izquierdo: invitación + accesos directos */}
          <div>
            <span className="tracking-eyebrow mb-4 block text-xs font-semibold uppercase text-clay-300">
              Hablemos
            </span>
            <h2 className="text-balance font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
              Encontremos juntos tu aroma ideal
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-cream/75">
              Déjanos tus datos y te asesoramos personalmente. También puedes
              escribirnos directo — respondemos con gusto.
            </p>

            <div className="mt-8 space-y-3">
              {links.hasWhatsapp && (
                <a
                  href={links.whatsapp(WHATSAPP_DEFAULT_MSG)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-cream/15 bg-cream/5 p-4 transition hover:bg-cream/10"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-forest text-cream">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium text-cream">WhatsApp</p>
                    <p className="text-sm text-cream/60">
                      Atención directa y personal
                    </p>
                  </div>
                </a>
              )}
              {links.hasInstagram && (
                <a
                  href={links.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-cream/15 bg-cream/5 p-4 transition hover:bg-cream/10"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-clay-500 text-cream">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium text-cream">Instagram</p>
                    <p className="text-sm text-cream/60">
                      Inspiración y novedades
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Formulario */}
          <Reveal className="rounded-2xl bg-cream p-6 text-espresso sm:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CircleCheck className="h-14 w-14 text-forest" />
                <h3 className="mt-4 font-serif text-2xl text-ink">
                  ¡Gracias por escribirnos!
                </h3>
                <p className="mt-2 max-w-xs text-stone">
                  Hemos recibido tus datos. Te contactaremos muy pronto.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-medium text-clay-500 hover:text-clay-600"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    {...register('nombre')}
                    className={inputClass}
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.nombre}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      {...register('telefono')}
                      className={inputClass}
                      placeholder="300 123 4567"
                      inputMode="tel"
                      aria-invalid={!!errors.telefono}
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.telefono.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="correo" className="mb-1.5 block text-sm font-medium">
                      Correo <span className="text-stone-light">(opcional)</span>
                    </label>
                    <input
                      id="correo"
                      {...register('correo')}
                      className={inputClass}
                      placeholder="tucorreo@ejemplo.com"
                      inputMode="email"
                      aria-invalid={!!errors.correo}
                    />
                    {errors.correo && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.correo.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="interes" className="mb-1.5 block text-sm font-medium">
                    ¿Qué te interesa?
                  </label>
                  <select id="interes" {...register('interes')} className={inputClass}>
                    <option value="">Selecciona una opción</option>
                    {INTERESES.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium">
                    Mensaje <span className="text-stone-light">(opcional)</span>
                  </label>
                  <textarea
                    id="mensaje"
                    {...register('mensaje')}
                    rows={3}
                    className={`${inputClass} resize-y`}
                    placeholder="Cuéntanos qué buscas…"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
