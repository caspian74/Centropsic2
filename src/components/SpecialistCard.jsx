import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import Portrait from './Portrait.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { displayName } from '../data/specialists.js';
import { infoMessage, waLink } from '../lib/whatsapp.js';

/** Tarjeta del directorio. `delay` escalona la animación de entrada. */
export default function SpecialistCard({ specialist, index = 0, delay = 0, headingLevel = 'h3' }) {
  const Heading = headingLevel;
  const profile = `/especialistas/${specialist.slug}`;
  const name = displayName(specialist);

  return (
    <article
      data-reveal="up"
      data-delay={delay}
      className="group flex h-full flex-col rounded-[2rem] bg-white p-3 shadow-soft transition-[transform,box-shadow] duration-500 ease-calm hover:-translate-y-1.5 hover:shadow-lift"
    >
      <Link to={profile} tabIndex={-1} aria-hidden="true" className="block">
        <Portrait specialist={specialist} index={index} />
      </Link>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <Heading className="font-display text-[1.65rem] font-medium leading-[1.1] text-navy">
          <Link to={profile} className="link-draw">
            {name}
          </Link>
        </Heading>
        <p className="mt-2.5 text-[0.95rem] leading-snug text-navy/75">{specialist.specialty}</p>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <a
            href={waLink(specialist)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary group/btn flex-1 !px-4"
            aria-label={`Agendar consulta con ${name} por WhatsApp`}
          >
            <span>Agendar consulta</span>
          </a>
          <a
            href={waLink(specialist, infoMessage(specialist))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage text-navy transition-[transform,background-color] duration-300 ease-calm hover:scale-105 hover:bg-sage-300"
            aria-label={`Pedir información a ${name} por WhatsApp`}
          >
            <WhatsAppIcon />
          </a>
          <Link
            to={profile}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-navy/20 text-navy transition-[transform,background-color,color] duration-300 ease-calm hover:scale-105 hover:bg-navy hover:text-cream"
            aria-label={`Ver el perfil de ${name}`}
          >
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
