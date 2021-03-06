import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider, useStoreState, useActions } from 'unistore-hooks';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import { actions, store } from '@app/store';
import { State } from '@app/store/types';

import IntlLink from '@app/intl/IntlLink';
import { Logo } from '@app/theme';
import Menu from '@comp/App/Menu';
import Content from '@comp/Page/Content';
import Map from '@comp/Map/Map';
import Settings from '@comp/App/Settings/Settings';

const App = () => {
  const { intlLocale, intlMessages }: State = useStoreState([
    'intlLocale',
    'intlMessages',
  ]);

  const { setIdbLoved } = useActions(actions);

  useEffect(() => {
    setIdbLoved();
  }, []);

  return (
    <IntlProvider locale={intlLocale} messages={intlMessages}>
      <div className="app">
        <IntlLink href="/" className="app__controls app__controls--logo">
          <Logo className="app__logo" />
        </IntlLink>
        <Menu className="app__controls app__controls--menu" />
        <Settings
          className="app__controls app__controls--settings"
          settingsClassName="app__settings"
        />
        <Content className="app__content" />
        <Map className="app__map" />
      </div>
    </IntlProvider>
  );
};

ReactDOM.render(
  <Provider value={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#app')
);
