/**
 * "faqs" pop-up in the profile card. Answers only use facts from the other data
 * files (projects, skills, open source, profile). Edit freely.
 */
export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What do you build?',
    a: 'Full-stack web apps with React, Node and TypeScript. Recently: real-time collaboration (CollabSpace), a food rescue platform (ZeroWaste Link), an income and tax tracker for freelancers (PaySlip) and a MERN notes app (ThinkBoard).',
  },
  {
    q: 'What is your stack?',
    a: 'Frontend: React, TypeScript, JavaScript and Tailwind CSS. Backend: Node.js, Express, MongoDB and REST APIs. AI/ML: Python, NumPy, Pandas and Scikit-learn, plus LLM integration. Data structures and algorithms in C++.',
  },
  {
    q: 'Are you open to internships?',
    a: 'Yes. I am a Computer Engineering student at SVIT, India, and open to software engineering internships. Email is the best way to reach me.',
  },
  {
    q: 'Do you contribute to open source?',
    a: "Yes. I'm a contributor in GirlScript Summer of Code '26, Social Summer of Code Season 5 and Open Source Connect India, and I'm preparing for GSoC 2027.",
  },
  {
    q: 'What are you learning right now?',
    a: 'Data structures and algorithms in C++, backend design with Node.js and Express, and applied machine learning, while reading open-source codebases for GSoC 2027.',
  },
];
