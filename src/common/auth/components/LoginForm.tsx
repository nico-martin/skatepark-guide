import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  Form,
  FormControls,
  FormElement,
  InputSelect,
  InputText,
} from '@theme';
import { postLogin } from '@common/api/auth';
import { useAuth } from '@common/auth/authContext';
import cn from '@common/utils/classnames';
import styles from './Form.css';

const LoginForm = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const [pending, setPending] = React.useState<boolean>(false);
  const { setJwt } = useAuth();

  const form = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className={cn(className, styles.root)}>
      <h2 className={styles.title}>{formatMessage({ id: 'auth.login' })}</h2>
      <Form
        className={cn(styles.form)}
        onSubmit={form.handleSubmit((data) => {
          setPending(true);
          postLogin(data.email, data.password)
            .then((data) => setJwt(data.token))
            .catch(() => {
              alert('error');
            })
            .finally(() => setPending(false));
        })}
      >
        <FormElement
          name="email"
          label={formatMessage({ id: 'auth.email' })}
          Input={InputText}
          form={form}
          rules={{
            required: formatMessage(
              { id: 'form.required' },
              { field: formatMessage({ id: 'auth.email' }) }
            ),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: formatMessage({ id: 'auth.email.validate' }),
            },
          }}
        />
        <FormElement
          name="password"
          label={formatMessage({ id: 'auth.password' })}
          Input={InputText}
          inputType="password"
          form={form}
          rules={{
            required: formatMessage(
              { id: 'form.required' },
              { field: formatMessage({ id: 'auth.password' }) }
            ),
          }}
        />
        <FormControls isLoading={pending} />
      </Form>
    </div>
  );
};

export default LoginForm;
