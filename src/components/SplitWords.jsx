/**
 * Título cuyas palabras se animan una a una (ver useScrollAnimations → data-split).
 * Para lectores de pantalla el título se anuncia completo mediante aria-label.
 *
 *   <SplitWords as="h2" text="Un espacio para ti" emphasis={['ti']} className="display-lg" />
 */
export default function SplitWords({
  as: Tag = 'h2',
  text,
  emphasis = [],
  emphasisClassName = 'italic text-sage-700',
  className = '',
  split = true,
  ...rest
}) {
  const words = text.split(/\s+/);
  return (
    <Tag className={className} aria-label={text} {...(split ? { 'data-split': '' } : {})} {...rest}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="split-mask">
            <span data-word className={emphasis.includes(word) ? emphasisClassName : undefined}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
