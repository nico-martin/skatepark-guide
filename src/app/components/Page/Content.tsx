import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';

import Park from '@comp/Park/Park';
import Page from '@comp/Page/Page';

import './Content.css';
import { unleadingSlashIt, untrailingSlashIt } from '@app/vendor/slashit';

const Content = ({ className = '' }: { className?: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const path = untrailingSlashIt(unleadingSlashIt(location.pathname));
    const pathParams = path.split('/');
    if (pathParams.length <= 1) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location]);

  return (
    <div className={`${className} content`} aria-hidden={!open}>
      <Route path="/:lang/about/:slug?/">Page</Route>
      <Route path="/:lang/park/:slug/">
        <Park />
      </Route>
    </div>
  );
};

export default Content;
