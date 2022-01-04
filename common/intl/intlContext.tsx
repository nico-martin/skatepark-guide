import React from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import German from './locales/de.json';
import English from './locales/en.json';

export const locales = {
  de: German,
  en: English,
};

export const IntlContextProvider = ({
  children,
}: {
  children: JSX.Element | Array<JSX.Element>;
}) => {
  const { locale } = useRouter();

  const messages = React.useMemo(
    () => (locale in locales ? locales[locale] : German),
    [locale]
  );

  return (
    <IntlProvider locale={locale} messages={messages} onError={() => {}}>
      {children}
    </IntlProvider>
  );
};

/*

const IntlContext = React.createContext<{
  locale: string;
  localeKeys: Array<string>;
  defaultLocale: string;
  messages: IntlMessages;
  messagesPending: boolean;
  changeLocale: (locale: string) => void;
}>({
  locale: defaultLocale,
  localeKeys: [defaultLocale],
  defaultLocale,
  messages: {},
  messagesPending: false,
  changeLocale: () => {},
});

export const IntlContextProvider = ({ children }: { children: any }) => {
  const [init, setInit] = React.useState<boolean>(false);
  const [locale, setLocale] = React.useState<string>(defaultLocale);
  const [localeKeys, setLocaleKeys] = React.useState<Array<string>>([
    defaultLocale,
  ]);
  const [messages, setMessages] = React.useState<IntlMessages>(defaultMessages);
  const [messagesPending, setMessagesPending] = React.useState<boolean>(false);

  const getClientLocale = (): string => {
    const pathElements = location.pathname
      .split('/')
      .filter((path) => Boolean(path));
    const cookieLang = Cookies.get('lang');
    return pathElements[0] || cookieLang || defaultLocale;
  };

  const getMessages = (
    lang: string
  ): Promise<{ lang: string; messages: IntlMessages }> =>
    new Promise((resolve) =>
      getLanguageMessages(lang)
        .then((messages) => resolve({ lang, messages }))
        .catch(() =>
          getLanguageMessages(defaultLocale).then((messages) =>
            resolve({
              lang: defaultLocale,
              messages,
            })
          )
        )
    );

  React.useEffect(() => {
    getLanguageOverview().then((languages) => {
      setLocaleKeys(Object.keys(languages));
    });

    getMessages(getClientLocale()).then(({ lang, messages: newMessages }) => {
      setLocale(lang);
      setMessages({ ...messages, ...newMessages });
      setInit(true);
    });
  }, []);

  const changeLocale = (newLocale: string) => {
    if (localeKeys.indexOf(newLocale) === -1 || newLocale === locale) {
      return;
    }
    setMessagesPending(true);
    getMessages(newLocale).then(({ lang, messages: newMessages }) => {
      Cookies.set('lang', newLocale);
      setMessages({ ...messages, ...newMessages });
      setLocale(lang);
      setMessagesPending(false);
    });
  };

  return (
    <IntlContext.Provider
      value={{
        locale,
        localeKeys,
        defaultLocale,
        messages,
        messagesPending,
        changeLocale,
      }}
    >
      <IntlProvider locale={locale} messages={messages}>
        {init ? children : null}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export const useMessages = () => {
  const { messages, messagesPending } = React.useContext(IntlContext);
  return { messages, messagesPending };
};

export const useLocale = (): {
  activeLocale: string;
  localeKeys: Array<string>;
  defaultLocale: string;
  changeLocale: (locale: string) => void;
  changeLocalePending: boolean;
} => {
  const { locale, localeKeys, defaultLocale, messagesPending, changeLocale } =
    React.useContext(IntlContext);
  return {
    activeLocale: locale,
    localeKeys,
    defaultLocale,
    changeLocale,
    changeLocalePending: messagesPending,
  };
};
*/
