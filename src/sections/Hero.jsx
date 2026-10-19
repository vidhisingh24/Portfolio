import NowCard from '../components/NowCard';
import { profile } from '../data/profile';

const { hero, links } = profile;

// Splits the tagline so the last word ("ship") is set in italic serif
const Tagline = ({ text }) => {
  const match = text.match(/^(.*\s)(\S+?)([.!?]?)$/);
  if (!match) return text;
  const [, head, word, end] = match;
  return (
    <>
      {head}
      <em className="text-accent-strong">{word}</em>
      {end}
    </>
  );
};

const NOTE_STYLES = [
  'note note-1 -left-4 top-6 -rotate-6 sm:-left-10',
  'note note-2 -right-3 top-[72%] rotate-[5deg] sm:-right-14',
  'note note-3 -bottom-4 left-4 -rotate-3 sm:left-2',
  'note note-4 -top-3 -right-2 rotate-[4deg] sm:-right-6',
];

const Hero = () => (
  <section id="home" className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
    {/* Soft lavender / peach / mint blobs, behind the hero only */}
    <div className="hero-blobs" aria-hidden="true">
      <span className="b1" />
      <span className="b2" />
      <span className="b3" />
    </div>

    <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
      <div>
        <h1 className="hero-name">
          {profile.name}
          <span className="dot">.</span>
        </h1>

        <p className="mt-6 max-w-2xl font-display text-[2rem] leading-[1.15] text-ink sm:text-[2.5rem]">
          <Tagline text={hero.tagline} />
        </p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{hero.subline}</p>

        <p className="mt-5 font-mono text-sm text-muted">
          <span className="text-accent-strong">$</span> whoami <span aria-hidden="true">→</span>
          <span className="sr-only">:</span> {hero.whoami}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Resume <span aria-hidden="true">↗</span>
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <figure className="relative mx-auto w-[min(72vw,19rem)] lg:mr-2">
        <div className="photo-card">
          <picture>
            <source srcSet={hero.photo.webp} type="image/webp" />
            <img
              src={hero.photo.png}
              alt={hero.photo.alt}
              width={hero.photo.size}
              height={hero.photo.size}
              fetchPriority="high"
              decoding="async"
              className="block aspect-square w-full rounded-[1.15rem] object-cover"
            />
          </picture>
        </div>
        {hero.notes.map((note, i) => (
          <span key={note} className={`absolute ${NOTE_STYLES[i % NOTE_STYLES.length]}`}>
            {note}
          </span>
        ))}
      </figure>
    </div>

    <div className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
      <NowCard />
    </div>
  </section>
);

export default Hero;
