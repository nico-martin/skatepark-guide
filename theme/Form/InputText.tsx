import React from 'react';
import cn from '@common/utils/classnames';
import inputStyles from './Input.module.css';

const InputText = ({
  name,
  value = '',
  className = '',
  classNameInput = '',
  inputType = 'text',
  onChange = () => '',
  ...props
}: {
  name: string;
  value?: string;
  className?: string;
  classNameInput?: string;
  onChange?: (value: string) => void;
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
    className={cn(className, classNameInput, inputStyles.input)}
    id={name}
    value={value}
    type={inputType}
    onChange={(e) => onChange((e.target as HTMLInputElement).value)}
    {...props}
  />
);

export default InputText;
