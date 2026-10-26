/** Renders "some *highlighted* text": words between asterisks get <strong className>. */
const Highlight = ({ text, className = 'hl' }) =>
  text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <strong key={i} className={className}>
        {part.slice(1, -1)}
      </strong>
    ) : (
      part
    ),
  );

export default Highlight;
