import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import Seo from '../components/Seo.jsx';
import SpecialistCard from '../components/SpecialistCard.jsx';
import SplitWords from '../components/SplitWords.jsx';
import { useScrollAnimations } from '../hooks/useScrollAnimations.js';
import { services, getService } from '../data/services.js';
import { specialists, specialistsByService } from '../data/specialists.js';

const chip =
  'inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-5 text-sm font-semibold transition-colors duration-300 ease-calm';

/** Directorio completo con filtro por tipo de atención (?area=…). */
export default function SpecialistsPage() {
  const scope = useRef(null);
  const [params, setParams] = useSearchParams();
  const area = getService(params.get('area')) ? params.get('area') : '';
  const list = area ? specialistsByService(area) : specialists;

  useScrollAnimations(scope, [area]);

  const select = (id) => {
    setParams(id ? { area: id } : {}, { replace: true, preventScrollReset: true });
  };

  return (
    <div ref={scope}>
      <Seo path="/especialistas" />

      <section className="container-x pb-24 pt-36 lg:pb-32 lg:pt-44">
        <p data-reveal="fade" className="eyebrow flex items-center gap-3 text-sage-700">
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          Directorio de especialistas
        </p>
        <SplitWords
          as="h1"
          text="Psicólogos en Tijuana para cada necesidad"
          emphasis={['cada']}
          className="display-xl mt-5 max-w-5xl"
        />
        <p data-reveal="up" data-delay="0.15" className="lead mt-7 max-w-2xl">
          Filtra por tipo de atención y escribe directamente al especialista que elijas. Si su
          especialidad no indica un grupo de edad, pregúntale al contactarle.
        </p>

        <div
          data-reveal="up"
          data-delay="0.2"
          role="group"
          aria-label="Filtrar por tipo de atención"
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          <button
            type="button"
            aria-pressed={!area}
            onClick={() => select('')}
            className={`${chip} ${!area ? 'border-navy bg-navy text-cream' : 'border-navy/20 text-navy hover:border-navy'}`}
          >
            Todos
          </button>
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              aria-pressed={area === service.id}
              onClick={() => select(service.id)}
              className={`${chip} ${
                area === service.id
                  ? 'border-navy bg-navy text-cream'
                  : 'border-navy/20 text-navy hover:border-navy'
              }`}
            >
              {service.short}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm font-semibold text-navy/70" role="status" aria-live="polite">
          {list.length === 1 ? '1 especialista' : `${list.length} especialistas`}
          {area ? ` en «${getService(area).title}»` : ' en el directorio'}
        </p>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((specialist, i) => (
            <li key={specialist.slug}>
              <SpecialistCard
                specialist={specialist}
                index={specialists.indexOf(specialist)}
                delay={(i % 4) * 0.07}
                headingLevel="h2"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
