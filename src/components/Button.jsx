import { Link } from 'react-router-dom';

/**
 * Botón polimórfico:
 *   <Button to="/ruta">        → enlace interno (React Router)
 *   <Button href="https://…">  → enlace externo (se abre en pestaña nueva)
 *   <Button onClick={…}>       → botón
 * Variantes: primary | sage | salmon | outline | light | outline-light
 */
// Nombres completos (no armados con plantillas) para que Tailwind los detecte.
const VARIANTS = {
  primary: 'btn-primary',
  sage: 'btn-sage',
  salmon: 'btn-salmon',
  outline: 'btn-outline',
  light: 'btn-light',
  'outline-light': 'btn-outline-light',
};

export default function Button({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  external = Boolean(href),
  ...rest
}) {
  const classes = `btn ${VARIANTS[variant] || VARIANTS.primary} group ${className}`;
  const content = <span>{children}</span>;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
