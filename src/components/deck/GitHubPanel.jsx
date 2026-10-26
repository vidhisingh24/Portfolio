import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { GitHubIcon } from '../Icons';
import { profile } from '../../data/profile';

const USER = 'vidhisingh24';

// The calendar (and its data request) only loads once the panel is near the screen
const GitHubCalendar = lazy(() => import('react-github-calendar').then((m) => ({ default: m.GitHubCalendar })));

/**
 * Live GitHub activity: contribution graph, a couple of numbers and recently updated repos.
 * Forks and the profile-README repo are left out. If GitHub can't be reached, it says so.
 */
const GitHubPanel = () => {
  const rootRef = useRef(null);
  const scrollRef = useRef(null);
  const [near, setNear] = useState(false);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | ready | error
  const [block, setBlock] = useState(10);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=20&type=owner`),
        ]);
        if (!u.ok || !r.ok) throw new Error('GitHub API unavailable');
        const [uData, rData] = await Promise.all([u.json(), r.json()]);
        if (cancelled) return;
        setUser(uData);
        setRepos(rData.filter((repo) => !repo.fork && repo.name.toLowerCase() !== USER).slice(0, 4));
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [near]);

  // Squares grow to fill wide panels; on narrow screens the graph scrolls sideways,
  // starting at the most recent weeks.
  useEffect(() => {
    const box = scrollRef.current;
    if (!near || !box) return undefined;
    const fit = () => {
      const inner = box.clientWidth - 32; // padding
      setBlock(Math.min(15, Math.max(9, Math.floor(inner / 54) - 3)));
      box.scrollLeft = box.scrollWidth;
    };
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    const mo = new MutationObserver(() => {
      box.scrollLeft = box.scrollWidth;
    });
    mo.observe(box, { childList: true, subtree: true });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [near]);

  return (
    <section id="github" ref={rootRef} className="dpanel dpanel--gh" aria-labelledby="panel-gh-title">
      <div className="dpanel__bg" aria-hidden="true" />
      <header className="dpanel__head">
        <p className="dpanel__eyebrow">05 / 05 · github</p>
        <h2 id="panel-gh-title" className="dpanel__title">
          GitHub activity<span className="dot">.</span>
        </h2>
        <p className="dpanel__lead">
          Live from <span className="mono">@{USER}</span>. Every square is a day of commits, PRs and issues.
        </p>
      </header>

      <div className="gh-stats" aria-live="polite">
        {status === 'ready' && (
          <>
            <p>
              <strong>{user.public_repos}</strong> public repos
            </p>
            <p>
              <strong>{user.followers}</strong> followers
            </p>
          </>
        )}
        {status === 'error' && <p className="gh-error">Couldn’t load live GitHub data right now.</p>}
      </div>

      <div className="gh-graph" ref={scrollRef} tabIndex={0} role="region" aria-label="Contribution graph, last 12 months">
        {near ? (
          <Suspense fallback={<div className="gh-graph__ph" aria-hidden="true" />}>
            <GitHubCalendar
              username={USER}
              colorScheme="dark"
              blockSize={block}
              blockMargin={3}
              blockRadius={2}
              fontSize={12}
              errorMessage="Couldn’t load the contribution graph right now."
              theme={{ dark: ['#2E2452', '#4B3A86', '#7A62C8', '#A891F2', '#D9CCFF'] }}
            />
          </Suspense>
        ) : (
          <div className="gh-graph__ph" aria-hidden="true" />
        )}
      </div>

      {repos.length > 0 && (
        <div className="gh-repos">
          <h3 className="gh-repos__title">Recently updated</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <span className="gh-repos__name">{repo.name}</span>
                  <span className="gh-repos__meta">
                    {repo.language || 'Code'} · ★ {repo.stargazers_count}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="dpanel__cta dpanel__cta--link">
        <GitHubIcon size={15} /> View profile on GitHub <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
};

export default GitHubPanel;
