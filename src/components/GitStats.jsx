import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import { profile as me } from '../data/profile';

const USER = 'vidhisingh24';

/**
 * Live GitHub data: profile, contribution calendar and recent repositories.
 * Forks and the profile-README repo are left out of the repo list, so only
 * projects I own show up. If GitHub can't be reached, say so (no made-up data).
 */
const GitStats = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
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
        setRepos(rData.filter((repo) => !repo.fork && repo.name.toLowerCase() !== USER).slice(0, 6));
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user?.avatar_url ? (
            <img
              src={`${user.avatar_url}&s=128`}
              alt=""
              width="64"
              height="64"
              loading="lazy"
              className="h-16 w-16 rounded-2xl border border-line object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-2xl border border-line bg-surface-2" aria-hidden="true" />
          )}
          <div>
            <p className="text-lg font-medium text-ink">{user?.name || me.name}</p>
            <p className="font-mono text-xs text-muted">@{USER}</p>
            {status === 'ready' && (
              <p className="mt-1 font-mono text-xs text-muted">
                {user.public_repos} public repos · {user.followers} followers
              </p>
            )}
            {status === 'error' && <p className="mt-1 text-sm text-muted">Couldn’t load live GitHub data right now.</p>}
          </div>
        </div>
        <a href={me.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-fit">
          View on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="card overflow-x-auto p-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-accent-strong">Contribution calendar</p>
        <div className="min-w-[680px] md:min-w-0">
          <GitHubCalendar
            username={USER}
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            blockSize={11}
            blockMargin={4}
            fontSize={12}
            theme={{
              light: ['#EFE8DD', '#DDD6FE', '#C4B5FD', '#8B6CF0', '#5B3FC4'],
              dark: ['#2A2622', '#3F3561', '#6B57B8', '#9C87F2', '#C4B5FD'],
            }}
          />
        </div>
      </div>

      {repos.length > 0 && (
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-strong">Recently updated repositories</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card glass-card-hover flex h-full flex-col p-5"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium text-ink">{repo.name}</span>
                    <span aria-hidden="true" className="text-muted">
                      ↗
                    </span>
                  </span>
                  <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {repo.description || 'No description yet.'}
                  </span>
                  <span className="mt-auto pt-4 font-mono text-xs text-muted">
                    {repo.language || 'Code'} · ★ {repo.stargazers_count} · forks {repo.forks_count}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitStats;
