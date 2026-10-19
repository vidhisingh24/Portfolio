import Reveal from '../components/Reveal';
import Emph from '../components/Emph';
import { learningPath, learningSteps } from '../data/timeline';

/** "My Learning Journey" steps, shown inside the journey section. */
const LearningJourney = () => (
  <div className="mt-20" id="learning-journey">
    <Reveal>
      <p className="eyebrow">{learningPath.eyebrow}</p>
      <h3 className="mt-2 font-display text-4xl text-ink">
        <Emph text={learningPath.title} />
      </h3>
    </Reveal>

    <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {learningSteps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.05} className="card p-5">
          <p className="font-mono text-xs text-accent-strong">{step.phase}</p>
          <h4 className="mt-2 font-medium text-ink">{step.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
        </Reveal>
      ))}
    </ol>
  </div>
);

export default LearningJourney;
