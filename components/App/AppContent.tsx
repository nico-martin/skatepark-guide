import React from 'react';
import { useRouter } from 'next/router';
import cn from '@common/utils/classnames';
import { unleadingSlashIt, untrailingSlashIt } from '@common/utils/helpers';
import styles from './AppContent.module.css';

let moveMin = 0;

const AppContent = ({
  className = '',
  children,
}: {
  className?: string;
  children: JSX.Element | Array<JSX.Element>;
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [dragging, setDragging] = React.useState<boolean>(false);
  const [startX, setStartX] = React.useState<number>(0);
  const [transformX, setTransformX] = React.useState<number>(0);
  const { pathname, push } = useRouter();

  React.useEffect(() => {
    moveMin = window.innerWidth / 4 > 200 ? 200 : window.innerWidth / 4;
    const path = untrailingSlashIt(unleadingSlashIt(pathname));
    const pathParams = path.split('/').filter(Boolean);
    if (pathParams.length === 0) {
      //setTimeout(() => setDelayedLocation(location), 200);
      setOpen(false);
    } else {
      //setDelayedLocation(location);
      setOpen(true);
    }
  }, [pathname]);

  /*
  const [delayedLocation, setDelayedLocation] =
    React.useState<H.Location>(location);
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
  */

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
    transformX > moveMin && push('/');
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
      {children}
    </div>
  );
};

export default AppContent;
