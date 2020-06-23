import React from 'react';
import { VNode } from 'preact';
import cn from 'classnames';

import { Icon } from '@app/theme';
import IntlLink from '@app/intl/IntlLink';

import './Button.css';

const Button = ({
  isLink = false,
  className = '',
  children,
  onClick,
  round = false,
  icon,
  ...props
}: {
  isLink?: boolean;
  className?: string;
  children?: VNode | VNode[] | string;
  onClick?: Function;
  round?: boolean;
  icon?: string;
  [x: string]: any;
}) =>
  !isLink ? (
    <button
      className={cn(className, 'button', {
        'button--icon': icon,
        'button--round': round,
      })}
      onClick={() => onClick()}
      {...props}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  ) : (
    <IntlLink
      className={cn(className, 'button', {
        'button--icon': icon,
        'button--round': round,
      })}
      onClick={onClick ? () => onClick() : null}
      {...props}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </IntlLink>
  );

export default Button;
