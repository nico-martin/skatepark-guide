import React from 'react';
import cn from '@common/utils/classnames';
import styles from './Form.css';

const Form = React.forwardRef<
  HTMLFormElement,
  {
    className?: string;
    children?: any;
    onSubmit?: Function;
  }
>(({ className = '', children, onSubmit = () => {} }, ref) => (
  <form
    className={cn(className, styles.form)}
    onSubmit={(data) => onSubmit(data)}
    ref={ref}
  >
    {children}
  </form>
));

export default Form;
