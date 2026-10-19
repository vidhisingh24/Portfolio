import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { projects, workSection } from '../data/projects';
import { isTodo } from '../data/todo';

const CASE_STUDY = [
  ['problem', 'Problem'],
  ['solution', 'Solution'],
  ['architecture', 'Architecture'],
  ['challenges', 'Challenges'],
];

const ProjectCard = ({ project, index }) => (
  <Reveal as="article" delay={index * 0.06} className="card overflow-hidden" aria-labelledby={`project-${project.id}`}>
    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <div className="flex flex-col">
        <p className="font-mono text-xs uppercase tracking-wider text-accent-strong">
          {String(index + 1).padStart(2, '0')} · {project.subtitle}
          {!isTodo(project.status) && <span className="ml-2 text-muted">· {project.status}</span>}
        </p>
        <h3 id={`project-${project.id}`} className="mt-3 font-display text-4xl leading-none text-ink sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        {project.highlights.length > 0 && (
          <ul className="mt-6 space-y-1.5 border-t border-line pt-5" aria-label="Highlights">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2 font-mono text-[13px] text-ink">
                <span aria-hidden="true" className="text-accent-strong">
                  ✓
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Code on GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only">: {project.title} (opens in a new tab)</span>
          </a>
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Live demo <span aria-hidden="true">↗</span>
              <span className="sr-only">: {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      <dl className="grid content-start gap-5 rounded-2xl border border-line bg-surface-2 p-5 sm:p-6">
        {CASE_STUDY.map(([key, label]) => (
          <div key={key}>
            <dt className="font-mono text-xs uppercase tracking-wider text-accent-strong">{label}</dt>
            <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink">{project.caseStudy[key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  </Reveal>
);

const Projects = () => (
  <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
    <span id="projects" aria-hidden="true" />
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeader id="work-title" {...workSection} />
      <div className="space-y-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
