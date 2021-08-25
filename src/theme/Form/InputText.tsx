import React from 'react';
import cn from '@common/utils/classnames';
import inputStyles from './Input.css';

const InputText = ({
  name,
  value = '',
  className = '',
  inputType = 'text',
  ...props
}: {
  name: string;
  value?: string;
  className?: string;
  inputType?:
    | 'text'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
}) => (
  <input
    name={name}
    className={cn(className, inputStyles.input)}
    id={name}
    value={value}
    type={inputType}
    {...props}
  />
);

export default InputText;
