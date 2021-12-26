import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Logo } from '@theme';
import { AppSettingsProvider } from '@common/appSettings/appSettingsContext';
import { AuthContextProvider } from '@common/auth/authContext';
import { MapParksContextProvider } from '@common/hooks/mapParksContext';
import IntlLink from '@common/intl/IntlLink';
import { IntlContextProvider } from '@common/intl/intlContext';
import { ToastProvider } from '@common/toast/toastContext';
import cn from '@common/utils/classnames';
import combineProvider from '@common/utils/combineProvider';
import Menu from '@comp/App/Menu';
import Settings from '@comp/App/Settings';
import Map from '@comp/Map/Map';
import MapControls from '@comp/Map/MapControls';
import styles from './App.css';
import AppContent from './AppContent';

const App = () => {
  const [mapZoom, setMapZoom] = React.useState<number>(null);

  return (
    <div className={styles.root}>
      <IntlLink href="/" className={cn(styles.controls, styles.controlsLogo)}>
        <Logo className={styles.logo} />
      </IntlLink>
      <Menu className={cn(styles.controls, styles.controlsMenu)} />
      <Settings
        className={cn(styles.controls, styles.controlsSettings)}
        settingsClassName={cn(styles.settings)}
      />
      <AppContent className={styles.content} />
      <Map className={styles.map} mapZoom={mapZoom} setMapZoom={setMapZoom} />
      <MapControls
        setMapZoom={setMapZoom}
        className={cn(styles.controls, styles.controlsMap)}
      />
    </div>
  );
};

const AppProvider = combineProvider(
  Router,
  IntlContextProvider,
  ToastProvider,
  AppSettingsProvider,
  MapParksContextProvider,
  AuthContextProvider
);

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.querySelector('#app')
);
