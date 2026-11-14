import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FROM = {
  up: { y: 36 },
  down: { y: -24 },
  left: { x: -44 },
  right: { x: 44 },
  scale: { scale: 0.94 },
  fade: {},
};

/**
 * Animaciones de scroll declarativas. Dentro del elemento `scope`:
 *
 *   data-reveal="up|down|left|right|scale|fade"  aparece al entrar en pantalla
 *   data-delay="0.1"                             retraso en segundos
 *   data-split                                   título cuyas palabras ([data-word]) suben una a una
 *   data-parallax="12"                           se desplaza ±12 % mientras cruza la pantalla
 *   data-draw                                    línea que se dibuja con el scroll (scaleY 0 → 1)
 *
 * Con prefers-reduced-motion no se registra nada y el contenido queda visible.
 * Sin JavaScript el contenido también es visible: el estado oculto lo pone GSAP.
 */
export function useScrollAnimations(scope, deps = []) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      el.querySelectorAll('[data-reveal]').forEach((node) => {
        const from = FROM[node.dataset.reveal] || FROM.up;
        gsap.from(node, {
          ...from,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          delay: parseFloat(node.dataset.delay) || 0,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: node, start: 'top 90%', once: true },
        });
      });

      el.querySelectorAll('[data-split]').forEach((node) => {
        const words = node.querySelectorAll('[data-word]');
        if (!words.length) return;
        gsap.from(words, {
          yPercent: 115,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.045,
          delay: parseFloat(node.dataset.delay) || 0,
          scrollTrigger: { trigger: node, start: 'top 90%', once: true },
        });
      });

      el.querySelectorAll('[data-parallax]').forEach((node) => {
        const amount = parseFloat(node.dataset.parallax) || 10;
        gsap.fromTo(
          node,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: node.parentElement || node,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });

      el.querySelectorAll('[data-draw]').forEach((node) => {
        gsap.fromTo(
          node,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: node.parentElement || node,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.4,
            },
          },
        );
      });
    });

    // Las fuentes web cambian la altura del texto: recalcular posiciones.
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
