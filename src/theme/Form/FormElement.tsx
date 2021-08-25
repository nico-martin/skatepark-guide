import React from 'react';
import { useController } from 'react-hook-form';
import cn from '@common/utils/classnames';
import styles from './FormElement.css';

const FormElement = ({
  form,
  label,
  name,
  rules = {},
  Input,
  Description,
  className = '',
  inputClassName = '',
  sanitizeValue = (value) => value,
  type = 'table',
  reverse = false,
  onChange = null,
  ...inputProps
}: {
  form?: any;
  label?: string;
  name: string;
  rules?: any;
  Input: any;
  Description?: any;
  className?: string;
  inputClassName?: string;
  sanitizeValue?: Function;
  type?: 'table' | 'stacked' | 'inline';
  reverse?: boolean;
  onChange?: (e: string | boolean) => void;
  [key: string]: any;
}) => {
  const { field } = form
    ? useController({
        control: form.control,
        name,
        rules,
      })
    : {
        field: {
          onChange: onChange ? onChange : () => {},
        },
      };

  const error = React.useMemo(
    () =>
      form?.formState?.errors && form.formState.errors[name]
        ? form.formState.errors[name]
        : null,
    [form, name]
  );

  return (
    <div
      className={cn(styles.container, className, {
        [styles.containerIsStacked]: type === 'stacked',
        [styles.containerIsInline]: type === 'inline',
        [styles.containerIsHidden]: Input.displayName === 'InputHidden',
        [styles.containerOrderReverse]: reverse,
      })}
    >
      <div className={styles.labelContainer}>
        <label htmlFor={name} id={`label-${name}`} className={styles.label}>
          {label}
          {'required' in rules && '*'}
        </label>
        {Description && <div className={styles.description}>{Description}</div>}
      </div>
      <div className={styles.content}>
        <Input
          name={name}
          className={cn(styles.input, inputClassName)}
          {...field}
          {...inputProps}
          onBlur={(e) => e && field.onChange(sanitizeValue(e.target.value))}
        />
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    </div>
  );
};

export default FormElement;
