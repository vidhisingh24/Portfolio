import Reveal from '../components/Reveal';
import Emph from '../components/Emph';
import { accomplishments, achievements } from '../data/timeline';
import { isTodo } from '../data/todo';

/** "Key Accomplishments", shown inside About. Values marked TODO are hidden. */
const Achievements = () => (
  <div className="mt-20" id="achievements">
    <Reveal>
      <p className="eyebrow">{accomplishments.eyebrow}</p>
      <h3 className="mt-2 font-display text-4xl text-ink">
        <Emph text={accomplishments.title} />
      </h3>
    </Reveal>

    <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((a, i) => (
        <Reveal as="li" key={a.title} delay={i * 0.05} className="card flex flex-col p-6">
          <h4 className="text-lg font-medium text-ink">{a.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
          {(!isTodo(a.value) || !isTodo(a.badge)) && (
            <p className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              {!isTodo(a.value) && (
                <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent-strong">{a.value}</span>
              )}
              {!isTodo(a.badge) && <span className="font-mono text-xs text-muted">{a.badge}</span>}
            </p>
          )}
        </Reveal>
      ))}
    </ul>
  </div>
);

export default Achievements;
