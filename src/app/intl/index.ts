import * as enMessages from './en.json';
import { IntlLocales } from './types';

// @ts-ignore
export const locales: IntlLocales = { en: ['en-US', enMessages.default] };
export const defaultLocale: string = Object.keys(locales)[0];
