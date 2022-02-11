import React from 'react';
import { useIntl } from 'react-intl';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { Logo } from '@theme';
import AppContent from '@components/App/AppContent';
import Menu from '@components/App/Menu';
import Settings from '@components/App/Settings';
import Map from '@components/Map/Map';
import MapControls from '@components/Map/MapControls';
import { AppSettingsProvider } from '@common/appSettings/appSettingsContext';
import { AuthContextProvider } from '@common/auth/authContext';
import { MapParksContextProvider } from '@common/hooks/mapParksContext';
import { IntlContextProvider } from '@common/intl/intlContext';
import { ToastProvider } from '@common/toast/toastContext';
import cn from '@common/utils/classnames';
import combineProvider from '@common/utils/combineProvider';
import '../styles/globals.css';
import styles from './_app.module.css';

const AppProvider = combineProvider(
  IntlContextProvider,
  ToastProvider,
  AppSettingsProvider,
  MapParksContextProvider,
  AuthContextProvider
);

const App = ({ Component, pageProps }: AppProps) => {
  const [mapZoom, setMapZoom] = React.useState<number>(null);
  const { formatMessage } = useIntl();

  return (
    <React.Fragment>
      <Head>
        <title>{formatMessage({ id: 'meta.title' })}</title>
        <meta
          name="description"
          content={formatMessage({ id: 'meta.description' })}
        />
      </Head>
      <div className={styles.root}>
        <Link href="/">
          <a className={cn(styles.controls, styles.controlsLogo)}>
            <Logo className={styles.logo} />
          </a>
        </Link>
        <Menu className={cn(styles.controls, styles.controlsMenu)} />
        <Settings
          className={cn(styles.controls, styles.controlsSettings)}
          settingsClassName={cn(styles.settings)}
        />
        <AppContent className={styles.content}>
          <Component className={cn(styles.contentInner)} {...pageProps} />
        </AppContent>
        <Map className={styles.map} mapZoom={mapZoom} setMapZoom={setMapZoom} />
        <MapControls
          setMapZoom={setMapZoom}
          className={cn(styles.controls, styles.controlsMap)}
        />
      </div>
    </React.Fragment>
  );
};

const AppWrapped = (props) => (
  <AppProvider>
    <App {...props} />
  </AppProvider>
);

export default AppWrapped;
