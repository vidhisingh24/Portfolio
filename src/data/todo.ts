/**
 * Content convention: any string that starts with "TODO" is a placeholder.
 * It stays in the data file so it's easy to find, but the site never shows it.
 */
export const isTodo = (value?: string | null): boolean =>
  !value || value.trim().toUpperCase().startsWith('TODO');

export const visible = <T extends string>(items: T[]): T[] => items.filter((item) => !isTodo(item));
