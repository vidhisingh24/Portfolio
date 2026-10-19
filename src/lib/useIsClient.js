import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** false while rendering on the server / hydrating, true afterwards. */
export const useIsClient = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
