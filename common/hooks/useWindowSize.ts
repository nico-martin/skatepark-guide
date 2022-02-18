import React from 'react';
import useEventListener from './useEventListener';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false,
  });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: 899 >= window.innerWidth,
    });
  };

  useEventListener('resize', handleSize);

  React.useLayoutEffect(() => {
    handleSize();
  }, []);

  return windowSize;
};

export default useWindowSize;
