import { projects } from '../../data/projects';

/**
 * Cover panel for the projects: a fan of screenshots and the project names.
 * The whole panel opens the project list; a name opens the list at that project.
 */
const ProjectsPanel = ({ onOpen }) => (
  <section className="dpanel dpanel--projects" aria-labelledby="panel-projects-title">
    <div className="dpanel__bg" aria-hidden="true" />
    <header className="dpanel__head">
      <p className="dpanel__eyebrow">01 / 05 · work</p>
      <h2 id="panel-projects-title" className="dpanel__title">
        Projects<span className="dot">.</span>
      </h2>
      <p className="dpanel__lead">Things I’ve built end to end: real-time collaboration, food rescue, freelancer taxes and notes.</p>
    </header>

    <div className="fan" aria-hidden="true">
      {projects.map((p, i) => (
        <span key={p.id} className={`fan__card fan__card--${i + 1}`} style={{ '--card-bg': p.card.bg }}>
          <img src={p.shot.thumb} alt="" width="720" height="450" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>

    <div className="dpanel__foot">
      <ul className="plist" aria-label="Jump to a project">
        {projects.map((p, i) => (
          <li key={p.id}>
            <button type="button" className="plist__item" onClick={() => onOpen(p.id)}>
              <span className="plist__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="plist__name">{p.title}</span>
              <span className="plist__sub">{p.subtitle}</span>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" id="panel-projects-open" className="dpanel__cta dpanel__cta--stretch" onClick={() => onOpen()}>
        View all projects <span aria-hidden="true">→</span>
      </button>
    </div>
  </section>
);

export default ProjectsPanel;
