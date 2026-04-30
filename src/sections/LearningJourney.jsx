import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Layers, Share2, Brain, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const steps = [
  {
    phase: 'Step 1',
    title: 'Computer Engineering Basics',
    desc: 'Began Bachelor of Engineering. Studied logic structures, boolean math, and hardware architecture principles.',
    icon: <GraduationCap className="text-purple-500" size={18} />
  },
  {
    phase: 'Step 2',
    title: 'Programming & Logic',
    desc: 'Practiced C++ coding syntax. Solved arrays, sorting, recursion, and object-oriented structure problems.',
    icon: <Code className="text-pink-500" size={18} />
  },
  {
    phase: 'Step 3',
    title: 'Full Stack Development',
    desc: 'Mastered React 18 frontend layouts, CSS styles, Node.js packages, API calls, and local server routing.',
    icon: <Layers className="text-blue-500" size={18} />
  },
  {
    phase: 'Step 4',
    title: 'Open Source Collaborations',
    desc: 'Contributed to GitHub projects during GSSoC and SSOC, adjusting layouts and coding validations.',
    icon: <Share2 className="text-green-600" size={18} />
  },
  {
    phase: 'Step 5',
    title: 'AI & Data Analysis Models',
    desc: 'Studied dataset matrices using NumPy/Pandas. Implemented estimator models in Scikit-Learn.',
    icon: <Brain className="text-teal-500" size={18} />
  },
  {
    phase: 'Step 6',
    title: 'Recruiter Ready Systems',
    desc: 'Bundled case studies into portfolios, verified responsive interfaces, and preparing for engineering internships.',
    icon: <Award className="text-orange-500" size={18} />
  }
];

const LearningJourney = () => {
  return (
    <section id="learning-journey" className="py-24 relative overflow-hidden bg-white/10 dark:bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[-25%] w-[400px] h-[400px] bg-lavender/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-lavender">Roadmap</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-950 dark:text-white">
            My Learning Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full" />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-solid border-slate-400 dark:border-slate-600 max-w-3xl mx-auto pl-8 space-y-10 py-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative"
            >
              {/* Timeline circle dot */}
              <div className="absolute -left-[41px] top-2 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-500 dark:border-slate-500 flex items-center justify-center shadow-sm">
                <span className="w-2 h-2 rounded-full bg-slate-700 dark:bg-slate-300" />
              </div>

              <GlassCard className="border border-glassBorder dark:border-glassBorderDark p-6 shadow-xs" noTilt>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-bold text-purple-700 dark:text-lavender">
                        {step.phase}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-200 mt-3.5 leading-relaxed font-sans font-medium">
                  {step.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LearningJourney;
