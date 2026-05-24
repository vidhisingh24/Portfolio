import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Database, LineChart, Cpu, MessageSquareCode } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const steps = [
  {
    phase: 'Phase 1',
    title: 'Data Foundations',
    subtitle: 'Data Preprocessing & EDA',
    desc: 'Mastered Pandas and NumPy for multidimensional arrays mathematical manipulations and data cleaning. Constructed charts using Matplotlib and Seaborn to spot anomalies and correlations.',
    icon: <Database className="text-purple-500" size={20} />,
    color: 'border-purple-300 dark:border-purple-900/60'
  },
  {
    phase: 'Phase 2',
    title: 'Statistical Learning',
    subtitle: 'Classical Machine Learning',
    desc: 'Built training sets and implemented Scikit-learn algorithms (Linear Regression, Random Forest, K-Nearest Neighbors, SVM) to run classification, regression, and data clustering models.',
    icon: <LineChart className="text-pink-500" size={20} />,
    color: 'border-pink-300 dark:border-pink-900/60'
  },
  {
    phase: 'Phase 3',
    title: 'Deep Frontiers',
    subtitle: 'Neural Networks & Deep Learning',
    desc: 'Studying neural network architectures, layer weights optimization, cost functions, gradient descent, and convolutional layers using TensorFlow/Keras playgrounds.',
    icon: <Cpu className="text-blue-500" size={20} />,
    color: 'border-blue-300 dark:border-blue-900/60'
  },
  {
    phase: 'Phase 4',
    title: 'AI App Integration',
    subtitle: 'Intelligent Software Systems',
    desc: 'Connecting trained predictive models and natural language parsers with React/Express backends to build smart user applications (like the MedEase AI healthcare checkups).',
    icon: <MessageSquareCode className="text-green-500" size={20} />,
    color: 'border-green-300 dark:border-green-900/60'
  }
];

const AIJourney = () => {
  return (
    <section id="ai-journey" className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[30%] left-[-25%] w-[400px] h-[400px] bg-softpink/5 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[-25%] w-[350px] h-[350px] bg-lavender/5 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text- dark lavender">AI & ML Path</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-950 dark:text-white flex items-center justify-center gap-2">
            <BrainCircuit className="text-purple-500 animate-pulse" size={32} /> AI & Machine Learning Journey
          </h2>
          <p className="text-slate-900 dark:text-slate-500 max-w-xl text-xs md:text-sm font-sans font-medium">
            How I explore data science, train predictive estimators, and integrate intelligence into modern software stacks.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard
                className={`h-full border border-glassBorder dark:border-glassBorderDark p-6 flex flex-col justify-between hover:scale-[1.03] transition-all relative overflow-hidden`}
                scale={1.02}
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-purple-700 dark:text-lavender bg-purple-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-purple-100 dark:border-slate-800">
                      {step.phase}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/50 dark:bg-slate-800/50 flex items-center justify-center shadow-sm">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold font-display text-slate-900 dark:text-white mt-1">
                    {step.title}
                  </h3>

                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-600 font-sans mt-0.5 animate-pulse">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-slate-900 dark:text-slate-500 mt-4 leading-relaxed font-sans font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-bold font-sans">
                  Milestone Completed
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AIJourney;
