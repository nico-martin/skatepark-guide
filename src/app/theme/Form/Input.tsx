import React, { useState } from 'react';
import cn from 'classnames';

import './Input.css';

const Input = ({
  name,
  id,
  label,
  className = '',
  classNameLabel = '',
  classNameInput = '',
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
  classNameLabel?: string;
  classNameInput?: string;
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
    className: `${classNameInput} input__element input__element--${type} input__element--${
      value !== '' ||
      (type === 'select' &&
        Object.values(choices).length &&
        Object.values(choices)[0] !== '')
        ? 'value'
        : 'empty'
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
      className={`${className} input input--${type} ${
        error !== '' ? 'input--error' : ''
      }`}
    >
      {type === 'textarea' && <textarea {...inputProps}>{value}</textarea>}
      {type === 'text' && (
        <input type={subtype} {...inputProps} value={value} />
      )}
      {type === 'select' && (
        <select {...inputProps}>
          {Object.entries(choices).map(([key, val]) => (
            <option key={key} selected={key === value}>
              {val}
            </option>
          ))}
        </select>
      )}
      <label className={`${classNameLabel} input__label`} htmlFor={id}>
        {label}
      </label>
      {error !== '' && <span className="input__error">{error}</span>}
    </div>
  );
};

export default Input;
