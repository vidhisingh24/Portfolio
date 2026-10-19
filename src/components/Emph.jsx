import { Fragment } from 'react';

/** Renders "*word*" segments in italic serif (accent color). */
const Emph = ({ text }) =>
  text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i} className="text-accent-strong">
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );

export default Emph;
