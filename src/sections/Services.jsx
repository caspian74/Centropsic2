import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Brain,
  Compass,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Network,
  Sprout,
  User,
  Users,
} from 'lucide-react';

import SectionHeading from '../components/SectionHeading.jsx';
import { services } from '../data/services.js';
import { specialistsByService } from '../data/specialists.js';

// Relación entre el nombre guardado en services.js y el icono.
const ICONS = {
  Baby,
  Brain,
  Compass,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Network,
  Sprout,
  User,
  Users,
};

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="section-y bg-mist/60">
      <div className="container-x">
        <SectionHeading
          id="servicios-titulo"
          eyebrow="Especialidades y servicios"
          title="Áreas de atención para cada etapa de la vida"
          emphasis={['etapa']}
        >
          <p>
            Elige un área para ver qué especialistas del directorio la atienden. Si no sabes cuál
            corresponde a lo que buscas, puedes preguntarlo directamente al escribir.
          </p>
        </SectionHeading>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] || HeartHandshake;
            const count = specialistsByService(service.id).length;
            return (
              <li key={service.id} data-reveal="up" data-delay={(i % 4) * 0.07}>
                <Link
                  to={`/especialistas?area=${service.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-500 ease-calm hover:-translate-y-1.5 hover:shadow-lift"
                >
                  {/* Forma que crece desde la esquina al pasar el cursor */}
                  <span
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-sage-100 transition-transform duration-700 ease-calm group-hover:scale-[2.6]"
                  />
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-cream">
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-7 font-display text-[1.6rem] font-medium leading-[1.12] text-navy">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 leading-relaxed text-navy/75">{service.description}</p>
                  <span className="relative mt-auto flex items-center justify-between pt-7 text-sm font-semibold text-navy">
                    {count === 1 ? '1 especialista' : `${count} especialistas`}
                    <ArrowUpRight
                      className="h-5 w-5 transition-transform duration-300 ease-calm group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}

          <li data-reveal="up" data-delay={0.21}>
            <Link
              to="/especialistas"
              className="on-dark group flex h-full flex-col justify-between rounded-[1.75rem] rounded-br-[5rem] bg-navy p-7 text-cream transition-[transform,box-shadow] duration-500 ease-calm hover:-translate-y-1.5 hover:shadow-lift"
            >
              <h3 className="font-display text-[1.9rem] font-medium italic leading-[1.1]">
                ¿No sabes por dónde empezar?
              </h3>
              <span className="mt-10 flex items-center gap-2.5 font-semibold">
                Ver todo el directorio
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
