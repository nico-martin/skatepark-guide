import React from 'react';
import cn from '@common/utils/classnames';
import { InputCheckbox } from '../index';
import styles from './InputCheckboxList.css';

type ValueT = Record<string, boolean>;

const InputCheckboxList = ({
  name,
  value = {},
  className = '',
  classNameInput = '',
  onChange,
  options,
}: {
  name: string;
  value?: ValueT;
  className?: string;
  classNameInput?: string;
  onChange?: (value: ValueT) => void;
  options: Record<string, string>;
}) => (
  <div className={cn(className, styles.root)}>
    {Object.entries(options).map(([key, label]) => (
      <label className={styles.label}>
        <InputCheckbox
          name={`${name}-${key}`}
          className={cn(styles.checkbox, classNameInput)}
          value={key in value && Boolean(value[key]) ? 'value' : ''}
          onChange={(v) => onChange({ ...value, [key]: v })}
        />
        {label}
      </label>
    ))}
  </div>
);

InputCheckboxList.displayName = 'InputCheckboxList';

export default InputCheckboxList;
