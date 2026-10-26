import { Suspense, lazy, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Work from '../work/Work';
import ProjectsPanel from './ProjectsPanel';
import OpenSourcePanel from './OpenSourcePanel';
import JourneyPanel from './JourneyPanel';
import SkillsPanel from './SkillsPanel';
import GitHubPanel from './GitHubPanel';
import { projects } from '../../data/projects';
import { OPEN_CASE } from '../work/caseEvents';
import { OPEN_PROJECTS, SHOW_PANEL } from '../../lib/ui';
import { scrollToId } from '../../lib/scroll';

const CaseStudy = lazy(() => import('../work/CaseStudy'));

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Left column.
 * "Panels" view: Projects (cover) → Open source → Achievements & journey → Skills → GitHub activity.
 * Clicking the Projects panel swaps the column to the project list, with a back button.
 * The list has its own URL (#projects), so the browser back button works too.
 */
const Deck = () => {
  const [view, setView] = useState('panels'); // 'panels' | 'projects'
  const [openId, setOpenId] = useState(null);
  const returnTo = useRef(null);
  const rootRef = useRef(null);
  const pending = useRef(null); // what to scroll/focus after the view swaps
  const [, rerender] = useReducer((n) => n + 1, 0); // runs the pending step even when the view doesn't change

  // Run the scroll/focus step after React has painted the new view
  useEffect(() => {
    const job = pending.current;
    if (!job) return;
    pending.current = null;
    const root = rootRef.current;
    if (!root) return;

    if (job.card) {
      const card = document.getElementById(`pcard-${job.card}`)?.closest('.pcard');
      card?.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' });
      card?.querySelector('.pcard__open')?.focus({ preventScroll: true });
      return;
    }
    if (job.panel && job.panel !== 'work') {
      scrollToId(job.panel);
      return;
    }
    const top = root.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.5) root.scrollIntoView({ block: 'start' });
    root.querySelector(job.focus)?.focus({ preventScroll: true });
  });

  const showProjects = useCallback((card = null) => {
    pending.current = card ? { card } : { focus: '.deck-back' };
    setView('projects');
    rerender();
    if (window.location.hash !== '#projects') history.pushState(null, '', '#projects');
  }, []);

  const showPanels = useCallback((panel = null) => {
    pending.current = panel ? { panel } : { focus: '#panel-projects-open' };
    setView('panels');
    rerender();
    if (window.location.hash === '#projects') history.pushState(null, '', window.location.pathname);
  }, []);

  // Deep link (#projects), browser back/forward, and the ⌘K palette
  useEffect(() => {
    const sync = () => setView(window.location.hash === '#projects' ? 'projects' : 'panels');
    sync();
    const onProjects = (e) => showProjects(e.detail);
    const onPanel = (e) => showPanels(e.detail);
    window.addEventListener('popstate', sync);
    window.addEventListener(OPEN_PROJECTS, onProjects);
    window.addEventListener(SHOW_PANEL, onPanel);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(OPEN_PROJECTS, onProjects);
      window.removeEventListener(SHOW_PANEL, onPanel);
    };
  }, [showProjects, showPanels]);

  // Case studies open from anywhere (about pop-up, ⌘K palette, project cards)
  useEffect(() => {
    const onOpen = (e) => {
      if (!projects.some((p) => p.id === e.detail)) return;
      returnTo.current = document.activeElement;
      setOpenId(e.detail);
    };
    window.addEventListener(OPEN_CASE, onOpen);
    return () => window.removeEventListener(OPEN_CASE, onOpen);
  }, []);

  const openCase = (id) => {
    returnTo.current = document.activeElement;
    setOpenId(id);
  };
  const closeCase = useCallback(() => setOpenId(null), []);

  // Give focus back once the dialog has left the page (focusing earlier is blocked by the modal)
  useEffect(() => {
    if (openId) return;
    const el = returnTo.current;
    returnTo.current = null;
    if (el && document.contains(el)) el.focus({ preventScroll: true });
  }, [openId]);

  return (
    <section id="work" ref={rootRef} className={`work work--${view}`} aria-label={view === 'projects' ? 'Projects' : 'Projects, open source, journey, skills and GitHub'}>
      {view === 'panels' ? (
        <>
          <ProjectsPanel onOpen={showProjects} />
          <OpenSourcePanel />
          <JourneyPanel />
          <SkillsPanel />
          <GitHubPanel />
        </>
      ) : (
        <>
          <div className="deck-bar">
            <button type="button" className="deck-back" onClick={() => showPanels()}>
              <span aria-hidden="true">←</span> All panels
            </button>
            <h2 className="deck-bar__title">
              Projects <span>{String(projects.length).padStart(2, '0')}</span>
            </h2>
          </div>
          <Work onOpen={openCase} />
          <button type="button" className="deck-more" onClick={() => showPanels('open-source')}>
            Next: open source, journey, skills and GitHub <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      {openId && (
        <Suspense fallback={null}>
          <CaseStudy project={projects.find((p) => p.id === openId)} onClose={closeCase} />
        </Suspense>
      )}
    </section>
  );
};

export default Deck;
