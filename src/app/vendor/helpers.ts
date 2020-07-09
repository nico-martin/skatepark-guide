export const isDev: boolean = window.location.href.indexOf('localhost') !== -1;

export const nl2br = (str: string = '') =>
  str === '' ? '' : (str + '').replace(/(\r\n|\n\r|\r|\n)/g, '<br>$1');
