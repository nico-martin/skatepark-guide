import React from 'react';
import { Button, ButtonGroup } from '../index';
import styles from './FormControls.css';

const FormControls = ({
  value = 'Submit',
  className = '',
  align = 'left',
  isLoading = false,
  ...buttonProps
}: {
  value?: string;
  className?: string;
  align?: 'right' | 'left' | 'center';
  isLoading?: boolean;
  [key: string]: any;
}) => (
  <ButtonGroup align={align} className={styles.root}>
    <Button buttonType="primary" isLoading={isLoading} {...buttonProps}>
      {value}
    </Button>
  </ButtonGroup>
);

export default FormControls;
