import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, LayoutTemplate, Database, BrainCircuit } from 'lucide-react';
import {
  SiCplusplus, SiPython, SiJavascript, SiC,
  SiReact, SiTailwindcss, SiHtml5, SiBootstrap,
  SiNodedotjs, SiExpress, SiGit, SiGithub,
  SiLinux, SiFigma, SiPostman, SiNumpy, SiPandas,
  SiTensorflow, SiScikitlearn
} from 'react-icons/si';
import { FaJava, FaChartLine } from 'react-icons/fa';
import { TbBrandVscode } from 'react-icons/tb';
import GlassCard from '../components/GlassCard';

const categories = [
  { id: 'all', name: 'All Skills', icon: <Code2 size={14} /> },
  { id: 'languages', name: 'Languages', icon: <Code2 size={14} /> },
  { id: 'frontend', name: 'Frontend', icon: <LayoutTemplate size={14} /> },
  { id: 'backend-tools', name: 'Backend & Tools', icon: <Database size={14} /> },
  { id: 'ai-ml', name: 'AI & ML', icon: <BrainCircuit size={14} /> },
];

const skills = [
  // Languages
  { name: 'C++', category: 'languages', level: 'Advanced', desc: 'Primary language for Data Structures & Algorithms.', icon: <SiCplusplus className="text-[#00599C]" size={24} /> },
  { name: 'Python', category: 'languages', level: 'Proficient', desc: 'Utilized for AI/ML development and scripting.', icon: <SiPython className="text-[#3776AB]" size={24} /> },
  { name: 'JavaScript', category: 'languages', level: 'Proficient', desc: 'Core language for React applications and web logic.', icon: <SiJavascript className="text-[#F7DF1E] bg-black p-0.5 rounded-[2px]" size={24} /> },
  { name: 'C', category: 'languages', level: 'Prior Knowledge', desc: 'Academic understanding of pointer systems and memory.', icon: <SiC className="text-[#A8B9CC]" size={24} /> },
  { name: 'Java', category: 'languages', level: 'Prior Knowledge', desc: 'Object-Oriented programming structures and logic.', icon: <FaJava className="text-[#ED8B00]" size={24} /> },

  // Frontend
  { name: 'React', category: 'frontend', level: 'Proficient', desc: 'SPA development using functional hooks.', icon: <SiReact className="text-[#61DAFB]" size={24} /> },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Proficient', desc: 'Utility-first CSS styling for rapid fluid UIs.', icon: <SiTailwindcss className="text-[#06B6D4]" size={24} /> },
  { name: 'HTML5 & CSS3', category: 'frontend', level: 'Advanced', desc: 'Semantic layouts and responsive styled variables.', icon: <SiHtml5 className="text-[#E34F26]" size={24} /> },
  { name: 'Bootstrap', category: 'frontend', level: 'Proficient', desc: 'Grid spacing and responsive class extensions.', icon: <SiBootstrap className="text-[#7952B3]" size={24} /> },

  // Backend & Tools
  { name: 'Node.js', category: 'backend-tools', level: 'Learning', desc: 'Server side JavaScript runs and configurations.', icon: <SiNodedotjs className="text-[#339933]" size={24} /> },
  { name: 'Express.js', category: 'backend-tools', level: 'Learning', desc: 'REST API routing and local server setups.', icon: <SiExpress className="text-slate-800 dark:text-slate-200" size={24} /> },
  { name: 'Git', category: 'backend-tools', level: 'Advanced', desc: 'Branching, merging, and CLI repository management.', icon: <SiGit className="text-[#F05032]" size={24} /> },
  { name: 'GitHub', category: 'backend-tools', level: 'Advanced', desc: 'Hosting code, PR reviews, and open-source flows.', icon: <SiGithub className="text-slate-800 dark:text-slate-200" size={24} /> },
  { name: 'VS Code', category: 'backend-tools', level: 'Advanced', desc: 'Primary IDE optimized with custom extensions.', icon: <TbBrandVscode className="text-[#007ACC]" size={24} /> },
  { name: 'Linux', category: 'backend-tools', level: 'Intermediate', desc: 'CLI navigation, process administration, and shell scripts.', icon: <SiLinux className="text-[#FCC624]" size={24} /> },
  { name: 'Figma', category: 'backend-tools', level: 'Intermediate', desc: 'Wireframing, UI mockup assets, and component spacing.', icon: <SiFigma className="text-[#F24E1E]" size={24} /> },
  { name: 'Postman', category: 'backend-tools', level: 'Intermediate', desc: 'Testing HTTP endpoints, payloads, and JSON models.', icon: <SiPostman className="text-[#FF6C37]" size={24} /> },

  // AI & ML
  { name: 'NumPy', category: 'ai-ml', level: 'Proficient', desc: 'N-dimensional arrays and matrix algebra functions.', icon: <SiNumpy className="text-[#013243]" size={24} /> },
  { name: 'Pandas', category: 'ai-ml', level: 'Proficient', desc: 'Data cleaning, dataframes manipulation, and analyses.', icon: <SiPandas className="text-[#150458]" size={24} /> },
  { name: 'Matplotlib', category: 'ai-ml', level: 'Proficient', desc: 'Visual charts, histograms, and mathematical graphs.', icon: <FaChartLine className="text-[#11557c]" size={24} /> },
  { name: 'Scikit-learn', category: 'ai-ml', level: 'Intermediate', desc: 'Predictive models, classification, regression tools.', icon: <SiScikitlearn className="text-[#F7931E]" size={24} /> },
  { name: 'TensorFlow', category: 'ai-ml', level: 'Learning', desc: 'Studying neural networks and tensor computations.', icon: <SiTensorflow className="text-[#FF6F00]" size={24} /> },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-white/20 dark:bg-transparent">
      {/* Glow Blob */}
      <div className="absolute top-[40%] right-[-25%] w-[350px] h-[350px] bg-mint/5 rounded-full blur-[90px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-dark lavender">Tech Stack</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-950 dark:text-white">
            Tools of the Trade
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${activeCategory === cat.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-105'
                  : 'glass-effect text-slate-700 hover:text-slate-950 dark:text-slate-355 dark:hover:text-white border border-glassBorder dark:border-glassBorderDark'
                }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
              >
                <GlassCard
                  className="h-full border border-glassBorder dark:border-glassBorderDark p-5 flex flex-col justify-between"
                  scale={1.03}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-xs border border-slate-100 dark:border-slate-800 shrink-0">
                          {skill.icon}
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white font-display text-sm tracking-wide">
                          {skill.name}
                        </h4>
                      </div>

                      <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${skill.level === 'Advanced' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-lavender' :
                          skill.level === 'Proficient' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-skyblue' :
                            skill.level === 'Intermediate' ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-softpink' :
                              'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-mint'
                        }`}>
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans mt-3 font-medium">
                      {skill.desc}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
