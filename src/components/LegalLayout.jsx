import { Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';

import Seo from './Seo.jsx';
import { siteConfig } from '../data/siteConfig.js';

/**
 * Dato legal configurable. Si el valor está vacío en siteConfig.legal, se
 * muestra resaltado como pendiente para que nadie publique un dato inventado.
 */
export function Field({ value, label }) {
  if (value) return <>{value}</>;
  return (
    <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
      [Pendiente: {label}]
    </mark>
  );
}

/** Marco común de las páginas legales. */
export default function LegalLayout({ path, eyebrow = 'Legal', title, intro, children }) {
  const { legal } = siteConfig;

  return (
    <>
      <Seo path={path} />
      <article className="container-x pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy/75 hover:text-navy">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            Volver al inicio
          </Link>

          <p className="eyebrow mt-10 text-sage-700">{eyebrow}</p>
          <h1 className="display-lg mt-4">{title}</h1>
          {intro && <p className="lead mt-6">{intro}</p>}
          <p className="mt-6 text-sm text-navy/70">
            Última actualización: <Field value={legal.lastUpdated} label="fecha de última actualización" />
          </p>

          {legal.showDraftNotice && (
            <aside
              role="note"
              className="mt-8 flex gap-4 rounded-3xl border border-salmon/50 bg-salmon-50 p-5 text-sm leading-relaxed text-navy sm:p-6"
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-salmon-700" aria-hidden="true" />
              <p>
                <strong className="font-semibold">Borrador pendiente de revisión.</strong> Este
                documento es una estructura de referencia y no ha sido validado por un abogado.
                Debe ser revisado, completado y aprobado por el responsable del centro antes de
                publicarse. Los textos resaltados indican información por completar.
              </p>
            </aside>
          )}

          <div className="prose-legal">{children}</div>
        </div>
      </article>
    </>
  );
}
