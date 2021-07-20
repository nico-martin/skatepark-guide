import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';
import {
  Form,
  FormControls,
  FormElement,
  InputText,
  InputHidden,
  FormFeedback,
  MESSAGE_TYPES,
} from '@theme';
import { postPasswordConfirm } from '@common/api/auth';
import { useAuth } from '@common/auth/authContext';
import { useToast } from '@common/toast/toastContext';
import cn from '@common/utils/classnames';
import styles from './Form.css';

const PasswordResetForm = ({ className = '' }: { className?: string }) => {
  const { formatMessage } = useIntl();
  const [pending, setPending] = React.useState<boolean>(false);
  const { key } = useParams<{ key: string }>();
  const history = useHistory();
  const { addToast } = useToast();
  const { setEmail: setAuthEmail } = useAuth();
  const [formError, setFormError] = React.useState<string>('');

  const form = useForm<{
    password: string;
    repeatPassword: string;
    key: string;
  }>({
    defaultValues: {
      password: '',
      repeatPassword: '',
      key,
    },
  });

  return (
    <div className={cn(className, styles.root)}>
      <h2 className={styles.title}>
        {formatMessage({ id: 'auth.password.reset' })}
      </h2>
      <Form
        className={cn(styles.form)}
        onSubmit={form.handleSubmit((data) => {
          setPending(true);
          postPasswordConfirm(data.password, data.key)
            .then((data) => {
              setAuthEmail(data.userEmail);
              addToast({
                message: formatMessage({ id: 'auth.password.reset.success' }),
              });
              history.push(data.redirect || '/');
            })
            .catch((e) => {
              setFormError(
                formatMessage({
                  id:
                    e.code === 'spg_pwreset_invalid'
                      ? 'auth.password.reset.invalidLink'
                      : 'error.general',
                })
              );
            })
            .finally(() => setPending(false));
        })}
      >
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
        <FormElement
          name="key"
          label="key"
          Input={InputHidden}
          inputType="text"
          form={form}
        />
        {formError !== '' && (
          <FormFeedback type={MESSAGE_TYPES.ERROR}>{formError}</FormFeedback>
        )}
        <FormControls isLoading={pending} />
      </Form>
    </div>
  );
};

export default PasswordResetForm;
