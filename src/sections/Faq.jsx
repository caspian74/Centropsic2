import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

import SectionHeading from '../components/SectionHeading.jsx';
import { faqs } from '../data/faq.js';

function FaqItem({ item, open, onToggle }) {
  const id = useId();
  return (
    <div className="border-b border-navy/15">
      <h3>
        <button
          type="button"
          id={`${id}-boton`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-2xl font-medium leading-snug text-navy transition-colors duration-300 group-hover:text-sage-700 sm:text-[1.7rem]">
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,color,border-color] duration-500 ease-calm ${
              open ? 'rotate-[135deg] border-navy bg-navy text-cream' : 'border-navy/25 text-navy'
            }`}
          >
            <Plus className="h-5 w-5" />
          </span>
        </button>
      </h3>
      {/* grid 0fr → 1fr: anima la altura sin medirla con JavaScript. */}
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-boton`}
        className={`grid transition-[grid-template-rows,opacity,visibility] duration-500 ease-calm ${
          open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 text-lg leading-relaxed text-navy/75">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="preguntas" aria-labelledby="preguntas-titulo" className="section-y bg-mist/60">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="preguntas-titulo"
              eyebrow="Preguntas frecuentes"
              title="Resolvemos tus dudas"
              emphasis={['dudas']}
            >
              <p>Si tu pregunta no aparece aquí, escríbele al especialista de tu elección.</p>
            </SectionHeading>
          </div>
        </div>

        <div data-reveal="up" className="border-t border-navy/15 lg:col-span-8">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
