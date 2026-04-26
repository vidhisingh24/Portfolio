import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Users, Flame, BookMarked, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const achievements = [
  {
    title: 'Advanced Project Engineering',
    desc: 'Engineered MedEase AI and ZeroWasteLink 2.0 with professional responsive design and rich client validation.',
    val: '4 Platforms Built',
    icon: <Layers className="text-purple-500" size={22} />
  },
  {
    title: 'Open Source Footprint',
    desc: 'Contributed code to repositories during GSSoC and SSOC programs, reviewing code standards.',
    val: 'GSSoC & SSOC Contributor',
    icon: <Users className="text-pink-500" size={22} />
  },
  {
    title: 'Algorithms Mastery',
    desc: 'Practiced and solved structures, sorting, and recursion problems in C++ to improve algorithmic coding speeds.',
    val: '150+ Solved Problems',
    icon: <Code2 className="text-blue-500" size={22} />
  },
  {
    title: 'AI & Data Science Curriculum',
    desc: 'Analyzed datasets and completed self-paced predictive training modules with Pandas and Scikit-Learn.',
    val: '5 AI Models Designed',
    icon: <Award className="text-green-500" size={22} />
  },
  {
    title: 'GitHub Commit Stabs',
    desc: 'Maintained active repositories, created code branches, and updated daily progress checklists.',
    val: '300+ Contributions',
    icon: <Flame className="text-orange-500" size={22} />
  },
  {
    title: 'Hackathon Collaborations',
    desc: 'Participated in university prototyping rounds, drafting frontends and UI layouts (Future/Active).',
    val: 'Hackathon Participant',
    icon: <BookMarked className="text-yellow-600" size={22} />
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Background Blob */}
      <div className="absolute top-[30%] left-[-25%] w-[300px] h-[300px] bg-softpink/5 rounded-full blur-[80px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-lavender">Milestones</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-950 dark:text-white">
            Key Accomplishments
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full" />
        </div>

        {/* Grid Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <GlassCard 
                className="h-full border border-glassBorder dark:border-glassBorderDark p-7 flex flex-col justify-between hover:scale-[1.03] transition-all shadow-xs"
                scale={1.02}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-xs border border-slate-100 dark:border-slate-800">
                      {ach.icon}
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white font-display">
                      {ach.val}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    {ach.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed font-sans font-medium">
                    {ach.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-bold font-sans">
                  Verified Milestone
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
