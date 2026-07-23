import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GaleriaItem } from '@/types';

/** Lightbox accesible con navegación por teclado (Esc / ← / →). */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GaleriaItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const next = (index + dir + items.length) % items.length;
      onNavigate(next);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go, onClose]);

  const current = open ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={current.titulo ?? 'Imagen de la galería'}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 rounded-full bg-cream/10 p-2 text-cream transition hover:bg-cream/20"
          >
            <X className="h-6 w-6" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Anterior"
                className="absolute left-2 rounded-full bg-cream/10 p-2 text-cream transition hover:bg-cream/20 sm:left-6"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Siguiente"
                className="absolute right-2 rounded-full bg-cream/10 p-2 text-cream transition hover:bg-cream/20 sm:right-6"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <motion.figure
            key={current.id}
            className="max-h-[85vh] max-w-5xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.imagen_url}
              alt={current.titulo ?? 'Imagen de la galería de AromaticCol'}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            {current.titulo && (
              <figcaption className="mt-3 text-center text-sm text-cream/80">
                {current.titulo}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
