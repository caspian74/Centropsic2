import { Link } from 'react-router-dom';

import LegalLayout, { Field } from '../components/LegalLayout.jsx';
import { siteConfig } from '../data/siteConfig.js';

/**
 * Términos y condiciones de uso del sitio.
 * REQUIERE revisión y aprobación del responsable del centro antes de publicarse.
 */
export default function Terms() {
  const { legal, name } = siteConfig;
  const responsible = <Field value={legal.responsibleName} label="razón social o nombre completo del responsable" />;

  return (
    <LegalLayout
      path="/terminos-y-condiciones"
      title="Términos y condiciones"
      intro={`Estas condiciones regulan el uso del sitio web de ${name}. Al navegar en él, aceptas lo que aquí se indica.`}
    >
      <h2>1. Titular del sitio</h2>
      <p>
        Este sitio web es operado por {responsible}, con domicilio en{' '}
        <Field value={legal.responsibleAddress} label="domicilio del responsable" />.
      </p>

      <h2>2. Objeto del sitio</h2>
      <p>
        El sitio tiene como finalidad dar a conocer el centro, su ubicación y el directorio de
        especialistas, así como facilitar el contacto con cada uno de ellos. No es una plataforma
        de atención psicológica en línea ni un servicio de emergencias.
      </p>

      <h2>3. Condiciones de uso</h2>
      <ul>
        <li>Utilizar el sitio de forma lícita y respetuosa.</li>
        <li>No intentar dañar, alterar o interferir con su funcionamiento.</li>
        <li>
          No utilizar los datos de contacto de los especialistas para fines distintos a solicitar
          información o agendar una consulta.
        </li>
      </ul>

      <h2>4. Contacto y citas</h2>
      <p>
        Las citas se solicitan directamente a cada especialista a través de los medios de contacto
        publicados. La disponibilidad, los horarios, los honorarios, las formas de pago y las
        condiciones de cancelación los informa y acuerda cada especialista. Enviar un mensaje no
        garantiza una cita hasta que sea confirmada.
      </p>
      <p>
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: si el centro tiene políticas generales de citas, cancelaciones o pagos,
          incorporarlas aquí.]
        </mark>
      </p>

      <h2>5. Contenido informativo</h2>
      <p>
        La información del sitio es de carácter general y no sustituye una evaluación psicológica
        profesional, un diagnóstico ni un tratamiento. Consulta el{' '}
        <Link to="/aviso-de-salud-mental">aviso sobre salud mental</Link>.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        El nombre, el logotipo, los textos, el diseño y los demás contenidos del sitio pertenecen
        a su titular o se utilizan con autorización, y están protegidos por la legislación
        aplicable. No pueden reproducirse, distribuirse ni modificarse sin autorización previa y
        por escrito.
      </p>

      <h2>7. Enlaces y servicios de terceros</h2>
      <p>
        El sitio contiene enlaces a servicios de terceros, como WhatsApp y Google Maps. El uso de
        esos servicios se rige por sus propios términos y políticas de privacidad, sobre los que
        el titular del sitio no tiene control.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        El titular procura que la información del sitio sea correcta y esté actualizada, pero no
        garantiza que esté libre de errores u omisiones ni que el sitio esté disponible de forma
        ininterrumpida. En la medida que la ley lo permita, el titular no será responsable de los
        daños derivados del uso del sitio o de la imposibilidad de utilizarlo, ni de las decisiones
        que se tomen únicamente con base en su contenido.
      </p>

      <h2>9. Datos personales</h2>
      <p>
        El tratamiento de tus datos personales se describe en el{' '}
        <Link to="/aviso-de-privacidad">aviso de privacidad</Link>.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        Estas condiciones pueden actualizarse en cualquier momento. La versión vigente es la
        publicada en esta página, con su fecha de última actualización.
      </p>

      <h2>11. Legislación aplicable</h2>
      <p>
        Estos términos se rigen por las leyes aplicables en los Estados Unidos Mexicanos.{' '}
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: confirmar la jurisdicción y los tribunales competentes.]
        </mark>
      </p>
    </LegalLayout>
  );
}
