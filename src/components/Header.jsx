import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

import Logo from './Logo.jsx';
import Button from './Button.jsx';
import { siteConfig } from '../data/siteConfig.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);

  // Fondo sólido en cuanto se deja la parte alta de la página.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar el menú móvil al navegar.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, location.key]);

  // Menú móvil abierto: bloquear el scroll del fondo y cerrar con Escape.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-calm ${
        solid ? 'bg-cream/85 shadow-[0_1px_0_rgba(23,40,63,.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          to="/"
          className={`transition-colors duration-300 ${open ? 'on-dark text-cream' : 'text-navy'}`}
          aria-label={`${siteConfig.name}, ir al inicio`}
        >
          <Logo markClassName="h-10 w-10" />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {siteConfig.nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-draw text-[0.92rem] font-medium text-navy/85 hover:text-navy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/#especialistas" className={open ? "hidden" : "hidden sm:inline-flex"}>
            {siteConfig.hero.primaryCta}
            <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 xl:hidden ${
              open ? 'on-dark border-cream/30 text-cream' : 'border-navy/20 text-navy'
            }`}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

    </header>

    {/* Menú móvil: panel a pantalla completa con entrada escalonada. */}
    <div
      id="menu-movil"
      className={`on-dark fixed inset-0 z-[48] flex flex-col bg-navy text-cream transition-[clip-path,visibility] duration-700 ease-calm xl:hidden ${
        open ? 'visible [clip-path:circle(150%_at_100%_0)]' : 'invisible [clip-path:circle(0%_at_100%_0)]'
      }`}
    >
      <nav
        aria-label="Menú móvil"
        className="container-x flex flex-1 flex-col justify-center overflow-y-auto pb-10 pt-24"
      >
        <ul className="space-y-1">
          {siteConfig.nav.map((item, i) => (
            <li
              key={item.to}
              className={`transition-[transform,opacity] duration-700 ease-calm ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${140 + i * 55}ms` : '0ms' }}
            >
              <Link
                to={item.to}
                className="group flex items-baseline gap-4 py-2 font-display text-[2.4rem] font-medium leading-tight"
              >
                <span className="font-sans text-xs font-semibold tracking-[0.2em] text-sage-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="link-draw">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div
          className={`mt-10 transition-opacity duration-700 ease-calm ${open ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: open ? '560ms' : '0ms' }}
        >
          <Button to="/#especialistas" variant="sage" className="w-full sm:w-auto">
            {siteConfig.hero.primaryCta}
            <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </nav>
    </div>
    </>
  );
}
