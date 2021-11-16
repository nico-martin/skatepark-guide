import { VNode } from 'preact';
import React from 'react';
import { Icon, Loader } from '@theme';
import IntlLink from '@common/intl/IntlLink';
import cn from '@common/utils/classnames';
import styles from './Button.css';

const Button = ({
  element = 'button',
  size = 'medium',
  className = '',
  classNameIcon = '',
  children,
  onClick,
  round = false,
  color = 'primary',
  type = 'contained',
  isLoading = false,
  disabled = false,
  icon,
  square = false,
  ...props
}: {
  element?: 'button' | 'router' | 'a';
  size?: 'small' | 'medium';
  className?: string;
  classNameIcon?: string;
  children?: VNode | VNode[] | string;
  onClick?: Function;
  round?: boolean;
  color?: 'primary' | 'secondary' | 'white' | 'danger';
  type?: 'contained' | 'text';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: string;
  square?: boolean;
  [x: string]: any;
}) => {
  const classes = cn(
    className,
    styles.root,
    {
      [styles.hasIcon]: Boolean(icon),
      [styles.hasText]: Boolean(children),
      [styles.isSquare]: square || (Boolean(icon) && !Boolean(children)),
      [styles.isLoading]: isLoading,
      [styles.isDisabled]: disabled && !isLoading,
      [styles.isRound]: round,
    },
    styles[`color-${color}`],
    styles[`type-${type}`],
    styles[`size-${size}`]
  );

  const content = (
    <React.Fragment>
      {icon && <Icon icon={icon} className={cn(styles.icon, classNameIcon)} />}
      {children && <span className={styles.text}>{children}</span>}
      <Loader className={styles.loader} />
    </React.Fragment>
  );

  return element === 'router' ? (
    <IntlLink className={classes} {...props}>
      {content}
    </IntlLink>
  ) : (
    React.createElement(
      element,
      {
        disabled: isLoading || disabled,
        className: classes,
        onClick:
          element === 'button' && Boolean(onClick) ? () => onClick() : null,
        ...props,
      },
      content
    )
  );
};

export default Button;
