import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import WhatsAppIcon from './WhatsAppIcon.jsx';
import { specialists, displayName, getSpecialist } from '../data/specialists.js';
import { waLink } from '../lib/whatsapp.js';

const field =
  'mt-2 w-full rounded-2xl border border-navy/20 bg-white px-4 py-3.5 text-navy placeholder:text-navy/45 transition-[border-color,box-shadow] duration-200 focus:border-navy focus:outline-none focus:ring-4 focus:ring-sage/40';

/**
 * Formulario de contacto sin servidor: no envía ni guarda nada en el sitio.
 * Arma el mensaje y abre WhatsApp con el especialista elegido.
 */
export default function ContactForm({ defaultSlug = '' }) {
  const id = useId();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState(defaultSlug);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const specialist = getSpecialist(slug);
    if (!specialist) {
      setError('Elige a un especialista para continuar.');
      document.getElementById(`${id}-especialista`)?.focus();
      return;
    }
    setError('');
    const parts = [
      name.trim() ? `Hola, mi nombre es ${name.trim()}.` : 'Hola.',
      `Me interesa agendar una consulta con ${specialist.article} ${displayName(specialist)}.`,
      message.trim(),
      '¿Podrían proporcionarme información sobre disponibilidad y horarios?',
    ].filter(Boolean);
    window.open(waLink(specialist, parts.join(' ')), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-9">
      <h3 className="font-display text-3xl font-medium text-navy">Escribe tu mensaje</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy/70">
        Este formulario no envía ni guarda tus datos en este sitio: abre WhatsApp con tu mensaje
        listo para que tú lo envíes.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor={`${id}-nombre`} className="text-sm font-semibold text-navy">
            Tu nombre <span className="font-normal text-navy/60">(opcional)</span>
          </label>
          <input
            id={`${id}-nombre`}
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={field}
          />
        </div>

        <div>
          <label htmlFor={`${id}-especialista`} className="text-sm font-semibold text-navy">
            Especialista
          </label>
          <select
            id={`${id}-especialista`}
            required
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setError('');
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`${field} appearance-none bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-11`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2317283F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">Selecciona una opción</option>
            {specialists.map((s) => (
              <option key={s.slug} value={s.slug}>
                {displayName(s)} — {s.specialty}
              </option>
            ))}
          </select>
          {error && (
            <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-semibold text-salmon-700">
              {error}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-mensaje`} className="text-sm font-semibold text-navy">
            Mensaje <span className="font-normal text-navy/60">(opcional)</span>
          </label>
          <textarea
            id={`${id}-mensaje`}
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Por ejemplo: días u horarios que te acomodan."
            className={`${field} resize-y`}
          />
          <p className="mt-2 text-xs leading-relaxed text-navy/60">
            No es necesario compartir detalles personales o clínicos por este medio.
          </p>
        </div>
      </div>

      <button type="submit" className="btn btn-primary group mt-7 w-full">
        <span>
          <WhatsAppIcon />
          Continuar en WhatsApp
          <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </span>
      </button>
    </form>
  );
}
