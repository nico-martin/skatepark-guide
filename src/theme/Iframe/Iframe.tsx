import React from 'react';
import cn from '@common/utils/classnames';
import styles from './Iframe.css';

const Iframe = ({
  className = '',
  responsive = true,
  ratioX = 16,
  ratioY = 9,
  style = {},
  ...props
}: {
  className?: string;
  responsive?: boolean;
  ratioX?: number;
  ratioY?: number;
  style?: {
    [key: string]: any;
  };
  [key: string]: any;
}) => (
  <div
    className={cn(className, styles.root, {
      [styles.responsiveIframe]: responsive,
    })}
    style={{
      ...style,
      ...(responsive
        ? {
            paddingBottom: `${(ratioY / ratioX) * 100}%`,
          }
        : {}),
    }}
  >
    <iframe {...props} />
  </div>
);

export default Iframe;
