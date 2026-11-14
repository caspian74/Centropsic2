import { siteConfig } from '../data/siteConfig.js';
import { displayName } from '../data/specialists.js';

/** "664-336-9567" → "526643369567" (formato internacional, solo dígitos). */
export function toWaNumber(phone) {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length === 10 ? `${siteConfig.whatsapp.countryCode}${digits}` : digits;
}

const fill = (template, s) =>
  template.replace('{articulo}', s.article).replace('{nombre}', displayName(s));

export const bookingMessage = (s) => fill(siteConfig.whatsapp.bookingTemplate, s);
export const infoMessage = (s) => fill(siteConfig.whatsapp.infoTemplate, s);

/** Enlace wa.me al número del especialista con el mensaje ya escrito. */
export function waLink(s, message = bookingMessage(s)) {
  return `https://wa.me/${toWaNumber(s.phone)}?text=${encodeURIComponent(message)}`;
}

export const telLink = (phone) => `tel:+${toWaNumber(phone)}`;
