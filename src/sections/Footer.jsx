import { Github, Linkedin, Mail } from 'lucide-react';
import CatMark from '../components/CatMark';
import { profile } from '../data/profile';
import { scrollToId } from '../lib/scroll';
import { openPalette, shortcutLabel } from '../lib/palette';
import { useIsClient } from '../lib/useIsClient';

const LINKS = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'work' },
  { id: 'skills', label: 'skills' },
  { id: 'journey', label: 'journey' },
  { id: 'contact', label: 'contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const isClient = useIsClient();
  const shortcut = isClient ? shortcutLabel() : 'Ctrl K';

  const go = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#home" onClick={(e) => go(e, 'top')} className="group inline-flex items-center gap-2 text-ink">
            <CatMark className="h-6 w-6" />
            <span className="font-display text-2xl leading-none">{profile.name}</span>
          </a>
          <p className="mt-2 text-sm text-muted">{profile.footer.tagline}</p>
          <button
            type="button"
            onClick={openPalette}
            className="mt-4 inline-flex items-center gap-2 rounded-md font-mono text-xs text-muted hover:text-ink"
          >
            <kbd className="rounded border border-line-strong bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink">{shortcut}</kbd>
            to jump anywhere
          </button>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => go(e, l.id)} className="text-muted hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2" aria-label="Elsewhere">
          {[
            { href: profile.links.github, label: 'GitHub profile', Icon: Github, external: true },
            { href: profile.links.linkedin, label: 'LinkedIn profile', Icon: Linkedin, external: true },
            { href: `mailto:${profile.email}`, label: `Email ${profile.email}`, Icon: Mail, external: false },
          ].map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-ink"
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line px-5 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <p>
          &copy; {year} {profile.name}. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Designed &amp; Developed with
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-accent-strong" aria-label="love" role="img">
            <path
              fill="currentColor"
              d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 5 6.4 5c2.1 0 3.6 1.2 4.4 2.5h2.4C14 6.2 15.5 5 17.6 5 21 5 23.1 8.5 21.6 11.8 19.5 16.4 12 21 12 21z"
            />
          </svg>
          by {profile.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
