import React from 'react';

import './Message.css';

const Message = ({
  className = '',
  type = 'message',
  children,
}: {
  className?: string;
  type?: 'message' | 'success' | 'error';
  children: any;
}) => <p className={`${className} message message--${type}`}>{children}</p>;

export default Message;
