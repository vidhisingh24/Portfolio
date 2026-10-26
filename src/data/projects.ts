/**
 * Projects shown in the "work" section. Order here = order on the page.
 * - highlights: short facts about the project (no invented numbers)
 * - links.demo: set to null when there's no live demo
 * - status: optional label; anything starting with "TODO" is hidden
 */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  caseStudy: {
    problem: string;
    solution: string;
    architecture: string;
    challenges: string;
  };
  links: {
    github: string;
    demo: string | null;
  };
  status?: string;
  /** Card look on the work column: background, text colour and a soft glow */
  card: { bg: string; fg: string; glow: string };
  /** Tall strip of screenshots that slides inside the card as you scroll */
  shot: { src: string; srcSm: string; width: number; height: number; alt: string };
}

export const workSection = {
  eyebrow: 'Selected work',
  title: 'Engineering *Real-World* Products',
  lead: 'Recruiter-ready case studies highlighting production-grade architectures, metrics, and technical challenges solved.',
};

export const projects: Project[] = [
  {
    id: 'collabspace',
    title: 'CollabSpace',
    subtitle: 'Real-time Collaboration Platform',
    description: 'A collaboration workspace that brings real-time document editing, a shared code editor, an infinite whiteboard and kanban boards into one place, with an AI assistant built in.',
    tech: ['Next.js 14', 'TypeScript', 'Node.js', 'Express', 'Yjs CRDT', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: ['Yjs CRDT live co-editing', 'Chaos-tested node failover', '17 CRDT convergence tests'],
    caseStudy: {
      problem: 'Teams juggle separate tools for docs, code, whiteboards and task tracking, and real-time editors struggle when two people edit the same spot or someone goes offline.',
      solution: 'Built one workspace where documents (Tiptap), code (Monaco) and whiteboards sync live through Yjs CRDTs, with presence cursors, inline comments, version history, offline editing and a kanban board.',
      architecture: 'Next.js frontend talking to a TypeScript WebSocket gateway that shards document rooms across nodes. Redis backs the shard registry, PostgreSQL (Supabase) stores workspace data, and a Grafana dashboard tracks live gateway and CRDT metrics.',
      challenges: 'Keeping documents identical across gateway nodes during failures. Verified with chaos tests: 100 clients across 2 nodes converge to the same state, and killing a node or restarting Redis loses no data.',
    },
    links: { github: 'https://github.com/vidhisingh24/Collabspace', demo: null },
    // Previously labelled "Active System" on the site. Confirm before showing.
    status: 'TODO: Active System',
    card: { bg: '#221A45', fg: '#F4F1FB', glow: '#2DD4BF' },
    shot: { src: '/projects/collabspace.webp', srcSm: '/projects/collabspace-sm.webp', width: 1560, height: 3169, alt: 'CollabSpace screens: documents list, system-architecture whiteboard and sprint kanban board' },
  },
  {
    id: 'zerowaste-link',
    title: 'ZeroWaste Link',
    subtitle: 'Food Rescue Platform',
    description: 'A real-time food rescue platform connecting restaurants, NGOs and volunteers across India, with role-based dashboards, smart NGO matching and live delivery tracking.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Leaflet', 'Recharts', 'Express', 'MongoDB', 'Socket.IO'],
    highlights: ['4 role-based dashboards', 'Live delivery map', 'Smart NGO matching'],
    caseStudy: {
      problem: 'Surplus food from restaurants, hotels and events goes to waste because donors, NGOs and volunteers have no shared, real-time way to coordinate pickups.',
      solution: 'Built dashboards for donors, NGOs, volunteers and admins. Donors post food with a simulated AI freshness check, NGOs see smart-matched donations, and accepting one instantly updates every dashboard and the live map.',
      architecture: 'Next.js + TypeScript frontend on a pub/sub client store. Runs fully in demo mode with no backend, or in server mode against an Express + MongoDB + Socket.io API, falling back to demo mode if the server is unreachable.',
      challenges: 'Keeping donor, NGO and volunteer views in sync as a donation changes state. Solved with a single pub/sub store, so one action propagates to every dashboard, the volunteer task list and the map.',
    },
    links: { github: 'https://github.com/vidhisingh24/ZeroWaste_Link', demo: null },
    // Previously labelled "Active System" on the site. Confirm before showing.
    status: 'TODO: Active System',
    card: { bg: '#E6F4EC', fg: '#123C28', glow: '#A7F3D0' },
    shot: { src: '/projects/zerowaste.webp', srcSm: '/projects/zerowaste-sm.webp', width: 1560, height: 3169, alt: 'ZeroWaste Link screens: landing page, live impact map and donate page' },
  },
  {
    id: 'payslip',
    title: 'PaySlip',
    subtitle: 'Income & Tax Tracker for Freelancers',
    description: 'Tracks what freelancers and gig workers earn, logs deductible expenses, and estimates income tax, self-employment tax and quarterly payments from a deterministic tax engine.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Node.js', 'Express 5', 'MongoDB', 'Redis', 'Plaid', 'Jest', 'Playwright'],
    highlights: ['Deterministic tax engine', 'Live updates via SSE', 'Jest + Playwright e2e'],
    caseStudy: {
      problem: 'Freelancers rarely know what they owe until tax time, and many tools either guess or present AI-generated numbers with the same authority as real calculations.',
      solution: 'Built income and expense tracking with optional Plaid bank import, receipt uploads, a quarterly payment schedule with deadline countdowns, and an hourly-rate comparison against real job postings.',
      architecture: 'Modular Express API (auth, income, expenses, tax engine, Plaid, notifications) on MongoDB and Redis, a typed React client, and Server-Sent Events that push new income without a refresh. All LLM calls go through one AI gateway module.',
      challenges: 'Keeping financial figures trustworthy next to AI output. The tax engine is pure (no network, no AI), an ESLint rule blocks it from importing the AI module, and model-generated categories are shown with their confidence.',
    },
    links: { github: 'https://github.com/vidhisingh24/PaySlip', demo: null },
    // Previously labelled "Active System" on the site. Confirm before showing.
    status: 'TODO: Active System',
    card: { bg: '#15121F', fg: '#F4F1FB', glow: '#818CF8' },
    shot: { src: '/projects/payslip.webp', srcSm: '/projects/payslip-sm.webp', width: 1560, height: 2094, alt: 'PaySlip sign-in and create-account screens' },
  },
  {
    id: 'thinkboard',
    title: 'ThinkBoard',
    subtitle: 'MERN Notes App',
    description: 'A full-stack note-taking app to capture, organize and manage ideas, with persistent cloud storage and a clean, responsive interface.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose'],
    highlights: ['RESTful CRUD API', 'MongoDB Atlas', 'Live on Render'],
    caseStudy: {
      problem: 'Quick ideas get scattered across chats and paper, with no simple place to capture, edit and revisit them from any device.',
      solution: 'Built a MERN app with create, edit and delete flows, persistent storage on MongoDB Atlas, and a mobile-friendly Tailwind UI.',
      architecture: 'React + Vite frontend calling an Express REST API (GET, POST, PUT, DELETE on /api/notes), with the backend split into config, routes, controllers and Mongoose models.',
      challenges: 'Structuring a clean backend for a first full-stack project: separating routes, controllers and models so the API stays easy to extend, with user authentication next on the roadmap.',
    },
    links: { github: 'https://github.com/vidhisingh24/ThinkBoard', demo: 'https://thinkboard-v29z.onrender.com/' },
    // Previously labelled "Active System" on the site. Confirm before showing.
    status: 'TODO: Active System',
    card: { bg: '#F5EDE4', fg: '#4A1424', glow: '#FDBA74' },
    shot: { src: '/projects/thinkboard.webp', srcSm: '/projects/thinkboard-sm.webp', width: 1560, height: 3169, alt: 'ThinkBoard screens: notes grid, edit note and create note' },
  },
];
