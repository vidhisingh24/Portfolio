import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const projects = [
  {
    id: 1,
    title: 'MedEase AI',
    subtitle: 'Intelligent Healthcare Ecosystem',
    description: 'A production-grade healthcare ecosystem combining an AI-driven symptom checker, digital lockers with OCR classification, doctor scheduling maps, and dual-language SOS triggers.',
    gradient: 'from-purple-500/10 via-indigo-500/10 to-lavender/20',
    borderGlow: 'hover:border-purple-300 dark:hover:border-purple-900/60',
    tech: ['Next.js 13', 'React 18', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Leaflet', 'JWT Auth'],
    metrics: {
      accuracy: '94.2% AI Accuracy',
      latency: '< 180ms Diagnostic Response',
      users: 'Multi-profile Support'
    },
    caseStudy: {
      problem: 'Traditional healthcare delivery is highly fragmented, leaving users struggling to aggregate laboratory reports, receive instant symptom feedback, contact local doctors, or dispatch immediate SOS tracking coordinate packets during emergencies.',
      solution: 'Constructed an all-in-one ecosystem integrating client-side rule engines for initial symptom checks, digital lockers with OCR classifications, real-time doctor scheduling maps, and dual-language interfaces (English & हिंदी) with voice commands.',
      architecture: 'Model-View-Controller pattern in Next.js. State manages multilocational coordinates and triggers background asynchronous geocoding requests. PDF parsers decode uploaded medical credentials client-side.',
      challenges: 'Solving secure cross-profile medical authorization and reducing geocoding latency. Solved using hashed cookie tables and caching Leaflet maps layer caches.',
      github: 'https://github.com/vidhisingh24/MedEase-AI',
      demo: 'https://github.com/vidhisingh24/MedEase-AI'
    }
  },
  {
    id: 2,
    title: 'ZeroWasteLink 2.0',
    subtitle: 'Food Rescue Ecosystem',
    description: 'A real-time distribution engine connecting restaurants, NGOs, and food rescue volunteers across India to prevent food waste through dynamic routing and quality checks.',
    gradient: 'from-emerald-500/10 via-teal-500/10 to-mint/20',
    borderGlow: 'hover:border-emerald-300 dark:hover:border-emerald-900/60',
    tech: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Socket.io', 'Leaflet Map', 'Recharts'],
    metrics: {
      routing: 'Dynamic Route Optimization',
      freshness: 'AI Freshness Analysis',
      delivery: 'Real-time Socket Sync'
    },
    caseStudy: {
      problem: 'Tons of high-quality restaurant leftovers are discarded due to communication gaps between commercial kitchens and non-profit distributing channels, paired with delivery delays that compromise food safety.',
      solution: 'Developed a WebSockets-powered hub mapping food donor pins against NGOs. Users utilize automated freshness estimates and volunteers claim delivery nodes with interactive route overlays.',
      architecture: 'Distributed pub/sub event stream via Socket.io. Database models partition volunteer records, organization profile scopes, and donation ticket statuses. Geographic queries leverage MongoDB geospatial indexing.',
      challenges: 'Handling concurrent state syncs when multiple volunteers claim the same batch. Solved using atomic document locks and optimistic concurrency UI rollbacks.',
      github: 'https://github.com/vidhisingh24/ZeroWasteLink-2.0',
      demo: 'https://github.com/vidhisingh24/ZeroWasteLink-2.0'
    }
  },
  {
    id: 3,
    title: 'AI Study Companion',
    subtitle: 'Intelligent Student Productivity Tool',
    description: 'An adaptive educational assistant offering customized flashcards, automated notes, custom PDF summaries, quiz triggers, and behavioral analytics charts.',
    gradient: 'from-pink-500/10 via-rose-500/10 to-softpink/20',
    borderGlow: 'hover:border-pink-300 dark:hover:border-pink-900/60',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Natural NLP', 'Framer Motion', 'Tailwind'],
    metrics: {
      generation: 'Instant QA Flashcards',
      retention: 'Adaptive repeat intervals',
      summarizer: 'Hierarchical PDF summaries'
    },
    caseStudy: {
      problem: 'Students face information overload, struggling to extract active recall cards from long textbooks and monitor study efficiency metrics over semesters.',
      solution: 'Built an NLP study organizer. Students upload study PDFs; the server extracts key definitions, generates multiple-choice quizzes, structures study timelines, and tracks session timers.',
      architecture: 'Express backend reading uploaded files into natural language parsing pipelines, converting texts to tokens, extracting high-frequency technical noun pairs, and saving questions into user-scoped study decks.',
      challenges: 'Generating accurate, grammatically sound question-answer pairs without high LLM API billing. Solved using client-side sentence mapping and rule-based heuristic parsing.',
      github: 'https://github.com/vidhisingh24/AI-Study-Companion',
      demo: 'https://github.com/vidhisingh24/AI-Study-Companion'
    }
  },
  {
    id: 4,
    title: 'DevTrack Analytics',
    subtitle: 'GitHub Metrics Dashboard',
    description: 'A developer metrics analytics platform parsing API datasets to generate repository health scoring, language pie charts, and streak calendars.',
    gradient: 'from-blue-500/10 via-sky-500/10 to-skyblue/20',
    borderGlow: 'hover:border-blue-300 dark:hover:border-blue-900/60',
    tech: ['React 18', 'GitHub API', 'Recharts', 'Tailwind CSS', 'Framer Motion', 'Vanilla CSS'],
    metrics: {
      integration: 'Dynamic API Fetching',
      data: 'Rich SVG Render Engine',
      caching: 'Local Storage State Sync'
    },
    caseStudy: {
      problem: 'GitHub profiles are static and lack clear developer productivity insights, language balances, or comparative analysis visualizations to impress recruiters in 5 seconds.',
      solution: 'Constructed a dynamic analytics console. It queries the GitHub REST API for a user, aggregates repository sizes, parses programming languages, and compiles coding activity charts.',
      architecture: 'React state engine with hook triggers. Employs SVG components for calendar styling and Recharts layout modules for repository weight distributions.',
      challenges: 'Handling client-side GitHub API rate limits. Resolved using token-scoped API options and local storage caching profiles for rapid page loads.',
      github: 'https://github.com/vidhisingh24/DevTrack-Analytics',
      demo: 'https://github.com/vidhisingh24/DevTrack-Analytics'
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
                        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-650 dark:text-lavender">
                          {proj.subtitle}
                        </span>
                        <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-mint border border-green-200 dark:border-green-900/40 uppercase tracking-wider flex items-center gap-1 select-none">
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
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-sans">Key Metrics</h4>
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
                      <a
                        href={proj.caseStudy.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 transition-all text-xs font-bold shadow-xs border border-slate-200 dark:border-slate-750 cursor-pointer"
                      >
                        Live Demo <ArrowUpRight size={14} />
                      </a>
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
