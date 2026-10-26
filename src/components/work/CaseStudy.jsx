import { useEffect, useRef } from 'react';
import { GitHubIcon } from '../Icons';
import { isTodo } from '../../data/todo';

const SECTIONS = [
  ['problem', 'The problem'],
  ['solution', 'What I built'],
  ['architecture', 'How it works'],
  ['challenges', 'Hardest part'],
];

/** Case study sheet for one project (native <dialog>: focus trap + Esc for free). */
const CaseStudy = ({ project, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    const onCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', onCancel);
    document.documentElement.classList.add('has-dialog');
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      document.documentElement.classList.remove('has-dialog');
    };
  }, [onClose]);

  // Click on the backdrop closes
  const onClick = (e) => {
    if (e.target === ref.current) onClose();
  };

  const { links, caseStudy } = project;

  return (
    <dialog ref={ref} className="case" aria-labelledby="case-title" onClick={onClick} data-lenis-prevent>
      <div className="case__inner" style={{ '--card-bg': project.card.bg, '--card-fg': project.card.fg }}>
        <header className="case__head">
          <div>
            <p className="case__eyebrow">{project.subtitle}</p>
            <h2 id="case-title" className="case__title">
              {project.title}
              <span className="dot">.</span>
            </h2>
          </div>
          <button type="button" className="case__close" onClick={onClose} aria-label="Close case study">
            ×
          </button>
        </header>

        <p className="case__desc">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="case__highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <div className="case__grid">
          {SECTIONS.map(([key, label]) =>
            caseStudy[key] && !isTodo(caseStudy[key]) ? (
              <section key={key} className="case__block">
                <h3>{label}</h3>
                <p>{caseStudy[key]}</p>
              </section>
            ) : null,
          )}
        </div>

        <h3 className="case__subhead">Built with</h3>
        <ul className="case__tech">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="case__links">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-ink">
            <GitHubIcon size={15} /> View code <span aria-hidden="true">↗</span>
          </a>
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost-ink">
              Live demo <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default CaseStudy;
