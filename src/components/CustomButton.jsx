import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  href, 
  download, 
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Apply dampening so it pulls but remains constrained (e.g. max 15px displacement)
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center font-medium font-sans text-sm tracking-wide px-7 py-3.5 rounded-full transition-all duration-300 overflow-hidden cursor-pointer select-none focus:outline-none outline-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-lavender via-softpink to-skyblue text-slate-800 font-semibold shadow-md hover:shadow-lg dark:hover:shadow-lavender/10 border border-white/20",
    secondary: "glass-effect text-slate-700 dark:text-slate-200 border border-glassBorder dark:border-glassBorderDark hover:bg-white/30 dark:hover:bg-slate-800/40",
    outline: "border-2 border-lavender/60 text-slate-800 dark:text-lavender hover:bg-lavender hover:text-slate-900 dark:hover:bg-lavender dark:hover:text-slate-950",
  };

  const isLink = !!href;
  const Component = isLink ? 'a' : 'button';
  const elementProps = isLink 
    ? { href, download, rel: download ? undefined : 'noopener noreferrer', target: download ? undefined : '_blank', ...props } 
    : { onClick, ...props };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
      className="inline-block"
    >
      <Component
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...elementProps}
      >
        <span className="relative z-10 flex items-center gap-2 font-sans font-semibold">{children}</span>
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-gradient-to-r from-skyblue via-softpink to-lavender opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />
        )}
      </Component>
    </motion.div>
  );
};

export default CustomButton;
