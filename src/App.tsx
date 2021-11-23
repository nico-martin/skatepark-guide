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
import Menu from '@comp/App/Menu';
import Settings from '@comp/App/Settings';
import Map from '@comp/Map/Map';
import styles from './App.css';
import AppContent from './AppContent';

/**
 * TODO:
 * - image API as google function
 * - add new Park (title creates new Park, redirect to edit)
 * - check emails
 * - like/love
 * - offlie (save visited parks and loved parks)
 * - Filter checkbox styling
 */

const App = () => {
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
      <Map className={styles.map} />
    </div>
  );
};

ReactDOM.render(
  <Router>
    <IntlContextProvider>
      <ToastProvider>
        <AppSettingsProvider>
          <MapParksContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </MapParksContextProvider>
        </AppSettingsProvider>
      </ToastProvider>
    </IntlContextProvider>
  </Router>,
  document.querySelector('#app')
);
