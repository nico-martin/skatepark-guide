import React from 'react';
import { useIntl } from 'react-intl';
import { Message } from '@theme';
import LoginForm from '@common/auth/components/LoginForm';
import PasswordForm from '@common/auth/components/PasswordForm';
import PasswordResetForm from '@common/auth/components/PasswordResetForm';
import SignupForm from '@common/auth/components/SignupForm';
import cn from '@common/utils/classnames';
import styles from './AuthForm.css';

type FormTypeT = 'login' | 'signup' | 'password' | 'password-reset';

const AuthForm = ({
  className = '',
  initialFormType,
}: {
  className?: string;
  initialFormType?: FormTypeT;
}) => {
  const [formType, setFormType] = React.useState<FormTypeT>(
    initialFormType || 'login'
  );
  const { formatMessage } = useIntl();

  return (
    <div className={cn(styles.root, className)}>
      {formType === 'login' && <LoginForm className={styles.form} />}
      {formType === 'signup' && <SignupForm className={styles.form} />}
      {formType === 'password' && <PasswordForm className={styles.form} />}
      {formType === 'password-reset' && (
        <PasswordResetForm className={styles.form} />
      )}
      <p className={cn(styles.links)}>
        {formType !== 'login' && (
          <button
            onClick={() => setFormType('login')}
            className={cn(styles.linkElement)}
          >
            {formatMessage({ id: 'auth.login' })}
          </button>
        )}
        {formType !== 'signup' && (
          <button
            onClick={() => setFormType('signup')}
            className={cn(styles.linkElement)}
          >
            {formatMessage({ id: 'auth.signup' })}
          </button>
        )}
        {formType !== 'password' && (
          <button
            onClick={() => setFormType('password')}
            className={cn(styles.linkElement)}
          >
            {formatMessage({ id: 'auth.password.forgot' })}
          </button>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
