export const untrailingSlashIt = (str: string): string =>
  str.replace(/\/$/, '');

export const trailingSlashIt = (str: string): string =>
  untrailingSlashIt(str) + '/';

export const unleadingSlashIt = (str: string): string => str.replace(/^\//, '');

export const leadingSlashIt = (str: string): string =>
  '/' + unleadingSlashIt(str);
