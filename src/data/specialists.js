// ─────────────────────────────────────────────────────────────────────────
//  DIRECTORIO DE ESPECIALISTAS
//  Fuente: directorio impreso del centro. Nombres, especialidades y
//  teléfonos están tal cual aparecen ahí.
//
//  Campos:
//   slug        → URL del perfil: /especialistas/<slug>. No cambiar una vez publicado.
//   title       → Tratamiento que antecede al nombre.
//   article     → 'la' o 'el'. Se usa en el mensaje de WhatsApp ("con la Psic. …").
//   specialty   → Texto oficial de la especialidad.
//   phone       → 10 dígitos. La lada de país se agrega sola (siteConfig.whatsapp).
//   services    → Áreas de services.js con las que se relaciona su especialidad.
//                 Sirve para los filtros del directorio.
//   photo       → Ruta de la fotografía ('' = monograma con iniciales).
//   description → Texto de presentación escrito o aprobado por la persona.
//                 Si está vacío se muestra un texto neutro generado a partir
//                 de la especialidad. NO se inventan biografías ni credenciales.
//   license     → Cédula profesional (opcional). Vacío = no se muestra.
// ─────────────────────────────────────────────────────────────────────────

export const specialists = [
  {
    slug: 'jessica-miranda-suarez',
    title: 'Psic.',
    article: 'la',
    name: 'Jessica Miranda Suárez',
    specialty: 'Atención Psicológica y Orientación Humanista-Gestalt',
    phone: '664-336-9567',
    services: ['atencion-psicologica'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'diana-lopez-balderrama',
    title: 'Psic.',
    article: 'la',
    name: 'Diana López Balderrama',
    specialty: 'Evaluación y Psicoterapia para niños y adolescentes',
    phone: '664-281-9961',
    services: ['ninos', 'adolescentes'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'cesar-dominguez-gonzalez',
    title: 'Psic.',
    article: 'el',
    name: 'César Domínguez González',
    specialty: 'Salud mental y desarrollo humano',
    phone: '664-347-7095',
    services: ['salud-mental'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'daniela-barriga',
    title: 'Psic.',
    article: 'la',
    name: 'Daniela Barriga',
    specialty: 'Orientación Psicológica en adolescentes y adultos',
    phone: '663-121-6659',
    services: ['orientacion', 'adolescentes', 'adultos'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'jennyfer-perez-sanchez',
    title: 'Psic.',
    article: 'la',
    name: 'Jennyfer Pérez Sánchez',
    specialty: 'Enfoque cognitivo-conductual',
    phone: '664-555-5403',
    services: ['tcc'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'anna-galindo-ochoa',
    title: 'Psic.',
    article: 'la',
    name: 'Anna L. Galindo Ochoa',
    specialty: 'Psicoterapia a niños y adolescentes',
    phone: '664-193-1792',
    services: ['ninos', 'adolescentes'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'carolina-velazquez-jose',
    title: 'Psic.',
    article: 'la',
    name: 'Carolina Velazquez José',
    specialty: 'Enfoque Cognitivo-conductual y Sistémico con parejas y familia',
    phone: '664-584-5848',
    services: ['tcc', 'sistemica', 'pareja', 'familiar'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'amayrani-martinez',
    title: 'Psic.',
    article: 'la',
    name: 'Amayrani Martinez',
    specialty: 'Psicoterapia para adultos',
    phone: '664-814-8699',
    services: ['adultos'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'elvira-torres-pena',
    title: 'Psic.',
    article: 'la',
    name: 'Elvira A. Torres Peña',
    specialty: 'Educación Especial (niños y adolescentes)',
    phone: '664-517-2602',
    services: ['educacion-especial', 'ninos', 'adolescentes'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'yumico-villa-nava',
    title: 'Psic.',
    article: 'la', // Verificar con el centro.
    name: 'Yumico B. Villa Nava',
    specialty: 'Orientación Psicológica y enfoque cognitivo-conductual',
    phone: '664-542-0538',
    services: ['orientacion', 'tcc'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'corina-nieto-sandoval',
    title: 'Psic.',
    article: 'la',
    name: 'Corina Nieto Sandoval',
    specialty: 'Psicoterapia Sistémica: niños, adolescentes, adultos y parejas',
    phone: '664-136-3373',
    services: ['sistemica', 'ninos', 'adolescentes', 'adultos', 'pareja'],
    photo: '',
    description: '',
    license: '',
  },
  {
    slug: 'erika-reyes-maldonado',
    title: 'Psic.',
    article: 'la',
    name: 'Erika Yareli Reyes Maldonado',
    specialty: 'Terapia Cognitivo-Conductual',
    phone: '664-109-5206',
    services: ['tcc'],
    photo: '',
    description: '',
    license: '',
  },
];

/** "Psic. Jessica Miranda Suárez" */
export const displayName = (s) => `${s.title} ${s.name}`;

export const getSpecialist = (slug) => specialists.find((s) => s.slug === slug);

export const specialistsByService = (serviceId) =>
  specialists.filter((s) => s.services.includes(serviceId));

/** Iniciales para el monograma: primer nombre + primer apellido. */
export function initials(s) {
  const parts = s.name.split(/\s+/).filter((p) => !/\.$/.test(p));
  const first = parts[0] ?? '';
  // Con 4 o más palabras se asume un segundo nombre (p. ej. "Erika Yareli Reyes Maldonado").
  const last = parts.length >= 4 ? parts[2] : parts[1] ?? '';
  return (first[0] ?? '') + (last[0] ?? '');
}

/** "664 336 9567" */
export function formatPhone(phone) {
  const d = String(phone).replace(/\D/g, '');
  return d.length === 10 ? `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` : phone;
}

/** Texto de presentación: el aprobado por la persona o uno neutro. */
export function getDescription(s) {
  if (s.description) return s.description;
  return `${displayName(s)} forma parte del directorio del Centro Psicoterapéutico en La Mesa, Tijuana. Su área de atención es: ${s.specialty}. Para conocer su disponibilidad, modalidad de atención y honorarios, puedes escribirle directamente por WhatsApp.`;
}
