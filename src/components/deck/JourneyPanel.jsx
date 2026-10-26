import { aiPath, highlights, steps } from '../../data/journey';
import { skillGroups } from '../../data/skills';
import { isTodo } from '../../data/todo';

// Your own level labels from skills.ts, looked up by name
const levels = new Map(skillGroups.flatMap((g) => g.skills.map((s) => [s.name, s.level])));

/** Real highlights, the path so far, and the AI & ML path. */
const JourneyPanel = () => (
  <section id="journey" className="dpanel dpanel--journey" aria-labelledby="panel-journey-title">
    <div className="dpanel__bg" aria-hidden="true" />
    <header className="dpanel__head">
      <p className="dpanel__eyebrow">03 / 05 · journey</p>
      <h2 id="panel-journey-title" className="dpanel__title">
        Achievements &amp; journey<span className="dot">.</span>
      </h2>
      <p className="dpanel__lead">Real wins so far, and the path that got me here.</p>
    </header>

    <ul className="wins">
      {highlights
        .filter((h) => !isTodo(h.title))
        .map((h) => (
          <li key={h.title} className="win">
            <p className="win__value">{h.value}</p>
            <p className="win__title">{h.title}</p>
            <p className="win__meta">{h.meta}</p>
            <p className="win__desc">{h.desc}</p>
            {h.link && (
              <a className="win__link" href={h.link.url} target="_blank" rel="noopener noreferrer">
                {h.link.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </li>
        ))}
    </ul>

    <div className="journey-cols">
      <div>
        <h3 className="journey-cols__title">Path so far</h3>
        <ol className="path">
          {steps
            .filter((s) => !isTodo(s.title))
            .map((s) => (
              <li key={s.title} className={s.next ? 'path__step path__step--next' : 'path__step'}>
                {s.when && <p className="path__when">{s.next ? `Next · ${s.when}` : s.when}</p>}
                <p className="path__title">{s.title}</p>
                <p className="path__desc">{s.desc}</p>
              </li>
            ))}
        </ol>
      </div>

      <div>
        <h3 className="journey-cols__title">AI &amp; ML path</h3>
        <ol className="ai-path">
          {aiPath.map((step, i) => (
            <li key={step.title} className="ai-step">
              <span className="ai-step__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p className="ai-step__title">{step.title}</p>
                <p className="ai-step__desc">{step.desc}</p>
                <ul className="ai-step__tools">
                  {step.tools.map((t) => (
                    <li key={t}>
                      {t}
                      {levels.get(t) && <span className="skill-level">{levels.get(t)}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default JourneyPanel;
