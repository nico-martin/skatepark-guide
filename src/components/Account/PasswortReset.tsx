import React from 'react';
import AuthForm from '@common/auth/components/AuthForm';
import styles from './PasswortReset.css';

const PasswordReset = ({ className = '' }: { className?: string }) => {
  return (
    <div>
      <AuthForm initialFormType="password-reset" className={styles.form} />
    </div>
  );
};

export default PasswordReset;
