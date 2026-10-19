/* global __BUILD_DATE__ */

import { now } from '../data/now';
import { visible } from '../data/todo';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// "2026-10" -> "OCT ’26"
const stamp = (month) => {
  const [y, m] = month.split('-').map(Number);
  return `${MONTHS[m - 1]} ’${String(y).slice(2)}`;
};

// Build date, injected by vite.config.js on every deploy
const lastUpdated = (() => {
  const iso = typeof __BUILD_DATE__ === 'string' ? __BUILD_DATE__ : new Date().toISOString().slice(0, 10);
  const d = new Date(`${iso}T00:00:00`);
  return { iso, label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) };
})();

const Paw = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" focusable="false">
    <g fill="currentColor">
      <ellipse cx="12" cy="16" rx="5" ry="4.2" />
      <ellipse cx="5.5" cy="10.5" rx="2.1" ry="2.6" />
      <ellipse cx="9.5" cy="6.5" rx="2.1" ry="2.7" />
      <ellipse cx="14.5" cy="6.5" rx="2.1" ry="2.7" />
      <ellipse cx="18.5" cy="10.5" rx="2.1" ry="2.6" />
    </g>
  </svg>
);

const NowCard = () => {
  const items = visible(now.items);
  if (!items.length) return null;

  return (
    <aside aria-labelledby="now-title" className="card relative max-w-2xl p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="now-title" className="font-display text-3xl leading-none text-ink">
          Now
        </h2>
        <span className="rounded-md border border-line px-2 py-0.5 font-mono text-xs tracking-wider text-muted">{stamp(now.month)}</span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
            <span aria-hidden="true" className="select-none font-mono text-accent-strong">
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
        <span className="text-accent-strong">
          <Paw />
        </span>
        last updated <time dateTime={lastUpdated.iso}>{lastUpdated.label}</time>
      </p>
    </aside>
  );
};

export default NowCard;
