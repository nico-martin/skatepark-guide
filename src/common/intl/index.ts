import * as enMessages from './en.json';
import { IntlLocales } from './types';

export const locales: IntlLocales = {
  en: {
    locale: 'en-US',
    label: 'English',
    messages: enMessages,
  },
};
export const defaultLocale: string = Object.keys(locales)[0];
