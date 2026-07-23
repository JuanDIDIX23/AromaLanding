import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { NAV_LINKS, BRAND } from '../constants';
import type { ResolvedLinks } from '@/lib/env';
import { WHATSAPP_DEFAULT_MSG } from '@/lib/env';
import { cn } from '@/lib/utils';

export function Navbar({ links }: { links: ResolvedLinks }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-silk)]',
        scrolled
          ? 'border-b border-line/70 bg-ivory/85 py-3 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-5',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a
          href="#inicio"
          className="flex items-center gap-2 font-serif text-xl text-ink"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-sm text-cream">
            A
          </span>
          {BRAND.nombre}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-espresso transition-colors hover:text-clay-500"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {links.hasWhatsapp && (
            <a
              href={links.whatsapp(WHATSAPP_DEFAULT_MSG)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clay-500 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Escríbenos
            </a>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="rounded-lg p-2 text-ink md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-line bg-ivory px-5 py-4 md:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-espresso hover:bg-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {links.hasWhatsapp && (
              <li>
                <a
                  href={links.whatsapp(WHATSAPP_DEFAULT_MSG)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream"
                >
                  <MessageCircle className="h-4 w-4" />
                  Escríbenos por WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
