import React from 'react';
import { IntlProvider } from 'react-intl';
import { locales } from './index';
import { IntlMessages } from './types';

const localeKeys = Object.keys(locales);
const defaultLocale: string = localeKeys[0];

const IntlContext = React.createContext<{
  locale: string;
  defaultLocale: string;
  messages: IntlMessages;
  messagesPending: boolean;
  changeLocale: (locale: string) => void;
}>({
  locale: defaultLocale,
  defaultLocale,
  messages: {},
  messagesPending: false,
  changeLocale: () => {},
});

export const IntlContextProvider = ({ children }: { children: any }) => {
  const [locale, setLocale] = React.useState<string>(defaultLocale);
  //const [messages, setMessages] = React.useState<IntlMessages>({});
  const [messagesPending, setMessagesPending] = React.useState<boolean>(false);

  const messages: IntlMessages = React.useMemo(() => {
    if (locale in locales) {
      return locales[locale].messages;
    }
    return {};
  }, [locale]);

  const changeLocale = (newLocale: string) => {
    /*
    if (localeKeys.indexOf(newLocale) === -1) {
      return;
    }
    const newLanguage = locales[newLocale];
    if (newLanguage.messages === {}) {
      setMessagesPending(true);
      // todo: load languages
    } else {
      setLocale(newLocale);
      setMessages(newLanguage.messages);
    }*/
  };

  return (
    <IntlContext.Provider
      value={{
        locale,
        defaultLocale,
        messages,
        messagesPending,
        changeLocale,
      }}
    >
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export const useMessages = () => {
  const { messages, messagesPending } = React.useContext(IntlContext);
  return { messages, messagesPending };
};

export const useLocale = (): {
  locale: string;
  defaultLocale: string;
  changeLocale: (locale: string) => void;
} => {
  const { locale, defaultLocale, changeLocale } = React.useContext(IntlContext);
  return { locale, defaultLocale, changeLocale };
};
