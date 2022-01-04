import React from 'react';
import { Button, ButtonGroup } from '../index';
import styles from './FormControls.module.css';

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
    <Button color="primary" isLoading={isLoading} {...buttonProps}>
      {value}
    </Button>
  </ButtonGroup>
);

export default FormControls;
