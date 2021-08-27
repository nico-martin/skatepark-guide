import { VNode } from 'preact';
import React from 'react';
import { Icon, Loader } from '@theme';
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
  isLoading = false,
  disabled = false,
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
  isLoading?: boolean;
  disabled?: boolean;
  icon?: string;
  [x: string]: any;
}) => {
  const classes = cn(className, styles.root, {
    [styles.hasIcon]: Boolean(icon),
    [styles.hasText]: Boolean(children),
    [styles.isLoading]: isLoading,
    [styles.isRound]: round,
    [styles.bkgWhite]: white,
  });

  // todo: add loader if isLoading

  const content = (
    <React.Fragment>
      {icon && <Icon icon={icon} className={cn(styles.icon, classNameIcon)} />}
      {children && <span className={styles.text}>{children}</span>}
      <Loader className={styles.loader} />
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
      disabled: isLoading || disabled,
      className: classes,
      onClick:
        element === 'button' && Boolean(onClick) ? () => onClick() : null,
      ...props,
    },
    content
  );
};

export default Button;
