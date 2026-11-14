// Áreas de atención. "icon" es el nombre de un icono mapeado en
// src/sections/Services.jsx. Las descripciones son informativas y generales:
// no prometen resultados.

export const services = [
  {
    id: 'atencion-psicologica',
    title: 'Atención psicológica',
    short: 'Atención psicológica',
    icon: 'HeartHandshake',
    description:
      'Un primer espacio de escucha profesional para hablar de lo que estás viviendo y explorar opciones de acompañamiento.',
  },
  {
    id: 'adultos',
    title: 'Psicoterapia para adultos',
    short: 'Adultos',
    icon: 'User',
    description:
      'Proceso terapéutico individual para trabajar inquietudes emocionales, relacionales o propias de cada etapa de la vida.',
  },
  {
    id: 'ninos',
    title: 'Psicoterapia para niños',
    short: 'Niños',
    icon: 'Baby',
    description:
      'Acompañamiento adaptado a la infancia, en comunicación con madres, padres o tutores.',
  },
  {
    id: 'adolescentes',
    title: 'Atención a adolescentes',
    short: 'Adolescentes',
    icon: 'Users',
    description:
      'Un espacio respetuoso para acompañar una etapa de cambios, identidad y decisiones.',
  },
  {
    id: 'tcc',
    title: 'Terapia cognitivo-conductual',
    short: 'Cognitivo-conductual',
    icon: 'Brain',
    description:
      'Enfoque estructurado que trabaja la relación entre pensamientos, emociones y conductas.',
  },
  {
    id: 'orientacion',
    title: 'Orientación psicológica',
    short: 'Orientación',
    icon: 'Compass',
    description:
      'Acompañamiento focalizado para clarificar una situación concreta y pensar con calma los siguientes pasos.',
  },
  {
    id: 'sistemica',
    title: 'Terapia sistémica',
    short: 'Sistémica',
    icon: 'Network',
    description:
      'Mira a la persona dentro de sus relaciones: la familia, la pareja y los entornos que le son significativos.',
  },
  {
    id: 'pareja',
    title: 'Terapia de pareja',
    short: 'Pareja',
    icon: 'Heart',
    description:
      'Un espacio para dialogar, con acompañamiento profesional, sobre la comunicación, los acuerdos y los desencuentros.',
  },
  {
    id: 'familiar',
    title: 'Terapia familiar',
    short: 'Familia',
    icon: 'Home',
    description:
      'Trabajo conjunto con quienes integran la familia para comprender sus dinámicas y su convivencia.',
  },
  {
    id: 'educacion-especial',
    title: 'Educación especial',
    short: 'Educación especial',
    icon: 'GraduationCap',
    description:
      'Atención para niños y adolescentes con necesidades educativas específicas, en coordinación con su familia.',
  },
  {
    id: 'salud-mental',
    title: 'Salud mental y desarrollo humano',
    short: 'Desarrollo humano',
    icon: 'Sprout',
    description:
      'Acompañamiento orientado al autoconocimiento, el cuidado emocional y el crecimiento personal.',
  },
];

export const getService = (id) => services.find((s) => s.id === id);
