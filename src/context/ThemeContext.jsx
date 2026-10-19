import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

const ThemeContext = createContext();

// The theme lives on <html class="dark">, set before first paint by index.html.
// React reads it as an external store, so the pre-rendered HTML (always "light")
// hydrates cleanly and then switches to the real value.
const EVENT = 'themechange';

const readStored = () => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
};

const subscribe = (onChange) => {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
};
const getSnapshot = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
const getServerSnapshot = () => 'light';

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  window.dispatchEvent(new Event(EVENT));
};

export const ThemeProvider = ({ children }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow the system setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!readStored()) applyTheme(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage blocked: the toggle still works for this visit */
    }
    applyTheme(next);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
