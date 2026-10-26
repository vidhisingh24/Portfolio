import { useEffect, useRef, useState } from 'react';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../Icons';
import { profile } from '../../data/profile';
import { programs } from '../../data/openSource';
import { experiences } from '../../data/timeline';
import { skillGroups } from '../../data/skills';
import { projects } from '../../data/projects';
import { faqs } from '../../data/faqs';
import { isTodo } from '../../data/todo';
import { OPEN_CASE } from '../work/caseEvents';

/** Shared shell for the pop-ups that drop out of the profile card's top bar. */
const Panel = ({ id, label, className = '', children }) => {
  const ref = useRef(null);
  // Move focus into the pop-up when it opens
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  return (
    <div
      id={`panel-${id}`}
      ref={ref}
      role="dialog"
      aria-label={label}
      tabIndex={-1}
      data-panel
      data-lenis-prevent
      className={`panel ${className}`}
    >
      {children}
    </div>
  );
};

const currently = [
  profile.hero.whoami.replace(/^./, (c) => c.toUpperCase()),
  `Contributor · ${programs.map((p) => p.short).join(', ')}`,
  'Member · Women in Tech Global',
  profile.availability,
];

export const AboutPanel = ({ onClose }) => (
  <Panel id="about" label="About Vidhi" className="panel--about">
    <div className="ab-top">
      <span className="ab-emoji" aria-hidden="true">
        👋
      </span>
      <button type="button" className="panel__close" onClick={onClose} aria-label="Close about">
        ×
      </button>
    </div>
    <p className="ab-bio">{profile.intro}</p>

    <p className="ab-chip">
      <span aria-hidden="true">✦</span> Currently
    </p>
    <ul className="ab-list">
      {currently.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>

    <div className="panel__rule" />
    <p className="ab-title">stack</p>
    <div className="ab-groups">
      {skillGroups.map((group) => {
        const names = group.skills.map((s) => s.name).filter((n) => !isTodo(n));
        if (!names.length) return null;
        return (
          <div key={group.id} className="ab-group">
            <span className="ab-group__name">{group.title}</span>
            <ul className="ab-tags">
              {names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>

    <div className="panel__rule" />
    <p className="ab-title">journey</p>
    <ul className="ab-journey">
      {experiences.slice(0, 5).map((e) => (
        <li key={e.org}>
          <span className="ab-journey__org">{e.org}</span>
          <span className="ab-journey__meta">
            {e.role} · {e.duration.replace(' - ', ' – ')}
          </span>
        </li>
      ))}
    </ul>

    <div className="panel__rule" />
    <p className="ab-title">worked on</p>
    <ul className="ab-tags ab-tags--links">
      {projects.map((p) => (
        <li key={p.id}>
          <button
            type="button"
            onClick={() => {
              onClose();
              window.dispatchEvent(new CustomEvent(OPEN_CASE, { detail: p.id }));
            }}
          >
            {p.title}
          </button>
        </li>
      ))}
    </ul>
  </Panel>
);

export const FaqPanel = ({ onClose }) => {
  const [open, setOpen] = useState(0);
  return (
    <Panel id="faqs" label="Questions and answers" className="panel--faqs">
      <div className="ab-top">
        <p className="faq-title">Your questions, answered</p>
        <button type="button" className="panel__close" onClick={onClose} aria-label="Close questions">
          ×
        </button>
      </div>
      <div className="panel__rule" />
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div key={f.q} className="faq">
            <h3>
              <button
                type="button"
                className="faq__q"
                aria-expanded={open === i}
                aria-controls={`faq-a-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen((v) => (v === i ? -1 : i))}
              >
                <span>{f.q}</span>
                <span aria-hidden="true" className="faq__icon">
                  {open === i ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" hidden={open !== i}>
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export const HelloPanel = ({ onClose, onCopy, copied }) => (
  <Panel id="hello" label="Say hello" className="panel--hello">
    <div className="ab-top">
      <span className="hello-status">
        <i aria-hidden="true" />
        {profile.availability.toLowerCase()}
      </span>
      <button type="button" className="panel__close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
    <div className="panel__rule" />
    <p className="hello-title">Say hello</p>
    <p className="hello-text">An internship, a project idea or an open-source question: email is the best way to reach me.</p>
    <div className="hello-actions">
      <a className="btn-lav btn-lav--full" href={`mailto:${profile.email}?subject=Hi%20Vidhi`}>
        <MailIcon /> Write me an email <span aria-hidden="true">↗</span>
      </a>
      <button type="button" className="btn-outline btn-outline--full" onClick={onCopy}>
        {copied ? 'Copied ✓' : `Copy ${profile.email}`}
      </button>
    </div>
    <div className="panel__rule" />
    <ul className="hello-links">
      <li>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon size={14} /> LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </li>
      <li>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon size={14} /> GitHub <span aria-hidden="true">↗</span>
        </a>
      </li>
      <li>
        <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
          Resume <span aria-hidden="true">↗</span>
        </a>
      </li>
    </ul>
  </Panel>
);
