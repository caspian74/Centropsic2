import { useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Button from '../components/Button.jsx';
import Seo from '../components/Seo.jsx';

/** Página 404 personalizada (se marca como noindex en src/data/seo.js). */
export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="relative isolate overflow-hidden">
      {/* Cualquier ruta desconocida recibe los metadatos de "no encontrada". */}
      <Seo path={`/404${pathname}`} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -right-[10%] top-[22%] h-[26%] w-[60%] animate-drift-a rounded-l-full bg-salmon-100" />
        <span className="absolute -left-[12%] top-[46%] h-[26%] w-[64%] animate-drift-b rounded-r-full bg-sage-100 mix-blend-multiply" />
      </div>

      <div className="container-x flex min-h-[100svh] flex-col items-start justify-center pb-24 pt-36">
        <p className="eyebrow flex items-center gap-3 text-sage-700">
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          Error 404
        </p>
        <h1 className="display-xl mt-5 max-w-4xl">
          Esta página no <em className="text-sage-700">existe.</em>
        </h1>
        <p className="lead mt-7 max-w-xl">
          Puede que el enlace haya cambiado o que la dirección tenga un error. Desde aquí puedes
          volver al inicio o ir directo al directorio de especialistas.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button to="/">
            Volver al inicio
            <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
          </Button>
          <Button to="/especialistas" variant="outline">
            Ver especialistas
          </Button>
        </div>
      </div>
    </section>
  );
}
