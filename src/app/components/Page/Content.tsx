import React from 'react';
import { Route, Router } from 'preact-router';

import Page from '@comp/Page/Page';

import './Content.css';

const Content = ({ className = '' }: { className?: string }) => (
  <div className={`${className} content`}>
    <Router>
      <Route default component={Page} />
    </Router>
  </div>
);

export default Content;
