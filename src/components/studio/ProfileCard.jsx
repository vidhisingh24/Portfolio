import { useCallback, useEffect, useRef, useState } from 'react';
import CatMark from '../CatMark';
import Highlight from '../Highlight';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../Icons';
import { AboutPanel, FaqPanel, HelloPanel } from './Panels';
import { profile } from '../../data/profile';
import { now } from '../../data/now';
import { visible } from '../../data/todo';
import { copyText } from '../../lib/palette';
import { OPEN_PANEL, monthStamp } from '../../lib/ui';

const { hero, links } = profile;

// Where the four sticky notes sit around the polaroid
const NOTE_SPOTS = ['note--tl', 'note--tr', 'note--bl', 'note--br'];

/**
 * The fixed card on the right: logo + about/faqs, scrapbook photo, name, "What I'm up to",
 * Resume / Say hello, and the email + socials row.
 */
const ProfileCard = () => {
  const [panel, setPanel] = useState(null); // 'about' | 'faqs' | 'hello' | null
  const [nowOpen, setNowOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const triggers = useRef({});

  const close = useCallback((returnFocus = false) => {
    setPanel((current) => {
      if (returnFocus && current) triggers.current[current]?.focus();
      return null;
    });
  }, []);

  const toggle = (name) => setPanel((p) => (p === name ? null : name));

  // Escape and clicks outside close the open pop-up
  useEffect(() => {
    if (!panel) return undefined;
    const onKey = (e) => e.key === 'Escape' && close(true);
    const onDown = (e) => {
      const inPanel = e.target.closest?.('[data-panel]');
      const onTrigger = e.target.closest?.('[data-panel-trigger]');
      if (!inPanel && !onTrigger) close(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [panel, close]);

  // The ⌘K palette can open a pop-up too
  useEffect(() => {
    const onOpen = (e) => {
      cardRef.current?.scrollIntoView({ block: 'nearest' });
      setPanel(e.detail);
    };
    window.addEventListener(OPEN_PANEL, onOpen);
    return () => window.removeEventListener(OPEN_PANEL, onOpen);
  }, []);

  const copyEmail = async () => {
    const ok = await copyText(profile.email);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  const nowItems = visible(now.items);

  return (
    <aside ref={cardRef} className="studio" aria-label={`About ${profile.name}`}>
      {/* Top bar */}
      <div className="studio-chrome">
        <a href="#top" className="studio-logo" aria-label={`${profile.shortName}, back to top`}>
          <CatMark className="studio-logo__cat" />
          <span>{profile.shortName}</span>
        </a>
        <nav className="studio-nav" aria-label="Profile">
          {[
            ['about', 'about'],
            ['faqs', 'faqs'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              ref={(el) => (triggers.current[id] = el)}
              data-panel-trigger
              className="pill"
              aria-expanded={panel === id}
              aria-controls={`panel-${id}`}
              onClick={() => toggle(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <span className="studio-status">
          <i aria-hidden="true" />
          {profile.availability}
        </span>
      </div>

      {panel === 'about' && <AboutPanel onClose={() => close(true)} />}
      {panel === 'faqs' && <FaqPanel onClose={() => close(true)} />}
      {panel === 'hello' && <HelloPanel onClose={() => close(true)} onCopy={copyEmail} copied={copied} />}

      {/* Grid "studio" area */}
      <div className="studio-viewport">
        <figure className="collage">
          <span className="collage__scribble" aria-hidden="true">
            one PR at a time
          </span>
          <div className="polaroid">
            <span className="tape tape--l" aria-hidden="true" />
            <span className="tape tape--r" aria-hidden="true" />
            <picture>
              <source srcSet={hero.photo.webp} type="image/webp" />
              <img
                src={hero.photo.png}
                alt={hero.photo.alt}
                width={hero.photo.size}
                height={hero.photo.size}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <figcaption className="polaroid__caption">hi, i’m vidhi ✿</figcaption>
          </div>
          {hero.notes.slice(0, 4).map((note, i) => (
            <span key={note} className={`note ${NOTE_SPOTS[i]}`}>
              {note}
            </span>
          ))}
        </figure>

        <div className="studio-intro">
          <h1 className="studio-name">
            {profile.name}
            <span className="dot">.</span>
          </h1>
          <p className="studio-lead">{hero.tagline}</p>
          <p className="studio-bio">{hero.subline}</p>
        </div>

        {nowItems.length > 0 && (
          <div className="studio-now">
            <button
              type="button"
              className="studio-now__toggle"
              aria-expanded={nowOpen}
              aria-controls="studio-now-body"
              onClick={() => setNowOpen((v) => !v)}
            >
              <span className="studio-now__label">
                <i aria-hidden="true" />
                What I’m up to
              </span>
              <span className="studio-now__date">
                {monthStamp(now.month)}
                <span aria-hidden="true" className={`chev ${nowOpen ? 'is-open' : ''}`}>
                  ⌃
                </span>
              </span>
            </button>
            <div id="studio-now-body" className="studio-now__body" hidden={!nowOpen}>
              {nowItems.map((item) => (
                <p key={item}>
                  <Highlight text={item} />
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="studio-cta">
        <div className="studio-cta__row">
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Resume <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            ref={(el) => (triggers.current.hello = el)}
            data-panel-trigger
            className="btn-lav"
            aria-expanded={panel === 'hello'}
            aria-controls="panel-hello"
            onClick={() => toggle('hello')}
          >
            Say hello <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="studio-contact">
          <button type="button" className="emailbtn" onClick={copyEmail} aria-label={`Copy email address ${profile.email}`}>
            <MailIcon />
            <span>{profile.email}</span>
            <span className={`emailbtn__copied ${copied ? 'is-on' : ''}`} aria-hidden={!copied}>
              Copied
            </span>
          </button>
          <span className="sr-only" role="status">
            {copied ? 'Email address copied' : ''}
          </span>
          <div className="studio-socials">
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
              <GitHubIcon size={15} />
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
              <LinkedInIcon size={15} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileCard;
