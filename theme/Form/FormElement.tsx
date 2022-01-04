import React from 'react';
import { useController } from 'react-hook-form';
import cn from '@common/utils/classnames';
import styles from './FormElement.module.css';

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
  onBlur = null,
  propError = '',
  small = false,
  disabled = false,
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
  onChange?: (e: any) => void;
  onBlur?: (e: string | boolean) => void;
  propError?: string;
  small?: boolean;
  disabled?: boolean;
  [key: string]: any;
}) => {
  const [hasFocus, setHasFocus] = React.useState<boolean>(false);

  const { field } = form
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useController({
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
      propError !== ''
        ? { message: propError }
        : form?.formState?.errors && form.formState.errors[name]
        ? form.formState.errors[name]
        : null,
    [form?.formState?.errors, name, propError]
  );

  const hasValue: boolean = React.useMemo(
    () =>
      ('value' in inputProps && String(inputProps.value) !== '') ||
      ('value' in field && String(field.value) !== ''),
    [inputProps, field]
  );

  return (
    <div
      className={cn(styles.container, className, {
        [styles.containerIsStacked]: type === 'stacked',
        [styles.containerIsInline]: type === 'inline',
        [styles.containerIsHidden]: Input.displayName === 'InputHidden',
        [styles.containerOrderReverse]: reverse,
        [styles.containerIsSmall]: small,
        [styles.containerIsActive]: hasValue || hasFocus,
        [styles.containerIsDisabled]: disabled,
        [styles.containerIsCheckBox]: Input.displayName === 'InputCheckbox',
        [styles.containerIsInputMap]: Input.displayName === 'InputMap',
        [styles.containerHasError]: Boolean(error) && Boolean(error.message),
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
          classNameInput={cn(styles.input, inputClassName)}
          {...field}
          {...inputProps}
          onFocus={() => setHasFocus(true)}
          onBlur={(e) => {
            setHasFocus(false);
            if (e) {
              field.onChange(sanitizeValue(e.target.value));
              onBlur && onBlur(sanitizeValue(e.target.value));
            }
          }}
          disabled={disabled}
        />
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    </div>
  );
};

export default FormElement;
