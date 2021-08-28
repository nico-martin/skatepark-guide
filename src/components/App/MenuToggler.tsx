import React from 'react';
import { Button } from '@theme';
import cn from '@common/utils/classnames';
import styles from './MenuToggler.css';

const MenuToggler = ({
  onClick,
  buttonState,
  className = '',
}: {
  onClick: Function;
  buttonState: string;
  className?: string;
}) => {
  return (
    <Button
      className={cn(className, styles.root)}
      onClick={onClick}
      data-state={buttonState}
      round
      square
    >
      <span className={styles.lineContainer}>
        {[1, 2, 3].map((i) => (
          <span className={cn(styles.line, styles[`line-${i}`])} />
        ))}
      </span>
    </Button>
  );
};

export default MenuToggler;
