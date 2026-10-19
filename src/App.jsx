import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { useTheme } from './context/ThemeContext';

// Section Imports
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import AIJourney from './sections/AIJourney';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import LearningJourney from './sections/LearningJourney';
import CurrentInterestsFuture from './sections/CurrentInterestsFuture';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Component Imports
import VidhiBot from './components/VidhiBot';
import GitStats from './components/GitStats';

function App() {
  const { theme } = useTheme();

  // Lenis smooth scroll, skipped when the visitor prefers reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Main Layout */}
      <div className="relative min-h-screen text-muted">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <AIJourney />
          <Experience />
          <Achievements />
          
          {/* GitHub Live API Dashboard Section */}
          <section id="github" className="py-24 relative overflow-hidden bg-white/10 dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col items-center text-center mb-16 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-lavender">Analytics</span>
                <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-800 dark:text-white">
                  GitHub Contribution Stream
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full" />
              </div>
              <GitStats />
            </div>
          </section>

          <LearningJourney />
          <CurrentInterestsFuture />
          <Contact />
        </main>

        <Footer />
        
        {/* Floating Chat Bot Widget */}
        <VidhiBot />
      </div>

      {/* Toast Notifications */}
      <Toaster 
        theme={theme} 
        position="bottom-left" 
        toastOptions={{
          style: {
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: '14px',
            fontFamily: 'var(--font-sans)'
          }
        }}
      />
    </MotionConfig>
  );
}

export default App;
