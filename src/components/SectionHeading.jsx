import SplitWords from './SplitWords.jsx';

/** Encabezado de sección: etiqueta pequeña + título serif + texto introductorio. */
export default function SectionHeading({
  eyebrow,
  title,
  emphasis,
  children,
  align = 'left',
  tone = 'light',
  id,
  className = '',
}) {
  const dark = tone === 'dark';
  return (
    <header
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <p
          data-reveal="fade"
          className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${
            dark ? 'text-sage-300' : 'text-sage-700'
          }`}
        >
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <SplitWords
        as="h2"
        id={id}
        text={title}
        emphasis={emphasis}
        emphasisClassName={dark ? 'italic text-salmon-200' : 'italic text-sage-700'}
        className={`display-lg mt-5 ${dark ? 'text-cream' : 'text-navy'}`}
      />
      {children && (
        <div
          data-reveal="up"
          data-delay="0.15"
          className={`lead mt-6 ${dark ? '!text-cream/75' : ''}`}
        >
          {children}
        </div>
      )}
    </header>
  );
}
