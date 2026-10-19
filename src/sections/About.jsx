import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import Achievements from './Achievements';
import { profile } from '../data/profile';
import { isTodo } from '../data/todo';

const { about } = profile;

const About = () => (
  <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeader id="about-title" eyebrow={about.eyebrow} title={about.title} />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <Reveal>
          <h3 className="font-display text-3xl text-ink">{about.heading}</h3>
          <div className="mt-4 space-y-4 text-[1.02rem] leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>{profile.intro}</p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
            {profile.roles.map((r) => (
              <li key={r} className="chip">
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="space-y-6">
          <ul className="grid grid-cols-2 gap-3" aria-label="Quick facts">
            {profile.quickStats
              .filter((s) => !isTodo(s.value))
              .map((s) => (
                <li key={s.label} className="card p-4">
                  <p className="font-display text-3xl leading-none text-ink">{s.value}</p>
                  <p className="mt-2 font-mono text-xs text-muted">{s.label}</p>
                </li>
              ))}
          </ul>

          <dl className="card divide-y divide-line">
            {about.strengths.map((s) => (
              <div key={s.title} className="p-4">
                <dt className="font-medium text-ink">{s.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Achievements />
    </div>
  </section>
);

export default About;
