// ─────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN CENTRAL DEL SITIO
//  Todo lo institucional se edita aquí. Los campos vacíos ('') simplemente
//  no se muestran en el sitio: nada de lo que aparece en pantalla es inventado.
//  (Este archivo también lo lee scripts/postbuild.mjs con Node, por eso no
//  usa import.meta.env ni JSX.)
// ─────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Centro Psicoterapéutico',
  shortName: 'Centro Psicoterapéutico',
  tagline: 'Atención psicológica en Tijuana',
  description:
    'Centro de atención psicológica en La Mesa, Tijuana. Psicoterapia para adultos, adolescentes, niños, parejas y familias, con contacto directo con cada especialista.',

  // Dominio definitivo, sin diagonal final. Ej.: 'https://www.centropsicoterapeutico.mx'
  // También puede definirse con la variable de entorno VITE_SITE_URL (tiene prioridad).
  url: '',

  locale: 'es-MX',

  hero: {
    eyebrow: 'Psicólogos en Tijuana · La Mesa',
    title: 'Un espacio para comprenderte, crecer y sentirte mejor.',
    // Palabras del título que se muestran en cursiva.
    titleEmphasis: ['comprenderte,'],
    subtitle:
      'Te acompañamos en tu camino hacia el bienestar emocional, con atención psicológica profesional y un enfoque humano.',
    primaryCta: 'Agenda tu cita',
    secondaryCta: 'Conoce a nuestros especialistas',
  },

  address: {
    street: 'Blvd. Gustavo Díaz Ordaz 1559',
    unit: 'Local 204-A',
    building: 'Plaza Somis, segundo piso',
    neighborhood: 'Fracc. La Mesa',
    city: 'Tijuana',
    state: 'Baja California',
    country: 'México',
    countryCode: 'MX',
    postalCode: '', // Pendiente de confirmar.
  },

  map: {
    // Texto que se envía a Google Maps para ubicar el centro.
    query:
      'Plaza Somis, Blvd. Gustavo Díaz Ordaz 1559, La Mesa, Tijuana, Baja California, México',
    // Coordenadas verificadas del local. Mientras sea null, el sitio muestra
    // el mapa interactivo de Google ubicado por dirección (sin API key).
    // Al escribirlas, el sitio cambia solo a Leaflet + OpenStreetMap con
    // marcador propio. Ejemplo de formato: { lat: 32.0000, lng: -116.0000 }
    coordinates: null,
    zoom: 17,
  },

  // Horario general del centro. Vacío = se indica consultar con cada especialista.
  hours: '',

  contact: {
    email: '', // Ej.: 'contacto@tu-dominio.com'
    phone: '', // Solo si existe un número general de recepción.
  },

  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
    linkedin: '',
  },

  whatsapp: {
    countryCode: '52',
    // {articulo} y {nombre} se sustituyen con los datos de specialists.js
    bookingTemplate:
      'Hola, estoy interesado/a en agendar una consulta con {articulo} {nombre}. ¿Podrían proporcionarme información sobre disponibilidad y horarios?',
    infoTemplate:
      'Hola, me gustaría recibir información sobre la atención psicológica con {articulo} {nombre}.',
  },

  // Datos para el aviso de privacidad y los términos. Mientras estén vacíos,
  // las páginas legales muestran el campo resaltado como "pendiente".
  legal: {
    responsibleName: '', // Razón social o nombre completo del responsable.
    responsibleAddress: '', // Domicilio del responsable para oír y recibir notificaciones.
    privacyEmail: '', // Correo para ejercer derechos ARCO.
    lastUpdated: '', // Ej.: '15 de noviembre de 2026'
    // Muestra el aviso "Borrador pendiente de revisión" en las páginas legales.
    // Cámbialo a false cuando el responsable del centro apruebe los textos.
    showDraftNotice: true,
  },

  emergency: {
    number: '911',
    lineName: 'Línea de la Vida',
    lineNumber: '800 911 2000',
  },

  // Crédito opcional en el pie de página. Ej.: { label: 'LÍNEA FRONTERA', url: 'https://…' }
  credit: { label: '', url: '' },

  nav: [
    { label: 'Nosotros', to: '/#nosotros' },
    { label: 'Servicios', to: '/#servicios' },
    { label: 'Especialistas', to: '/#especialistas' },
    { label: 'Cómo empezar', to: '/#proceso' },
    { label: 'Ubicación', to: '/#ubicacion' },
    { label: 'Preguntas', to: '/#preguntas' },
    { label: 'Contacto', to: '/#contacto' },
  ],
};

const a = siteConfig.address;

/** Dirección en una sola línea. */
export const fullAddress = [
  `${a.street}, ${a.unit}`,
  `${a.neighborhood}, ${a.building}`,
  a.postalCode ? `C.P. ${a.postalCode}` : '',
  a.city,
  a.state,
  a.country,
]
  .filter(Boolean)
  .join(', ');

const q = encodeURIComponent(siteConfig.map.query);

export const mapLinks = {
  open: `https://www.google.com/maps/search/?api=1&query=${q}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  embed: `https://www.google.com/maps?q=${q}&z=${siteConfig.map.zoom}&hl=es&output=embed`,
};
