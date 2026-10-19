import { Suspense, lazy, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { setLenis } from './lib/scroll';
import { OPEN_PALETTE } from './lib/palette';
import { useIsClient } from './lib/useIsClient';

// Section Imports
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';

// Everything below the hero is its own chunk, so the hero paints first
const BelowFold = lazy(() => import('./sections/BelowFold'));
const Footer = lazy(() => import('./sections/Footer'));

// The chat widget loads after the first paint; the ⌘K palette on first use
const VidhiBot = lazy(() => import('./components/VidhiBot'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const Toasts = lazy(() => import('./components/Toasts'));
const OnekoCat = lazy(() => import('./components/OnekoCat'));

function App() {
  const { theme } = useTheme();
  // The build pre-renders the hero only; lazy parts mount right after hydration.
  const isClient = useIsClient();
  const [showBot, setShowBot] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);

  // Cmd/Ctrl + K opens the command palette (also from the navbar / footer buttons)
  useEffect(() => {
    const open = () => {
      setPaletteLoaded(true);
      setPaletteOpen(true);
    };
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteLoaded(true);
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE, open);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE, open);
    };
  }, []);

  // Load the chat widget once the browser is idle
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    const id = idle(() => setShowBot(true));
    return () => cancel(id);
  }, []);

  // Lenis smooth scroll, loaded once the browser is idle; skipped under reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let lenis = null;
    let frame = 0;
    let cancelled = false;
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1200));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const idleId = idle(async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      setLenis(lenis);
    });

    return () => {
      cancelled = true;
      cancelIdle(idleId);
      cancelAnimationFrame(frame);
      setLenis(null);
      lenis?.destroy();
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      {/* Main Layout */}
      <div className="relative min-h-screen text-muted">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Navbar />

        <main id="main">
          <Hero />
          {isClient ? (
            <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
              <BelowFold />
            </Suspense>
          ) : (
            <div className="min-h-screen" aria-hidden="true" />
          )}
        </main>

        {isClient && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
        
        {/* Floating chat bot + "You like cats?" pixel cat, after first paint */}
        {showBot && (
          <Suspense fallback={null}>
            <VidhiBot />
            <OnekoCat />
          </Suspense>
        )}
      </div>

      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
        </Suspense>
      )}

      {/* Toast notifications (loaded with the chat widget, after first paint) */}
      {showBot && (
        <Suspense fallback={null}>
          <Toasts theme={theme} />
        </Suspense>
      )}
    </MotionConfig>
    </LazyMotion>
  );
}

export default App;
