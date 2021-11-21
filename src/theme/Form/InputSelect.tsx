import React from 'react';
import cn from '@common/utils/classnames';
import inputStyles from './Input.css';

const InputSelect = ({
  name,
  value = '',
  className = '',
  classNameInput = '',
  options,
  optionProps = () => ({}),
  emptyOption = false,
  onChange = () => ({}),
  ...props
}: {
  name: string;
  value?: string;
  className?: string;
  classNameInput?: string;
  options: Record<string, string>;
  optionProps?: (value: string, label: string) => Record<string, any>;
  emptyOption?: boolean;
  onChange?: Function;
}) => (
  <select
    value={value}
    id={name}
    name={name}
    className={cn(className, classNameInput, inputStyles.input)}
    onChange={(e) => onChange((e.target as HTMLInputElement).value)}
    {...props}
  >
    {emptyOption && <option value="" {...optionProps('', '')} />}
    {Object.entries(options || {}).map(([value, label]) => (
      <option value={value} key={value} {...optionProps(value, String(label))}>
        {label}
      </option>
    ))}
  </select>
);

export default InputSelect;
