/**
 * Tiny line-art cat head used as the logo mark (same shape as the favicon).
 * The ears twitch once when the parent `.group` is hovered.
 */
const CatMark = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={`cat-mark ${className}`} aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
      <path className="cm-ear cm-ear-l" d="M17.4 26 15.5 9.5l12.7 9.3" />
      <path className="cm-ear cm-ear-r" d="m35.8 18.8 12.7-9.3-1.9 16.1" />
      <path d="M17.4 26C14.6 30.4 13 37 13 45c0 7.8 8.5 12 19 12s19-4.2 19-12c0-8-1.6-14.6-4.4-19.4M28.2 18.8c2.5-.6 5.1-.6 7.6 0" />
    </g>
    <circle cx="24.5" cy="40" r="3" fill="currentColor" />
    <circle cx="39.5" cy="40" r="3" fill="currentColor" />
  </svg>
);

export default CatMark;
