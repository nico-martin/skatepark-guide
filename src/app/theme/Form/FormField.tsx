import React from 'react';
import cn from 'classnames';

import { ConnectForm } from './ConnectForm';
import InputText from './Input';
import { unique } from '@app/vendor/helpers';

const FormField = ({
  name,
  label,
  component = InputText,
  register: fieldRegister,
  className = '',
  classNameLabel = '',
  classNameInput = '',
  ...props
}: {
  name: string;
  label: string;
  component?: any;
  register?: any;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  [k: string]: any;
}) => {
  const [uniqueId] = React.useState(() => unique(name));
  const [uniqueName] = React.useState(() => unique(name, 'form'));
  return (
    <ConnectForm>
      {({ register, errors }) => {
        console.log(errors[name]);
        return component({
          ...props,
          name: uniqueName,
          id: uniqueId,
          label,
          ref: register(fieldRegister),
          className: classNameInput,
          error: errors[name] ? errors[name].message : '',
        });
      }}
    </ConnectForm>
  );
};

export default FormField;
