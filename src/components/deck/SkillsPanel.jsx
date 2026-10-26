import { skillGroups } from '../../data/skills';
import { isTodo } from '../../data/todo';

/** Skills grouped by area; your own level label shows small next to a skill. */
const SkillsPanel = () => (
  <section id="skills" className="dpanel dpanel--skills" aria-labelledby="panel-skills-title">
    <div className="dpanel__bg" aria-hidden="true" />
    <header className="dpanel__head">
      <p className="dpanel__eyebrow">04 / 05 · skills</p>
      <h2 id="panel-skills-title" className="dpanel__title">
        Skills<span className="dot">.</span>
      </h2>
      <p className="dpanel__lead">What I build with, from the frontend to the model.</p>
    </header>

    <div className="skill-rows">
      {skillGroups.map((group) => {
        const skills = group.skills.filter((s) => !isTodo(s.name));
        if (!skills.length) return null;
        return (
          <div key={group.id} className="skill-group">
            <h3 className="skill-group__title">{group.title}</h3>
            <ul className="skill-group__list">
              {skills.map((s) => (
                <li key={s.name} title={s.note || undefined}>
                  {s.name}
                  {s.level && <span className="skill-level">{s.level}</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </section>
);

export default SkillsPanel;
