import { lazy, Suspense } from 'react';

import ErrorBoundary from './ErrorBoundary.jsx';
import { useInView } from '../hooks/useInView.js';
import { siteConfig, fullAddress, mapLinks } from '../data/siteConfig.js';

// Leaflet solo se descarga si hay coordenadas configuradas.
const LeafletMap = lazy(() => import('./LeafletMap.jsx'));

function Placeholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-mist" role="status">
      <span className="h-px w-24 origin-left animate-cue bg-navy/40" aria-hidden="true" />
      <span className="sr-only">Cargando mapa…</span>
    </div>
  );
}

/**
 * Mapa interactivo. Se monta cuando la sección se acerca a la pantalla.
 *  - Sin coordenadas en siteConfig.map.coordinates → mapa de Google ubicado
 *    por dirección (no requiere API key ni inventar coordenadas).
 *  - Con coordenadas → Leaflet + OpenStreetMap con marcador propio.
 */
export default function LocationMap({ className = '' }) {
  const [ref, visible] = useInView({ rootMargin: '400px' });
  const { coordinates } = siteConfig.map;

  return (
    <div ref={ref} className={`relative isolate overflow-hidden bg-mist ${className}`}>
      {!visible && <Placeholder />}
      {visible &&
        (coordinates ? (
          <ErrorBoundary silent>
            <Suspense fallback={<Placeholder />}>
              <LeafletMap />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <iframe
            title={`Mapa de ubicación de ${siteConfig.name}: ${fullAddress}`}
            src={mapLinks.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ))}
    </div>
  );
}
