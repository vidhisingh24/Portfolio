/**
 * Open source, shown in "Learning in public".
 *
 * Rules this file follows (keep them when editing):
 * - Programs are open programs I take part in. They are not organisations I belong to.
 * - Only add a contribution when a real PR/issue link exists, with its true status.
 * - While `contributions` is empty, the contributions list is hidden on the site.
 * - No org logos anywhere.
 */
export type ContributionStatus = 'open' | 'merged' | 'closed';

export interface Contribution {
  title: string;
  repo: string; // e.g. "owner/name"
  url: string; // full link to the PR or issue
  kind: 'pr' | 'issue';
  status: ContributionStatus;
  date?: string; // "YYYY-MM"
}

export interface Program {
  id: string;
  name: string;
  short: string;
  role: string;
  period: string;
  summary: string;
}

export const learningSection = {
  eyebrow: 'Open source & GitHub',
  title: 'Learning in *public*',
  lead: 'Preparing for GSoC 2027: open-source programs, GitHub activity, and what I am focused on next.',
};

export const programs: Program[] = [
  {
    id: 'gssoc',
    name: 'GirlScript Summer of Code',
    short: 'GSSoC ’26',
    role: 'Contributor',
    period: 'Apr 2026 – Present',
    summary: 'Working on issues and pull requests in participating open-source projects and collaborating with maintainers on GitHub.',
  },
  {
    id: 'ssoc',
    name: 'Social Summer of Code',
    short: 'SSoC Season 5',
    role: 'Contributor',
    period: 'May 2026 – Present',
    summary: 'Working on issues and pull requests in participating open-source projects and collaborating with maintainers and other contributors.',
  },
  {
    id: 'osci',
    name: 'Open Source Connect India',
    short: 'OSCI',
    role: 'Contributor',
    period: 'Aug 2026 – Present',
    summary: 'Working on issues and pull requests in participating open-source projects and collaborating with maintainers.',
  },
];

/**
 * Add real links only, for example:
 * { title: 'Fix X in Y', repo: 'owner/name', url: 'https://github.com/owner/name/pull/123', kind: 'pr', status: 'open', date: '2026-10' },
 */
export const contributions: Contribution[] = [];
