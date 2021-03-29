export type IntlMessages = Record<string, string>;
export type IntlLocale = { label: string; messages: IntlMessages };
export type IntlLocales = Record<string, IntlLocale>;
