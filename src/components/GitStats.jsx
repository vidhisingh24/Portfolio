import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, Users, Award, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';
import { useTheme } from '../context/ThemeContext';

const GitStats = () => {
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitData = async () => {
      try {
        setLoading(true);
        // Fetch Profile
        const profileRes = await fetch('https://api.github.com/users/vidhisingh24');
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch Repos
        const reposRes = await fetch('https://api.github.com/users/vidhisingh24/repos?sort=updated&per_page=6');
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        setRepos(reposData);
        setError(false);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(true);
        // Fallback mock data in case of API rate limit
        setProfile({
          avatar_url: 'https://avatars.githubusercontent.com/u/109033306?v=4',
          name: 'Vidhi Singh',
          bio: 'Computer Engineering Student | Aspiring Software Engineer | AI & ML Enthusiast',
          public_repos: 18,
          followers: 120,
          following: 85,
        });
        setRepos([
          {
            id: 1,
            name: 'MedEase-AI',
            description: 'Intelligent Healthcare Ecosystem with Symptom Checkers, Chat, and SOS',
            stargazers_count: 12,
            forks_count: 5,
            language: 'TypeScript',
            html_url: 'https://github.com/vidhisingh24/MedEase-AI'
          },
          {
            id: 2,
            name: 'ZeroWasteLink-2.0',
            description: 'Food waste reduction platform connecting restaurants and NGOs with real-time maps',
            stargazers_count: 8,
            forks_count: 3,
            language: 'JavaScript',
            html_url: 'https://github.com/vidhisingh24/ZeroWasteLink-2.0'
          },
          {
            id: 3,
            name: 'AI-Study-Companion',
            description: 'Adaptive study schedules, quiz generation, and summaries using NLP',
            stargazers_count: 6,
            forks_count: 2,
            language: 'JavaScript',
            html_url: 'https://github.com/vidhisingh24/AI-Study-Companion'
          },
          {
            id: 4,
            name: 'DevTrack-Analytics',
            description: 'Visual coding metrics dashboard with GitHub integrations',
            stargazers_count: 4,
            forks_count: 1,
            language: 'React',
            html_url: 'https://github.com/vidhisingh24/DevTrack-Analytics'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Color mapping for repo languages
  const langColors = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-500',
    Python: 'bg-green-500',
    'C++': 'bg-red-500',
    HTML: 'bg-orange-500',
    CSS: 'bg-indigo-500',
    Java: 'bg-amber-600',
    React: 'bg-sky-400',
    default: 'bg-purple-400'
  };

  return (
    <div className="w-full">
      {/* GitHub Profile Banner */}
      <GlassCard className="mb-8 border border-glassBorder dark:border-glassBorderDark p-8 shadow-xs" noTilt>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={profile?.avatar_url || 'https://avatars.githubusercontent.com/u/109033306?v=4'} 
                alt="Vidhi Singh GitHub" 
                className="relative w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 object-cover" 
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
                {profile?.name || 'Vidhi Singh'}
                <a 
                  href="https://github.com/vidhisingh24" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md font-sans font-medium">
                {profile?.bio || 'Computer Engineering Student | Aspiring Software Engineer'}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-xs text-slate-600 dark:text-slate-400 font-sans font-semibold">
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-purple-500" /> 
                  <strong>{profile?.followers || '0'}</strong> followers
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={14} className="text-blue-500" /> 
                  <strong>{profile?.public_repos || '0'}</strong> repos
                </span>
              </div>
            </div>
          </div>
          
          <a
            href="https://github.com/vidhisingh24"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors text-xs font-bold shadow-md cursor-pointer border border-transparent"
          >
            <Github size={16} />
            Follow @vidhisingh24
          </a>
        </div>
      </GlassCard>

      {/* GitHub Calendar Chart */}
      <GlassCard className="mb-8 border border-glassBorder dark:border-glassBorderDark p-8 overflow-x-auto shadow-xs" noTilt>
        <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Award size={18} className="text-pink-500" /> Contribution Calendar
        </h4>
        <div className="flex items-center justify-center min-w-[700px] md:min-w-0 py-2">
          <GitHubCalendar 
            username="vidhisingh24" 
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            theme={{
              light: ['#f3f4f6', '#d8b4fe', '#c084fc', '#a855f7', '#7e22ce'],
              dark: ['#1e293b', '#6d28d9', '#7c3aed', '#8b5cf6', '#a78bfa']
            }}
          />
        </div>
      </GlassCard>

      {/* Recent Repos Grid */}
      <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <BookOpen size={18} className="text-purple-500" /> Featured Repositories
      </h4>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {repos.map((repo) => (
          <motion.div key={repo.id} variants={itemVariants}>
            <GlassCard className="h-full border border-glassBorder dark:border-glassBorderDark p-6 flex flex-col justify-between hover:scale-[1.03] transition-all shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h5 className="font-bold text-slate-800 dark:text-white text-base truncate font-display">
                    {repo.name}
                  </h5>
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-350 line-clamp-3 mb-4 leading-relaxed h-[54px] font-sans font-medium">
                  {repo.description || 'No description provided.'}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans font-semibold">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className={`w-3 h-3 rounded-full ${langColors[repo.language] || langColors.default}`} />
                  {repo.language || 'Code'}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {repo.forks_count}
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GitStats;
