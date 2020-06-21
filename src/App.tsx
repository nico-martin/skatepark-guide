import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, useIntl } from 'react-intl';
import { Provider, connect } from 'unistore/preact';
import { Router } from 'preact-router';

import { store } from '@app/store';
import { State, Actions } from '@app/store/types';

import IntlLink from '@app/intl/IntlLink';
import './App.css';
import { Logo } from '@app/theme';

const App = () => (
  <div className="app">
    <IntlLink href="/" className="app__controls">
      <Logo className="app__logo" />
    </IntlLink>
  </div>
);

const IntlApp = connect<{}, {}, State, Actions>(['intlLocale', 'intlMessages'])(
  ({ intlLocale, intlMessages }: State & Actions) => (
    <IntlProvider locale={intlLocale} messages={intlMessages}>
      <App />
    </IntlProvider>
  )
);

ReactDOM.render(
  <Provider store={store}>
    <IntlApp />
  </Provider>,
  document.querySelector('#app')
);
