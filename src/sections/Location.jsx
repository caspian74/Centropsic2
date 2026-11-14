import { Clock, ExternalLink, MapPin, Navigation } from 'lucide-react';

import Button from '../components/Button.jsx';
import LocationMap from '../components/LocationMap.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { siteConfig, mapLinks } from '../data/siteConfig.js';

export default function Location() {
  const a = siteConfig.address;

  return (
    <section id="ubicacion" aria-labelledby="ubicacion-titulo" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="ubicacion-titulo"
          eyebrow="Ubicación"
          title="Estamos en La Mesa, Tijuana"
          emphasis={['Mesa,']}
        >
          <p>En el segundo piso de Plaza Somis, sobre el bulevar Gustavo Díaz Ordaz.</p>
        </SectionHeading>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <div
            data-reveal="up"
            className="flex flex-col rounded-[2rem] rounded-bl-[6rem] bg-sage-100 p-8 sm:p-10 lg:col-span-5"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-cream">
              <MapPin className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>

            <h3 className="mt-7 font-display text-3xl font-medium text-navy">{siteConfig.name}</h3>
            <address className="mt-4 text-lg not-italic leading-relaxed text-navy/80">
              {a.street}, {a.unit}
              <br />
              {a.neighborhood}, {a.building}
              <br />
              {a.postalCode ? `C.P. ${a.postalCode}, ` : ''}
              {a.city}, {a.state}, {a.country}
            </address>

            <p className="mt-6 flex gap-3 leading-relaxed text-navy/75">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
              <span>
                {siteConfig.hours ||
                  'Los horarios dependen de la agenda de cada especialista. Confirma tu cita antes de acudir.'}
              </span>
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={mapLinks.directions}>
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Cómo llegar
              </Button>
              <Button href={mapLinks.open} variant="outline">
                Abrir en Google Maps
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div data-reveal="up" data-delay="0.1" className="lg:col-span-7">
            <LocationMap className="h-[24rem] rounded-[2rem] shadow-soft sm:h-[28rem] lg:h-full lg:min-h-[32rem] lg:rounded-tr-[6rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
