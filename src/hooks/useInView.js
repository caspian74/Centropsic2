import { useEffect, useRef, useState } from 'react';

/**
 * Devuelve [ref, visible]. `visible` pasa a true la primera vez que el
 * elemento se acerca a la pantalla. Se usa para cargar el mapa solo cuando
 * hace falta.
 */
export function useInView({ rootMargin = '300px', once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, visible];
}
