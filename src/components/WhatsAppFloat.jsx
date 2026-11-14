import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

import WhatsAppIcon from './WhatsAppIcon.jsx';
import { specialists, displayName } from '../data/specialists.js';
import { waLink } from '../lib/whatsapp.js';

/**
 * Botón flotante de WhatsApp. No existe un número general de recepción, así
 * que al tocarlo se despliega el directorio para elegir a quién escribir.
 */
export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);
  const toggle = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (event) => {
      if (wrapper.current && !wrapper.current.contains(event.target)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="fixed bottom-4 right-4 z-[46] sm:bottom-6 sm:right-6">
      <div
        id="whatsapp-directorio"
        role="dialog"
        aria-label="Elige a un especialista para escribirle por WhatsApp"
        className={`absolute bottom-[4.5rem] right-0 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-navy/10 transition-[transform,opacity,visibility] duration-300 ease-calm ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        <div className="on-dark flex items-start justify-between gap-4 bg-navy px-5 py-4 text-cream">
          <div>
            <p className="font-display text-2xl font-medium leading-tight">¿Con quién quieres hablar?</p>
            <p className="mt-1 text-sm text-cream/75">Cada especialista atiende su propio WhatsApp.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="-mr-2 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-cream/10"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <ul className="max-h-[min(24rem,55vh)] divide-y divide-navy/10 overflow-y-auto overscroll-contain">
          {specialists.map((s) => (
            <li key={s.slug}>
              <a
                href={waLink(s)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-3 transition-colors duration-200 hover:bg-sage-50"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-navy">{displayName(s)}</span>
                  <span className="block truncate text-sm text-navy/70">{s.specialty}</span>
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-navy transition-colors duration-200 group-hover:bg-sage">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="border-t border-navy/10 bg-cream px-5 py-3 text-xs leading-relaxed text-navy/70">
          WhatsApp no es un canal de emergencias. En caso de riesgo inmediato, llama al 911.
        </p>
      </div>

      <button
        ref={toggle}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="whatsapp-directorio"
        aria-label={open ? 'Cerrar directorio de WhatsApp' : 'Agendar por WhatsApp: elegir especialista'}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage text-navy shadow-lift transition-transform duration-300 ease-calm hover:scale-105 active:scale-95"
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full bg-sage ${open ? '' : 'motion-safe:animate-ping'} opacity-30 [animation-duration:2.8s]`}
        />
        <span className="relative">
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <WhatsAppIcon className="h-7 w-7" />}
        </span>
      </button>
    </div>
  );
}
