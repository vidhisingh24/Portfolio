/**
 * "Achievements & journey" panel. Real things only:
 * - highlights: things you actually did. Add a link when there is one. No invented numbers.
 * - steps: your path so far, oldest first. `when` is optional; leave it out if unsure.
 * - aiPath: the level next to each tool is read from your own labels in skills.ts.
 * Anything starting with "TODO" is hidden on the site.
 */
export interface Highlight {
  value: string; // the big text on the card
  title: string;
  meta: string;
  desc: string;
  link?: { label: string; url: string };
}

export interface JourneyStep {
  when?: string;
  title: string;
  desc: string;
  next?: boolean; // marks the step you're working towards
}

export interface AiStep {
  title: string;
  desc: string;
  tools: string[]; // names as written in skills.ts
}

export const highlights: Highlight[] = [
  {
    value: 'Solo',
    title: 'HeatShift',
    meta: 'WeMakeDevs × AWS Bharat Builds · Oct 2026',
    desc: 'Built alone for the Environmental Hacks stop (Heat & Water track) and deployed it on AWS.',
    link: { label: 'GitHub', url: 'https://github.com/vidhisingh24/heatshift' },
  },
  {
    value: '#267',
    title: 'HackerRank Orchestrate',
    meta: 'September 2026 round',
    desc: 'Ranked 267 out of about 3,000.',
  },
  {
    value: '3★',
    title: 'CodeChef',
    meta: 'Competitive programming',
    desc: 'Data structures and algorithms in C++.',
  },
];

export const steps: JourneyStep[] = [
  { when: '2025', title: 'Computer Engineering at SVIT', desc: 'Started my B.E.: programming, logic and how computers work.' },
  { when: '2025', title: 'C++ and DSA', desc: 'Arrays, sorting, recursion and trees. C++ is my main language for problem solving.' },
  { when: '2026', title: 'Full-stack projects', desc: 'React, Node, Express and MongoDB. Shipped CollabSpace, ZeroWaste Link, PaySlip and ThinkBoard.' },
  { when: 'Apr 2026', title: 'Open source', desc: 'GSSoC ’26 in April, SSoC Season 5 in May, OSCI in August.' },
  { when: 'Sep 2026', title: 'Hackathons', desc: 'HackerRank Orchestrate in September, HeatShift for AWS Bharat Builds in October.' },
  { when: '2027', title: 'GSoC 2027', desc: 'Reading codebases and picking good-first-issues.', next: true },
];

export const aiPath: AiStep[] = [
  { title: 'Data foundations', desc: 'Cleaning data and spotting patterns with charts.', tools: ['NumPy', 'Pandas', 'Matplotlib'] },
  { title: 'Classical ML', desc: 'Classification and regression models.', tools: ['Scikit-learn'] },
  { title: 'Deep learning', desc: 'Neural networks, layers and gradient descent.', tools: ['TensorFlow'] },
  { title: 'AI in real apps', desc: 'Putting models and LLMs inside web apps.', tools: ['LLM integration', 'Generative AI'] },
];
