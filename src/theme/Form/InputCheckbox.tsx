import React from 'react';
import cn from '@common/utils/classnames';
import styles from './InputCheckbox.css';

const InputCheckbox = ({
  name,
  value = '',
  className = '',
  onChange = () => ({}),
}: {
  name: string;
  value?: string;
  className?: string;
  onChange?: Function;
}) => (
  <div className={cn(styles.root)}>
    <span
      role="checkbox"
      aria-checked={Boolean(value)}
      aria-labelledby={`label-${name}`}
      tabIndex={0}
      onClick={() => onChange(!Boolean(value))}
      onKeyUp={(e) => {
        e.keyCode === 32 && onChange(!Boolean(value));
      }}
      className={cn(styles.spanInput, {
        [styles.isActive]: Boolean(value),
      })}
    />
    <input
      value="checked"
      id={name}
      name={name}
      className={cn(className, styles.input)}
      type="checkbox"
      checked={Boolean(value)}
      onChange={(e) => {
        console.log('click', (e.target as HTMLInputElement).checked);
        onChange((e.target as HTMLInputElement).checked);
      }}
      tabIndex={-1}
    />
  </div>
);

export default InputCheckbox;
