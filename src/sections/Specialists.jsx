import { ArrowRight } from 'lucide-react';

import Button from '../components/Button.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SpecialistCard from '../components/SpecialistCard.jsx';
import { specialists } from '../data/specialists.js';

export default function Specialists() {
  return (
    <section id="especialistas" aria-labelledby="especialistas-titulo" className="section-y">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="especialistas-titulo"
            eyebrow="Directorio de especialistas"
            title="Conoce a quienes pueden acompañarte"
            emphasis={['acompañarte']}
          >
            <p>
              Revisa el área de atención de cada especialista y escríbele directamente por
              WhatsApp para consultar su disponibilidad.
            </p>
          </SectionHeading>
          <div data-reveal="fade" className="shrink-0">
            <Button to="/especialistas" variant="outline">
              Filtrar por tipo de atención
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specialists.map((specialist, i) => (
            <li key={specialist.slug}>
              <SpecialistCard specialist={specialist} index={i} delay={(i % 4) * 0.07} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
