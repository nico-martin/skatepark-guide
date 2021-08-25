import React from 'react';
import cn from '@common/utils/classnames';
import styles from './FullLoader.css';
import Loader from './Loader';

const FullLoader = ({
  className = '',
  large = false,
  spacingTop = false,
}: {
  className?: string;
  large?: boolean;
  spacingTop?: boolean;
}) => (
  <div
    className={cn(className, styles.root, {
      [styles.loaderLarge]: large,
      [styles.loaderSpacingTop]: spacingTop,
    })}
  >
    <Loader className={styles.loader} />
  </div>
);

export default FullLoader;
