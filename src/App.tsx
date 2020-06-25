import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider, useStoreState } from 'unistore-hooks';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import { store } from '@app/store';
import { State } from '@app/store/types';

import IntlLink from '@app/intl/IntlLink';
import { Logo } from '@app/theme';
import Menu from '@comp/App/Menu';
import Content from '@comp/Page/Content';
import Map from '@comp/Map/Map';

const App = () => {
  const { intlLocale, intlMessages }: State = useStoreState([
    'intlLocale',
    'intlMessages',
  ]);

  return (
    <IntlProvider locale={intlLocale} messages={intlMessages}>
      <div className="app">
        <IntlLink href="/" className="app__controls app__controls--logo">
          <Logo className="app__logo" />
        </IntlLink>
        <Menu className="app__controls app__controls--menu" />
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
