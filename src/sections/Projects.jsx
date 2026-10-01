import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const projects = [
  {
    id: 1,
    title: 'CollabSpace',
    subtitle: 'Real-time Collaboration Platform',
    description: 'A collaboration workspace that brings real-time document editing, a shared code editor, an infinite whiteboard and kanban boards into one place, with an AI assistant built in.',
    gradient: 'from-purple-500/10 via-indigo-500/10 to-lavender/20',
    borderGlow: 'hover:border-purple-300 dark:hover:border-purple-900/60',
    tech: ['Next.js 14', 'TypeScript', 'Node.js', 'Express', 'Yjs CRDT', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker'],
    metrics: {
      sync: 'Yjs CRDT live co-editing',
      resilience: 'Chaos-tested node failover',
      tests: '17 CRDT convergence tests'
    },
    caseStudy: {
      problem: 'Teams juggle separate tools for docs, code, whiteboards and task tracking, and real-time editors struggle when two people edit the same spot or someone goes offline.',
      solution: 'Built one workspace where documents (Tiptap), code (Monaco) and whiteboards sync live through Yjs CRDTs, with presence cursors, inline comments, version history, offline editing and a kanban board.',
      architecture: 'Next.js frontend talking to a TypeScript WebSocket gateway that shards document rooms across nodes. Redis backs the shard registry, PostgreSQL (Supabase) stores workspace data, and a Grafana dashboard tracks live gateway and CRDT metrics.',
      challenges: 'Keeping documents identical across gateway nodes during failures. Verified with chaos tests: 100 clients across 2 nodes converge to the same state, and killing a node or restarting Redis loses no data.',
      github: 'https://github.com/vidhisingh24/Collabspace',
      demo: null
    }
  },
  {
    id: 2,
    title: 'ZeroWaste Link',
    subtitle: 'Food Rescue Platform',
    description: 'A real-time food rescue platform connecting restaurants, NGOs and volunteers across India, with role-based dashboards, smart NGO matching and live delivery tracking.',
    gradient: 'from-emerald-500/10 via-teal-500/10 to-mint/20',
    borderGlow: 'hover:border-emerald-300 dark:hover:border-emerald-900/60',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Leaflet', 'Recharts', 'Express', 'MongoDB', 'Socket.IO'],
    metrics: {
      roles: '4 role-based dashboards',
      tracking: 'Live delivery map',
      matching: 'Smart NGO matching'
    },
    caseStudy: {
      problem: 'Surplus food from restaurants, hotels and events goes to waste because donors, NGOs and volunteers have no shared, real-time way to coordinate pickups.',
      solution: 'Built dashboards for donors, NGOs, volunteers and admins. Donors post food with a simulated AI freshness check, NGOs see smart-matched donations, and accepting one instantly updates every dashboard and the live map.',
      architecture: 'Next.js + TypeScript frontend on a pub/sub client store. Runs fully in demo mode with no backend, or in server mode against an Express + MongoDB + Socket.io API, falling back to demo mode if the server is unreachable.',
      challenges: 'Keeping donor, NGO and volunteer views in sync as a donation changes state. Solved with a single pub/sub store, so one action propagates to every dashboard, the volunteer task list and the map.',
      github: 'https://github.com/vidhisingh24/ZeroWaste_Link',
      demo: null
    }
  },
  {
    id: 3,
    title: 'PaySlip',
    subtitle: 'Income & Tax Tracker for Freelancers',
    description: 'Tracks what freelancers and gig workers earn, logs deductible expenses, and estimates income tax, self-employment tax and quarterly payments from a deterministic tax engine.',
    gradient: 'from-pink-500/10 via-rose-500/10 to-softpink/20',
    borderGlow: 'hover:border-pink-300 dark:hover:border-pink-900/60',
    tech: ['React 19', 'TypeScript', 'Vite', 'Node.js', 'Express 5', 'MongoDB', 'Redis', 'Plaid', 'Jest', 'Playwright'],
    metrics: {
      taxes: 'Deterministic tax engine',
      updates: 'Live updates via SSE',
      testing: 'Jest + Playwright e2e'
    },
    caseStudy: {
      problem: 'Freelancers rarely know what they owe until tax time, and many tools either guess or present AI-generated numbers with the same authority as real calculations.',
      solution: 'Built income and expense tracking with optional Plaid bank import, receipt uploads, a quarterly payment schedule with deadline countdowns, and an hourly-rate comparison against real job postings.',
      architecture: 'Modular Express API (auth, income, expenses, tax engine, Plaid, notifications) on MongoDB and Redis, a typed React client, and Server-Sent Events that push new income without a refresh. All LLM calls go through one AI gateway module.',
      challenges: 'Keeping financial figures trustworthy next to AI output. The tax engine is pure (no network, no AI), an ESLint rule blocks it from importing the AI module, and model-generated categories are shown with their confidence.',
      github: 'https://github.com/vidhisingh24/PaySlip',
      demo: null
    }
  },
  {
    id: 4,
    title: 'ThinkBoard',
    subtitle: 'MERN Notes App',
    description: 'A full-stack note-taking app to capture, organize and manage ideas, with persistent cloud storage and a clean, responsive interface.',
    gradient: 'from-blue-500/10 via-sky-500/10 to-skyblue/20',
    borderGlow: 'hover:border-blue-300 dark:hover:border-blue-900/60',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose'],
    metrics: {
      api: 'RESTful CRUD API',
      storage: 'MongoDB Atlas',
      deploy: 'Live on Render'
    },
    caseStudy: {
      problem: 'Quick ideas get scattered across chats and paper, with no simple place to capture, edit and revisit them from any device.',
      solution: 'Built a MERN app with create, edit and delete flows, persistent storage on MongoDB Atlas, and a mobile-friendly Tailwind UI.',
      architecture: 'React + Vite frontend calling an Express REST API (GET, POST, PUT, DELETE on /api/notes), with the backend split into config, routes, controllers and Mongoose models.',
      challenges: 'Structuring a clean backend for a first full-stack project: separating routes, controllers and models so the API stays easy to extend, with user authentication next on the roadmap.',
      github: 'https://github.com/vidhisingh24/ThinkBoard',
      demo: 'https://thinkboard-v29z.onrender.com/'
    }
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[20%] right-[-25%] w-[400px] h-[400px] bg-lavender/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[20%] left-[-25%] w-[400px] h-[400px] bg-softpink/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-dark lavender">Selected Work</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-950 dark:text-white">
            Engineering Real-World Products
          </h2>
          <p className="text-slate-900 dark:text-slate-500 max-w-xl text-xs md:text-sm font-sans font-semibold">
            Recruiter-ready case studies highlighting production-grade architectures, metrics, and technical challenges solved.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full mt-1" />
        </div>

        {/* Big & Heavy Horizontal Rows */}
        <div className="space-y-16">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <GlassCard
                className={`w-full border border-slate-200 dark:border-glassBorderDark p-8 lg:p-12 relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl ${proj.borderGlow}`}
                noTilt
              >
                {/* Background glow shape inside card */}
                <div className={`absolute top-[-20%] right-[-25%] w-[350px] h-[350px] bg-gradient-to-br ${proj.gradient} rounded-full blur-[70px] -z-10 pointer-events-none`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                  {/* Left Column: Title, Tech, Links, Metrics */}
                  <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-800 dark:text-slate-700">
                          {proj.subtitle}
                        </span>
                        <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-mint border border-green-200 dark:border-green-900/40 uppercase tracking-wider flex items-center gap-1 select-none">
                          <CheckCircle2 size={8} /> Active System
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-950 dark:text-white">
                        {proj.title}
                      </h3>

                      <p className="text-xs md:text-sm text-slate-900 dark:text-slate-500 font-sans leading-relaxed font-semibold">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech tag cloud */}
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 font-sans">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <span key={t} className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800 font-sans transition-colors cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact metrics panel */}
                    <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-sans">Highlights</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {Object.entries(proj.metrics).map(([key, val]) => (
                          <div key={key} className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-900/50 transition-all duration-300">
                            <p className="text-[8px] uppercase font-extrabold text-purple-650 dark:text-purple-400 font-sans tracking-wide">{key}</p>
                            <p className="text-xs font-bold text-slate-950 dark:text-white mt-1.5 font-display leading-tight">{val}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href={proj.caseStudy.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-950 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors text-xs font-bold shadow-md cursor-pointer border border-transparent"
                      >
                        <Github size={14} /> GitHub Repository
                      </a>
                      {proj.caseStudy.demo && (
                        <a
                          href={proj.caseStudy.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-all text-xs font-bold shadow-xs border border-slate-200 dark:border-slate-750 cursor-pointer"
                        >
                          Live Demo <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Code Editor Terminal Mockup */}
                  <div className={`lg:col-span-7 flex flex-col bg-[#0b0f17] border border-slate-800 rounded-2xl shadow-xl overflow-hidden min-h-[380px] w-full ${idx % 2 === 1 ? 'lg:order-first' : ''}`}>
                    {/* Window Title Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-900 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tight flex items-center gap-1.5">
                        {proj.title.toLowerCase().replace(/\s+/g, '-')}-case-study.json
                      </span>
                      <div className="w-10 h-2" />
                    </div>

                    {/* Window File Tabs */}
                    <div className="flex bg-[#161b22] border-b border-slate-900 text-[10px] font-mono select-none">
                      <div className="px-4 py-2 bg-[#0b0f17] text-purple-400 border-r border-slate-900 font-bold flex items-center gap-1.5">
                        <span>📝</span> case-study.json
                      </div>
                    </div>

                    {/* Code Area */}
                    <div className="p-6 md:p-8 space-y-5 overflow-y-auto flex-1 font-mono text-[11px] md:text-xs leading-relaxed text-[#c9d1d9] bg-[#0b0f17]">
                      {/* JSON Challenge */}
                      <div className="space-y-1">
                        <p className="text-slate-500 font-bold font-mono">// 01. THE PROBLEM CHALLENGE</p>
                        <p className="font-mono">
                          <span className="text-[#ff7b72] font-bold">"challenge"</span>
                          <span className="text-slate-400 font-bold">:</span>{' '}
                          <span className="text-[#a5d6ff] font-sans font-semibold">"{proj.caseStudy.problem}"</span>
                        </p>
                      </div>

                      {/* JSON Solution */}
                      <div className="space-y-1 pt-4 border-t border-slate-900">
                        <p className="text-slate-500 font-bold font-mono">// 02. IMPLEMENTED RESOLUTION</p>
                        <p className="font-mono">
                          <span className="text-[#ff7b72] font-bold">"solution"</span>
                          <span className="text-slate-400 font-bold">:</span>{' '}
                          <span className="text-[#a5d6ff] font-sans font-semibold">"{proj.caseStudy.solution}"</span>
                        </p>
                      </div>

                      {/* JSON System Design */}
                      <div className="space-y-1 pt-4 border-t border-slate-900 font-mono">
                        <p className="text-slate-500 font-bold font-mono">// 03. SYSTEM DESIGN ARCHITECTURE</p>
                        <p className="pl-4 font-mono">
                          <span className="text-[#ff7b72] font-bold">"pattern"</span>
                          <span className="text-slate-400 font-bold">:</span>{' '}
                          <span className="text-[#a5d6ff] font-sans font-semibold">"{proj.caseStudy.architecture}"</span>
                        </p>
                        <p className="pl-4 mt-2 font-mono">
                          <span className="text-[#ff7b72] font-bold">"challengesSolved"</span>
                          <span className="text-slate-400 font-bold">:</span>{' '}
                          <span className="text-[#a5d6ff] font-sans font-semibold">"{proj.caseStudy.challenges}"</span>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
