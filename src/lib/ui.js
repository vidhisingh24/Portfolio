// Tiny event bridge between the ⌘K palette, the profile card and the left-column deck.
export const OPEN_PANEL = 'studio:panel';

/** Open the "about" / "faqs" pop-up or the "hello" contact pop-up from anywhere. */
export const openPanel = (name) => window.dispatchEvent(new CustomEvent(OPEN_PANEL, { detail: name }));

/** "2026-10" -> "OCT ’26" */
export const monthStamp = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  const month = new Date(Date.UTC(y, m - 1, 1)).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  return `${month.toUpperCase()} ’${String(y).slice(-2)}`;
};

// Left-column deck: switch to the project list, or back to the panels and jump to one.
export const OPEN_PROJECTS = 'deck:projects';
export const SHOW_PANEL = 'deck:panel';

/** Show the project list; pass a project id to land on that card. */
export const openProjects = (id) => window.dispatchEvent(new CustomEvent(OPEN_PROJECTS, { detail: id ?? null }));

/** Show the panels and scroll to one: 'work' | 'open-source' | 'skills' | 'github'. */
export const showPanel = (id) => window.dispatchEvent(new CustomEvent(SHOW_PANEL, { detail: id }));
