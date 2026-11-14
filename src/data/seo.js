// ─────────────────────────────────────────────────────────────────────────
//  SEO: títulos, descripciones y datos estructurados de cada ruta.
//  Una sola fuente para el navegador (components/Seo.jsx) y para la
//  compilación (scripts/postbuild.mjs → HTML por ruta + sitemap.xml).
//  Solo se publica información verificable: sin reseñas, calificaciones,
//  horarios ni coordenadas que no estén confirmados en siteConfig.js.
// ─────────────────────────────────────────────────────────────────────────

import { siteConfig } from './siteConfig.js';
import { specialists, displayName, getSpecialist } from './specialists.js';
import { faqs } from './faq.js';

const SITE = siteConfig.name;

export const cleanBase = (base) => String(base || '').replace(/\/+$/, '');

const staticPages = {
  '/': {
    title: `${SITE} | Psicólogos en Tijuana, La Mesa`,
    description:
      'Psicólogos en Tijuana (La Mesa). Psicoterapia para adultos, adolescentes, niños, parejas y familias. Elige a tu especialista y agenda por WhatsApp.',
    priority: '1.0',
  },
  '/especialistas': {
    title: `Directorio de psicólogos en Tijuana | ${SITE}`,
    description:
      'Conoce a los especialistas del Centro Psicoterapéutico en La Mesa, Tijuana: psicoterapia para niños, adolescentes y adultos, terapia de pareja, familiar y cognitivo-conductual.',
    priority: '0.9',
  },
  '/aviso-de-privacidad': {
    title: `Aviso de privacidad | ${SITE}`,
    description: `Aviso de privacidad del sitio web del ${SITE}: datos personales, finalidades y derechos ARCO.`,
    priority: '0.2',
  },
  '/terminos-y-condiciones': {
    title: `Términos y condiciones | ${SITE}`,
    description: `Condiciones de uso del sitio web del ${SITE}.`,
    priority: '0.2',
  },
  '/aviso-de-salud-mental': {
    title: `Aviso sobre salud mental | ${SITE}`,
    description:
      'El contenido de este sitio es informativo y no sustituye una evaluación psicológica profesional. Qué hacer en caso de emergencia.',
    priority: '0.2',
  },
};

/** Todas las rutas indexables del sitio (para sitemap y HTML estático). */
export function getAllRoutes() {
  return [
    ...Object.keys(staticPages),
    ...specialists.map((s) => `/especialistas/${s.slug}`),
  ];
}

const jobTitle = (s) => (s.article === 'el' ? 'Psicólogo' : 'Psicóloga');

const intlPhone = (phone) => {
  const d = String(phone).replace(/\D/g, '');
  return d.length === 10 ? `+${siteConfig.whatsapp.countryCode}${d}` : `+${d}`;
};

function personSchema(s, base) {
  return {
    '@type': 'Person',
    '@id': `${base}/especialistas/${s.slug}#persona`,
    name: s.name,
    honorificPrefix: s.title,
    jobTitle: jobTitle(s),
    knowsAbout: s.specialty,
    telephone: intlPhone(s.phone),
    url: `${base}/especialistas/${s.slug}`,
    worksFor: { '@id': `${base}/#organizacion` },
  };
}

function organizationSchema(base) {
  const a = siteConfig.address;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const org = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${base}/#organizacion`,
    name: SITE,
    description: siteConfig.description,
    url: `${base}/`,
    image: `${base}/og-image.png`,
    logo: `${base}/icons/icon-512.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.street}, ${a.unit}, ${a.building}, ${a.neighborhood}`,
      addressLocality: a.city,
      addressRegion: a.state,
      addressCountry: a.countryCode,
    },
    areaServed: { '@type': 'City', name: a.city },
    employee: specialists.map((s) => personSchema(s, base)),
  };
  if (a.postalCode) org.address.postalCode = a.postalCode;
  if (siteConfig.contact.email) org.email = siteConfig.contact.email;
  if (siteConfig.contact.phone) org.telephone = intlPhone(siteConfig.contact.phone);
  if (sameAs.length) org.sameAs = sameAs;
  if (siteConfig.map.coordinates) {
    org.geo = {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.map.coordinates.lat,
      longitude: siteConfig.map.coordinates.lng,
    };
  }
  return org;
}

function breadcrumbSchema(items, base) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${base}${path}`,
    })),
  };
}

/**
 * Metadatos de una ruta.
 * @param {string} path  Ruta sin dominio, p. ej. "/especialistas/daniela-barriga"
 * @param {string} base  Dominio sin diagonal final ('' si se desconoce)
 */
export function getMeta(path, base = '') {
  base = cleanBase(base);
  const normalized = path !== '/' ? path.replace(/\/+$/, '') : '/';

  if (staticPages[normalized]) {
    const page = staticPages[normalized];
    const jsonLd = [];
    if (base && normalized === '/') {
      jsonLd.push(organizationSchema(base), {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${base}/#sitio`,
        name: SITE,
        url: `${base}/`,
        inLanguage: siteConfig.locale,
      });
    }
    if (normalized === '/') {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }
    if (base && normalized === '/especialistas') {
      jsonLd.push(
        breadcrumbSchema(
          [
            ['Inicio', '/'],
            ['Especialistas', '/especialistas'],
          ],
          base,
        ),
      );
    }
    return { ...page, path: normalized, type: 'website', jsonLd };
  }

  const match = normalized.match(/^\/especialistas\/([^/]+)$/);
  const s = match && getSpecialist(match[1]);
  if (s) {
    const jsonLd = base
      ? [
          { '@context': 'https://schema.org', ...personSchema(s, base) },
          breadcrumbSchema(
            [
              ['Inicio', '/'],
              ['Especialistas', '/especialistas'],
              [displayName(s), `/especialistas/${s.slug}`],
            ],
            base,
          ),
        ]
      : [];
    return {
      title: `${displayName(s)} | ${jobTitle(s)} en Tijuana | ${SITE}`,
      description: `${displayName(s)}: ${s.specialty}. Consulta en Plaza Somis, La Mesa, Tijuana. Agenda directamente por WhatsApp.`,
      path: normalized,
      type: 'profile',
      priority: '0.8',
      jsonLd,
    };
  }

  return {
    title: `Página no encontrada | ${SITE}`,
    description: 'La página que buscas no existe o cambió de dirección.',
    path: normalized,
    type: 'website',
    noindex: true,
    jsonLd: [],
  };
}

/**
 * Convierte los metadatos en etiquetas para <head>.
 * Devuelve [{ tag, attrs, content? }] para que puedan crearse como nodos
 * (navegador) o como texto HTML (compilación).
 */
export function buildHeadTags(meta, base = '') {
  base = cleanBase(base);
  const tags = [
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },
    {
      tag: 'meta',
      attrs: {
        name: 'robots',
        content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      },
    },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE } },
    { tag: 'meta', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:type', content: meta.type || 'website' } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'es_MX' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: meta.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: meta.description } },
  ];

  if (base) {
    const url = `${base}${meta.path === '/' ? '/' : meta.path}`;
    const image = `${base}/og-image.png`;
    if (!meta.noindex) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: url } });
    tags.push(
      { tag: 'meta', attrs: { property: 'og:url', content: url } },
      { tag: 'meta', attrs: { property: 'og:image', content: image } },
      { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
      { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: `${SITE}, atención psicológica en Tijuana` } },
      { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
    );
  }

  for (const data of meta.jsonLd || []) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      content: JSON.stringify(data).replace(/</g, '\\u003c'),
    });
  }

  return tags;
}
