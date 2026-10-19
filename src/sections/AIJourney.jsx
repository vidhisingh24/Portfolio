import Reveal from '../components/Reveal';
import Emph from '../components/Emph';
import { aiPath, aiSteps } from '../data/timeline';
import { isTodo } from '../data/todo';

/** "AI & Machine Learning Journey" phases, shown inside the journey section. */
const AIJourney = () => (
  <div className="mt-20" id="ai-journey">
    <Reveal>
      <p className="eyebrow">{aiPath.eyebrow}</p>
      <h3 className="mt-2 font-display text-4xl text-ink">
        <Emph text={aiPath.title} />
      </h3>
      <p className="mt-3 max-w-2xl text-muted">{aiPath.lead}</p>
    </Reveal>

    <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {aiSteps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.05} className="card flex flex-col p-5">
          <p className="font-mono text-xs text-accent-strong">{step.phase}</p>
          <h4 className="mt-2 font-medium text-ink">{step.title}</h4>
          {step.subtitle && <p className="text-sm text-muted">{step.subtitle}</p>}
          <p className="mt-3 text-sm leading-relaxed text-muted">{step.desc}</p>
          {!isTodo(step.label) && <p className="mt-auto pt-4 font-mono text-xs text-muted">{step.label}</p>}
        </Reveal>
      ))}
    </ol>
  </div>
);

export default AIJourney;
