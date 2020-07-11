import React from 'react';
import { VNode } from 'preact';
import cn from 'classnames';

import { Icon } from '@app/theme';
import IntlLink from '@app/intl/IntlLink';

import './Button.css';

const Button = ({
  element = 'button',
  className = '',
  children,
  onClick,
  round = false,
  white = false,
  icon,
  ...props
}: {
  element?: 'button' | 'router' | 'a';
  className?: string;
  children?: VNode | VNode[] | string;
  onClick?: Function;
  round?: boolean;
  white?: boolean;
  icon?: string;
  [x: string]: any;
}) => {
  if (element === 'router') {
    return (
      <IntlLink
        className={cn(className, 'button', {
          'button--icon': icon,
          'button--round': round,
          'button--has-text': children,
          'button--bkg-white': white,
        })}
        {...props}
      >
        {icon && <Icon icon={icon} className="button__icon" />}
        {children && <span className="button__text">{children}</span>}
      </IntlLink>
    );
  } else if (element === 'a') {
    return (
      <a
        className={cn(className, 'button', {
          'button--icon': icon,
          'button--round': round,
          'button--has-text': children,
          'button--bkg-white': white,
        })}
        onClick={onClick ? () => onClick() : null}
        {...props}
      >
        {icon && <Icon icon={icon} className="button__icon" />}
        {children && <span className="button__text">{children}</span>}
      </a>
    );
  }
  return (
    <button
      className={cn(className, 'button', {
        'button--icon': icon,
        'button--round': round,
        'button--has-text': children,
        'button--bkg-white': white,
      })}
      onClick={onClick ? () => onClick() : null}
      {...props}
    >
      {icon && <Icon icon={icon} className="button__icon" />}
      {children && <span className="button__text">{children}</span>}
    </button>
  );
};

export default Button;
