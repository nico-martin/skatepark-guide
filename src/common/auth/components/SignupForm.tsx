import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  Form,
  FormControls,
  FormElement,
  FormFeedback,
  InputText,
  MESSAGE_TYPES,
} from '@theme';
import { postSignup } from '@common/api/auth';
import { useAuth } from '@common/auth/authContext';
import { useToast } from '@common/toast/toastContext';
import cn from '@common/utils/classnames';
import styles from './Form.css';

const SignupForm = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const [pending, setPending] = React.useState<boolean>(false);
  const { setJwt } = useAuth();
  const [formError, setFormError] = React.useState<string>('');
  const { addToast } = useToast();

  const form = useForm<{
    email: string;
    password: string;
    repeatPassword: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  return (
    <div className={cn(className, styles.root)}>
      <h2 className={styles.title}>{formatMessage({ id: 'auth.signup' })}</h2>
      <Form
        className={cn(styles.form)}
        onSubmit={form.handleSubmit((data) => {
          setFormError('');
          setPending(true);
          postSignup(data.email, data.password)
            .then((data) => {
              setJwt(data.token);
              addToast({
                message: formatMessage({ id: 'auth.signup.success' }),
              });
            })
            .catch((e) => {
              if (e.code === 'spg_create_user_failed') {
                form.setError('email', {
                  type: 'focus',
                  message: formatMessage({
                    id: 'auth.signup.error.duplicate',
                  }),
                });
              } else {
                setFormError(formatMessage({ id: 'error.general' }));
              }
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
        <FormElement
          name="repeatPassword"
          label={formatMessage({ id: 'auth.repeatPassword' })}
          Input={InputText}
          inputType="password"
          form={form}
          rules={{
            required: formatMessage(
              { id: 'form.required' },
              { field: formatMessage({ id: 'auth.repeatPassword' }) }
            ),
            validate: (value) =>
              value === form.getValues('password') ||
              formatMessage({ id: 'auth.signup.error.repeatPassword' }),
          }}
        />
        {formError !== '' && (
          <FormFeedback type={MESSAGE_TYPES.ERROR}>{formError}</FormFeedback>
        )}
        <FormControls isLoading={pending} />
      </Form>
    </div>
  );
};

export default SignupForm;
