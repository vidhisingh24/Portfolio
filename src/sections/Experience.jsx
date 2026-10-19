import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import LearningJourney from './LearningJourney';
import AIJourney from './AIJourney';
import { experiences, journeySection, milestones } from '../data/timeline';
import { isTodo } from '../data/todo';

/** The "journey" section: experience timeline, tech journey, learning path and AI/ML path. */
const Experience = () => (
  <section id="journey" aria-labelledby="journey-title" className="py-20 sm:py-28">
    <span id="experience" aria-hidden="true" />
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeader id="journey-title" {...journeySection} />

      <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <h3 className="sr-only">Experience</h3>
          <ol className="relative space-y-6 border-l border-line-strong pl-6 sm:pl-8">
            {experiences.map((exp, i) => (
              <Reveal as="li" key={`${exp.org}-${exp.duration}`} delay={i * 0.05} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-accent-strong bg-bg sm:-left-[39px]"
                />
                <div className="card p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-lg font-medium text-ink">{exp.role}</h4>
                    <p className="font-mono text-xs text-muted">{exp.duration}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-accent-strong">{exp.org}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.points
                      .filter((p) => !isTodo(p))
                      .map((p) => (
                        <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                          {p}
                        </li>
                      ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal as="aside" aria-labelledby="tech-journey-title" className="lg:pt-1">
          <h3 id="tech-journey-title" className="font-display text-3xl text-ink">
            Tech Journey
          </h3>
          <ol className="mt-5 space-y-5">
            {milestones.map((m) => (
              <li key={m.title} className="border-t border-line pt-4">
                <p className="font-mono text-xs text-accent-strong">{m.year}</p>
                <h4 className="mt-1 font-medium text-ink">{m.title}</h4>
                <p className="text-sm text-muted">{m.institution}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <LearningJourney />
      <AIJourney />
    </div>
  </section>
);

export default Experience;
