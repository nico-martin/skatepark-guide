import React from 'react';
import LoginForm from '@common/auth/components/LoginForm';
import cn from '@common/utils/classnames';
import styles from './AuthForm.css';

const AuthForm = ({ className = '' }: { className?: string }) => {
  const [form, setForm] = React.useState<'login' | 'signup'>('login');
  return (
    <div className={cn(styles.root, className)}>
      {form === 'login' && <LoginForm className={styles.form} />}
    </div>
  );
};

export default AuthForm;
