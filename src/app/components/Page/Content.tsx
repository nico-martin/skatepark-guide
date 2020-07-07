import React, { useState, useEffect } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';

import Park from '@comp/Park/Park';
import Page from '@comp/Page/Page';

import './Content.css';
import { unleadingSlashIt, untrailingSlashIt } from '@app/vendor/slashit';
import { useStoreState } from 'unistore-hooks';
import { State } from '@app/store/types';

const Content = ({ className = '' }: { className?: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [transformX, setTransformX] = useState<number>(0);

  const { intlLocale }: State = useStoreState(['intlLocale']);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const path = untrailingSlashIt(unleadingSlashIt(location.pathname));
    const pathParams = path.split('/');
    if (pathParams.length <= 1) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location]);

  useEffect(
    () => () => {
      setStartX(0);
      setTransformX(0);
      setDragging(false);
    },
    []
  );

  return (
    <div
      className={`${className} content`}
      aria-hidden={!open}
      onMouseDown={() => {
        setDragging(true);
      }}
      onMouseUp={() => {
        setDragging(false);
        setStartX(0);
        setTransformX(0);
        // todo: 300 should be relative to viewport width
        transformX > 300 && history.push(`/${intlLocale}/`);
      }}
      onMouseMove={e => {
        e.preventDefault();
        if (dragging) {
          if (startX === 0) {
            setStartX(e.clientX);
          } else {
            const x = (startX - e.clientX) * -1;
            setTransformX(x <= 0 ? 0 : x);
          }
        }
      }}
      style={{
        cursor: dragging ? 'grabbing' : 'default',
        ...(dragging
          ? {
              transitionDuration: '0ms',
              transform: `translate(${transformX}px, 0)`,
            }
          : {}),
      }}
    >
      <Route path="/:lang/about/:slug?/">Page</Route>
      <Route path="/:lang/park/:slug/">
        <Park />
      </Route>
    </div>
  );
};

export default Content;
