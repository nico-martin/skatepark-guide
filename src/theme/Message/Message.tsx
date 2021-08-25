import React from 'react';
import cn from '@common/utils/classnames';
import styles from './Message.css';

export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

const Message = ({
  className = '',
  type,
  children,
}: {
  className?: string;
  type?: string;
  children: any;
}) => (
  <p className={cn(styles.root, styles[type || MESSAGE_TYPES[0]], className)}>
    {children}
  </p>
);

export default Message;
