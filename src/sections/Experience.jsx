import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GitBranch, Code, ShieldCheck, Zap } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const experiences = [
  {
    role: 'Open Source Contributor',
    org: 'GirlScript Summer of Code (GSSoC)',
    duration: 'May 2026 - Present',
    icon: <GitBranch className="text-purple-500" size={18} />,
    points: [
      'Contributed documentation refinements and frontend user interface modifications across public program repositories.',
      'Collaborated alongside developers via GitHub, reviewing commits, resolving merge conflicts, and aligning features.',
      'Debugged logic errors within JavaScript components, refining responsiveness controls.'
    ]
  },
  {
    role: 'Open Source Contributor',
    org: 'Summer of Source Code (SSOC)',
    duration: 'April 2026 - Present',
    icon: <Code className="text-pink-500" size={18} />,
    points: [
      'Submitted pull requests containing structural styles optimizations and responsive adjustments.',
      'Refined component reuse constraints within open-source React dashboards, improving layout weights.',
      'Maintained active communication lines inside Discord channels to align project scopes.'
    ]
  },
  {
    role: 'Open Source Contributor',
    org: 'Global Repositories (Independent)',
    duration: '2025 - Present',
    icon: <Briefcase className="text-blue-500" size={18} />,
    points: [
      'Forked and optimized coding scripts inside utility projects, optimizing functions efficiency.',
      'Reported runtime errors and created documentation updates in community packages.',
      'Utilized git branching best practices to ensure clear version histories.'
    ]
  },
  {
    role: 'Student Developer',
    org: 'Computer Engineering Department',
    duration: '2025 - Present',
    icon: <ShieldCheck className="text-green-500" size={18} />,
    points: [
      'Constructed course laboratory scripts solving core array searching/sorting algorithms in C++.',
      'Designed presentation slide systems showing how object-oriented patterns solve real-world problems.',
      'Collaborated inside group assignments to manage code integration and testing scopes.'
    ]
  },
  {
    role: 'Independent Project Developer',
    org: 'Self-Directed Engineering Projects',
    duration: '2025 - Present',
    icon: <Zap className="text-yellow-600" size={18} />,
    points: [
      'Designed and coded the MedEase AI healthcare portal and the ZeroWasteLink distribution hub.',
      'Analyzed package specifications and resolved compatibility mismatches during React updates.',
      'Hosted deployments on cloud hosting interfaces, configuring domain redirects.'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-white/20 dark:bg-transparent">
      {/* Background Shadows */}
      <div className="absolute top-[20%] right-[-25%] w-[350px] h-[350px] bg-skyblue/5 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-dark lavender">Background</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-950 dark:text-white">
            Practical Experience
          </h2>
          <p className="text-slate-900 dark:text-slate-500 max-w-xl text-xs md:text-sm font-sans font-medium">
            How I contribute to community programs and engineer software products.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full animate-pulse-slow" />
        </div>

        {/* Experience Timeline Grid */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <GlassCard
                className="border border-glassBorder dark:border-glassBorderDark p-6 hover:border-purple-200 dark:hover:border-slate-800 transition-colors shadow-xs"
                noTilt
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Left Column: Role Details */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-xs shrink-0 border border-slate-100 dark:border-slate-800">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-500 font-sans">
                        {exp.org}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Time duration tag */}
                  <span className="text-[10px] font-bold text-purple-700 dark:text-lavender bg-purple-50 dark:bg-slate-800/60 px-3.5 py-1.5 rounded-full border border-purple-100 dark:border-slate-850 font-sans w-fit">
                    {exp.duration}
                  </span>
                </div>

                {/* Point Description List */}
                <ul className="mt-5 space-y-2.5 ml-1 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-700 dark:text-slate-500 leading-relaxed flex items-start gap-2 font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 dark:bg-slate-300 mt-1.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
