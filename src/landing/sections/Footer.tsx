import { MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../shared/icons';
import { NAV_LINKS, BRAND } from '../constants';
import type { ResolvedLinks } from '@/lib/env';
import { WHATSAPP_DEFAULT_MSG } from '@/lib/env';

export function Footer({ links }: { links: ResolvedLinks }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forest/50 bg-ink text-cream/80">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <a
              href="#inicio"
              className="flex items-center gap-2 font-serif text-xl text-cream"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-cream text-sm text-ink">
                A
              </span>
              {BRAND.nombre}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              {BRAND.idea}
            </p>
            <div className="mt-6 flex gap-3">
              {links.hasWhatsapp && (
                <a
                  href={links.whatsapp(WHATSAPP_DEFAULT_MSG)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-cream/15 transition hover:bg-cream/10"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
              {links.hasInstagram && (
                <a
                  href={links.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-cream/15 transition hover:bg-cream/10"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/60 transition hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tienda / contacto */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream">
              Tienda
            </h3>
            <ul className="space-y-2 text-sm">
              {links.hasStore && (
                <li>
                  <a
                    href={links.storeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cream/60 transition hover:text-cream"
                  >
                    Tienda en línea
                  </a>
                </li>
              )}
              <li>
                <a
                  href="#contacto"
                  className="text-cream/60 transition hover:text-cream"
                >
                  Contáctanos
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-cream/60 transition hover:text-cream"
                >
                  Administración
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50 sm:flex-row">
          <p>
            © {year} {BRAND.nombre}. Todos los derechos reservados.
          </p>
          <p className="font-serif italic">{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
