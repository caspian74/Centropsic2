import { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { prefersReducedMotion } from './lib/device.js';
import Home from './pages/Home.jsx';

// Cada página secundaria viaja en su propio archivo (code splitting).
const SpecialistsPage = lazy(() => import('./pages/SpecialistsPage.jsx'));
const SpecialistProfile = lazy(() => import('./pages/SpecialistProfile.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const MentalHealthNotice = lazy(() => import('./pages/MentalHealthNotice.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

/** Al cambiar de ruta: sube al inicio, o baja al ancla (#seccion) si la hay. */
function ScrollManager() {
  const { pathname, search, hash, key } = useLocation();
  const previous = useRef({ pathname: null, search: '' });

  useEffect(() => {
    const before = previous.current;
    previous.current = { pathname, search };

    if (!hash) {
      // Cambiar solo los filtros (?area=…) no debe mover la página.
      const onlyQueryChanged = before.pathname === pathname && before.search !== search;
      if (!onlyQueryChanged) window.scrollTo(0, 0);
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;
    const seek = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
      } else if (tries++ < 30) {
        timer = window.setTimeout(seek, 60);
      }
    };
    // Un respiro para que la página (posiblemente diferida) termine de montarse.
    timer = window.setTimeout(seek, 30);
    return () => window.clearTimeout(timer);
  }, [pathname, search, hash, key]);

  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status">
      <span className="h-px w-24 origin-left animate-cue bg-navy/40" aria-hidden="true" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const firstPath = useRef(location.pathname);
  const isFirstView = useRef(true);
  if (location.pathname !== firstPath.current) isFirstView.current = false;

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-cream"
      >
        Saltar al contenido
      </a>

      <ScrollManager />
      <ScrollProgress />
      <Header />

      {/* Transición de página: un telón claro que se retira hacia arriba. */}
      {!isFirstView.current && (
        <div
          key={`telon-${location.pathname}`}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[45] origin-top animate-curtain bg-cream"
        />
      )}

      <main id="contenido" tabIndex={-1} className="outline-none">
        <ErrorBoundary key={location.pathname}>
          <Suspense fallback={<PageFallback />}>
            {/* Solo opacidad: un transform aquí rompería los elementos fixed internos. */}
            <div key={location.pathname} className="animate-page-in">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/especialistas" element={<SpecialistsPage />} />
                <Route path="/especialistas/:slug" element={<SpecialistProfile />} />
                <Route path="/aviso-de-privacidad" element={<Privacy />} />
                <Route path="/terminos-y-condiciones" element={<Terms />} />
                <Route path="/aviso-de-salud-mental" element={<MentalHealthNotice />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
