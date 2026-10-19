// Toasts load on demand (sonner is only needed after a click).
export const notify = (message) =>
  import('sonner').then(({ toast }) => {
    toast(message);
  });
