export const untrailingSlashIt = (str: string): string =>
  str.replace(/\/$/, '');

export const trailingSlashIt = (str: string): string =>
  untrailingSlashIt(str) + '/';

export const unleadingSlashIt = (str: string): string => str.replace(/^\//, '');

export const leadingSlashIt = (str: string): string =>
  '/' + unleadingSlashIt(str);

export const nl2br = (str: string = '') =>
  str === '' ? '' : (str + '').replace(/(\r\n|\n\r|\r|\n)/g, '<br>$1');

const ids: Object = {};
export const unique = (key: string, scope: string = 'global'): string => {
  if (ids[scope] === undefined) {
    ids[scope] = [];
  }

  let id = key;
  let idNum: number = 1;
  while (ids[scope].indexOf(id) !== -1) {
    id = key + '-' + idNum;
    idNum++;
  }

  ids[scope].push(id);
  return id;
};
