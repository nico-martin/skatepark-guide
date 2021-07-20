import React from 'react';
import cn from '@common/utils/classnames';

const InputHidden = ({
  name,
  value = '',
  className = '',
  ...props
}: {
  name: string;
  value?: string;
  className?: string;
}) => (
  <input
    name={name}
    className={cn(className)}
    id={name}
    value={value}
    type="hidden"
    {...props}
  />
);

InputHidden.displayName = 'InputHidden';

export default InputHidden;
