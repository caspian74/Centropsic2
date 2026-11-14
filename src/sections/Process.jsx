import { ArrowRight, CalendarCheck, DoorOpen, MessageCircle, Search, UserCheck } from 'lucide-react';

import Button from '../components/Button.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const STEPS = [
  {
    Icon: Search,
    title: 'Conoce a nuestros especialistas',
    text: 'Recorre el directorio y revisa el área de atención de cada profesional.',
  },
  {
    Icon: UserCheck,
    title: 'Elige al profesional que se adapte a tus necesidades',
    text: 'Puedes filtrar por tipo de atención: niños, adolescentes, adultos, pareja o familia.',
  },
  {
    Icon: MessageCircle,
    title: 'Contacta al especialista por WhatsApp',
    text: 'Su botón abre un mensaje ya escrito, listo para enviar a su número.',
  },
  {
    Icon: CalendarCheck,
    title: 'Confirma disponibilidad y agenda tu consulta',
    text: 'Acuerda directamente con tu especialista el día, la hora y los detalles de la sesión.',
  },
  {
    Icon: DoorOpen,
    title: 'Acude a tu sesión',
    text: 'Te esperamos en Plaza Somis, segundo piso, en La Mesa.',
  },
];

export default function Process() {
  return (
    <section
      id="proceso"
      aria-labelledby="proceso-titulo"
      className="on-dark section-y relative overflow-clip bg-navy text-cream"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.09]">
        <span data-parallax="12" className="absolute -left-48 top-24 h-72 w-[40rem] rounded-r-full bg-sage" />
        <span data-parallax="-12" className="absolute -right-56 bottom-16 h-72 w-[44rem] rounded-l-full bg-salmon" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="proceso-titulo"
              tone="dark"
              eyebrow="Proceso de atención"
              title="Cómo empezar, paso a paso"
              emphasis={['paso', 'a']}
            >
              <p>Agendar es sencillo y siempre hablas directamente con la persona que te atenderá.</p>
            </SectionHeading>
            <div data-reveal="up" data-delay="0.2" className="mt-9">
              <Button to="/#especialistas" variant="light">
                Ver especialistas
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="relative">
            {/* Línea de tiempo: la base tenue y, encima, la que se dibuja con el scroll. */}
            <span aria-hidden="true" className="absolute bottom-6 left-7 top-6 w-px bg-cream/15" />
            <span
              aria-hidden="true"
              data-draw
              className="absolute bottom-6 left-7 top-6 w-px origin-top bg-gradient-to-b from-sage to-salmon"
            />

            {STEPS.map(({ Icon, title, text }, i) => (
              <li key={title} data-reveal="left" className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
                <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-navy text-sage-300">
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <p className="eyebrow text-salmon-200">Paso {i + 1}</p>
                  <h3 className="mt-2 font-display text-[1.75rem] font-medium leading-[1.12] sm:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-cream/75">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
