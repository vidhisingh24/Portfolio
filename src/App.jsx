import { Suspense, lazy, useEffect, useState } from 'react';
import { OPEN_PALETTE } from './lib/palette';
import ProfileCard from './components/studio/ProfileCard';
import Work from './components/work/Work';
import Closing from './components/closing/Closing';

// Loaded after the first paint / on first use
const VidhiBot = lazy(() => import('./components/VidhiBot'));
const OnekoCat = lazy(() => import('./components/OnekoCat'));
const Toasts = lazy(() => import('./components/Toasts'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

/**
 * Two-panel layout: project cards on the left, a fixed profile card on the right
 * (on phones the profile card comes first), then the closing panel.
 */
function App() {
  const [idle, setIdle] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);

  // Cmd/Ctrl + K opens the command palette
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

  // Chat widget + pixel cat load once the browser is idle
  useEffect(() => {
    const whenIdle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    const id = whenIdle(() => setIdle(true));
    return () => cancel(id);
  }, []);

  return (
    <>
      <a href="#work" className="skip-link">
        Skip to projects
      </a>
      <main id="top" className="shell">
        <ProfileCard />
        <Work />
      </main>
      <Closing />

      {idle && (
        <Suspense fallback={null}>
          <VidhiBot />
          <OnekoCat />
          <Toasts theme="light" />
        </Suspense>
      )}
      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
        </Suspense>
      )}
    </>
  );
}

export default App;
