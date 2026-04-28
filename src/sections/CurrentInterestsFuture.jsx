import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Rocket, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const workingOn = [
  'Data Structures & Algorithms (C++)',
  'Advanced Full-Stack Engineering (React/Vite)',
  'Backend RESTful design (Node.js & Express)',
  'AI & ML predictive estimators pipelines',
  'Participating in Open Source repositories',
  'Refining project user interfaces and portfolios'
];

const interests = [
  'Software Systems Engineering',
  'Artificial Intelligence Algorithms',
  'Machine Learning Classifications',
  'Open Source Codebases',
  'SaaS UI/UX Product Design',
  'Algorithmic Complexity Optimization',
  'Distributed Scalable Backends'
];

const goals = [
  'Transition into a professional Software Engineer',
  'Develop AI-integrated user web platforms',
  'Submit PRs to major international repositories',
  'Acquire highly competitive tech internships',
  'Collaborate in hackathons to solve community bugs'
];

const CurrentInterestsFuture = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white/20 dark:bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-[30%] right-[-25%] w-[350px] h-[350px] bg-mint/5 rounded-full blur-[90px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-lavender">Focus & Vision</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-955 dark:text-white">
            Vision & Focus
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full animate-pulse-slow" />
        </div>

        {/* 3-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Currently Working On */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex"
          >
            <GlassCard className="border border-glassBorder dark:border-glassBorderDark p-8 flex flex-col justify-between h-full w-full shadow-xs" noTilt>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-slate-800 flex items-center justify-center border border-purple-100 dark:border-slate-800 shrink-0">
                    <Sparkles className="text-purple-650" size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">
                    Currently Working On
                  </h3>
                </div>

                <ul className="space-y-4">
                  {workingOn.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-655 dark:text-slate-300 font-sans leading-relaxed font-semibold">
                      <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-slate-200 dark:border-slate-850 text-[10px] text-slate-500 dark:text-slate-400 font-bold font-sans">
                Active Coding Agenda
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 2: Core Interests */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex"
          >
            <GlassCard className="border border-glassBorder dark:border-glassBorderDark p-8 flex flex-col justify-between h-full w-full shadow-xs" noTilt>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-slate-800 flex items-center justify-center border border-pink-100 dark:border-slate-800 shrink-0">
                    <Heart className="text-pink-650" size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">
                    Core Technical Interests
                  </h3>
                </div>

                <ul className="space-y-4">
                  {interests.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-655 dark:text-slate-300 font-sans leading-relaxed font-semibold">
                      <CheckCircle2 size={16} className="text-pink-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-slate-200 dark:border-slate-850 text-[10px] text-slate-500 dark:text-slate-400 font-bold font-sans">
                Areas of Interest
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 3: Future Goals */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex"
          >
            <GlassCard className="border border-glassBorder dark:border-glassBorderDark p-8 flex flex-col justify-between h-full w-full shadow-xs" noTilt>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center border border-blue-100 dark:border-slate-800 shrink-0">
                    <Rocket className="text-blue-650" size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">
                    Future Goals
                  </h3>
                </div>

                <ul className="space-y-4">
                  {goals.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-655 dark:text-slate-300 font-sans leading-relaxed font-semibold">
                      <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-slate-200 dark:border-slate-850 text-[10px] text-slate-500 dark:text-slate-400 font-bold font-sans">
                Professional Vision
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CurrentInterestsFuture;
