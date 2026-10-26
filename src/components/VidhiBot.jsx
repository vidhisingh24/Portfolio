import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { botAnswers, botGreeting } from '../data/bot';

/** Small FAQ chat widget with canned answers from src/data/bot.ts. */
const VidhiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: botGreeting, isBot: true }]);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const ask = (question) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { text: question, isBot: false }]);
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { text: botAnswers[question], isBot: true }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="vidhibot fixed z-40">
      {isOpen && (
        <div
          id="vidhibot-panel"
          role="dialog"
          aria-label="VidhiBot chat"
          className="card mb-3 flex h-[460px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden"
          data-lenis-prevent
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="font-medium text-ink">VidhiBot</p>
              <p className="font-mono text-xs text-muted">quick answers about Vidhi</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((msg, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.isBot ? 'rounded-tl-sm bg-surface-2 text-ink' : 'ml-auto rounded-tr-sm bg-accent-soft text-ink'
                }`}
              >
                {msg.text}
              </p>
            ))}
            {isTyping && <p className="font-mono text-xs text-muted">VidhiBot is typing…</p>}
            <div ref={endRef} />
          </div>

          <div className="border-t border-line p-3">
            <p className="px-1 pb-2 font-mono text-xs text-muted">Ask about:</p>
            <div className="flex max-h-[104px] flex-wrap gap-1.5 overflow-y-auto">
              {Object.keys(botAnswers).map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isTyping}
                  onClick={() => ask(q)}
                  className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-ink transition-colors hover:border-accent hover:bg-accent-soft disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat with VidhiBot' : 'Open chat with VidhiBot'}
        aria-expanded={isOpen}
        aria-controls="vidhibot-panel"
        className="ml-auto grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-surface text-ink shadow-[var(--shadow)] transition-colors hover:border-accent hover:bg-accent-soft"
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <MessageSquare size={20} aria-hidden="true" />}
      </button>
    </div>
  );
};

export default VidhiBot;
