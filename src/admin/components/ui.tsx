import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Botón
// ---------------------------------------------------------------------------
type BtnVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

const btnVariants: Record<BtnVariant, string> = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  secondary: 'bg-white text-espresso border border-line hover:bg-cream',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'text-stone hover:text-espresso hover:bg-cream',
};

export function AdminButton({
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
        btnVariants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Campo con etiqueta
// ---------------------------------------------------------------------------
export function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-espresso">
        {label}
      </span>
      {children}
      {hint && !error && (
        <span className="mt-1 block text-xs text-stone-light">{hint}</span>
      )}
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}

const controlBase =
  'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-espresso ' +
  'placeholder:text-stone-light focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-200';

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlBase, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={3}
      {...props}
      className={cn(controlBase, 'resize-y', props.className)}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(controlBase, props.className)} />;
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2 text-sm text-espresso"
    >
      <span
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-forest' : 'bg-line',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </span>
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Card / panel
// ---------------------------------------------------------------------------
export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-white p-5 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Spinner({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-10 text-sm text-stone">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-clay-500" />
      {label}
    </div>
  );
}
