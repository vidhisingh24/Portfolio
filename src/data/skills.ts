/**
 * Skills, grouped by domain. No percentages or progress bars on purpose.
 * - level: your own label, shown small next to the skill (optional)
 * - note:  one line on how you use it (optional)
 * Anything whose name starts with "TODO" is hidden on the site.
 */
export interface Skill {
  name: string;
  level?: 'Advanced' | 'Proficient' | 'Intermediate' | 'Learning' | 'Prior Knowledge';
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

export const skillsSection = {
  eyebrow: 'Tech stack',
  title: 'Tools of the *Trade*',
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', level: 'Proficient', note: 'SPA development using functional hooks.' },
      { name: 'TypeScript' },
      { name: 'JavaScript', level: 'Proficient', note: 'Core language for React applications and web logic.' },
      { name: 'Tailwind CSS', level: 'Proficient', note: 'Utility-first CSS styling for rapid fluid UIs.' },
      { name: 'HTML/CSS', level: 'Advanced', note: 'Semantic layouts and responsive styled variables.' },
      { name: 'Bootstrap', level: 'Proficient', note: 'Grid spacing and responsive class extensions.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Learning', note: 'Server side JavaScript runs and configurations.' },
      { name: 'Express', level: 'Learning', note: 'REST API routing and local server setups.' },
      { name: 'MongoDB' },
      { name: 'REST APIs' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / ML',
    skills: [
      { name: 'LLM integration' },
      { name: 'Generative AI' },
      { name: 'Applied ML' },
      { name: 'NumPy', level: 'Proficient', note: 'N-dimensional arrays and matrix algebra functions.' },
      { name: 'Pandas', level: 'Proficient', note: 'Data cleaning, dataframes manipulation, and analyses.' },
      { name: 'Matplotlib', level: 'Proficient', note: 'Visual charts, histograms, and mathematical graphs.' },
      { name: 'Scikit-learn', level: 'Intermediate', note: 'Predictive models, classification, regression tools.' },
      { name: 'TensorFlow', level: 'Learning', note: 'Studying neural networks and tensor computations.' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    skills: [
      { name: 'AWS', note: 'CloudFront' },
      // The HeatShift repo README mentions Elastic Beanstalk and Bedrock — confirm and add here.
      { name: 'TODO: other AWS services' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      { name: 'C++', level: 'Advanced', note: 'Primary language for Data Structures & Algorithms.' },
      { name: 'Python', level: 'Proficient', note: 'Utilized for AI/ML development and scripting.' },
      { name: 'C', level: 'Prior Knowledge', note: 'Academic understanding of pointer systems and memory.' },
      { name: 'Java', level: 'Prior Knowledge', note: 'Object-Oriented programming structures and logic.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', level: 'Advanced', note: 'Branching, merging, and CLI repository management.' },
      { name: 'GitHub', level: 'Advanced', note: 'Hosting code, PR reviews, and open-source flows.' },
      { name: 'VS Code', level: 'Advanced', note: 'Primary IDE optimized with custom extensions.' },
      { name: 'Linux', level: 'Intermediate', note: 'CLI navigation, process administration, and shell scripts.' },
      { name: 'Figma', level: 'Intermediate', note: 'Wireframing, UI mockup assets, and component spacing.' },
      { name: 'Postman', level: 'Intermediate', note: 'Testing HTTP endpoints, payloads, and JSON models.' },
    ],
  },
];
