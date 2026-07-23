import { useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useGaleria } from '@/hooks/useGaleria';
import { resolveLinks } from '@/lib/env';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Nosotros } from './sections/Nosotros';
import { Products } from './sections/Products';
import { Ferias } from './sections/Ferias';
import { Galeria } from './sections/Galeria';
import { Cobertura } from './sections/Cobertura';
import { Contacto } from './sections/Contacto';
import { Footer } from './sections/Footer';

export function LandingPage() {
  const { data: config } = useConfig();
  const { data: galeria } = useGaleria();

  const links = useMemo(() => resolveLinks(config), [config]);
  const items = useMemo(() => galeria ?? [], [galeria]);

  // Imágenes de fondo del Hero: preferimos ambientes/productos, con fallback.
  const heroImages = useMemo(() => {
    const preferidas = items.filter(
      (i) => i.categoria === 'ambiente' || i.categoria === 'producto',
    );
    return (preferidas.length > 0 ? preferidas : items)
      .map((i) => i.imagen_url)
      .slice(0, 8);
  }, [items]);

  const nosotrosImg = items.find((i) => i.categoria === 'ambiente')?.imagen_url;

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar links={links} />
      <main>
        <Hero images={heroImages} config={config} links={links} />
        <Nosotros imagen={nosotrosImg} />
        <Products links={links} />
        <Ferias links={links} />
        <Galeria items={items} />
        <Cobertura />
        <Contacto links={links} />
      </main>
      <Footer links={links} />
    </div>
  );
}
