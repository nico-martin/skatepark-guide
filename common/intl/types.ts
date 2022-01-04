export type IntlMessages = Record<string, string>;
export type IntlLocale = {
  locale: string;
  label: string;
  messages: IntlMessages;
};
export type IntlLocales = Record<string, IntlLocale>;

export type ApiOverviewI = Record<string, string>;
