import React, { useState, useEffect } from 'react';
import * as H from 'history';

import { Route, useLocation, useHistory } from 'react-router-dom';

import Park from '@comp/Park/Park';
import Page from '@comp/Page/Page';

import './Content.css';
import { unleadingSlashIt, untrailingSlashIt } from '@app/vendor/slashit';
import { useStoreState } from 'unistore-hooks';
import { State } from '@app/store/types';

const moveMin = window.innerWidth / 4 > 200 ? 200 : window.innerWidth / 4;

const Content = ({ className = '' }: { className?: string }) => {
  const location = useLocation();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [transformX, setTransformX] = useState<number>(0);
  const [delayedLocation, setDelayedLocation] = useState<H.Location>(location);

  const { intlLocale }: State = useStoreState(['intlLocale']);

  useEffect(() => {
    const path = untrailingSlashIt(unleadingSlashIt(location.pathname));
    const pathParams = path.split('/');
    if (pathParams.length <= 1) {
      setTimeout(() => setDelayedLocation(location), 200);
      setOpen(false);
    } else {
      setDelayedLocation(location);
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

  const start = () => {
    setDragging(true);
  };

  const end = () => {
    setDragging(false);
    setStartX(0);
    setTransformX(0);
    transformX > moveMin && history.push(`/${intlLocale}/`);
  };

  const move = (x: number) => {
    if (dragging) {
      if (startX === 0) {
        setStartX(x);
      } else {
        const newX = (startX - x) * -1;
        setTransformX(newX <= 0 ? 0 : newX);
      }
    }
  };

  return (
    <div
      className={`${className} content`}
      aria-hidden={!open}
      onTouchStart={start}
      onMouseDown={start}
      onTouchEnd={end}
      onMouseUp={end}
      onTouchMove={e => {
        move(e.touches[0].clientX);
      }}
      onMouseMove={e => {
        move(e.clientX);
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
      <Route path="/:lang/about/:slug?/" location={delayedLocation}>
        <Page className="content__page" />
      </Route>
      <Route path="/:lang/park/:slug/" location={delayedLocation}>
        <Park className="content__park" />
      </Route>
    </div>
  );
};

export default Content;
