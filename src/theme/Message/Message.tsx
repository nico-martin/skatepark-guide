import React from 'react';
import cn from '@common/utils/classnames';
import styles from './Message.css';

const Message = ({
  className = '',
  type = 'message',
  children,
}: {
  className?: string;
  type?: 'message' | 'success' | 'error';
  children: any;
}) => <p className={cn(styles.root, styles[type], className)}>{children}</p>;

export default Message;
