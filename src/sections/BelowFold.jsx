import { useEffect } from 'react';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import LearningInPublic from './LearningInPublic';
import Experience from './Experience';
import Contact from './Contact';
import { scrollToId } from '../lib/scroll';

export const SECTIONS_READY = 'sections:ready';

/**
 * Everything below the hero. Loaded as its own chunk so the hero (and its
 * photo) can paint before the rest of the page is parsed and rendered.
 */
const BelowFold = () => {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(SECTIONS_READY));
    // Opened with a link like /#work? Jump there now that the section exists.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && id !== 'home') window.requestAnimationFrame(() => scrollToId(id, { instant: true }));
  }, []);

  return (
    <>
      <About />
      <Projects />
      <Skills />
      <LearningInPublic />
      <Experience />
      <Contact />
    </>
  );
};

export default BelowFold;
