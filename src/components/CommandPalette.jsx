import { Command } from 'cmdk';
import { notify } from '../lib/notify';
import { useTheme } from '../context/ThemeContext';
import { profile } from '../data/profile';
import { scrollToId } from '../lib/scroll';
import { copyText } from '../lib/palette';

const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'learning', label: 'Learning in public' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

/** ⌘K / Ctrl+K palette: jump to sections, copy email, open links, toggle theme. */
const CommandPalette = ({ open, onOpenChange }) => {
  const { theme, toggleTheme } = useTheme();

  const run = (fn) => () => {
    onOpenChange(false);
    // let the dialog close (and return focus) before acting
    window.setTimeout(fn, 10);
  };

  const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} label="Command menu" className="palette" loop>
      <Command.Input placeholder="Jump to a section or run a command…" className="palette-input" />
      <Command.List className="palette-list">
        <Command.Empty className="palette-empty">No matches.</Command.Empty>

        <Command.Group heading="Jump to">
          {SECTIONS.map((s) => (
            <Command.Item key={s.id} value={`go ${s.label}`} onSelect={run(() => scrollToId(s.id))} className="palette-item">
              <span aria-hidden="true" className="palette-icon">
                #
              </span>
              {s.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item
            value="copy email address"
            onSelect={run(async () => {
              const ok = await copyText(profile.email);
              notify(ok ? `Copied ${profile.email}` : 'Could not copy — email is ' + profile.email);
            })}
            className="palette-item"
          >
            <span aria-hidden="true" className="palette-icon">
              @
            </span>
            Copy email
            <span className="palette-hint">{profile.email}</span>
          </Command.Item>
          <Command.Item value="open github" onSelect={run(() => openLink(profile.links.github))} className="palette-item">
            <span aria-hidden="true" className="palette-icon">
              ↗
            </span>
            Open GitHub
          </Command.Item>
          <Command.Item value="open linkedin" onSelect={run(() => openLink(profile.links.linkedin))} className="palette-item">
            <span aria-hidden="true" className="palette-icon">
              ↗
            </span>
            Open LinkedIn
          </Command.Item>
          <Command.Item value="open resume cv" onSelect={run(() => openLink(profile.links.resume))} className="palette-item">
            <span aria-hidden="true" className="palette-icon">
              ↗
            </span>
            Open Resume
          </Command.Item>
          <Command.Item value="toggle theme dark light mode" onSelect={run(toggleTheme)} className="palette-item">
            <span aria-hidden="true" className="palette-icon">
              ◐
            </span>
            Switch to {theme === 'dark' ? 'light' : 'dark'} theme
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandPalette;
