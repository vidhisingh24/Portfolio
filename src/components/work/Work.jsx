import { useEffect, useRef } from 'react';
import { GitHubIcon } from '../Icons';
import { projects } from '../../data/projects';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const ProjectCard = ({ project, index, onOpen, register }) => {
  const { card, shot, links } = project;
  return (
    <article
      ref={(el) => register(index, el)}
      className="pcard"
      aria-labelledby={`pcard-${project.id}`}
      style={{ '--card-bg': card.bg, '--card-fg': card.fg, '--card-glow': card.glow }}
    >
      <div className="pcard__bg" aria-hidden="true" />
      <div className="pcard__inner">
        <div className="pcard__shot">
          <div className="pcard__track" data-track>
            <img
              src={shot.srcSm}
              srcSet={`${shot.srcSm} 780w, ${shot.src} 1560w`}
              sizes="(min-width: 1024px) min(820px, 54vw), 88vw"
              width={shot.width}
              height={shot.height}
              alt={shot.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        </div>
        <div className="pcard__meta">
          <h3 className="pcard__title" id={`pcard-${project.id}`}>
            <button type="button" className="pcard__open" aria-haspopup="dialog" data-case={project.id} onClick={() => onOpen(project.id)}>
              {project.title}
            </button>
          </h3>
          <p className="pcard__desc">{project.description}</p>
          <div className="pcard__links">
            <span className="pcard__cta" aria-hidden="true">
              Case study →
            </span>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="pcard__link">
              <GitHubIcon size={13} /> GitHub <span aria-hidden="true">↗</span>
            </a>
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noopener noreferrer" className="pcard__link">
                Live demo <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

/** The project list: one big card per project, screenshots slide inside as you scroll. */
const Work = ({ onOpen }) => {
  const cards = useRef([]);

  const register = (i, el) => {
    cards.current[i] = el;
  };

  // Scroll-linked screenshot strip (skipped under reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const inView = new Set();
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      inView.forEach((el) => {
        const track = el.querySelector('[data-track]');
        const win = track?.parentElement;
        if (!track || !win) return;
        const rect = el.getBoundingClientRect();
        const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
        const max = Math.max(0, track.offsetHeight - win.clientHeight);
        track.style.transform = `translate3d(0, ${(-progress * max).toFixed(1)}px, 0)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        schedule();
      },
      { rootMargin: '10% 0px' },
    );
    cards.current.forEach((el) => el && io.observe(el));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} register={register} />
      ))}
    </>
  );
};

export default Work;
