import SectionHeading from '../components/SectionHeading.jsx';

const PILLARS = [
  {
    title: 'Atención personalizada',
    text: 'Cada proceso se plantea a partir de lo que tú necesitas y del momento que estás viviendo.',
  },
  {
    title: 'Distintos enfoques',
    text: 'Humanista-Gestalt, cognitivo-conductual, sistémico y más, para que encuentres el que va contigo.',
  },
  {
    title: 'Trato directo',
    text: 'Hablas con tu especialista desde el primer mensaje.',
  },
  {
    title: 'Ambiente profesional y humano',
    text: 'Un espacio pensado para hablar con tranquilidad, con respeto y sin juicios.',
  },
];

export default function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-titulo" className="section-y relative overflow-hidden">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Composición editorial con las formas de la identidad (parallax). */}
        <div className="lg:col-span-5">
          <div
            data-reveal="scale"
            className="relative isolate aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[9rem] bg-sage-100"
          >
            <div aria-hidden="true" className="absolute inset-0">
              <span
                data-parallax="14"
                className="absolute -right-[20%] top-[8%] h-[30%] w-[88%] rounded-l-full bg-salmon"
              />
              <span
                data-parallax="-10"
                className="absolute -left-[16%] top-[32%] h-[30%] w-[92%] rounded-r-full bg-sage mix-blend-multiply"
              />
              <span
                data-parallax="20"
                className="absolute -right-[24%] top-[58%] h-[26%] w-[74%] rounded-l-full bg-salmon-200 mix-blend-multiply"
              />
            </div>
            <figure className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <blockquote className="font-display text-[1.9rem] font-medium italic leading-[1.12] text-navy sm:text-4xl">
                Pedir acompañamiento también es una forma de cuidarte.
              </blockquote>
            </figure>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeading
            id="nosotros-titulo"
            eyebrow="Sobre nosotros"
            title="Psicoterapia en Tijuana con un enfoque humano"
            emphasis={['humano']}
          >
            <p>
              El Centro Psicoterapéutico reúne en un mismo espacio a profesionales de la psicología
              con distintas especialidades y enfoques. Creemos que cada persona, pareja y familia
              vive su historia de manera distinta, y que la atención debe partir de ahí.
            </p>
          </SectionHeading>

          <p data-reveal="up" className="mt-6 max-w-3xl text-lg leading-relaxed text-navy/75">
            Cuidar la salud emocional es tan importante como cuidar la salud física. Buscar
            acompañamiento profesional no requiere estar en crisis: también es una manera de
            conocerte, ordenar lo que sientes y pensar con calma tus decisiones.
          </p>

          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                data-reveal="up"
                data-delay={(i % 2) * 0.1}
                className="border-t border-navy/15 pt-5"
              >
                <dt className="flex items-baseline gap-3 font-display text-2xl font-medium text-navy">
                  <span className="font-sans text-xs font-semibold tracking-[0.2em] text-salmon-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {pillar.title}
                </dt>
                <dd className="mt-2.5 leading-relaxed text-navy/75">{pillar.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
