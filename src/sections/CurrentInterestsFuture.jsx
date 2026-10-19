import Reveal from '../components/Reveal';
import Emph from '../components/Emph';
import { focus } from '../data/timeline';
import { visible } from '../data/todo';

const LISTS = ['workingOn', 'interests', 'goals'];

/** "Vision & Focus", shown inside Learning in public. */
const CurrentInterestsFuture = () => (
  <div className="mt-20" id="focus">
    <Reveal>
      <p className="eyebrow">{focus.eyebrow}</p>
      <h3 className="mt-2 font-display text-4xl text-ink">
        <Emph text={focus.title} />
      </h3>
    </Reveal>

    <div className="mt-8 grid gap-5 lg:grid-cols-3">
      {LISTS.map((key, i) => (
        <Reveal key={key} delay={i * 0.06} className="card p-6">
          <h4 className="font-medium text-ink">{focus[key].title}</h4>
          <ul className="mt-4 space-y-2.5">
            {visible(focus[key].items).map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span aria-hidden="true" className="font-mono text-accent-strong">
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  </div>
);

export default CurrentInterestsFuture;
