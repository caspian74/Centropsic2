import { siteConfig, fullAddress } from './siteConfig.js';

// Preguntas frecuentes. Las respuestas evitan afirmar políticas (costos,
// horarios, modalidades) que el centro no ha confirmado. Texto plano: también
// se usa para los datos estructurados FAQPage.

export const faqs = [
  {
    q: '¿Cómo puedo agendar una cita?',
    a: 'Elige a un especialista en el directorio y toca el botón «Agendar consulta». Se abrirá WhatsApp con un mensaje listo para enviar a su número. La cita se confirma directamente con esa persona.',
  },
  {
    q: '¿Cómo elijo a un especialista?',
    a: 'En el directorio puedes filtrar por tipo de atención (por ejemplo, niños, adolescentes, adultos, pareja o familia) y revisar la especialidad de cada profesional. Si tienes dudas, puedes escribirle y preguntarle si su enfoque es adecuado para lo que buscas antes de agendar.',
  },
  {
    q: '¿Atienden a niños y adolescentes?',
    a: 'Sí. Varios especialistas del directorio indican atención a niños y adolescentes. Usa los filtros «Niños» y «Adolescentes» para verlos.',
  },
  {
    q: '¿Atienden a adultos?',
    a: 'Sí. En el directorio encontrarás especialistas que indican psicoterapia y orientación para adultos, así como atención a parejas y familias.',
  },
  {
    q: '¿Dónde se encuentra el centro?',
    a: `Estamos en ${fullAddress}. En la sección de ubicación encontrarás el mapa y el botón «Cómo llegar».`,
  },
  {
    q: '¿Cómo puedo consultar los horarios?',
    a: siteConfig.hours
      ? `Horario general del centro: ${siteConfig.hours}. La disponibilidad de cada especialista puede variar; confírmala por WhatsApp.`
      : 'Los horarios dependen de la agenda de cada especialista. Escríbele por WhatsApp para conocer su disponibilidad.',
  },
  {
    q: '¿Qué debo hacer antes de mi primera sesión?',
    a: 'Al confirmar tu cita, tu especialista te indicará si necesitas llevar o preparar algo. Como sugerencia general, llega con unos minutos de anticipación y ten presentes las dudas que quieras resolver, como la duración de la sesión, los honorarios o la modalidad de atención.',
  },
  {
    q: '¿Puedo contactar directamente al especialista?',
    a: 'Sí. Cada especialista tiene su propio botón de WhatsApp, tanto en el directorio como en su perfil. Ten en cuenta que WhatsApp no es un canal de atención de emergencias.',
  },
];
