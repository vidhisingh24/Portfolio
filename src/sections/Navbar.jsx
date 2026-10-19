import { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CatMark from '../components/CatMark';
import { profile } from '../data/profile';
import { scrollToId } from '../lib/scroll';
import { openPalette, shortcutLabel } from '../lib/palette';
import { useIsClient } from '../lib/useIsClient';

const navLinks = [
  { id: 'work', label: 'work' },
  { id: 'skills', label: 'skills' },
  { id: 'journey', label: 'journey' },
  { id: 'contact', label: 'contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const isClient = useIsClient();
  const shortcut = isClient ? shortcutLabel() : 'Ctrl K';

  // Shrink a little once the page scrolls
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 16);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the section in view. Sections below the hero load as a separate
  // chunk, so (re)attach when they arrive.
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Back in the hero: no nav item is "current"
          if (entry.isIntersecting) setActive(entry.target.id === 'home' ? '' : entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const observeSections = () => {
      ['home', ...navLinks.map((l) => l.id)].forEach((id) => {
        const el = document.getElementById(id);
        if (el) spy.observe(el);
      });
    };
    observeSections();
    window.addEventListener('sections:ready', observeSections);

    return () => {
      window.removeEventListener('sections:ready', observeSections);
      spy.disconnect();
    };
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      <nav
        aria-label="Main"
        className={`mx-auto max-w-6xl rounded-full border border-line bg-bg/75 backdrop-blur-md transition-[padding,margin,box-shadow] duration-300 ${
          scrolled ? 'mt-2 py-1.5 shadow-[var(--shadow)]' : 'mt-4 py-2.5'
        }`}
      >
        <div className="flex items-center justify-between gap-3 pl-4 pr-2 sm:pl-5">
          <a href="#home" onClick={(e) => go(e, 'top')} className="group flex items-center gap-2 text-ink" aria-label="vidhi, back to top">
            <CatMark className={`transition-[width,height] duration-300 ${scrolled ? 'h-6 w-6' : 'h-7 w-7'}`} />
            <span className="font-display text-[1.65rem] italic leading-none">{profile.shortName}</span>
          </a>

          <ul className="hidden items-center font-mono text-[13px] md:flex">
            {navLinks.map((link, i) => (
              <li key={link.id} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="px-0.5 text-muted/60">
                    ·
                  </span>
                )}
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className="rounded-full px-3 py-1.5 text-muted transition-colors hover:text-ink aria-[current=true]:bg-accent-soft aria-[current=true]:text-accent-strong"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-ink sm:inline-flex">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </span>

            <button
              type="button"
              onClick={openPalette}
              aria-label={`Open command menu (${shortcut})`}
              title={`Command menu (${shortcut})`}
              className="hidden h-9 items-center rounded-full border border-line px-2.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-ink lg:inline-flex"
            >
              {shortcut}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink md:hidden"
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="card mx-auto mt-2 max-w-6xl p-3 md:hidden">
          <ul className="font-mono text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  className="block rounded-xl px-3 py-2.5 text-ink hover:bg-surface-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-3 pt-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-ink">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </span>
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-accent-strong underline">
              Resume ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
