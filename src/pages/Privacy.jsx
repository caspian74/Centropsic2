import { Link } from 'react-router-dom';

import LegalLayout, { Field } from '../components/LegalLayout.jsx';
import { siteConfig } from '../data/siteConfig.js';

/**
 * Aviso de privacidad (estructura conforme a la LFPDPPP).
 * Los datos del responsable se completan en siteConfig.legal.
 * REQUIERE revisión y aprobación del responsable del centro antes de publicarse.
 */
export default function Privacy() {
  const { legal, name } = siteConfig;
  const responsible = <Field value={legal.responsibleName} label="razón social o nombre completo del responsable" />;
  const privacyEmail = legal.privacyEmail ? (
    <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>
  ) : (
    <Field value="" label="correo electrónico para asuntos de privacidad" />
  );

  return (
    <LegalLayout
      path="/aviso-de-privacidad"
      title="Aviso de privacidad"
      intro={`En ${name} respetamos tu privacidad. Este aviso explica qué datos personales se tratan, con qué finalidades y cómo puedes ejercer tus derechos.`}
    >
      <h2>1. Responsable del tratamiento de tus datos</h2>
      <p>
        {responsible}, en lo sucesivo «el Responsable», con domicilio en{' '}
        <Field value={legal.responsibleAddress} label="domicilio del responsable" />, es responsable
        del tratamiento de los datos personales que se recaban a través de este sitio web y de los
        medios de contacto que en él se indican, conforme a la Ley Federal de Protección de Datos
        Personales en Posesión de los Particulares (LFPDPPP) y la normativa que de ella deriva.
      </p>
      <p>
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: definir si el responsable es el centro, cada especialista de forma
          independiente, o ambos. De ello depende quién debe poner a disposición este aviso
          respecto de los datos de la atención psicológica.]
        </mark>
      </p>

      <h2>2. Datos personales que se recaban</h2>
      <h3>A través de este sitio web</h3>
      <p>
        Este sitio no solicita registro ni almacena en servidores propios la información que
        escribes. El formulario de contacto no envía datos al sitio: únicamente arma un mensaje y
        abre la aplicación de WhatsApp para que tú decidas enviarlo.
      </p>
      <h3>Cuando contactas a un especialista</h3>
      <ul>
        <li>Datos de identificación y contacto: nombre y número telefónico.</li>
        <li>El contenido de los mensajes que decidas enviar.</li>
      </ul>
      <h3>Durante la atención psicológica</h3>
      <p>
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: confirmar con el responsable el listado de datos que se recaban en consulta,
          por ejemplo: identificación, contacto, datos de facturación y datos del padre, madre o
          tutor en el caso de menores de edad.]
        </mark>
      </p>

      <h2>3. Datos personales sensibles</h2>
      <p>
        La atención psicológica puede implicar el tratamiento de datos personales sensibles, como
        los relativos a tu estado de salud física y mental. Estos datos se tratan bajo
        confidencialidad y únicamente para las finalidades descritas en este aviso. Para su
        tratamiento se requiere tu consentimiento expreso y por escrito, que se recabará antes de
        iniciar la atención.
      </p>

      <h2>4. Finalidades del tratamiento</h2>
      <h3>Finalidades primarias (necesarias)</h3>
      <ul>
        <li>Atender tu solicitud de información y responder a tus mensajes.</li>
        <li>Agendar, confirmar, reprogramar o cancelar citas.</li>
        <li>Prestar los servicios de atención psicológica que solicites e integrar tu expediente.</li>
        <li>Cumplir con las obligaciones legales aplicables.</li>
      </ul>
      <h3>Finalidades secundarias (no necesarias)</h3>
      <p>
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: indicar si existen finalidades secundarias, como envío de recordatorios o
          comunicaciones informativas, y el mecanismo para negarse a ellas. Si no existen,
          declararlo así.]
        </mark>
      </p>

      <h2>5. Consentimiento</h2>
      <p>
        Al contactarnos por los medios indicados en este sitio aceptas que tus datos de contacto se
        utilicen para responder a tu solicitud. El tratamiento de datos sensibles requiere tu
        consentimiento expreso, que se te solicitará por separado. En el caso de menores de edad,
        el consentimiento lo otorga su madre, padre o tutor.
      </p>

      <h2>6. Transferencias de datos</h2>
      <p>
        Tus datos personales no se transfieren a terceros sin tu consentimiento, salvo en los
        casos previstos por la ley.{' '}
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: confirmar si existen transferencias, a quién y con qué finalidad.]
        </mark>
      </p>
      <p>
        Ten en cuenta que este sitio enlaza a servicios de terceros que tienen sus propias
        políticas de privacidad: WhatsApp (Meta), para la mensajería, y Google Maps, para mostrar
        el mapa de ubicación.
      </p>

      <h2>7. Derechos ARCO</h2>
      <p>Tienes derecho a:</p>
      <ul>
        <li>
          <strong>Acceder</strong> a tus datos personales y conocer cómo se utilizan.
        </li>
        <li>
          <strong>Rectificarlos</strong> si son inexactos o están incompletos.
        </li>
        <li>
          <strong>Cancelarlos</strong> cuando consideres que no se requieren para las finalidades
          señaladas.
        </li>
        <li>
          <strong>Oponerte</strong> a su tratamiento para fines específicos.
        </li>
      </ul>

      <h2>8. Medios para ejercer tus derechos</h2>
      <p>
        Para ejercer tus derechos ARCO, revocar tu consentimiento o limitar el uso o divulgación de
        tus datos, envía una solicitud a {privacyEmail}. La solicitud debe incluir:
      </p>
      <ul>
        <li>Tu nombre completo y un medio para comunicarte la respuesta.</li>
        <li>Un documento que acredite tu identidad o, en su caso, la de tu representante.</li>
        <li>La descripción clara de los datos y del derecho que deseas ejercer.</li>
        <li>Cualquier elemento que facilite la localización de tus datos.</li>
      </ul>
      <p>
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: confirmar el procedimiento, los plazos de respuesta conforme a la ley vigente
          y la persona o área encargada de atender las solicitudes.]
        </mark>
      </p>

      <h2>9. Cookies y tecnologías similares</h2>
      <p>
        Este sitio no utiliza cookies propias de publicidad ni de seguimiento. El proveedor de
        alojamiento puede registrar datos técnicos (como la dirección IP) por motivos de seguridad
        y funcionamiento. Al mostrarse el mapa de ubicación o al abrir WhatsApp, esos servicios
        pueden utilizar sus propias cookies conforme a sus políticas.
      </p>

      <h2>10. Medidas de protección</h2>
      <p>
        El Responsable mantiene medidas de seguridad administrativas, técnicas y físicas para
        proteger tus datos personales contra daño, pérdida, alteración, destrucción o uso, acceso
        o tratamiento no autorizado.{' '}
        <mark className="rounded bg-salmon-100 px-1.5 py-0.5 font-semibold text-salmon-700">
          [Pendiente: describir en términos generales las medidas que realmente se aplican.]
        </mark>
      </p>

      <h2>11. Cambios a este aviso</h2>
      <p>
        Este aviso puede modificarse para atender cambios legales o en la forma en que se prestan
        los servicios. La versión vigente estará siempre disponible en esta página, con su fecha
        de última actualización.
      </p>

      <h2>12. Autoridad</h2>
      <p>
        Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes
        acudir ante la autoridad competente en la materia, que actualmente es la Secretaría
        Anticorrupción y Buen Gobierno.
      </p>

      <h2>13. Contacto del responsable</h2>
      <p>
        {responsible}
        <br />
        <Field value={legal.responsibleAddress} label="domicilio del responsable" />
        <br />
        {privacyEmail}
      </p>

      <p>
        Consulta también los <Link to="/terminos-y-condiciones">términos y condiciones</Link> y el{' '}
        <Link to="/aviso-de-salud-mental">aviso sobre salud mental</Link>.
      </p>
    </LegalLayout>
  );
}
