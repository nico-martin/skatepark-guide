import React from 'react';
import cn from 'classnames';
import { useForm, useFormContext, FormContext } from 'react-hook-form';

//import './Form.css';

const Form = ({
  onSubmit,
  className,
  children,
  ...props
}: {
  onSubmit: Function;
  className?: string;
  children?: any;
}) => {
  // @ts-ignore
  const methods = useForm();
  return (
    <FormContext {...methods}>
      <form
        onSubmit={methods.handleSubmit(v => onSubmit(v))}
        className={cn(className, 'form')}
        {...props}
      >
        {children}
      </form>
    </FormContext>
  );
};

export default Form;
