import { m, useReducedMotion } from 'framer-motion';

/**
 * Fade-up on scroll (~0.4s). Renders a plain element when the visitor
 * prefers reduced motion. Use `delay` (e.g. index * 0.06) to stagger cards.
 */
const Reveal = ({ as = 'div', delay = 0, className = '', children, ...rest }) => {
  const reduce = useReducedMotion();

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  const MotionTag = m[as] ?? m.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(delay, 0.4) }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
