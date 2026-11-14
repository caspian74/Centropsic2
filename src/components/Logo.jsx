import { useId } from 'react';
import { siteConfig } from '../data/siteConfig.js';

/**
 * Isotipo del centro, redibujado en SVG a partir del material impreso.
 * Hereda el color del texto (currentColor). Cuando se tenga el archivo
 * vectorial original del logotipo, basta con sustituir los trazos de aquí
 * y de public/favicon.svg.
 */
export function LogoMark({ className = 'h-10 w-10' }) {
  const maskId = `ojo-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="#fff" />
        <path d="M34 42.5c1.8 2.3 5.4 2.3 7.2 0" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
      </mask>
      {/* Perfil */}
      <path
        mask={`url(#${maskId})`}
        fill="currentColor"
        d="M13 32h8.6v3.4h6.2V32H41.5l9 11-4.9 2.2V51a4 4 0 0 1-4 4H31.5v7H13z"
      />
      {/* Mente */}
      <path
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24.7 34.5v-7.3h-5.5c-4.3 0-7.3-3.4-6.3-7.2-1.5-4 1.6-8 5.7-7.5 1.6-4.3 7.2-5.6 10.3-2.4 4-2 8.8.9 8.6 5.3 3.7 1.7 4 7 .6 9.200-.3 2.800-2.800 4.600-5.600 4.200-1.300 1.400-3.500 1.700-5.100.700"
      />
      <path
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        d="M22.5 14.800c2.400.500 3.600 2.600 2.900 4.900M31.200 13.600v.4"
      />
    </svg>
  );
}

export default function Logo({ className = '', markClassName = 'h-10 w-10' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className="text-[1.3rem] font-bold tracking-tight">Centro</span>
        <span className="mt-0.5 text-[0.82rem] font-medium tracking-wide">Psicoterapéutico</span>
      </span>
      <span className="sr-only"> — {siteConfig.tagline}</span>
    </span>
  );
}
