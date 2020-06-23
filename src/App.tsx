import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, useIntl } from 'react-intl';
import { Provider, connect } from 'unistore/preact';

import './App.css';

import { store } from '@app/store';
import { State, Actions } from '@app/store/types';

import IntlLink from '@app/intl/IntlLink';
import { Logo } from '@app/theme';
import Menu from '@comp/App/Menu';
import Content from '@comp/Page/Content';

const App = () => (
  <div className="app">
    <IntlLink href="/" className="app__controls app__controls--logo">
      <Logo className="app__logo" />
    </IntlLink>
    <Menu className="app__controls app__controls--menu" />
    <Content className="app__content" />
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
