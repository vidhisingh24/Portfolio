/**
 * Journey content: experience, learning path, AI/ML path, accomplishments and focus.
 * Anything starting with "TODO" is hidden on the site until you fill it in.
 */
export interface Experience {
  role: string;
  org: string;
  duration: string;
  points: string[];
}

export interface Milestone {
  year: string;
  title: string;
  institution: string;
  desc: string;
}

export interface Step {
  phase: string;
  title: string;
  subtitle?: string;
  desc: string;
  label?: string;
}

export interface Achievement {
  title: string;
  desc: string;
  value: string;
  badge?: string;
}

export const journeySection = {
  eyebrow: 'Background',
  title: 'Practical *Experience*',
  lead: 'How I contribute to community programs and engineer software products.',
};

export const experiences: Experience[] = [
  {
    role: 'Open Source Contributor',
    org: 'GirlScript Summer of Code (GSSoC)',
    duration: 'May 2026 - Present',
    points: [
      'Contributed documentation refinements and frontend user interface modifications across public program repositories.',
      'Collaborated alongside developers via GitHub, reviewing commits, resolving merge conflicts, and aligning features.',
      'Debugged logic errors within JavaScript components, refining responsiveness controls.',
    ],
  },
  {
    // Name corrected to match LinkedIn (was "Summer of Source Code (SSOC)").
    role: 'Open Source Contributor',
    org: 'Social Summer of Code (SSoC)',
    duration: 'April 2026 - Present',
    points: [
      'Submitted pull requests containing structural styles optimizations and responsive adjustments.',
      'Refined component reuse constraints within open-source React dashboards, improving layout weights.',
      'Maintained active communication lines inside Discord channels to align project scopes.',
    ],
  },
  {
    role: 'Open Source Contributor',
    org: 'Global Repositories (Independent)',
    duration: '2025 - Present',
    points: [
      'Forked and optimized coding scripts inside utility projects, optimizing functions efficiency.',
      'Reported runtime errors and created documentation updates in community packages.',
      'Utilized git branching best practices to ensure clear version histories.',
    ],
  },
  {
    role: 'Student Developer',
    org: 'Computer Engineering Department',
    duration: '2025 - Present',
    points: [
      'Constructed course laboratory scripts solving core array searching/sorting algorithms in C++.',
      'Designed presentation slide systems showing how object-oriented patterns solve real-world problems.',
      'Collaborated inside group assignments to manage code integration and testing scopes.',
    ],
  },
  {
    role: 'Independent Project Developer',
    org: 'Self-Directed Engineering Projects',
    duration: '2025 - Present',
    points: [
      'TODO: MedEase AI healthcare portal — the repo is no longer public; confirm or remove',
      'Designed and coded the ZeroWasteLink distribution hub.',
      'Analyzed package specifications and resolved compatibility mismatches during React updates.',
      'Hosted deployments on cloud hosting interfaces, configuring domain redirects.',
    ],
  },
];

/** Previously the "Tech Journey" card in About. */
export const milestones: Milestone[] = [
  { year: '2025 - Present', title: 'Data Structures & Core Engineering', institution: 'Logic & Systems Foundations', desc: 'Mastered memory pointer architectures and complex algorithm structures in C++. Hand-implemented binary trees, search heaps, sorting optimizations, and space complexity metrics.' },
  { year: '2026 - Present', title: 'Open Source Contributor', institution: 'Community Repositories', desc: 'Contributed interface styling layouts and component validation features during GSSoC and SSOC programs. Mastered Git branching protocols and collaborative peer reviews.' },
  { year: '2026', title: 'Full-Stack & Machine Learning Models', institution: 'Intelligent Web Applications', desc: 'Constructed custom responsive platforms using React/Vite, Tailwind, and Node.js. Developed predictive models using Scikit-Learn and statistical calculations in Pandas/NumPy.' },
];

export const learningPath = {
  title: 'My Learning *Journey*',
  eyebrow: 'Roadmap',
};

export const learningSteps: Step[] = [
  { phase: 'Step 1', title: 'Computer Engineering Basics', desc: 'Began Bachelor of Engineering. Studied logic structures, boolean math, and hardware architecture principles.' },
  { phase: 'Step 2', title: 'Programming & Logic', desc: 'Practiced C++ coding syntax. Solved arrays, sorting, recursion, and object-oriented structure problems.' },
  { phase: 'Step 3', title: 'Full Stack Development', desc: 'Mastered React 18 frontend layouts, CSS styles, Node.js packages, API calls, and local server routing.' },
  { phase: 'Step 4', title: 'Open Source Collaborations', desc: 'Contributed to GitHub projects during GSSoC and SSOC, adjusting layouts and coding validations.' },
  { phase: 'Step 5', title: 'AI & Data Analysis Models', desc: 'Studied dataset matrices using NumPy/Pandas. Implemented estimator models in Scikit-Learn.' },
  { phase: 'Step 6', title: 'Recruiter Ready Systems', desc: 'Bundled case studies into portfolios, verified responsive interfaces, and preparing for engineering internships.' },
];

