import { useEffect, useState } from 'react';
import AsciiSignature from './AsciiSignature';
import { GitHubIcon, LinkedInIcon } from '../Icons';
import { profile } from '../../data/profile';
import { useIsClient } from '../../lib/useIsClient';
import { scrollToId } from '../../lib/scroll';

const timeInIndia = () =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(new Date());

/** Live clock in India time (client only, so the pre-rendered HTML stays stable). */
const Clock = () => {
  const [time, setTime] = useState(timeInIndia);
  useEffect(() => {
    const id = window.setInterval(() => setTime(timeInIndia()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <time>{time}</time>;
};

/** Closing panel: invitation, "Say hello", the code-character signature and the footer row. */
const Closing = () => {
  const isClient = useIsClient();
  const mail = `mailto:${profile.email}?subject=Hi%20Vidhi`;

  return (
    <footer id="contact" className="closing">
      <div className="closing-head">
        <div className="closing-invite">
          <span className="closing-status">
            <i aria-hidden="true" />
            {profile.availability}
          </span>
          <h2>
            Let’s build something
            <br />
            <em>together.</em>
          </h2>
        </div>
        <div className="closing-contact">
          <p>
            A project to build.
            <br />
            An internship to talk about.
            <br />
            Or just a hello.
          </p>
          <a className="closing-hello" href={mail}>
            Say hello <span aria-hidden="true">↗</span>
          </a>
          <span className="closing-address">{profile.email}</span>
        </div>
      </div>

      <AsciiSignature text={`${profile.shortName}.`} label={profile.name} />

      <div className="signature-caption">
        <span>Full-stack developer. Learning in public.</span>
        <span className="signature-hint" aria-hidden="true">
          move your cursor through it ✦
        </span>
      </div>

      <div className="closing-bottom">
        <span>© {profile.name} 2026</span>
        <span className="closing-time">
          India <span aria-hidden="true">/</span> {isClient ? <Clock /> : <span>IST</span>}
        </span>
        <nav aria-label="Social links" className="closing-socials">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={12} /> GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon size={12} /> LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <a
          href="#top"
          className="totop"
          onClick={(e) => {
            e.preventDefault();
            scrollToId('top');
          }}
        >
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
};

export default Closing;
