import { GitHubIcon } from '../Icons';
import { contributions, programs } from '../../data/openSource';
import { profile } from '../../data/profile';

/** Open-source programs (and real PR/issue links, when there are any). */
const OpenSourcePanel = () => (
  <section id="open-source" className="dpanel dpanel--os" aria-labelledby="panel-os-title">
    <div className="dpanel__bg" aria-hidden="true" />
    <header className="dpanel__head">
      <p className="dpanel__eyebrow">02 / 05 · open source</p>
      <h2 id="panel-os-title" className="dpanel__title">
        Open source<span className="dot">.</span>
      </h2>
      <p className="dpanel__lead">A contributor in three open-source programs, learning in public and preparing for GSoC 2027.</p>
    </header>

    <ul className="os-programs">
      {programs.map((p) => (
        <li key={p.id} className="os-program">
          <p className="os-program__short">{p.short}</p>
          <p className="os-program__name">{p.name}</p>
          <p className="os-program__meta">
            {p.role} · {p.period}
          </p>
          <p className="os-program__summary">{p.summary}</p>
        </li>
      ))}
    </ul>

    {contributions.length > 0 && (
      <ul className="os-contribs">
        {contributions.map((c) => (
          <li key={c.url}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              <span className="os-contribs__title">{c.title}</span>
              <span className="os-contribs__meta">
                {c.repo} · {c.kind === 'pr' ? 'pull request' : 'issue'} · {c.status}
              </span>
            </a>
          </li>
        ))}
      </ul>
    )}

    <div className="os-next">
      <p className="os-next__label">Next up</p>
      <p className="os-next__text">
        <strong>GSoC 2027.</strong> Reading codebases and picking good-first-issues.
      </p>
      <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="dpanel__cta">
        <GitHubIcon size={15} /> Follow along on GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
);

export default OpenSourcePanel;