export const aiPath = {
  eyebrow: 'AI & ML path',
  title: 'AI & Machine Learning *Journey*',
  lead: 'How I explore data science, train predictive estimators, and integrate intelligence into modern software stacks.',
};

export const aiSteps: Step[] = [
  {
    phase: 'Phase 1',
    title: 'Data Foundations',
    subtitle: 'Data Preprocessing & EDA',
    desc: 'Mastered Pandas and NumPy for multidimensional arrays mathematical manipulations and data cleaning. Constructed charts using Matplotlib and Seaborn to spot anomalies and correlations.',
    label: 'TODO: Milestone Completed',
  },
  {
    phase: 'Phase 2',
    title: 'Statistical Learning',
    subtitle: 'Classical Machine Learning',
    desc: 'Built training sets and implemented Scikit-learn algorithms (Linear Regression, Random Forest, K-Nearest Neighbors, SVM) to run classification, regression, and data clustering models.',
    label: 'TODO: Milestone Completed',
  },
  {
    phase: 'Phase 3',
    title: 'Deep Frontiers',
    subtitle: 'Neural Networks & Deep Learning',
    desc: 'Studying neural network architectures, layer weights optimization, cost functions, gradient descent, and convolutional layers using TensorFlow/Keras playgrounds.',
    label: 'TODO: Milestone Completed',
  },
  {
    // Previously ended with "(like the MedEase AI healthcare checkups)" — that repo is no longer public.
    phase: 'Phase 4',
    title: 'AI App Integration',
    subtitle: 'Intelligent Software Systems',
    desc: 'Connecting trained predictive models and natural language parsers with React/Express backends to build smart user applications.',
    label: 'TODO: Milestone Completed',
  },
];

export const accomplishments = {
  eyebrow: 'Milestones',
  title: 'Key *Accomplishments*',
};

export const achievements: Achievement[] = [
  {
    title: 'Advanced Project Engineering',
    desc: 'Built CollabSpace, ZeroWaste Link, PaySlip and ThinkBoard end to end, from real-time collaboration to tax tracking.',
    value: '4 Platforms Built',
    badge: 'TODO: Verified Milestone',
  },
  {
    title: 'Open Source Footprint',
    desc: 'Contributed code to repositories during GSSoC and SSOC programs, reviewing code standards.',
    value: 'GSSoC & SSOC Contributor',
    badge: 'TODO: Verified Milestone',
  },
  {
    title: 'Algorithms Mastery',
    desc: 'Practiced and solved structures, sorting, and recursion problems in C++ to improve algorithmic coding speeds.',
    value: 'TODO: problems solved (was "150+ Solved Problems")',
    badge: 'TODO: Verified Milestone',
  },
  {
    title: 'AI & Data Science Curriculum',
    desc: 'Analyzed datasets and completed self-paced predictive training modules with Pandas and Scikit-Learn.',
    value: 'TODO: AI models built (was "5 AI Models Designed")',
    badge: 'TODO: Verified Milestone',
  },
  {
    title: 'GitHub Commit Stabs',
    desc: 'Maintained active repositories, created code branches, and updated daily progress checklists.',
    value: 'TODO: GitHub contributions (was "300+"; GitHub showed 976 in the last year in Oct 2026)',
    badge: 'TODO: Verified Milestone',
  },
  {
    title: 'Hackathon Collaborations',
    desc: 'Participated in university prototyping rounds, drafting frontends and UI layouts (Future/Active).',
    value: 'Hackathon Participant',
    badge: 'TODO: Verified Milestone',
  },
];

export const focus = {
  eyebrow: 'Focus & vision',
  title: 'Vision & *Focus*',
  workingOn: {
    title: 'Currently Working On',
    items: [
      'Data Structures & Algorithms (C++)',
      'Advanced Full-Stack Engineering (React/Vite)',
      'Backend RESTful design (Node.js & Express)',
      'AI & ML predictive estimators pipelines',
      'Participating in Open Source repositories',
      'Refining project user interfaces and portfolios',
    ],
  },
  interests: {
    title: 'Core Technical Interests',
    items: [
      'Software Systems Engineering',
      'Artificial Intelligence Algorithms',
      'Machine Learning Classifications',
      'Open Source Codebases',
      'SaaS UI/UX Product Design',
      'Algorithmic Complexity Optimization',
      'Distributed Scalable Backends',
    ],
  },
  goals: {
    title: 'Future Goals',
    items: [
      'Transition into a professional Software Engineer',
      'Develop AI-integrated user web platforms',
      'Submit PRs to major international repositories',
      'Acquire highly competitive tech internships',
      'Collaborate in hackathons to solve community bugs',
    ],
  },
};
