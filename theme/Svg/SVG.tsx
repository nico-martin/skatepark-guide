import React from 'react';
import cn from '@common/utils/classnames';
import icons, { IconType } from '../icons';
import styles from './SVG.module.css';

const SVG = ({
  icon,
  className = '',
  inline = false,
  ...props
}: {
  icon: IconType;
  className?: string;
  inline?: boolean;
  [key: string]: any;
}) => {
  const LoadedIcon = React.useMemo(
    () => (icon in icons ? icons[icon] : null),
    [icon]
  );

  return LoadedIcon ? (
    <figure
      className={cn(className, styles.root, {
        [styles.isInline]: inline,
      })}
      {...props}
    >
      <LoadedIcon />
    </figure>
  ) : null;
};

export default SVG;
