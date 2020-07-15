import React from 'react';

const FormFieldset = ({
  className = '',
  label = '',
  children,
}: {
  className?: string;
  label?: string;
  children?: any;
}) => {
  return (
    <div className={`form-fieldset ${className}`}>
      {label !== '' && <h2 className="form-fieldset__legend">{label}</h2>}
      {children}
    </div>
  );
};

export default FormFieldset;
