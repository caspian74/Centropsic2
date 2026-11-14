import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

import ContactForm from '../components/ContactForm.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import { siteConfig, fullAddress } from '../data/siteConfig.js';
import { specialists, displayName } from '../data/specialists.js';
import { telLink, waLink } from '../lib/whatsapp.js';

const SOCIAL = [
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'tiktok', label: 'TikTok', Icon: ExternalLink },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
];

export default function Contact() {
  const { email, phone } = siteConfig.contact;
  const socials = SOCIAL.filter(({ key }) => siteConfig.social[key]);

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="section-y relative overflow-hidden bg-sage-50">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            id="contacto-titulo"
            eyebrow="Contacto"
            title="Escríbele a tu especialista cuando tú lo decidas"
            emphasis={['tú']}
          >
            <p>
              El contacto es directo: cada botón abre WhatsApp con el número de la persona que
              elijas.
            </p>
          </SectionHeading>

          {/* Directorio rápido con botón individual de WhatsApp */}
          <ul data-reveal="up" className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {specialists.map((s) => (
              <li key={s.slug} className="flex items-center gap-3 border-b border-navy/15 py-3.5">
                <div className="min-w-0 flex-1">
                  <Link to={`/especialistas/${s.slug}`} className="block truncate font-semibold text-navy underline-offset-4 hover:underline">
                    {displayName(s)}
                  </Link>
                  <p className="truncate text-sm text-navy/70">{s.specialty}</p>
                </div>
                <a
                  href={waLink(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Escribir a ${displayName(s)} por WhatsApp`}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-navy transition-[transform,background-color] duration-300 ease-calm hover:scale-105 hover:bg-sage-300"
                >
                  <WhatsAppIcon />
                </a>
              </li>
            ))}
          </ul>

          <address data-reveal="up" className="mt-10 space-y-4 not-italic text-navy/80">
            <a href="#ubicacion" className="group flex gap-3 leading-relaxed hover:text-navy">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
              <span>
                {fullAddress}
                <span className="link-draw ml-2 font-semibold text-navy">Ver mapa</span>
              </span>
            </a>
            {phone && (
              <a href={telLink(phone)} className="flex items-center gap-3 hover:text-navy">
                <Phone className="h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                <span>{phone}</span>
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-navy">
                <Mail className="h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                <span>{email}</span>
              </a>
            )}
          </address>

          {socials.length > 0 && (
            <ul className="mt-7 flex gap-3">
              {socials.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a
                    href={siteConfig.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de ${siteConfig.name}`}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors duration-300 hover:bg-navy hover:text-cream"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-reveal="up" data-delay="0.1" className="lg:col-span-5">
          <ContactForm />
          <p className="mt-5 px-2 text-sm leading-relaxed text-navy/70">
            WhatsApp no es un canal de atención de emergencias. Si hay un riesgo inmediato, llama
            al {siteConfig.emergency.number} o a la {siteConfig.emergency.lineName} (
            <a
              href={`tel:${siteConfig.emergency.lineNumber.replace(/\s/g, '')}`}
              className="whitespace-nowrap font-semibold text-navy underline underline-offset-4"
            >
              {siteConfig.emergency.lineNumber}
            </a>
            ).
          </p>
        </div>
      </div>
    </section>
  );
}
