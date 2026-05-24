import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, BookOpen, Target, Calendar } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const milestones = [
  {
    year: '2025 - Present',
    title: 'Data Structures & Core Engineering',
    institution: 'Logic & Systems Foundations',
    desc: 'Mastered memory pointer architectures and complex algorithm structures in C++. Hand-implemented binary trees, search heaps, sorting optimizations, and space complexity metrics.',
  },
  {
    year: '2026 - Present',
    title: 'Open Source Contributor',
    institution: 'Community Repositories',
    desc: 'Contributed interface styling layouts and component validation features during GSSoC and SSOC programs. Mastered Git branching protocols and collaborative peer reviews.',
  },
  {
    year: '2026',
    title: 'Full-Stack & Machine Learning Models',
    institution: 'Intelligent Web Applications',
    desc: 'Constructed custom responsive platforms using React/Vite, Tailwind, and Node.js. Developed predictive models using Scikit-Learn and statistical calculations in Pandas/NumPy.',
  }
];

const strengths = [
  { title: 'Algorithmic Logic', desc: 'Active solver of C++ DSA problems, optimizing spatial and time complexities.', icon: <Award className="text-purple-400" size={20} /> },
  { title: 'Full Stack Adaptability', desc: 'Rapidly picking up React, Node.js, and databases to build complete responsive apps.', icon: <Compass className="text-pink-400" size={20} /> },
  { title: 'AI/ML Focus', desc: 'Applying NumPy, Pandas, Scikit-learn, and neural theory concepts to raw data.', icon: <Target className="text-blue-400" size={20} /> },
  { title: 'Open Source Spirit', desc: 'Collaborating on git repositories, reviewing pull requests, and building community.', icon: <BookOpen className="text-green-400" size={20} /> }
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[30%] left-[-25%] w-[300px] h-[300px] bg-skyblue/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-dark lavender">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-950 dark:text-white">
            Transforming Curiosity into Code
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full" />
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side: Bio and Core Values */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Who is Vidhi Singh?
            </h3>

            <p className="text-sm md:text-base text-slate-900 dark:text-slate-500 leading-relaxed font-sans font-medium">
              I am an ambitious 1st Year Computer Engineering student dedicated to mastering the art and science of software systems. Rather than waiting for senior years, I actively engage in real-world application design, open-source program contributions, and practical machine learning pipelines.
            </p>

            <p className="text-sm md:text-base text-slate-900 dark:text-slate-500 leading-relaxed font-sans font-medium">
              My core mission is to construct applications that solve tangible human challenges, combining clean modular architectures with visually stunning user experiences. I thrive at the intersection of algorithmic rigor, aesthetic frontends, and intelligent machine learning backends.
            </p>

            {/* Core Values / Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {strengths.map((str, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl glass-effect border border-glassBorder dark:border-glassBorderDark flex items-center justify-center shrink-0 shadow-sm">
                    {str.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white font-sans">{str.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-sans font-medium">{str.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Tech Journey Timeline */}
          <div className="lg:col-span-6">
            <GlassCard className="border border-glassBorder dark:border-glassBorderDark p-8 shadow-sm" noTilt>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-purple-400 animate-pulse" /> Tech Journey
              </h3>

              <div className="relative border-l-2 border-solid border-slate-400 dark:border-slate-600 ml-4 space-y-8 py-2">
                {milestones.map((ms, idx) => (
                  <div key={idx} className="relative pl-8">
                    {/* Circle Node */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-700 dark:bg-slate-300 border-2 border-slate-500 dark:border-slate-500 shadow-sm" />

                    <span className="text-[10px] font-bold text-purple-700 dark:text-lavender bg-purple-50 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-purple-150 dark:border-slate-800 font-sans">
                      {ms.year}
                    </span>

                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display mt-2">
                      {ms.title}
                    </h4>

                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                      {ms.institution}
                    </p>

                    <p className="text-xs text-slate-900 dark:text-slate-500 mt-2 leading-relaxed font-sans font-medium">
                      {ms.desc}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
