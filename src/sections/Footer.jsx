import React from 'react';
import { Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative border-t border-glassBorder dark:border-glassBorderDark bg-white/20 dark:bg-[#080c13] py-12 overflow-hidden">
      {/* Subtle glow blob */}
      <div className="absolute bottom-0 left-[45%] w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-8 md:flex-row text-center md:text-left">
        
        {/* Logo and Tagline */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 font-display text-base font-bold tracking-tight text-slate-800 dark:text-white select-none">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-lavender via-softpink to-skyblue flex items-center justify-center text-slate-900 font-black">
              <Sparkles size={12} />
            </div>
            <span>Vidhi Singh</span>
          </div>
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-sans">
            Building software systems & exploring AI solutions.
          </p>
        </div>

        {/* Navigation Shortcut links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-slate-800 dark:hover:text-white transition-colors">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-slate-800 dark:hover:text-white transition-colors">About</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-slate-800 dark:hover:text-white transition-colors">Skills</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-slate-800 dark:hover:text-white transition-colors">Projects</a>
          <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')} className="hover:text-slate-800 dark:hover:text-white transition-colors">Experience</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-slate-800 dark:hover:text-white transition-colors">Contact</a>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/vidhisingh24"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-glassBorder dark:border-glassBorderDark transition-colors shadow-sm"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href="https://LinkedIn.com/in/vidhi-singh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-glassBorder dark:border-glassBorderDark transition-colors shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:vidhiisingh2403@gmail.com"
            className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-glassBorder dark:border-glassBorderDark transition-colors shadow-sm"
            aria-label="Email Address"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      {/* Trademark signature divider bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-100 dark:border-slate-900/60 flex flex-col items-center justify-between gap-4 md:flex-row text-[10px] text-slate-400 dark:text-slate-500">
        <p>&copy; {currentYear} Vidhi Singh. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed & Developed with <Heart size={10} className="text-red-400 fill-red-400 animate-pulse" /> by Vidhi Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
