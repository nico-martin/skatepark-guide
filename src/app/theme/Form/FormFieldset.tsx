import React from 'react';

import './FormFieldset.css';

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
      <div className="form-fieldset__fields">{children}</div>
    </div>
  );
};

export default FormFieldset;
