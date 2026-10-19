// Used at build time only (see the prerender plugin in vite.config.js):
// renders the page to static HTML so the hero shows before any JavaScript runs.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

export const render = () =>
  renderToString(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>,
  );
