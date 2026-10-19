import Reveal from './Reveal';
import Emph from './Emph';

/**
 * Shared section heading: mono eyebrow, big serif title, optional lead.
 * `id` is used for aria-labelledby on the section.
 */
const SectionHeader = ({ id, eyebrow, title, lead, align = 'left' }) => (
  <Reveal className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 id={id} className="mt-3 font-display text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">
      <Emph text={title} />
    </h2>
    {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
  </Reveal>
);

export default SectionHeader;
