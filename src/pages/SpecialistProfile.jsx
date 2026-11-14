import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, MapPin, Navigation, Phone } from 'lucide-react';

import Button from '../components/Button.jsx';
import Portrait from '../components/Portrait.jsx';
import Seo from '../components/Seo.jsx';
import SpecialistCard from '../components/SpecialistCard.jsx';
import SplitWords from '../components/SplitWords.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import { useScrollAnimations } from '../hooks/useScrollAnimations.js';
import { getService } from '../data/services.js';
import { fullAddress, mapLinks } from '../data/siteConfig.js';
import {
  displayName,
  formatPhone,
  getDescription,
  getSpecialist,
  specialists,
} from '../data/specialists.js';
import { infoMessage, telLink, waLink } from '../lib/whatsapp.js';
import NotFound from './NotFound.jsx';

/** Perfil individual: /especialistas/<slug> */
export default function SpecialistProfile() {
  const { slug } = useParams();
  const scope = useRef(null);
  const specialist = getSpecialist(slug);

  useScrollAnimations(scope, [slug]);

  if (!specialist) return <NotFound />;

  const index = specialists.indexOf(specialist);
  const name = displayName(specialist);
  const areas = specialist.services.map(getService).filter(Boolean);

  // Otros especialistas: primero quienes comparten área de atención.
  const others = specialists
    .filter((s) => s.slug !== specialist.slug)
    .map((s) => ({ s, shared: s.services.filter((id) => specialist.services.includes(id)).length }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map(({ s }) => s);

  return (
    <div ref={scope}>
      <Seo path={`/especialistas/${specialist.slug}`} />

      <article className="container-x pb-20 pt-32 lg:pb-28 lg:pt-40">
        <nav aria-label="Ruta de navegación" data-reveal="fade">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy/70">
            <li>
              <Link to="/" className="hover:text-navy hover:underline">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link to="/especialistas" className="hover:text-navy hover:underline">
                Especialistas
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="font-semibold text-navy">
              {name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div data-reveal="scale" className="group lg:sticky lg:top-28">
              <Portrait specialist={specialist} index={index} size="profile" />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <p data-reveal="fade" className="eyebrow flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              {specialist.article === 'el' ? 'Psicólogo' : 'Psicóloga'} en Tijuana
            </p>
            <SplitWords as="h1" text={name} className="display-xl mt-5" />
            <p data-reveal="up" data-delay="0.1" className="mt-6 font-display text-3xl font-medium italic leading-snug text-sage-700">
              {specialist.specialty}
            </p>

            <p data-reveal="up" data-delay="0.15" className="lead mt-8 max-w-2xl">
              {getDescription(specialist)}
            </p>

            {specialist.license && (
              <p data-reveal="up" className="mt-4 text-sm font-semibold text-navy/75">
                Cédula profesional: {specialist.license}
              </p>
            )}

            {areas.length > 0 && (
              <div data-reveal="up" className="mt-9">
                <h2 className="eyebrow text-navy/60">Áreas de atención</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <li key={area.id}>
                      <Link
                        to={`/especialistas?area=${area.id}`}
                        className="inline-flex min-h-[44px] items-center rounded-full border border-navy/20 px-5 text-sm font-semibold text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-cream"
                      >
                        {area.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              data-reveal="up"
              className="mt-12 rounded-[2rem] rounded-br-[6rem] bg-sage-100 p-7 sm:p-10"
            >
              <h2 className="font-display text-3xl font-medium text-navy">Agenda tu consulta</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-navy/75">
                Escríbele por WhatsApp para conocer su disponibilidad, horarios y honorarios. El
                mensaje ya va escrito; solo tienes que enviarlo.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={waLink(specialist)}>
                  <WhatsAppIcon />
                  Agendar consulta
                </Button>
                <Button href={waLink(specialist, infoMessage(specialist))} variant="outline">
                  Pedir información
                </Button>
              </div>

              <dl className="mt-9 grid gap-6 border-t border-navy/15 pt-7 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow text-navy/60">Teléfono</dt>
                  <dd className="mt-2">
                    <a
                      href={telLink(specialist.phone)}
                      className="inline-flex items-center gap-2.5 text-lg font-semibold text-navy hover:underline"
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      {formatPhone(specialist.phone)}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-navy/60">Consultorio</dt>
                  <dd className="mt-2 flex gap-2.5 leading-relaxed text-navy/80">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                    <span>
                      {fullAddress}
                      <a
                        href={mapLinks.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center gap-2 font-semibold text-navy hover:underline"
                      >
                        <Navigation className="h-4 w-4" aria-hidden="true" />
                        Cómo llegar
                      </a>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <p data-reveal="up" className="mt-6 text-sm leading-relaxed text-navy/70">
              WhatsApp no es un canal de atención de emergencias.{' '}
              <Link to="/aviso-de-salud-mental" className="font-semibold text-navy underline underline-offset-4">
                Qué hacer en caso de emergencia
              </Link>
              .
            </p>
          </div>
        </div>
      </article>

      <section aria-labelledby="otros-titulo" className="bg-mist/60 py-20 lg:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="otros-titulo" data-reveal="up" className="display-md">
              Otros especialistas del centro
            </h2>
            <div data-reveal="fade">
              <Button to="/especialistas" variant="outline">
                Ver todo el directorio
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <li key={other.slug}>
                <SpecialistCard
                  specialist={other}
                  index={specialists.indexOf(other)}
                  delay={i * 0.08}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
