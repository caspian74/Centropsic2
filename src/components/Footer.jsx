import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';

import Logo from './Logo.jsx';
import { siteConfig, fullAddress, mapLinks } from '../data/siteConfig.js';
import { specialists, displayName } from '../data/specialists.js';

const SOCIAL = [
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'tiktok', label: 'TikTok', Icon: ExternalLink },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
];

const LEGAL = [
  { label: 'Aviso de privacidad', to: '/aviso-de-privacidad' },
  { label: 'Términos y condiciones', to: '/terminos-y-condiciones' },
  { label: 'Aviso sobre salud mental', to: '/aviso-de-salud-mental' },
];

function FooterHeading({ children, className = '' }) {
  return <h2 className={`eyebrow text-sage-300 ${className}`}>{children}</h2>;
}

export default function Footer() {
  const socials = SOCIAL.filter(({ key }) => siteConfig.social[key]);
  const { email } = siteConfig.contact;
  const { emergency, credit } = siteConfig;

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-900 text-cream">
      {/* Formas de la identidad, muy tenues */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <span className="absolute -right-40 top-10 h-72 w-[38rem] rounded-l-full bg-salmon" />
        <span className="absolute -left-40 bottom-24 h-64 w-[34rem] rounded-r-full bg-sage" />
      </div>

      <div className="container-x relative pb-10 pt-20 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to="/" aria-label={`${siteConfig.name}, ir al inicio`} className="inline-block text-cream">
              <Logo markClassName="h-12 w-12" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-cream/70">{siteConfig.description}</p>

            {socials.length > 0 && (
              <ul className="mt-7 flex gap-3">
                {socials.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={siteConfig.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} de ${siteConfig.name}`}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 transition-colors duration-300 hover:bg-cream hover:text-navy"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Secciones del sitio" className="lg:col-span-2">
            <FooterHeading>Navegación</FooterHeading>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-draw text-cream/80 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Directorio de especialistas" className="lg:col-span-3">
            <FooterHeading>Especialistas</FooterHeading>
            <ul className="mt-5 space-y-3">
              {specialists.map((s) => (
                <li key={s.slug}>
                  <Link to={`/especialistas/${s.slug}`} className="link-draw text-cream/80 hover:text-cream">
                    {displayName(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>Contacto</FooterHeading>
            <address className="mt-5 space-y-4 not-italic text-cream/80">
              <a
                href={mapLinks.open}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 leading-relaxed hover:text-cream"
              >
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-salmon" aria-hidden="true" />
                <span>{fullAddress}</span>
              </a>
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-cream">
                  <Mail className="h-5 w-5 shrink-0 text-salmon" aria-hidden="true" />
                  <span>{email}</span>
                </a>
              )}
            </address>
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              Las citas se agendan directamente con cada especialista por WhatsApp.
            </p>

            <FooterHeading className="mt-9">Legal</FooterHeading>
            <ul className="mt-5 space-y-3">
              {LEGAL.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-draw text-cream/80 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-cream/15 p-6 text-sm leading-relaxed text-cream/70 sm:p-7">
          <p>
            <strong className="font-semibold text-cream">Aviso sobre salud mental.</strong> El
            contenido de este sitio es informativo y no sustituye una evaluación psicológica
            profesional, un diagnóstico ni un tratamiento. El contacto por WhatsApp no es un
            servicio de emergencias. Si tú o alguien más está en riesgo inmediato, llama al{' '}
            <a href={`tel:${emergency.number}`} className="font-semibold text-cream underline underline-offset-4">
              {emergency.number}
            </a>{' '}
            o a la {emergency.lineName}:{' '}
            <a
              href={`tel:${emergency.lineNumber.replace(/\s/g, '')}`}
              className="whitespace-nowrap font-semibold text-cream underline underline-offset-4"
            >
              {emergency.lineNumber}
            </a>
            .{' '}
            <Link to="/aviso-de-salud-mental" className="underline underline-offset-4 hover:text-cream">
              Leer el aviso completo
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-cream/15 pt-7 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          {credit.label && (
            <p>
              Sitio web por{' '}
              {credit.url ? (
                <a href={credit.url} target="_blank" rel="noopener noreferrer" className="link-draw text-cream/80 hover:text-cream">
                  {credit.label}
                </a>
              ) : (
                credit.label
              )}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
