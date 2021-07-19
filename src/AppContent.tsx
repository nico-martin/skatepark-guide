import * as H from 'history';
import React from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { useLocale } from '@common/intl/intlContext';
import cn from '@common/utils/classnames';
import { unleadingSlashIt, untrailingSlashIt } from '@common/utils/helpers';
import Page from '@comp/Page/Page';
import Park from '@comp/Park/Park';
import styles from './AppContent.css';

const moveMin = window.innerWidth / 4 > 200 ? 200 : window.innerWidth / 4;

const AppContent = ({ className = '' }: { className?: string }) => {
  const location = useLocation();
  const history = useHistory();

  const [open, setOpen] = React.useState<boolean>(false);
  const [dragging, setDragging] = React.useState<boolean>(false);
  const [startX, setStartX] = React.useState<number>(0);
  const [transformX, setTransformX] = React.useState<number>(0);
  const [delayedLocation, setDelayedLocation] =
    React.useState<H.Location>(location);

  const { activeLocale } = useLocale();

  React.useEffect(() => {
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

  React.useEffect(
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
    transformX > moveMin && history.push(`/${activeLocale}/`);
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
      className={cn(className, styles.root)}
      aria-hidden={!open}
      onTouchStart={start}
      onMouseDown={start}
      onTouchEnd={end}
      onMouseUp={end}
      onTouchMove={(e) => {
        move(e.touches[0].clientX);
      }}
      onMouseMove={(e) => {
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
      <Route path="/:lang/:slug?/" location={delayedLocation}>
        <Page className={cn(styles.content)} />
      </Route>
      <Route path="/:lang/park/:slug/" location={delayedLocation}>
        <Park className={cn(styles.content)} />
      </Route>
    </div>
  );
};

export default AppContent;
