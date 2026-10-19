import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { skillGroups, skillsSection } from '../data/skills';
import { isTodo } from '../data/todo';

const Skills = () => (
  <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeader id="skills-title" {...skillsSection} />

      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const skills = group.skills.filter((s) => !isTodo(s.name));
          if (!skills.length) return null;
          return (
            <Reveal key={group.id} delay={gi * 0.06} className="card p-6">
              <h3 className="font-display text-3xl leading-none text-ink">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {skills.map((skill) => (
                  <li key={skill.name} className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0">
                      <span className="font-medium text-ink">{skill.name}</span>
                      {skill.note && <span className="block text-sm leading-snug text-muted">{skill.note}</span>}
                    </span>
                    {skill.level && (
                      <span className="shrink-0 font-mono text-xs lowercase text-muted">{skill.level}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
