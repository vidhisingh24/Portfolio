// Used at build time only (see the prerender plugin in vite.config.js):
// renders the page to static HTML so it shows before any JavaScript runs.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
