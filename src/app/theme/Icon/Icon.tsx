import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './Icon.css';

interface Props {
  icon: string;
  className?: string;
  rotate?: 90 | 180 | 270 | false;
  spinning?: boolean;
  button?: boolean;
  round?: boolean;
}

const Icon = ({
  icon,
  className = '',
  spinning = false,
  rotate = false,
  button = false,
  round = false,
}: Props) => {
  const [loadedIcon, setLoadedIcon] = useState('');

  useEffect(() => {
    async function loadIcon() {
      return await import(
        /* webpackMode: "eager" */ `../../../static/icons/${icon}.svg`
      );
    }
    loadIcon().then(loaded => setLoadedIcon(loaded.default));
  }, [icon]);

  return (
    <div
      className={cn(
        className,
        'icon',
        rotate !== false ? `icon--rotate-${rotate}` : '',
        {
          'icon--animation-spin': spinning,
          'icon--button': button,
          'icon--round': round,
        }
      )}
      dangerouslySetInnerHTML={{ __html: loadedIcon }}
    />
  );
};

export default Icon;
