import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

import Button from '../components/Button.jsx';
import SplitWords from '../components/SplitWords.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { siteConfig } from '../data/siteConfig.js';
import { specialists } from '../data/specialists.js';
import { canRunScene, whenIdle } from '../lib/device.js';

// Three.js viaja en un archivo aparte y solo se pide en equipos capaces.
const HeroScene = lazy(() => import('../components/three/HeroScene.jsx'));

/**
 * Versión ligera del fondo: las formas del directorio impreso (verde y
 * salmón que se traslapan) flotando con CSS. Es lo que se ve en móviles,
 * con movimiento reducido, sin WebGL y mientras carga la escena 3D.
 */
function LightBackdrop({ hidden }) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 h-[32svh] transition-opacity duration-1000 ease-calm lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[54%] ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="absolute right-[-8%] top-[14%] h-[34%] w-[82%] animate-drift-a rounded-l-full bg-salmon lg:top-[20%] lg:h-[24%]" />
      <span className="absolute left-[-6%] top-[40%] h-[36%] w-[88%] animate-drift-b rounded-r-full bg-sage mix-blend-multiply lg:left-[4%] lg:top-[38%] lg:h-[24%] lg:rounded-full" />
      <span className="absolute right-[-12%] top-[68%] h-[30%] w-[64%] animate-drift-a rounded-l-full bg-salmon-200 mix-blend-multiply [animation-delay:-6s] lg:top-[56%] lg:h-[20%]" />
      <span className="absolute left-[14%] top-[6%] h-10 w-10 animate-drift-b rounded-full bg-navy [animation-delay:-3s] lg:left-[18%] lg:top-[24%] lg:h-14 lg:w-14" />
    </div>
  );
}

export default function Hero() {
  const root = useRef(null);
  const [showScene, setShowScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const { hero } = siteConfig;

  // La escena 3D se monta cuando el navegador queda libre, no antes.
  useEffect(() => {
    if (!canRunScene()) return undefined;
    return whenIdle(() => setShowScene(true), 1600);
  }, []);

  // Entrada: el título sube palabra por palabra y el resto aparece en cascada.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.05 });
      timeline
        .from(el.querySelectorAll('[data-word]'), { yPercent: 115, duration: 1.05, stagger: 0.05 })
        .from(
          el.querySelectorAll('[data-hero-fade]'),
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.09,
            clearProps: 'transform,opacity,visibility',
          },
          0.35,
        )
        .from(
          el.querySelector('[data-hero-visual]'),
          { autoAlpha: 0, duration: 1.6, ease: 'power2.out', clearProps: 'opacity,visibility' },
          0.1,
        );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream"
    >
      <div data-hero-visual aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_78%_38%,rgba(131,185,154,.20),transparent_70%),radial-gradient(45%_40%_at_92%_78%,rgba(233,149,115,.16),transparent_70%)]" />
        <LightBackdrop hidden={sceneReady} />
        {showScene && (
          <ErrorBoundary silent>
            <Suspense fallback={null}>
              <div
                className={`absolute inset-0 transition-opacity duration-[1400ms] ease-calm ${
                  sceneReady ? 'opacity-60 lg:opacity-100' : 'opacity-0'
                }`}
              >
                <HeroScene onReady={() => setSceneReady(true)} />
              </div>
            </Suspense>
          </ErrorBoundary>
        )}
      </div>

      <div className="container-x flex flex-1 flex-col justify-center pb-[36svh] pt-28 lg:pb-20 lg:pt-36">
        <div className="max-w-[46rem]">
          <p data-hero-fade className="eyebrow flex items-center gap-3 text-sage-700">
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <SplitWords
            as="h1"
            id="hero-titulo"
            split={false}
            text={hero.title}
            emphasis={hero.titleEmphasis}
            className="display-xl mt-6 text-navy"
          />

          <p data-hero-fade className="lead mt-7 max-w-xl">
            {hero.subtitle}
          </p>

          <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/#especialistas">
              {hero.primaryCta}
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/especialistas" variant="outline">
              {hero.secondaryCta}
            </Button>
          </div>
        </div>
      </div>

      <div
        data-hero-fade
        className="container-x hidden items-end justify-between gap-10 pb-9 text-sm text-navy/75 lg:flex"
      >
        <dl className="flex gap-12">
          <div>
            <dt className="eyebrow text-navy/60">Directorio</dt>
            <dd className="mt-1.5 font-semibold text-navy">{specialists.length} especialistas</dd>
          </div>
          <div>
            <dt className="eyebrow text-navy/60">Atención</dt>
            <dd className="mt-1.5 font-semibold text-navy">
              Niños, adolescentes, adultos, parejas y familias
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-navy/60">Ubicación</dt>
            <dd className="mt-1.5 font-semibold text-navy">Plaza Somis, La Mesa, Tijuana</dd>
          </div>
        </dl>
        <a href="#nosotros" className="group flex items-center gap-3 font-semibold text-navy">
          Desliza
          <span className="relative block h-10 w-px overflow-hidden bg-navy/20" aria-hidden="true">
            <span className="absolute inset-0 animate-cue bg-navy" />
          </span>
        </a>
      </div>
    </section>
  );
}
