import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/landing/LandingPage';

// El panel admin se carga de forma diferida: no pesa sobre la landing pública.
const RequireAuth = lazy(() =>
  import('@/admin/RequireAuth').then((m) => ({ default: m.RequireAuth })),
);
const AdminLayout = lazy(() =>
  import('@/admin/layout/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);
const LoginPage = lazy(() =>
  import('@/admin/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const DashboardPage = lazy(() =>
  import('@/admin/pages/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  })),
);
const ProductosPage = lazy(() =>
  import('@/admin/pages/ProductosPage').then((m) => ({
    default: m.ProductosPage,
  })),
);
const FeriasPage = lazy(() =>
  import('@/admin/pages/FeriasPage').then((m) => ({ default: m.FeriasPage })),
);
const GaleriaPage = lazy(() =>
  import('@/admin/pages/GaleriaPage').then((m) => ({ default: m.GaleriaPage })),
);
const CoberturaPage = lazy(() =>
  import('@/admin/pages/CoberturaPage').then((m) => ({
    default: m.CoberturaPage,
  })),
);
const ConfiguracionPage = lazy(() =>
  import('@/admin/pages/ConfiguracionPage').then((m) => ({
    default: m.ConfiguracionPage,
  })),
);
const ProspectosPage = lazy(() =>
  import('@/admin/pages/ProspectosPage').then((m) => ({
    default: m.ProspectosPage,
  })),
);

function AdminFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream text-sm text-stone">
      Cargando panel…
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<AdminFallback />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<AdminFallback />}>
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          </Suspense>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="productos" element={<ProductosPage />} />
        <Route path="ferias" element={<FeriasPage />} />
        <Route path="galeria" element={<GaleriaPage />} />
        <Route path="cobertura" element={<CoberturaPage />} />
        <Route path="prospectos" element={<ProspectosPage />} />
        <Route path="configuracion" element={<ConfiguracionPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
