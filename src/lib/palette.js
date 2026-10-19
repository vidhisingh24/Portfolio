// Tiny event bridge so any button can open the ⌘K command palette.
export const OPEN_PALETTE = 'palette:open';

export const openPalette = () => window.dispatchEvent(new CustomEvent(OPEN_PALETTE));

export const isMac = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');

export const shortcutLabel = () => (isMac() ? '⌘K' : 'Ctrl K');

export const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without the async clipboard API
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
};
