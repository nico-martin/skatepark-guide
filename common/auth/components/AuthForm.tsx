import React from 'react';
import { useIntl } from 'react-intl';
import { Message, Button } from '@theme';
import LoginForm from '@common/auth/components/LoginForm';
import PasswordForm from '@common/auth/components/PasswordForm';
import PasswordResetForm from '@common/auth/components/PasswordResetForm';
import SignupForm from '@common/auth/components/SignupForm';
import cn from '@common/utils/classnames';
import styles from './AuthForm.module.css';

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
          <Button
            onClick={() => setFormType('login')}
            className={cn(styles.linkElement)}
            type="text"
            color="white"
          >
            {formatMessage({ id: 'auth.login' })}
          </Button>
        )}
        {formType !== 'signup' && (
          <Button
            onClick={() => setFormType('signup')}
            className={cn(styles.linkElement)}
            type="text"
            color="white"
          >
            {formatMessage({ id: 'auth.signup' })}
          </Button>
        )}
        {formType !== 'password' && (
          <Button
            onClick={() => setFormType('password')}
            className={cn(styles.linkElement)}
            type="text"
            color="white"
          >
            {formatMessage({ id: 'auth.password.forgot' })}
          </Button>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
