import React from 'react';
import cn from '@common/utils/classnames';

const InputHidden = ({
  name,
  value = '',
  className = '',
  classNameInput = '',
  ...props
}: {
  name: string;
  value?: string;
  className?: string;
  classNameInput?: string;
}) => (
  <input
    name={name}
    className={cn(className, classNameInput)}
    id={name}
    value={value}
    type="hidden"
    {...props}
  />
);

InputHidden.displayName = 'InputHidden';

export default InputHidden;
