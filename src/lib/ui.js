// Tiny event bridge between the ⌘K palette and the profile card.
export const OPEN_PANEL = 'studio:panel';

/** Open the "about" / "faqs" pop-up or the "hello" contact pop-up from anywhere. */
export const openPanel = (name) => window.dispatchEvent(new CustomEvent(OPEN_PANEL, { detail: name }));

/** "2026-10" -> "OCT ’26" */
export const monthStamp = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  const month = new Date(Date.UTC(y, m - 1, 1)).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  return `${month.toUpperCase()} ’${String(y).slice(-2)}`;
};
