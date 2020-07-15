import React, { useState } from 'react';
import cn from 'classnames';

import './Input.css';

const Input = ({
  name,
  id,
  label,
  className = '',
  type = 'text',
  subtype = 'text',
  value: initialValue = '',
  choices = {},
  error = '',
  onChange = () => {},
  ...props
}: {
  name: string;
  id: string;
  className?: string;
  label: string;
  type?: 'text' | 'textarea' | 'select';
  subtype?: string;
  value?: string;
  choices?: {
    [k: string]: string;
  };
  error?: string;
  onChange?: Function;
  [k: string]: any;
}) => {
  const [value, setValue] = useState(initialValue);
  const inputProps = {
    ...props,
    className: `${className} input__element input__element--${type} input__element--${
      value === '' ? 'empty' : 'value'
    }`,
    name,
    id,
    onChange: e => {
      onChange(e);
      setValue(e.target.value);
    },
  };

  return (
    <div
      className={`input input--${type} ${error !== '' ? 'input--error' : ''}`}
    >
      {type === 'textarea' && <textarea {...inputProps}>{value}</textarea>}
      {type === 'text' && (
        <input type={subtype} {...inputProps} value={value} />
      )}
      {type === 'select' && (
        <select {...inputProps}>
          {Object.entries(choices).map(([key, val]) => (
            <option key={key} selected={key === val}>
              {val}
            </option>
          ))}
        </select>
      )}
      <label className="input__label" htmlFor={id}>
        {label}
      </label>
      {error !== '' && <span className="input__error">{error}</span>}
    </div>
  );
};

export default Input;
