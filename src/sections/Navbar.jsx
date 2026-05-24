import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, FileText, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Journey', href: '#ai-journey' },
  { name: 'Experience', href: '#experience' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scrolling to toggle thin/thick navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is in view
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.name);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href, name) => {
    e.preventDefault();
    setActiveSection(name);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled
        ? 'py-3.5 bg-white/60 dark:bg-slate-950/60 shadow-lg border-b border-glassBorder dark:border-glassBorderDark backdrop-blur-md'
        : 'py-6 bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'Home')}
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-slate-800 dark:text-white cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-lavender via-softpink to-skyblue flex items-center justify-center text-slate-900 font-black shadow-md shadow-purple-500/10 group-hover:scale-105 transition-transform">
              <Sparkles size={16} />
            </div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
              Vidhi.dev
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 glass-effect px-4 py-1.5 rounded-full border border-glassBorder dark:border-glassBorderDark">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors font-sans duration-200 cursor-pointer ${activeSection === item.name
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
              >
                {activeSection === item.name && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/70 dark:bg-slate-800/80 rounded-full -z-10 shadow-sm border border-black/5 dark:border-white/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Items */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-white/50 border border-glassBorder dark:bg-slate-800/40 dark:border-glassBorderDark flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all shadow-sm cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Resume Button */}
            <CustomButton
              variant="primary"
              className="!py-2.5 !px-5 text-xs font-semibold"
              href="#resume-placeholder"
              download="Vidhi_Singh_Resume.pdf"
            >
              <FileText size={14} /> Resume
            </CustomButton>
          </div>

          {/* Mobile Actions Container (Hamburger & Theme Toggle) */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-white/60 dark:bg-slate-800/40 border border-glassBorder dark:border-glassBorderDark flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-white/60 dark:bg-slate-800/40 border border-glassBorder dark:border-glassBorderDark flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav >

      {/* Mobile Menu Panel */}
      < AnimatePresence >
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-[70px] left-0 w-full z-30 lg:hidden glass-effect border-b border-glassBorder dark:border-glassBorderDark shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide font-sans transition-colors ${activeSection === item.name
                    ? 'bg-gradient-to-r from-lavender/30 to-softpink/30 text-purple-700 dark:text-lavender'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                    }`}
                >
                  {item.name}
                </a>
              ))}

              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />

              <div className="flex items-center justify-between gap-4 px-2">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Recruiter Actions</span>
                <a
                  href="#resume-placeholder"
                  download="Vidhi_Singh_Resume.pdf"
                  className="flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-lavender via-softpink to-skyblue text-slate-800 px-5 py-2.5 rounded-full shadow-md"
                >
                  <FileText size={14} /> Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )
        }
      </AnimatePresence >
    </>
  );
};

export default Navbar;
