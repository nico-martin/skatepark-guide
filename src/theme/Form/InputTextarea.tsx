import React from 'react';
import cn from '@common/utils/classnames';
import inputStyles from './Input.css';

const InputTextarea = ({
  name,
  value = '',
  className = '',
  classNameInput = '',
  rows = 4,
  ...props
}: {
  name: string;
  value?: string;
  className?: string;
  classNameInput?: string;
  rows?: number;
}) => (
  <textarea
    name={name}
    className={cn(
      className,
      classNameInput,
      inputStyles.input,
      inputStyles.textarea
    )}
    id={name}
    value={value}
    rows={rows}
    {...props}
  />
);

export default InputTextarea;
