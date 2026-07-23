import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AdminButton, Field, TextInput } from '../components/ui';

export function LoginPage() {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (session) {
    navigate('/admin', { replace: true });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? 'Correo o contraseña incorrectos.'
          : 'No se pudo iniciar sesión.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cream p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-ink font-serif text-xl text-cream">
            A
          </span>
          <h1 className="font-serif text-2xl text-ink">AromaticCol</h1>
          <p className="text-sm text-stone">Panel de administración</p>
        </div>

        {!isSupabaseConfigured && (
          <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-800">
            Supabase no está configurado. Rellena <code>VITE_SUPABASE_URL</code>{' '}
            y <code>VITE_SUPABASE_ANON_KEY</code> en <code>.env</code>.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm"
        >
          <Field label="Correo">
            <TextInput
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </Field>
          <Field label="Contraseña">
            <TextInput
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <AdminButton type="submit" disabled={loading} className="w-full">
            {loading ? 'Entrando…' : 'Iniciar sesión'}
          </AdminButton>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-sm text-stone hover:text-espresso"
        >
          ← Volver al sitio
        </a>
      </div>
    </div>
  );
}
