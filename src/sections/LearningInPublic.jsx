import { Suspense, lazy } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import CurrentInterestsFuture from './CurrentInterestsFuture';
import { contributions, learningSection, programs } from '../data/openSource';

const GitStats = lazy(() => import('../components/GitStats'));

const STATUS_STYLE = {
  merged: 'bg-accent-soft text-accent-strong',
  open: 'bg-surface-2 text-ink',
  closed: 'bg-surface-2 text-muted line-through decoration-1',
};

const LearningInPublic = () => (
  <section id="learning" aria-labelledby="learning-title" className="py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeader id="learning-title" {...learningSection} />

      <h3 className="sr-only">Open-source programs</h3>
      <ul className="grid gap-5 md:grid-cols-3">
        {programs.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 0.06} className="card flex flex-col p-6">
            <p className="font-display text-3xl leading-none text-ink">{p.short}</p>
            <p className="mt-2 text-sm text-ink">{p.name}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              {p.role} · {p.period}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>
          </Reveal>
        ))}
      </ul>

      {/* Only rendered when openSource.ts lists real PR/issue links */}
      {contributions.length > 0 && (
        <div className="mt-12">
          <h3 className="font-display text-3xl text-ink">Contributions</h3>
          <ul className="card mt-5 divide-y divide-line">
            {contributions.map((c) => (
              <li key={c.url} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="min-w-0 hover:underline">
                  <span className="block truncate text-ink">{c.title}</span>
                  <span className="font-mono text-xs text-muted">
                    {c.repo} · {c.kind === 'pr' ? 'pull request' : 'issue'}
                    {c.date ? ` · ${c.date}` : ''}
                  </span>
                </a>
                <span className={`rounded-full px-2.5 py-1 font-mono text-xs ${STATUS_STYLE[c.status]}`}>{c.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-20" id="github">
        <Reveal>
          <p className="eyebrow">Analytics</p>
          <h3 className="mt-2 font-display text-4xl text-ink">
            GitHub Contribution <em className="text-accent-strong">Stream</em>
          </h3>
        </Reveal>
        <div className="mt-8 min-h-[420px]">
          <Suspense fallback={null}>
            <GitStats />
          </Suspense>
        </div>
      </div>

      <CurrentInterestsFuture />
    </div>
  </section>
);

export default LearningInPublic;
