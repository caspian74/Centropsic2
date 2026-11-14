import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

import LegalLayout from '../components/LegalLayout.jsx';
import { siteConfig } from '../data/siteConfig.js';

/** Aviso (disclaimer) psicológico. */
export default function MentalHealthNotice() {
  const { emergency, name } = siteConfig;
  const lineHref = `tel:${emergency.lineNumber.replace(/\s/g, '')}`;

  return (
    <LegalLayout
      path="/aviso-de-salud-mental"
      eyebrow="Aviso importante"
      title="Aviso sobre salud mental"
      intro={`Lee este aviso para entender el alcance de la información publicada en el sitio de ${name}.`}
    >
      <div className="on-dark !mt-10 rounded-[2rem] rounded-br-[5rem] bg-navy p-7 sm:p-9">
        <h2 className="!mt-0 !text-cream">Si es una emergencia</h2>
        <p className="!text-cream/80">
          Si tú o alguien más se encuentra en riesgo inmediato o en peligro de vida, no esperes
          una respuesta por WhatsApp. Llama a los servicios de emergencia o acude al servicio de
          urgencias más cercano.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${emergency.number}`} className="btn btn-light group !no-underline">
            <span>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Emergencias: {emergency.number}
            </span>
          </a>
          <a href={lineHref} className="btn btn-outline-light group !font-semibold !text-cream !no-underline hover:!text-navy">
            <span>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {emergency.lineName}: {emergency.lineNumber}
            </span>
          </a>
        </div>
      </div>

      <h2>Alcance de la información</h2>
      <ul>
        <li>El contenido de este sitio es exclusivamente informativo.</li>
        <li>La información publicada no sustituye una evaluación psicológica profesional.</li>
        <li>
          Nada de lo que aquí se publica constituye un diagnóstico ni un tratamiento, y no debe
          utilizarse para autodiagnosticarse ni para tomar decisiones sobre la salud sin consultar
          a un profesional.
        </li>
        <li>
          Cada proceso terapéutico es distinto. Sus resultados pueden variar de una persona a otra
          y no es posible garantizarlos.
        </li>
      </ul>

      <h2>Sobre el contacto por WhatsApp</h2>
      <ul>
        <li>
          El contacto por WhatsApp sirve para pedir información y agendar citas. No representa
          atención psicológica ni atención de emergencia.
        </li>
        <li>
          Los mensajes se responden según la disponibilidad de cada especialista, por lo que la
          respuesta puede no ser inmediata.
        </li>
        <li>
          Enviar un mensaje no establece por sí mismo una relación terapéutica; esta inicia cuando
          se acuerda y comienza la atención con el especialista.
        </li>
      </ul>

      <h2>Menores de edad</h2>
      <p>
        La atención a niños y adolescentes se solicita y se acuerda con su madre, padre o tutor.
      </p>

      <p>
        Consulta también el <Link to="/aviso-de-privacidad">aviso de privacidad</Link> y los{' '}
        <Link to="/terminos-y-condiciones">términos y condiciones</Link>.
      </p>
    </LegalLayout>
  );
}
