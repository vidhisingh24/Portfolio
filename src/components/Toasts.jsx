import { Toaster } from 'sonner';

/** Toast container, styled with the theme tokens. Loaded lazily from App. */
const Toasts = ({ theme }) => (
  <Toaster
    theme={theme}
    position="bottom-center"
    toastOptions={{
      style: {
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        borderRadius: '14px',
        fontFamily: 'var(--font-sans)',
      },
    }}
  />
);

export default Toasts;
