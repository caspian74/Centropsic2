import { useRef } from 'react';

import Seo from '../components/Seo.jsx';
import { useScrollAnimations } from '../hooks/useScrollAnimations.js';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Services from '../sections/Services.jsx';
import Specialists from '../sections/Specialists.jsx';
import Process from '../sections/Process.jsx';
import Location from '../sections/Location.jsx';
import Faq from '../sections/Faq.jsx';
import Contact from '../sections/Contact.jsx';

export default function Home() {
  const scope = useRef(null);
  useScrollAnimations(scope);

  return (
    <div ref={scope}>
      <Seo path="/" />
      <Hero />
      <About />
      <Services />
      <Specialists />
      <Process />
      <Location />
      <Faq />
      <Contact />
    </div>
  );
}
