import { Command } from 'cmdk';
import { notify } from '../lib/notify';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { scrollToId } from '../lib/scroll';
import { copyText } from '../lib/palette';
import { openPanel, openProjects, showPanel } from '../lib/ui';
import { OPEN_CASE } from './work/caseEvents';

/** ⌘K / Ctrl+K palette: jump around, open case studies, copy email, open links. */
const CommandPalette = ({ open, onOpenChange }) => {
  const run = (fn) => () => {
    onOpenChange(false);
    // let the dialog close (and return focus) before acting
    window.setTimeout(fn, 10);
  };

  const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  const item = (value, icon, label, action, hint) => (
    <Command.Item key={value} value={value} onSelect={run(action)} className="palette-item">
      <span aria-hidden="true" className="palette-icon">
        {icon}
      </span>
      {label}
      {hint && <span className="palette-hint">{hint}</span>}
    </Command.Item>
  );

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} label="Command menu" className="palette" loop>
      <Command.Input placeholder="Jump somewhere or run a command…" className="palette-input" />
      <Command.List className="palette-list">
        <Command.Empty className="palette-empty">No matches.</Command.Empty>

        <Command.Group heading="Go to">
          {item('go top home', '#', 'Top', () => scrollToId('top'))}
          {item('go projects work list', '#', 'Projects', () => openProjects())}
          {item('go open source gssoc ssoc osci programs', '#', 'Open source', () => showPanel('open-source'))}
          {item('go skills stack tech', '#', 'Skills', () => showPanel('skills'))}
          {item('go github activity contributions graph', '#', 'GitHub activity', () => showPanel('github'))}
          {item('open about', '#', 'About', () => openPanel('about'))}
          {item('open faqs questions', '#', 'FAQs', () => openPanel('faqs'))}
          {item('go contact say hello', '#', 'Contact', () => scrollToId('contact'))}
        </Command.Group>

        <Command.Group heading="Case studies">
          {projects.map((p) =>
            item(`case study ${p.title}`, '▤', p.title, () => window.dispatchEvent(new CustomEvent(OPEN_CASE, { detail: p.id })), p.subtitle),
          )}
        </Command.Group>

        <Command.Group heading="Actions">
          {item(
            'copy email address',
            '@',
            'Copy email',
            async () => {
              const ok = await copyText(profile.email);
              notify(ok ? `Copied ${profile.email}` : `Could not copy — email is ${profile.email}`);
            },
            profile.email,
          )}
          {item('open github', '↗', 'Open GitHub', () => openLink(profile.links.github))}
          {item('open linkedin', '↗', 'Open LinkedIn', () => openLink(profile.links.linkedin))}
          {item('open resume cv', '↗', 'Open Resume', () => openLink(profile.links.resume))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandPalette;
