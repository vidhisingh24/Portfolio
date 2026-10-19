/**
 * Who I am + links. Used by the navbar, hero, about, contact, footer and ⌘K palette.
 * Strings starting with "TODO" are hidden on the site.
 */
export interface QuickStat {
  label: string;
  value: string;
}

export const profile = {
  name: 'Vidhi Singh',
  shortName: 'vidhi',
  role: 'Full-stack Developer',
  email: 'vidhiisingh2403@gmail.com',
  location: 'India',
  college: 'Sardar Vallabhbhai Patel Institute of Technology (SVIT)',
  availability: 'Open to internships',

  links: {
    github: 'https://github.com/vidhisingh24',
    linkedin: 'https://www.linkedin.com/in/vidhisingh24',
    resume: '/Vidhi_Singh_Resume.pdf',
    site: 'https://vidhisingh-portfolio.vercel.app/',
  },

  hero: {
    // "ship" is set in italic serif by the Hero component
    tagline: 'A full-stack developer who loves to ship.',
    subline: 'Building AI-powered web apps with React, Node and TypeScript. Learning open source, one PR at a time.',
    whoami: 'computer engineering student @ SVIT, India',
    photo: {
      webp: '/images/vidhi.webp',
      png: '/images/vidhi.png',
      alt: 'Portrait of Vidhi Singh',
      size: 460,
    },
    notes: ['React + Node', 'TypeScript', 'GSoC 2027 prep'],
  },

  about: {
    eyebrow: 'About me',
    title: 'Transforming Curiosity into *Code*',
    heading: 'Who is Vidhi Singh?',
    paragraphs: [
      'I am an ambitious 1st Year Computer Engineering student dedicated to mastering the art and science of software systems. Rather than waiting for senior years, I actively engage in real-world application design, open-source program contributions, and practical machine learning pipelines.',
      'My core mission is to construct applications that solve tangible human challenges, combining clean modular architectures with visually stunning user experiences. I thrive at the intersection of algorithmic rigor, aesthetic frontends, and intelligent machine learning backends.',
    ],
    strengths: [
      { title: 'Algorithmic Logic', desc: 'Active solver of C++ DSA problems, optimizing spatial and time complexities.' },
      { title: 'Full Stack Adaptability', desc: 'Rapidly picking up React, Node.js, and databases to build complete responsive apps.' },
      { title: 'AI/ML Focus', desc: 'Applying NumPy, Pandas, Scikit-learn, and neural theory concepts to raw data.' },
      { title: 'Open Source Spirit', desc: 'Collaborating on git repositories, reviewing pull requests, and building community.' },
    ],
  },

  contact: {
    eyebrow: 'Get in touch',
    title: "Let's Build Something *Meaningful* Together",
    lead: 'Whether you want to discuss a new software engineering internship opportunity, contribute to open-source systems, or simply connect—my inbox is open!',
    linksTitle: 'Contact Information',
  },

  footer: {
    tagline: 'Building software systems & exploring AI solutions.',
  },

  // Carried over from the previous hero; shown in the About section.
  intro:
    'I am a Computer Engineering student focused on building scalable systems, mastering Data Structures & Algorithms, and exploring the frontiers of Machine Learning. Combining core software principles with modern web technologies, I design products with intuitive aesthetics and technical depth.',
  roles: ['Software Engineer in Progress', 'AI & ML Enthusiast', 'Full Stack Learner', 'Problem Solver', 'Open Source Contributor'],
  quickStats: [
    { label: 'Professional Projects', value: '4+' },
    { label: 'Open Source Contributor', value: 'Active' },
    { label: 'AI & ML Learner', value: 'Hands-on' },
    { label: 'DSA Enthusiast', value: 'C++' },
  ] as QuickStat[],
};

export type Profile = typeof profile;
