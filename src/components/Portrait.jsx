import { displayName, initials } from '../data/specialists.js';

// Las dos formas del directorio impreso: verde redondeada a la derecha,
// salmón redondeada a la izquierda.
const TONES = [
  { bg: 'bg-sage-200', blob: 'bg-sage', accent: 'bg-salmon', shape: 'rounded-[1.75rem] rounded-tr-[6rem]' },
  { bg: 'bg-salmon-100', blob: 'bg-salmon', accent: 'bg-sage', shape: 'rounded-[1.75rem] rounded-tl-[6rem]' },
];

/**
 * Fotografía del especialista. Mientras no exista (photo: ''), muestra un
 * monograma con sus iniciales sobre las formas orgánicas de la identidad.
 */
export default function Portrait({ specialist, index = 0, className = '', size = 'card' }) {
  const tone = TONES[index % 2];
  const big = size === 'profile';

  return (
    <div
      className={`relative isolate overflow-hidden ${tone.shape} ${tone.bg} ${
        big ? 'aspect-[4/5]' : 'aspect-[5/4]'
      } ${className}`}
    >
      {specialist.photo ? (
        <img
          src={specialist.photo}
          alt={`Fotografía de ${displayName(specialist)}`}
          loading="lazy"
          decoding="async"
          width="800"
          height="1000"
          className="h-full w-full object-cover transition-transform duration-700 ease-calm group-hover:scale-[1.04]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <span
            className={`absolute -right-[18%] top-[14%] h-[58%] w-[78%] rounded-l-full opacity-80 transition-transform duration-700 ease-calm group-hover:-translate-x-2 ${tone.blob}`}
          />
          <span
            className={`absolute -left-[22%] bottom-[-8%] h-[46%] w-[74%] rounded-r-full opacity-70 mix-blend-multiply transition-transform duration-700 ease-calm group-hover:translate-x-2 ${tone.accent}`}
          />
          <span
            className={`absolute inset-0 flex items-center justify-center font-display font-medium text-navy ${
              big ? 'text-[7rem] sm:text-[9rem]' : 'text-6xl'
            }`}
          >
            {initials(specialist)}
          </span>
        </div>
      )}
    </div>
  );
}
