import { VNode } from 'preact';
import React from 'react';
import { Icon } from '@theme';
import IntlLink from '@common/intl/IntlLink';
import cn from '@common/utils/classnames';
import styles from './Button.css';

const Button = ({
  element = 'button',
  className = '',
  classNameIcon = '',
  children,
  onClick,
  round = false,
  white = false,
  icon,
  ...props
}: {
  element?: 'button' | 'router' | 'a';
  className?: string;
  classNameIcon?: string;
  children?: VNode | VNode[] | string;
  onClick?: Function;
  round?: boolean;
  white?: boolean;
  icon?: string;
  [x: string]: any;
}) => {
  const classes = cn(className, styles.root, {
    [styles.hasIcon]: Boolean(icon),
    [styles.hasText]: Boolean(children),
    [styles.isRound]: round,
    [styles.bkgWhite]: white,
  });

  const content = (
    <React.Fragment>
      {icon && <Icon icon={icon} className={cn(styles.icon, classNameIcon)} />}
      {children && <span className={styles.text}>{children}</span>}
    </React.Fragment>
  );

  if (element === 'router') {
    return (
      <IntlLink className={classes} {...props}>
        {content}
      </IntlLink>
    );
  }

  return React.createElement(
    element,
    {
      className: classes,
      onClick: element === 'button' ? () => onClick() : null,
      ...props,
    },
    content
  );
};

export default Button;
