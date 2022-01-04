import React from 'react';
import cn from '@common/utils/classnames';
import { Message } from '../index';

const FormFeedback = ({
  className = '',
  type,
  children,
}: {
  className?: string;
  type?: string;
  children?: any;
}) => (
  <div className={cn(className)}>
    <Message type={type}>{children}</Message>
  </div>
);

export default FormFeedback;
